function write(level, context, message, fields, output) {
  const record = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
    ...(fields ?? {}),
  };

  output(JSON.stringify(record));
  return record;
}

export function createLogger(context = {}, options = {}) {
  const output = options.output ?? console.log;

  return {
    info(message, fields) {
      return write('info', context, message, fields, output);
    },
    warn(message, fields) {
      return write('warn', context, message, fields, output);
    },
    error(message, fields) {
      return write('error', context, message, fields, output);
    },
    child(extraContext = {}) {
      return createLogger({ ...context, ...extraContext }, options);
    },
  };
}
