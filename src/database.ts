import { Database } from 'sqlite3'
import fs from 'fs'

const db = new Database(':memory:');

fs.readFileSync(__dirname + '/create.sql').toString().split(';').map(sql => {
  db.exec(sql)
})

export async function dbAll(query: string): Promise<Record<string, any>[]> { 
  return new Promise(function(resolve,reject){
      db.all(query, function(err,rows){
         if(err) {
          console.error(err);
          return reject(err);
        }
         resolve(rows);
       });
  });
}