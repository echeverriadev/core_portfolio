import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true})
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true})
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
