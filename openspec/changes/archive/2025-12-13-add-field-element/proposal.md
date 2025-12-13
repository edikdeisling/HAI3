# Add Field Base UI Kit Element

## Why

The Field component is a comprehensive form composition system that combines labels, controls, and help text to create accessible form fields and grouped inputs. It provides a structured way to compose forms with proper semantics, validation error handling, and responsive layouts. Field is essential for building accessible, well-structured forms in the UI kit.

## What Changes

1. **New Component**: Create `field.tsx` in `packages/uikit/src/base/` with the following components:
   - `Field` - Core wrapper for a single field with orientation variants ("vertical" | "horizontal" | "responsive")
   - `FieldSet` - Semantic fieldset container for grouping related fields
   - `FieldLegend` - Legend component with variant ("legend" | "label")
   - `FieldGroup` - Container for grouping related fields
   - `FieldLabel` - Label component that wraps the Label component
   - `FieldTitle` - Title display component (alternative to FieldLabel)
   - `FieldDescription` - Helper text/description component
   - `FieldContent` - Flex column wrapper for label and description
   - `FieldSeparator` - Separator with optional content between fields
   - `FieldError` - Validation error message component with support for multiple errors

2. **Dependencies**: Uses existing `Label` and `Separator` components from uikit, plus `class-variance-authority` for variants

3. **Export**: Add all Field components to `packages/uikit/src/index.ts`

4. **Demo**: Add Field examples to `FormElements.tsx` demonstrating:
   - Basic field with label, input, and description
   - Field with error message
   - FieldGroup with multiple fields
   - FieldSet with FieldLegend
   - Field with horizontal orientation
   - Field with responsive orientation
   - FieldSeparator with content

5. **Translations**: Add translation keys to all 36 language files in `src/screensets/demo/screens/uikit/i18n/`

6. **Category System**: Add 'Field' to `IMPLEMENTED_ELEMENTS` array in `uikitCategories.ts` (Field is already listed in the Forms & Inputs category)

## Impact

- Medium complexity: Multiple sub-components with orientation variants and container queries support
- Uses existing dependencies: `Label`, `Separator`, `class-variance-authority`
- No breaking changes to existing components
- Follows established shadcn/ui patterns with CVA for variants
- Uses container queries (@container) for responsive behavior
