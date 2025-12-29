## ADDED Requirements
### Requirement: Base Path Configuration

The system SHALL support a `base` path configuration to allow hosting applications in subdirectories. This configuration MUST be available globally via `HAI3Config` and locally via `navigation` plugin parameters.

#### Scenario: Configure via global app config
- **GIVEN** an app initialized with `base: '/console/'` in `HAI3Config`
- **WHEN** the application starts
- **THEN** the navigation system SHALL use `/console` as the base path for all URL operations (removing trailing slash)

#### Scenario: Configure via plugin parameters
- **GIVEN** an app initialized with `base: '/console/'` in global config
- **AND** the navigation plugin is initialized with `navigation({ base: '/admin/' })`
- **WHEN** the application starts
- **THEN** the navigation system SHALL use `/admin` (plugin config overrides global)

#### Scenario: Empty string base path
- **GIVEN** a base path is configured as empty string `''`
- **WHEN** the navigation system initializes
- **THEN** it SHALL normalize the base path to `/` (root)

#### Scenario: Base path normalization
- **GIVEN** a base path is configured as `/console/` (with trailing slash)
- **WHEN** the navigation system initializes
- **THEN** it SHALL normalize the base path to `/console` (removing trailing slash)

#### Scenario: Base path missing leading slash
- **GIVEN** a base path is configured as `console` (without leading slash)
- **WHEN** the navigation system initializes
- **THEN** it SHALL normalize the base path to `/console` (adding leading slash)

#### Scenario: Root base path preservation
- **GIVEN** a base path is configured as `/`
- **WHEN** the navigation system initializes
- **THEN** it SHALL remain `/` (do not remove slash if it is root)

#### Scenario: Reading URLs with base path
- **GIVEN** the base path is configured as `/console`
- **AND** the browser URL is `/console/dashboard`
- **WHEN** the navigation system processes the initial URL
- **THEN** it SHALL correctly identify the screen ID as `dashboard`

#### Scenario: Reading root URL with base path
- **GIVEN** the base path is configured as `/console`
- **AND** the browser URL is `/console` (exact match)
- **WHEN** the navigation system processes the initial URL
- **THEN** it SHALL identify the path as `/` (root)

#### Scenario: Writing URLs with base path
- **GIVEN** the base path is configured as `/console`
- **WHEN** the app navigates to screen `settings`
- **THEN** the system SHALL update the browser URL to `/console/settings`

#### Scenario: URL doesn't match base path
- **GIVEN** the base path is configured as `/console`
- **AND** the browser URL is `/admin/dashboard`
- **WHEN** the navigation system processes the URL via stripBase
- **THEN** stripBase SHALL return `null` (no match)
- **AND** the navigation system SHALL handle as "no initial route found"
