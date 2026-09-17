import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateConfig,
  auditPermissions,
  runHealthCheck,
  createLogger,
} from '../src/index.js';

test('validateConfig reports missing values and redacts secrets', () => {
  const result = validateConfig(
    { DISCORD_TOKEN: 'super-secret', CLIENT_ID: '' },
    { required: ['DISCORD_TOKEN', 'CLIENT_ID'] },
  );

  assert.equal(result.ok, false);
  assert.equal(result.values.DISCORD_TOKEN, '[REDACTED]');
  assert.equal(result.errors[0].key, 'CLIENT_ID');
});

test('auditPermissions flags Administrator as critical', () => {
  const result = auditPermissions(['ViewChannel', 'Administrator']);
  assert.equal(result.ok, false);
  assert.equal(result.riskLevel, 'critical');
  assert.deepEqual(result.flagged, ['Administrator']);
});

test('runHealthCheck distinguishes optional failures', () => {
  const result = runHealthCheck({
    discord: true,
    metrics: { ok: false, required: false, detail: 'offline' },
  });

  assert.equal(result.status, 'degraded');
  assert.equal(result.summary.failed, 1);
});

test('createLogger emits structured JSON', () => {
  const lines = [];
  const logger = createLogger({ service: 'test' }, { output: (line) => lines.push(line) });
  const record = logger.info('ready', { shard: 0 });

  assert.equal(record.service, 'test');
  assert.equal(record.shard, 0);
  assert.equal(JSON.parse(lines[0]).message, 'ready');
});
