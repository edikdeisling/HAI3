# Proposal: Add Date Picker Composite Element

## Summary

Implement a Date Picker composite UI Kit element that combines `<Popover />` and `<Calendar />` components to provide a complete date selection experience with button trigger, dropdown calendar, and optional input field integration.

## Motivation

The Calendar component is already implemented as a base element, but users need a higher-level Date Picker component that handles:
- Popover trigger button with formatted date display
- State management for open/close behavior
- Integration with form inputs for editable date entry
- Date and time picking combinations

This composite element follows the same pattern as `InputGroup` - combining base elements into a cohesive, reusable pattern.

## Proposed Changes

### 1. New Composite Component

Create `packages/uikit/src/composite/forms/date-picker.tsx` with:

- **DatePicker** - Main wrapper managing open state and date selection
- **DatePickerTrigger** - Button trigger displaying formatted date with calendar icon
- **DatePickerContent** - Popover content wrapper for the calendar
- **DatePickerInput** - Optional input variant for editable date entry with icon trigger

### 2. Component Features

- Controlled and uncontrolled modes
- Customizable date formatting via `formatDate` prop
- Dropdown calendar mode support (`captionLayout="dropdown"`)
- Empty state placeholder
- Integration with Label and Field components
- Time input pairing for datetime scenarios

### 3. Demo Examples

Add to `FormElements.tsx`:

1. **Basic Date Picker** - Simple button trigger with popover calendar
2. **Date of Birth Picker** - Dropdown mode with label integration
3. **Date Picker with Input** - Editable input field with calendar trigger
4. **Date and Time Picker** - Combined date picker and time input

### 4. Exports and Category System

- Export all Date Picker components from `@hai3/uikit`
- Add 'Date Picker' to `IMPLEMENTED_ELEMENTS` array
- Add translations for all 36 supported languages

## Dependencies

- Uses existing base components: `Calendar`, `Popover`, `PopoverTrigger`, `PopoverContent`, `Button`, `Input`
- Uses existing icons: `CalendarIcon`, `ChevronDownIcon`
- Uses `date-fns` for date formatting (already in dependencies)

## Impact

- **Low risk**: Composes existing, tested components
- **No breaking changes**: Additive feature only
- **Translations**: 36 language files need new keys

## Alternatives Considered

1. **Inline composition only**: Users could compose Popover + Calendar themselves, but this leads to boilerplate duplication
2. **Fully integrated datetime picker**: Decided to keep date and time separate for flexibility, allowing users to combine them as needed
