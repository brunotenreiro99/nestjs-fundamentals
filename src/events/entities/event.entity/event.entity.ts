import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
/**
 * Indexes allow faster search
 * We need to use the index decorator in the column
 * For more advanced search and combinations, we can use at the class level the index decorator with an array
 */

@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
