function uniqueStrings(values) {
  return [...new Set(values.map(String))];
}

export function normalizeDiscordPermissions(input) {
  if (input == null) return [];

  if (typeof input === 'string') {
    return [input];
  }

  if (Array.isArray(input)) {
    return uniqueStrings(input.flatMap((value) => normalizeDiscordPermissions(value)));
  }

  if (typeof input?.toArray === 'function') {
    return normalizeDiscordPermissions(input.toArray());
  }

  if (typeof input?.serialize === 'function') {
    return normalizeDiscordPermissions(input.serialize());
  }

  if (input?.permissions && input.permissions !== input) {
    return normalizeDiscordPermissions(input.permissions);
  }

  if (typeof input?.[Symbol.iterator] === 'function') {
    return uniqueStrings([...input].flatMap((value) => normalizeDiscordPermissions(value)));
  }

  if (typeof input === 'object') {
    return uniqueStrings(
      Object.entries(input)
        .filter(([, enabled]) => enabled === true)
        .map(([permission]) => permission),
    );
  }

  return [String(input)];
}
