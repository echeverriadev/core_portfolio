import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from '../../permissions/schemas/permission.schema';

@Schema()
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true})
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[];
  
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true})
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
