export interface Connection {
  query(statement: string): Promise<any>;
  close(): Promise<void>
}