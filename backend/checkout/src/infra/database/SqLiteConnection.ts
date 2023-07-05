import { Database } from 'sqlite3';
import { Connection } from './Connection';
import fs from 'fs'
import { resolve } from 'path'

export class SqLiteConnection implements Connection {
  private db: Database;

  public constructor() {
    this.db = new Database(':memory:');
    this.prepareDb();
  }

  async query(statement: string): Promise<any> {
    return new Promise((resolve,reject) => {
      this.db.all(statement, function(err,rows){
         if(err) {
          console.error(err);
          return reject(err);
        }
         resolve(rows);
       });
  });
  }
  async close(): Promise<void> {
    this.db.close();
  }

  private prepareDb(): void {
    fs.readFileSync(resolve(__dirname, '../../create.sql')).toString().split(';').map(sql => {
      this.db.exec(sql)
    })
  }
}