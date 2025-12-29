# Change: Add Base Path Support to Navigation

## Why
Currently, HAI3 applications assume they are hosted at the root path (`/`). This prevents deployment in subdirectories (e.g., `https://example.com/console`).
This change introduces `base` path configuration support, similar to `react-router` and `vue-router`, to allow hosting applications under any path prefix.

## What Changes
- Add `base` property to `HAI3Config` for global configuration
- Update `navigation()` plugin factory to accept `NavigationConfig` with `base` override
- Implement URL normalization logic in navigation plugin:
  - Reading: Strip `base` from `window.location.pathname` before parsing screen ID
  - Writing: Prepend `base` to URL when pushing to history
- Logic priority: `pluginConfig.base` > `app.config.base` > `'/'`

## Impact
- Affected specs: `app-configuration`
- Affected packages: `@hai3/framework`
