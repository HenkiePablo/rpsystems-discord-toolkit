const DEFAULT_HIGH_RISK = new Set([
  'Administrator',
  'ManageGuild',
  'ManageRoles',
  'ManageChannels',
  'BanMembers',
  'KickMembers',
  'ManageWebhooks',
]);

export function auditPermissions(permissions = [], options = {}) {
  const highRisk = new Set(options.highRisk ?? DEFAULT_HIGH_RISK);
  const normalized = [...new Set(permissions.map(String))];
  const flagged = normalized.filter((permission) => highRisk.has(permission));

  return {
    ok: flagged.length === 0,
    permissions: normalized,
    flagged,
    riskLevel: flagged.includes('Administrator')
      ? 'critical'
      : flagged.length > 0
        ? 'elevated'
        : 'normal',
  };
}
