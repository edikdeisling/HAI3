/**
 * Navigation Plugin - Provides navigation actions and URL sync
 *
 * Framework Layer: L2
 *
 * NOTE: Uses layout slices from @hai3/framework (not @hai3/uicore which is deprecated)
 */

import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { eventBus } from '@hai3/state';
import { i18nRegistry } from '@hai3/i18n';
import { screenActions as screenActionsImport, menuActions as menuActionsImport } from '../slices';
import type { HAI3Plugin, NavigateToScreenPayload, NavigateToScreensetPayload, NavigationConfig } from '../types';
import { stripBase, prependBase, resolveBase } from '../utils/basePath';
import type { ScreensetDefinition } from '@hai3/screensets';

// Type assertion for slice imports (needed for plugin system compatibility)
type ActionCreators = Record<string, (payload?: unknown) => UnknownAction>;
const screenActions = screenActionsImport as unknown as ActionCreators;
const menuActions = menuActionsImport as unknown as ActionCreators;

// Define navigation events for module augmentation
declare module '@hai3/state' {
  interface EventPayloadMap {
    'navigation/screen/navigated': NavigateToScreenPayload;
    'navigation/screenset/navigated': NavigateToScreensetPayload;
  }
}

/**
 * Navigate to screen action.
 * Emits 'navigation/screen/navigated' event.
 *
 * @param payload - The navigation payload
 */
function navigateToScreen(payload: NavigateToScreenPayload): void {
  eventBus.emit('navigation/screen/navigated', payload);
}

/**
 * Navigate to screenset action.
 * Emits 'navigation/screenset/navigated' event.
 *
 * @param payload - The navigation payload
 */
function navigateToScreenset(payload: NavigateToScreensetPayload): void {
  eventBus.emit('navigation/screenset/navigated', payload);
}

/**
 * Navigation plugin factory.
 *
 * @param config - Optional navigation configuration
 * @returns Navigation plugin
 *
 * @example
 * ```typescript
 * const app = createHAI3()
 *   .use(screensets())
 *   .use(navigation({ base: '/app' }))
 *   .build();
 *
 * app.actions.navigateToScreen({ screensetId: 'demo', screenId: 'home' });
 * ```
 */
export function navigation(config?: NavigationConfig): HAI3Plugin {

  return {
    name: 'navigation',
    dependencies: ['screensets'],

    provides: {
      actions: {
        navigateToScreen,
        navigateToScreenset,
      },
    },

    onInit(app) {
      const dispatch = app.store.dispatch as Dispatch<UnknownAction>;
      const base = resolveBase(config, app.config);
      let currentScreensetId: string | null = null;

      // Load screenset translations (async, non-blocking)
      const loadScreensetTranslations = async (screensetId: string, language?: string): Promise<void> => {
        await i18nRegistry.loadScreensetTranslations(
          screensetId,
          language as Parameters<typeof i18nRegistry.loadScreensetTranslations>[1]
        );
      };

      // Update screenset menu items
      const updateScreensetMenu = (screenset: ScreensetDefinition): void => {
        const menuItems = screenset.menu.map((item) => ({
          id: item.menuItem.screenId ?? item.menuItem.id,
          label: item.menuItem.label,
          icon: item.menuItem.icon,
        }));
        dispatch(menuActions.setMenuItems(menuItems));
      };

      // Activate screenset (menu + translations)
      const activateScreenset = (screensetId: string): void => {
        if (screensetId === currentScreensetId) {
          return;
        }

        const screenset = app.screensetRegistry.get(screensetId);
        if (!screenset) {
          return;
        }

        currentScreensetId = screensetId;

        loadScreensetTranslations(screensetId).catch((err) => {
          console.warn(`[HAI3] Failed to load translations for screenset ${screensetId}:`, err);
        });

        updateScreensetMenu(screenset);
      };

      // Extract screen ID from current URL
      const extractScreenId = (): string | null => {
        const internalPath = stripBase(window.location.pathname, base);
        if (!internalPath) {
          return null;
        }

        const parts = internalPath.split('/').filter(Boolean);
        return parts[0] || null;
      };

      // Activate screen (screenset + Redux state)
      const activateScreen = (screenId: string): void => {
        const screensetId = app.routeRegistry?.getScreensetForScreen(screenId);
        if (!screensetId) {
          return;
        }

        activateScreenset(screensetId);
        dispatch(screenActions.navigateTo(screenId));
      };

      // Handle navigation to specific screen
      eventBus.on('navigation/screen/navigated', (payload: NavigateToScreenPayload) => {
        if (!app.routeRegistry?.hasScreen(payload.screensetId, payload.screenId)) {
          console.warn(
            `Screen "${payload.screenId}" in screenset "${payload.screensetId}" not found.`
          );
          return;
        }

        activateScreenset(payload.screensetId);
        dispatch(screenActions.navigateTo(payload.screenId));

        if (typeof window !== 'undefined') {
          const url = prependBase(`/${payload.screenId}`, base);
          if (window.location.pathname !== url) {
            window.history.pushState(null, '', url);
          }
        }
      });

      // Handle navigation to screenset (default screen)
      eventBus.on('navigation/screenset/navigated', (payload: NavigateToScreensetPayload) => {
        const screenset = app.screensetRegistry.get(payload.screensetId);
        if (!screenset) {
          console.warn(`Screenset "${payload.screensetId}" not found.`);
          return;
        }

        navigateToScreen({
          screensetId: payload.screensetId,
          screenId: screenset.defaultScreen,
        });
      });

      let lastLoadedLanguage: string | null = null;

      // Reload translations when language changes
      i18nRegistry.subscribe(() => {
        const currentLanguage = i18nRegistry.getLanguage();
        if (!currentLanguage || currentLanguage === lastLoadedLanguage) {
          return;
        }

        if (!currentScreensetId) {
          return;
        }

        const screenset = app.screensetRegistry.get(currentScreensetId);
        if (!screenset) {
          return;
        }

        lastLoadedLanguage = currentLanguage;

        loadScreensetTranslations(currentScreensetId, currentLanguage)
          .then(() => updateScreensetMenu(screenset))
          .catch((err) => {
            console.warn(
              `[HAI3] Failed to reload translations for screenset ${currentScreensetId}:`,
              err
            );
          });
      });

      if (typeof window !== 'undefined') {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
          const screenId = extractScreenId();
          if (screenId) {
            activateScreen(screenId);
          }
        });

        // Initial navigation on page load
        const screenId = extractScreenId();
        const autoNavigate = app.config.autoNavigate !== false;

        if (screenId) {
          activateScreen(screenId);
        } else if (autoNavigate) {
          const screensets = app.screensetRegistry.getAll();
          if (screensets.length > 0) {
            navigateToScreenset({ screensetId: screensets[0].id });
          }
        }
      }
    },
  };
}
