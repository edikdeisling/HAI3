# Implementation Tasks

## 1. Pre-Migration Validation
- [ ] Run `npm run type-check` to establish baseline (expect zero errors)
- [ ] Run `npm run arch:check` to ensure clean start (expect all checks pass)
- [ ] Run `npm run build:packages` to verify all packages build cleanly
- [ ] Verify git working tree is clean (`git status`)
- [ ] Create feature branch `feat/react19-p2`

## 2. Install Codemod Tool
- [ ] Install codemod CLI globally: `npm install -g codemod`
- [ ] Verify installation: `codemod --version`

## 3. Run Automated forwardRef Migration (Base Components - 21 files)

### Run codemod on base components
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/accordion.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/alert-dialog.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/avatar.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/button.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/card.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/carousel.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/collapsible.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/dialog.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/drawer.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/dropdown-menu.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/header.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/hover-card.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/input.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/input-group.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/navigation-menu.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/popover.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/progress.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/select.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/sheet.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/slider.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/spinner.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/switch.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/textarea.tsx` (will require manual fix after)
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/base/tooltip.tsx`

### Review base component transformations
- [ ] Review each transformed file for correctness
- [ ] Verify `forwardRef` removed from all components
- [ ] Verify `ref` added to props destructuring
- [ ] Verify type annotations updated correctly
- [ ] Verify `displayName` preserved where present
- [ ] Commit base component changes: "refactor(uikit): migrate base components from forwardRef to native ref"

## 4. Run Automated forwardRef Migration (Composite Components - 7 files)

### Run codemod on composite components
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/composite/buttons/DropdownButton.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/composite/buttons/IconButton.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/composite/navigation/Sidebar.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/composite/navigation/SidebarHeader.tsx`
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/uikit/src/composite/user/UserInfo.tsx`

### Review composite component transformations
- [ ] Review each transformed file for correctness
- [ ] Verify all forwardRef wrappers removed
- [ ] Verify ref handling correct in composite components
- [ ] Commit composite component changes: "refactor(uikit): migrate composite components from forwardRef to native ref"

## 5. Run Automated forwardRef Migration (CLI Template - 1 file)

### Run codemod on CLI template
- [ ] Execute: `npx codemod react/19/remove-forward-ref packages/cli/templates/src/screensets/demo/uikit/icons/MenuItemButton.tsx`

### Review CLI template transformation
- [ ] Review MenuItemButton.tsx transformation
- [ ] Verify forwardRef removed correctly
- [ ] Commit CLI template changes: "refactor(cli): migrate MenuItemButton template from forwardRef to native ref"

## 6. Manual Fix for textarea.tsx (useImperativeHandle)

### Analyze textarea.tsx codemod output
- [ ] Open `packages/uikit/src/base/textarea.tsx`
- [ ] Review codemod transformation
- [ ] Identify useImperativeHandle usage

### Apply manual fix if needed
- [ ] Verify `useImperativeHandle` still works with new signature
- [ ] Test that ref forwarding works correctly
- [ ] Ensure autoResize functionality preserved
- [ ] If codemod didn't handle correctly, apply manual transformation:
  ```typescript
  // Keep useImperativeHandle approach (compatible with React 19)
  useImperativeHandle(ref, () => textareaRef.current!);
  ```
- [ ] Commit textarea manual fix separately: "refactor(uikit): fix textarea ref forwarding with useImperativeHandle"

## 7. Fix Type Errors Revealed by Migration

### Fix implicit any types in components
- [x] Fix `dropdown-menu.tsx` - Add proper type annotations to DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel
- [x] Fix `carousel.tsx` - Add type annotation using CarouselProps
- [x] Fix `input-group.tsx` - Add type annotations to InputGroupAddon and InputGroupButton
- [x] Fix `sidebar.tsx` - Add type annotations to Sidebar and SidebarMenuButton

### Fix demo code type errors
- [x] Fix `FormElements.tsx` line 775 - Change `align="block-end"` to `align="inline-end"`
- [x] Fix `FormElements.tsx` line 781 - Change `align="block-start"` to `align="inline-start"`

### Remove unused imports
- [x] Remove unused `VariantProps` import from `input-group.tsx`
- [x] Add missing `ButtonProps` import to `input-group.tsx`
- [x] Remove unused `VariantProps` import from `sidebar.tsx`

## 8. Type Checking & Compilation

### Run full type checking
- [x] Run `npm run type-check` - expect zero errors
- [x] Run `npm run type-check:packages` - expect all packages compile cleanly
- [x] Fix any type errors discovered (if any)
- [x] Re-run type checks until clean

### Build all packages
- [x] Run `npm run build:packages` - expect clean build
- [x] Verify all packages build in correct order (SDK → Framework → React → UI → CLI)
- [x] Fix any build errors (if any)

## 9. Architecture & Linting Validation

### Run architecture checks
- [x] Run `npm run arch:check` - expect all checks pass (from pre-migration baseline)
- [x] Run `npm run arch:deps` - expect no dependency violations (from pre-migration baseline)
- [x] Run `npm run arch:sdk` - expect SDK layer rules pass (from pre-migration baseline)

### Run linting
- [x] Run `npm run lint` - expect zero warnings/errors
- [x] Fix any linting issues (if any)
- [x] Run pre-commit hooks to verify (if configured)

## 10. Manual Testing - Base Components

### Test input components with refs
- [ ] Start dev server: `npm run dev`
- [ ] Test Button component (focus, click, ref access)
- [ ] Test Input component (focus, setValue via ref)
- [ ] Test Textarea component (focus, setValue via ref, autoResize)
- [ ] Test Switch component (focus, checked state)

### Test Radix UI wrapper components
- [ ] Test Dialog (open, close, focus trap, ref access)
- [ ] Test Sheet (open, close, ref access)
- [ ] Test Dropdown Menu (open, close, keyboard nav, ref access)
- [ ] Test Select (focus, open, close, value selection)
- [ ] Test Popover (open, close, positioning)
- [ ] Test HoverCard (hover, delay, ref access)
- [ ] Test Tooltip (hover, positioning)
- [ ] Test AlertDialog (open, close, focus trap)
- [ ] Test Accordion (expand, collapse, multiple items)
- [ ] Test Collapsible (expand, collapse)
- [ ] Test NavigationMenu (keyboard nav, submenu)
- [ ] Test Avatar (image load, fallback)
- [ ] Test Progress (value updates)
- [ ] Test Slider (drag, keyboard, value)
- [ ] Test Carousel (navigation, autoplay if enabled)

### Test layout components
- [ ] Test Card (rendering, ref access)
- [ ] Test Header (rendering, ref access)
- [ ] Test InputGroup (rendering, child composition)

### Verify no console errors
- [ ] Check browser console for React warnings
- [ ] Check for forwardRef deprecation warnings (should be none)
- [ ] Check for ref-related errors (should be none)

## 10. Manual Testing - Composite Components

### Test composite button components
- [ ] Test IconButton (click, focus, icon rendering, ref access)
- [ ] Test DropdownButton (click, dropdown open/close, ref access)

### Test composite navigation components
- [ ] Test Sidebar (expand/collapse, navigation, ref access)
- [ ] Test SidebarHeader (rendering, interactions)

### Test composite user components
- [ ] Test UserInfo (rendering, avatar, name display)

## 11. CLI Generator Integration Testing

### Generate new project with updated template
- [ ] Create temp directory: `mkdir -p /tmp/test-react19-p2`
- [ ] Generate new project: `npx @hai3/cli@alpha init /tmp/test-react19-p2`
- [ ] Verify project generated successfully

### Verify MenuItemButton.tsx in generated project
- [ ] Open `/tmp/test-react19-p2/src/screensets/demo/uikit/icons/MenuItemButton.tsx`
- [ ] Verify forwardRef removed (uses native ref pattern)
- [ ] Verify component signature correct
- [ ] Verify no forwardRef imports

### Validate generated project
- [ ] Run `npm install` in generated project
- [ ] Run `npm run type-check` - expect zero errors
- [ ] Run `npm run arch:check` - expect all checks pass
- [ ] Run `npm run build` - expect clean build
- [ ] Run `npm run dev` - expect dev server starts (http://localhost:5173/)
- [ ] Test MenuItemButton in demo screenset (if visible)

## 12. Documentation Updates

### Update OpenSpec docs
- [ ] Mark Phase 2 as complete in `openspec/changes/2026-02-05-react-19-phase-2-forwardref/proposal.md`
- [ ] Update this tasks.md with completion status
- [ ] Add notes about any issues encountered during migration

### Update main specs (if needed)
- [ ] Review `openspec/specs/uikit-base/spec.md`
- [ ] Add note about React 19 native ref pattern (if not already documented)
- [ ] Update component implementation guidelines to prefer native ref

## 13. Final Validation & Merge

### Run complete validation suite
- [ ] Run `npm run type-check` - zero errors
- [ ] Run `npm run build:packages` - clean build
- [ ] Run `npm run arch:check` - all checks pass
- [ ] Run `npm run lint` - zero warnings
- [ ] Run `npm run dev` - dev server starts cleanly
- [ ] Manual testing checklist completed (all items above)

### Review all commits
- [ ] Review all commit messages for clarity
- [ ] Ensure commits are atomic and logical
- [ ] Squash/reorder commits if needed (keep separate: base, composite, CLI, textarea manual fix)

### Verify git status
- [ ] All changes committed
- [ ] No uncommitted files
- [ ] Branch is `feat/react19-p2`
- [ ] Ready to push and create PR

## 14. Post-Merge Validation

### After merging to main
- [ ] Pull latest main branch
- [ ] Run full validation suite on main
- [ ] Verify no regressions introduced
- [ ] Monitor for any reported issues

### Update package versions (if breaking)
- [ ] No breaking changes - this is internal refactor
- [ ] No version bump needed (unless bundled with other changes)

## Phase 2 Completion Checklist

- [ ] All 100 forwardRef declarations migrated (99 auto + 1 manual)
- [ ] All 29 files transformed successfully
- [ ] textarea.tsx useImperativeHandle handled correctly
- [ ] Zero TypeScript errors
- [ ] Clean package builds
- [ ] All architecture checks pass
- [ ] No linting errors
- [ ] Dev server runs without warnings
- [ ] All ref-dependent features tested manually
- [ ] CLI generator integration tested
- [ ] Generated project validates successfully
- [ ] No React warnings in browser console
- [ ] All commits reviewed and clean
- [ ] Documentation updated
- [ ] Ready for PR and merge

## Rollback Plan (if needed)

### Quick rollback (revert commits)
```bash
# Identify commits to revert
git log --oneline -n 10

# Revert all Phase 2 commits
git revert <commit-hash-1>
git revert <commit-hash-2>
git revert <commit-hash-3>

# Validate rollback
npm run type-check
npm run build:packages
npm run dev
```

### Full rollback (abandon branch)
```bash
git checkout main
git branch -D feat/react19-p2
```

## Notes

- **Codemod installation:** If `npm install -g codemod` fails, try `npx codemod` directly (it will auto-install)
- **Batch execution:** Can run codemod on multiple files at once: `npx codemod react/19/remove-forward-ref 'packages/uikit/src/base/*.tsx'`
- **Type annotations:** Codemod may produce verbose types; simplify if needed (e.g., use type aliases)
- **displayName:** Codemod preserves `displayName` assignments (important for React DevTools)
- **Testing priority:** Focus manual testing on ref-dependent features (focus, imperative methods, forwarding)
