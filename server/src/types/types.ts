import { RowDataPacket } from 'mysql2';

export interface QueryResult extends RowDataPacket{
  // [key: string]: any;
}