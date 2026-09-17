# RPSystems Discord Toolkit

Open-source utilities for building, validating and maintaining reliable Discord bots and FiveM community integrations.

> This repository contains generic open-source tooling. Commercial RPSystems bot logic, customer data, credentials and private integrations are intentionally not included.

## Why this project exists

Discord and FiveM community bots often repeat the same reliability work: validating configuration, checking dangerous permissions, verifying runtime health and producing useful diagnostics. RPSystems Discord Toolkit packages those building blocks into small, dependency-free utilities that can be reused across projects.

## Features

- Environment/config validation with actionable errors
- Discord permission auditing for high-risk permissions
- Runtime health checks with normalized status
- Structured JSON logging with contextual fields
- Dependency-free core for Node.js 20+
- Automated tests with Node's built-in test runner

## Install

Until an npm package is published, install directly from GitHub:

```bash
npm install github:HenkiePablo/rpsystems-discord-toolkit
```

## Quick start

```js
import {
  validateConfig,
  auditPermissions,
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

### `auditPermissions(permissions, options)`
Flags permissions that deserve explicit review, including `Administrator`, `ManageGuild`, `ManageRoles`, `ManageChannels`, `BanMembers`, `KickMembers` and `ManageWebhooks`.

### `runHealthCheck(checks)`
Returns a normalized health report with `healthy`, `degraded` or `unhealthy` status.

### `createLogger(context, options)`
Creates a small structured logger that writes JSON records and supports contextual fields.

## Security

Never commit Discord tokens, API keys, customer data or production configuration. See [SECURITY.md](SECURITY.md) for reporting instructions.

## Contributing

Contributions, bug reports and feature proposals are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- Discord.js adapter helpers
- Permission snapshots and diffing
- FiveM resource health adapters
- Redacted diagnostics bundle
- Config schema presets

## License

MIT © RPSystems / HenkiePablo
