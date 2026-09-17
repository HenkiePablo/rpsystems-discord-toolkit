# Changelog

All notable changes to this project will be documented here.

The format is inspired by Keep a Changelog and this project follows semantic versioning where practical.

## [Unreleased]

### Planned

- Permission snapshot and diff helpers
- FiveM resource health adapters
- Redacted diagnostics bundle

## [0.1.1] - 2026-09-17

### Changed

- `auditPermissions` now accepts Discord.js-style permission objects directly
- README examples now document direct Discord.js permission auditing

### Added

- Regression coverage for wrapper and serialized permission inputs

## [0.1.0] - 2026-09-17

### Added

- Configuration validation with secret redaction
- Discord permission auditing
- Discord.js permission normalization helpers
- Runtime health-check normalization
- Structured JSON logging
- Automated tests for the core utilities
- CI workflow for Node.js 20 and 22
- Security and contribution documentation
