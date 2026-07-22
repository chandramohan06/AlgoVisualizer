import { AuditLog } from '../models/AuditLog.model';

export const logAdminAction = async (
  adminId: string,
  action: string,
  targetId?: string,
  targetType?: string,
  details?: string,
  ipAddress?: string,
) => {
  return await AuditLog.create({
    adminId,
    action,
    targetId,
    targetType,
    details,
    ipAddress,
  });
};

export const getAuditLogs = async (limit = 100) => {
  return await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('adminId', 'name email avatar');
};
