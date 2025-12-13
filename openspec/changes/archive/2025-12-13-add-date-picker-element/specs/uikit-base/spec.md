# Spec Delta: uikit-base

## ADDED Requirements

### Requirement: Date Picker Composite Component

The UI kit SHALL provide DatePicker, DatePickerTrigger, DatePickerContent, and DatePickerInput components as a composite element that combines Popover and Calendar for complete date selection experiences with button triggers, dropdown calendars, and optional input field integration.

#### Scenario: DatePicker component is available

Given a developer importing from @hai3/uikit
When they import DatePicker, DatePickerTrigger, DatePickerContent, DatePickerInput
Then all components should be available for use

#### Scenario: Basic date picker with trigger

Given a DatePicker component with DatePickerTrigger and DatePickerContent
When the user clicks the trigger button
Then a popover opens with a Calendar for date selection

#### Scenario: Date picker with input variant

Given a DatePickerInput component
When the user types a date or clicks the calendar icon
Then the date can be entered via keyboard or calendar selection

#### Scenario: Date formatting

Given a DatePicker with a selected date
When the date is displayed in the trigger
Then it should be formatted using the provided formatDate function or default locale format

#### Scenario: Empty state placeholder

Given a DatePicker with no selected date
When viewing the trigger button
Then a placeholder text should be displayed with muted styling

### Requirement: Date Picker Demo Examples

The UI kit demo SHALL provide examples for the Date Picker component in the Forms & Inputs category demonstrating:
- Basic date picker with button trigger
- Date of birth picker with dropdown calendar mode and label
- Date picker with editable input field
- Date and time picker combination

#### Scenario: Date Picker section in FormElements

Given a user viewing the Forms & Inputs category in UIKitElementsScreen
When they scroll to the Date Picker section
Then they should see the heading and 4 demo examples

#### Scenario: Demo examples use translations

Given a user viewing the Date Picker demos
When the section renders
Then all labels, placeholders, and descriptions should use `tk()` translation function

#### Scenario: Date of birth picker example

Given the date of birth picker demo
When the user opens the calendar
Then it should use `captionLayout="dropdown"` for easy year/month selection

#### Scenario: Date and time picker example

Given the date and time picker demo
When viewing the example
Then it should show a date picker alongside a time input field

### Requirement: Date Picker in Category System

The UI kit element registry SHALL include 'Date Picker' in the IMPLEMENTED_ELEMENTS array to mark it as an available component in the Forms & Inputs category.

#### Scenario: Date Picker in IMPLEMENTED_ELEMENTS

Given the uikitCategories.ts file
When checking the IMPLEMENTED_ELEMENTS array
Then 'Date Picker' should be present and alphabetically ordered

#### Scenario: Category menu shows Date Picker

Given a user viewing the UIKit category menu
When they navigate to Forms & Inputs
Then Date Picker should appear in the element list

### Requirement: Date Picker Translations

The UI kit translations SHALL provide localized strings for all 36 supported languages with keys including:
- `date_picker_heading` - Section heading
- `date_picker_basic_label` - Basic example label
- `date_picker_basic_placeholder` - Placeholder text
- `date_picker_dob_label` - Date of birth label
- `date_picker_dob_field_label` - Field label for DOB
- `date_picker_input_label` - Input variant label
- `date_picker_input_field_label` - Field label for input variant
- `date_picker_input_placeholder` - Placeholder for input
- `date_picker_datetime_label` - Date and time label
- `date_picker_date_label` - Date field label
- `date_picker_time_label` - Time field label
- `date_picker_select_date` - Select date placeholder

#### Scenario: Translation keys exist

Given any of the 36 supported language files
When checking for date_picker_* keys
Then all required keys should be present

#### Scenario: Translated Date Picker labels

Given a user viewing the date picker demo in a non-English language
When the component renders
Then all labels and placeholders should appear in the selected language
