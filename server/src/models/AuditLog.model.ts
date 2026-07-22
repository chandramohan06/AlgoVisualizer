import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAuditLogDocument extends Document {
  adminId: Types.ObjectId;
  action: string;
  targetId?: string;
  targetType?: string;
  details?: string;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true },
    targetId: { type: String },
    targetType: { type: String },
    details: { type: String, default: '' },
    ipAddress: { type: String, default: '127.0.0.1' },
  },
  { timestamps: true },
);

AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLogDocument>('AuditLog', AuditLogSchema);
