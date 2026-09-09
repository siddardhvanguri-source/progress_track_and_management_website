import { Role } from './types';

export interface Permissions {
  canViewAllEmployees: boolean;
  canEditEmployeeData: boolean;
  canViewSensitiveLeaveReasons: boolean;
  canApproveLeave: boolean;
  canExcuseMissedMeetings: boolean;
  canManageBlockers: boolean;
  canCreateProjects: boolean;
  canEditTasks: boolean;
  canViewReports: boolean;
  canExportData: boolean;
  canManageOrgSettings: boolean;
  canViewAuditLogs: boolean;
  canViewManagerNotes: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permissions> = {
  DIRECTOR: {
    canViewAllEmployees: true,
    canEditEmployeeData: true,
    canViewSensitiveLeaveReasons: true,
    canApproveLeave: true,
    canExcuseMissedMeetings: true,
    canManageBlockers: true,
    canCreateProjects: true,
    canEditTasks: true,
    canViewReports: true,
    canExportData: true,
    canManageOrgSettings: true,
    canViewAuditLogs: true,
    canViewManagerNotes: true,
  },
  ADMIN: {
    canViewAllEmployees: true,
    canEditEmployeeData: true,
    canViewSensitiveLeaveReasons: true,
    canApproveLeave: true,
    canExcuseMissedMeetings: true,
    canManageBlockers: true,
    canCreateProjects: true,
    canEditTasks: true,
    canViewReports: true,
    canExportData: true,
    canManageOrgSettings: true,
    canViewAuditLogs: true,
    canViewManagerNotes: true,
  },
  HR: {
    canViewAllEmployees: true,
    canEditEmployeeData: true,
    canViewSensitiveLeaveReasons: true,
    canApproveLeave: true,
    canExcuseMissedMeetings: true,
    canManageBlockers: true,
    canCreateProjects: false,
    canEditTasks: true,
    canViewReports: true,
    canExportData: true,
    canManageOrgSettings: false,
    canViewAuditLogs: true,
    canViewManagerNotes: true,
  },
  MANAGER: {
    canViewAllEmployees: true,
    canEditEmployeeData: false,
    canViewSensitiveLeaveReasons: false, // Privacy guard: HR only for medical
    canApproveLeave: true,
    canExcuseMissedMeetings: true,
    canManageBlockers: true,
    canCreateProjects: true,
    canEditTasks: true,
    canViewReports: true,
    canExportData: true,
    canManageOrgSettings: false,
    canViewAuditLogs: true,
    canViewManagerNotes: true,
  },
  EMPLOYEE: {
    canViewAllEmployees: true,
    canEditEmployeeData: false,
    canViewSensitiveLeaveReasons: false,
    canApproveLeave: false,
    canExcuseMissedMeetings: false,
    canManageBlockers: false,
    canCreateProjects: false,
    canEditTasks: false, // Only own assigned tasks
    canViewReports: false,
    canExportData: false,
    canManageOrgSettings: false,
    canViewAuditLogs: false,
    canViewManagerNotes: false,
  },
};

export function hasPermission(role: Role, permissionKey: keyof Permissions): boolean {
  return ROLE_PERMISSIONS[role]?.[permissionKey] ?? false;
}
