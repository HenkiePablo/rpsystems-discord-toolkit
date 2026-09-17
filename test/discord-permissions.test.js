import test from 'node:test';
import assert from 'node:assert/strict';

import {
  auditPermissions,
  normalizeDiscordPermissions,
} from '../src/index.js';

test('normalizes arrays and removes duplicates', () => {
  const result = normalizeDiscordPermissions([
    'ViewChannel',
    'SendMessages',
    'ViewChannel',
  ]);

  assert.deepEqual(result, ['ViewChannel', 'SendMessages']);
});

test('normalizes Discord.js-style PermissionsBitField objects', () => {
  const permissions = {
    toArray: () => ['ViewChannel', 'Administrator'],
  };

  assert.deepEqual(
    normalizeDiscordPermissions(permissions),
    ['ViewChannel', 'Administrator'],
  );
});

test('normalizes serialized permission objects', () => {
  const permissions = {
    serialize: () => ({
      ViewChannel: true,
      SendMessages: true,
      Administrator: false,
    }),
  };

  assert.deepEqual(
    normalizeDiscordPermissions(permissions),
    ['ViewChannel', 'SendMessages'],
  );
});

test('accepts Discord.js-style member permission wrappers', () => {
  const member = {
    permissions: {
      toArray: () => ['ViewChannel', 'ManageRoles'],
    },
  };

  const normalized = normalizeDiscordPermissions(member);
  const report = auditPermissions(normalized);

  assert.deepEqual(normalized, ['ViewChannel', 'ManageRoles']);
  assert.equal(report.riskLevel, 'elevated');
  assert.deepEqual(report.flagged, ['ManageRoles']);
});
