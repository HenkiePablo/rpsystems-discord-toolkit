import test from 'node:test';
import assert from 'node:assert/strict';

import {
  auditPermissions,
  normalizeDiscordPermissions,
} from '../src/index.js';

test('normalizes arrays and removes duplicates', () => {
  const result = normalizeDiscordPermissions(['ViewChannel', 'SendMessages', 'ViewChannel']);
  assert.deepEqual(result, ['ViewChannel', 'SendMessages']);
});

test('normalizes Discord.js-style PermissionsBitField objects', () => {
  const permissions = { toArray: () => ['ViewChannel', 'Administrator'] };
  assert.deepEqual(normalizeDiscordPermissions(permissions), ['ViewChannel', 'Administrator']);
});

test('normalizes serialized permission objects', () => {
  const permissions = {
    serialize: () => ({ ViewChannel: true, SendMessages: true, Administrator: false }),
  };
  assert.deepEqual(normalizeDiscordPermissions(permissions), ['ViewChannel', 'SendMessages']);
});

test('auditPermissions accepts Discord.js-style member wrappers directly', () => {
  const member = {
    permissions: { toArray: () => ['ViewChannel', 'ManageRoles'] },
  };
  const report = auditPermissions(member);
  assert.deepEqual(report.permissions, ['ViewChannel', 'ManageRoles']);
  assert.equal(report.riskLevel, 'elevated');
  assert.deepEqual(report.flagged, ['ManageRoles']);
});

test('auditPermissions accepts serialized permission objects directly', () => {
  const permissions = {
    serialize: () => ({ ViewChannel: true, Administrator: true, ManageGuild: false }),
  };
  const report = auditPermissions(permissions);
  assert.equal(report.ok, false);
  assert.equal(report.riskLevel, 'critical');
  assert.deepEqual(report.flagged, ['Administrator']);
});
