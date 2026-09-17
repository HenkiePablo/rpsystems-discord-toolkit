const DEFAULT_SECRET_KEYS = ['TOKEN', 'SECRET', 'PASSWORD', 'API_KEY', 'PRIVATE_KEY'];

function looksSecret(key, secretKeys = DEFAULT_SECRET_KEYS) {
  const upper = String(key).toUpperCase();
  return secretKeys.some((fragment) => upper.includes(fragment));
}

export function validateConfig(values = {}, options = {}) {
  const {
    required = [],
    validators = {},
    secretKeys = DEFAULT_SECRET_KEYS,
  } = options;

  const errors = [];

  for (const key of required) {
    const value = values[key];
    if (value === undefined || value === null || value === '') {
      errors.push({ key, code: 'missing', message: `${key} is required.` });
    }
  }

  for (const [key, validator] of Object.entries(validators)) {
    if (typeof validator !== 'function') continue;
    const value = values[key];
    if (value === undefined || value === null || value === '') continue;

    const result = validator(value, values);
    if (result === true || result === undefined) continue;

    const message = typeof result === 'string' ? result : `${key} is invalid.`;
    errors.push({ key, code: 'invalid', message });
  }

  const sanitized = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      looksSecret(key, secretKeys) && value ? '[REDACTED]' : value,
    ]),
  );

  return {
    ok: errors.length === 0,
    errors,
    values: sanitized,
  };
}
