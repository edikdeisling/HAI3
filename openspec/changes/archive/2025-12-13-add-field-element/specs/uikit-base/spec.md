## ADDED Requirements

### Requirement: Field Component

The UI kit SHALL provide Field, FieldSet, FieldLegend, FieldGroup, FieldLabel, FieldTitle, FieldDescription, FieldContent, FieldSeparator, and FieldError components for composing accessible form fields with labels, controls, and help text.

#### Scenario: Field component is available

- **WHEN** importing Field from `@hai3/uikit`
- **THEN** all Field sub-components are available: Field, FieldSet, FieldLegend, FieldGroup, FieldLabel, FieldTitle, FieldDescription, FieldContent, FieldSeparator, FieldError
- **AND** components support all standard React component props

#### Scenario: Field with orientation prop

- **WHEN** using Field with orientation="vertical"
- **THEN** the field is arranged in a flex column layout
- **AND** all children take full width
- **WHEN** using Field with orientation="horizontal"
- **THEN** the field is arranged in a flex row layout
- **AND** items are center-aligned
- **AND** FieldLabel takes flex-auto width
- **WHEN** using Field with orientation="responsive"
- **THEN** the field uses vertical layout by default
- **AND** switches to horizontal layout at medium breakpoint using container queries (@md/field-group)

#### Scenario: Field with invalid state

- **WHEN** Field has data-invalid="true" attribute
- **THEN** the field displays destructive text color
- **AND** FieldError component shows validation errors

#### Scenario: FieldSet container

- **WHEN** using FieldSet to wrap multiple Field components
- **THEN** fields are grouped in a flex column with gap-6
- **AND** the container uses semantic fieldset element
- **AND** checkbox groups and radio groups have gap-3 spacing

#### Scenario: FieldLegend with variant

- **WHEN** using FieldLegend with variant="legend"
- **THEN** the legend displays with text-base font size
- **WHEN** using FieldLegend with variant="label"
- **THEN** the legend displays with text-sm font size
- **AND** the legend has mb-3 margin bottom

#### Scenario: FieldGroup container

- **WHEN** using FieldGroup to wrap multiple Field components
- **THEN** fields are grouped in a flex column with gap-7
- **AND** the container uses @container/field-group for container queries
- **AND** nested FieldGroups have gap-4 spacing

#### Scenario: FieldLabel component

- **WHEN** using FieldLabel component
- **THEN** the label wraps the Label component
- **AND** the label has w-fit and gap-2 layout
- **AND** the label respects group-data-[disabled=true]/field:opacity-50 styling
- **AND** when containing Field components, the label becomes full-width with border and padding

#### Scenario: FieldTitle component

- **WHEN** using FieldTitle component
- **THEN** the title displays with text-sm, leading-snug, and font-medium styling
- **AND** the title has w-fit and items-center gap-2 layout
- **AND** the title respects group-data-[disabled=true]/field:opacity-50 styling

#### Scenario: FieldDescription component

- **WHEN** using FieldDescription component
- **THEN** the description displays with text-muted-foreground, text-sm styling
- **AND** links within description have hover:text-primary and underline styling
- **AND** the description has proper spacing with FieldLegend (nth-last-2:-mt-1)

#### Scenario: FieldContent wrapper

- **WHEN** using FieldContent to wrap FieldLabel and FieldDescription
- **THEN** the content is displayed in a flex column with gap-1.5
- **AND** the content takes flex-1 to fill available space
- **AND** the content has leading-snug line height

#### Scenario: FieldSeparator component

- **WHEN** using FieldSeparator without children
- **THEN** a horizontal separator line is rendered
- **AND** the separator has relative positioning with -my-2 margin
- **WHEN** using FieldSeparator with children
- **THEN** the separator displays with content centered on the line
- **AND** the content has bg-background and text-muted-foreground styling

#### Scenario: FieldError component

- **WHEN** using FieldError with children prop
- **THEN** the error message is displayed
- **WHEN** using FieldError with errors array containing single error
- **THEN** the error message text is displayed
- **WHEN** using FieldError with errors array containing multiple errors
- **THEN** a bulleted list of error messages is displayed
- **AND** duplicate error messages are deduplicated
- **WHEN** FieldError has no children and empty errors array
- **THEN** nothing is rendered (returns null)
- **AND** the error has role="alert" for accessibility
- **AND** the error uses text-destructive styling

### Requirement: Field Demo Examples

The UI kit demo SHALL provide examples for the Field component in the Forms & Inputs category demonstrating basic field, error handling, field groups, field sets, and different orientations, using `tk()` for translations.

#### Scenario: Field section in FormElements

- **WHEN** viewing the Forms & Inputs category
- **THEN** a Field section is displayed with heading and examples
- **AND** the section includes data-element-id="element-field" for navigation

#### Scenario: Field examples use translations

- **WHEN** Field examples are rendered
- **THEN** all text content uses the `tk()` translation helper
- **AND** all translated text is wrapped with TextLoader component

#### Scenario: Multiple Field examples

- **WHEN** viewing the Field section
- **THEN** examples demonstrate:
  - Basic field with label, input, and description
  - Field with error message
  - FieldGroup with multiple fields
  - FieldSet with FieldLegend
  - Field with horizontal orientation
  - Field with responsive orientation
  - FieldSeparator with content

### Requirement: Field in Category System

The UI kit element registry SHALL include 'Field' in the `IMPLEMENTED_ELEMENTS` array to mark it as an available component in the Forms & Inputs category.

#### Scenario: Category Menu Shows Field

- **WHEN** viewing the UIKit category menu
- **THEN** Field appears as an implemented element in Forms & Inputs category
- **AND** Field is positioned appropriately among other form elements

### Requirement: Field Translations

The UI kit translations SHALL provide localized strings for all 36 supported languages with keys including:
- `field_heading` - Section heading
- `field_basic_label` - Basic field example label
- `field_error_label` - Field with error example label
- `field_group_label` - Field group example label
- `field_set_label` - Field set example label
- `field_horizontal_label` - Horizontal orientation example label
- `field_responsive_label` - Responsive orientation example label
- `field_separator_label` - Field separator example label
- Additional keys for example content (labels, descriptions, error messages, form field labels)

#### Scenario: Translated Field Labels

- **WHEN** viewing the Field demo in a non-English language
- **THEN** all Field labels, descriptions, error messages, and form field text display in the selected language
- **AND** translations are contextually appropriate for form conventions
