import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] })
  roles: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);