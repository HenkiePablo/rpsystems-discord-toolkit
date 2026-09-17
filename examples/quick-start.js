import {
  auditPermissions,
  runHealthCheck,
  createLogger,
} from '../src/index.js';

const permissions = {
  toArray: () => ['ViewChannel', 'SendMessages', 'ManageRoles'],
};

const permissionReport = auditPermissions(permissions);

const health = runHealthCheck({
  configuration: true,
  permissions: {
    ok: permissionReport.ok,
    required: false,
    detail: permissionReport.riskLevel,
  },
});

const logger = createLogger({ service: 'rpsystems-toolkit-example' });
logger.info('Toolkit example completed', {
  permissions: permissionReport.permissions,
  flagged: permissionReport.flagged,
  health: health.status,
});
