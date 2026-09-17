# RPSystems Discord Toolkit

[![CI](https://github.com/HenkiePablo/rpsystems-discord-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/HenkiePablo/rpsystems-discord-toolkit/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/HenkiePablo/rpsystems-discord-toolkit)](https://github.com/HenkiePablo/rpsystems-discord-toolkit/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Open-source utilities for building, validating and maintaining reliable Discord bots and FiveM community integrations.

> This repository contains generic open-source tooling. Commercial RPSystems bot logic, customer data, credentials and private integrations are intentionally not included.

## Why this project exists

Discord and FiveM community bots often repeat the same reliability work: validating configuration, checking dangerous permissions, verifying runtime health and producing useful diagnostics. RPSystems Discord Toolkit packages those building blocks into small, dependency-free utilities that can be reused across projects.

## Features

- Environment/config validation with actionable errors
- Discord permission auditing for high-risk permissions
- Direct support for common Discord.js permission objects
- Runtime health checks with normalized status
- Structured JSON logging with contextual fields
- Dependency-free core for Node.js 20+
- Automated tests with Node's built-in test runner

## Install

Until an npm package is published, install directly from GitHub:

```bash
npm install github:HenkiePablo/rpsystems-discord-toolkit
```

## Try it without credentials

Clone the repository and run the credential-free example:

```bash
git clone https://github.com/HenkiePablo/rpsystems-discord-toolkit.git
cd rpsystems-discord-toolkit
node examples/quick-start.js
```

The example audits a Discord.js-style permission object, produces a normalized health result and emits a structured log record. It does not require a Discord token or any external service.

## Quick start

```js
import {
  validateConfig,
  auditPermissions,
  normalizeDiscordPermissions,
  runHealthCheck,
  createLogger,
} from '@rpsystems/discord-toolkit';

const config = validateConfig(
  {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  { required: ['DISCORD_TOKEN', 'CLIENT_ID'] },
);

const permissionReport = auditPermissions([
  'ViewChannel',
  'SendMessages',
  'Administrator',
]);

const memberReport = auditPermissions(member.permissions);
const names = normalizeDiscordPermissions(member.permissions);

const health = runHealthCheck({
  configValid: config.ok,
  discordReady: true,
  databaseReady: true,
});

const logger = createLogger({ service: 'my-discord-bot' });
logger.info('Bot health checked', { status: health.status });
```

## API

### `validateConfig(values, options)`
Checks required values and optional custom validators. Secret values are never echoed in validation errors.

### `normalizeDiscordPermissions(input)`
Normalizes strings, arrays, iterables, Discord.js-style `toArray()` / `serialize()` permission objects and wrapper objects with a `.permissions` field.

### `auditPermissions(permissions, options)`
Flags permissions that deserve explicit review. Accepts normal arrays/strings as well as the Discord.js-style permission inputs supported by `normalizeDiscordPermissions`.

### `runHealthCheck(checks)`
Returns a normalized health report with `healthy`, `degraded` or `unhealthy` status.

### `createLogger(context, options)`
Creates a small structured logger that writes JSON records and supports contextual fields.

## First adopters wanted

If you maintain a Discord or FiveM bot, you can help by trying the toolkit in a development environment and reporting what worked, what was unclear, and which reusable checks you would want next. Real-world feedback is more useful than artificial download or star counts.

Use the **Adopter feedback** issue template to share your experience. Please do not include tokens, private server data, customer information or proprietary code.

## Security

Never commit Discord tokens, API keys, customer data or production configuration. See [SECURITY.md](SECURITY.md) for reporting instructions.

## Contributing

Contributions, bug reports and feature proposals are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- Permission snapshots and diffing
- FiveM resource health adapters
- Redacted diagnostics bundle
- Config schema presets

## License

MIT © RPSystems / HenkiePablo
