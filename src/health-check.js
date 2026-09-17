export function runHealthCheck(checks = {}) {
  const entries = Object.entries(checks).map(([name, value]) => {
    if (typeof value === 'object' && value !== null && 'ok' in value) {
      return { name, ok: Boolean(value.ok), detail: value.detail ?? null, required: value.required !== false };
    }

    return { name, ok: Boolean(value), detail: null, required: true };
  });

  const failedRequired = entries.filter((entry) => entry.required && !entry.ok);
  const failedOptional = entries.filter((entry) => !entry.required && !entry.ok);

  const status = failedRequired.length > 0
    ? 'unhealthy'
    : failedOptional.length > 0
      ? 'degraded'
      : 'healthy';

  return {
    ok: status === 'healthy',
    status,
    checks: entries,
    summary: {
      total: entries.length,
      passed: entries.filter((entry) => entry.ok).length,
      failed: entries.filter((entry) => !entry.ok).length,
    },
  };
}
