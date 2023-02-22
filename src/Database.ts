import { Database } from 'sqlite3'
import fs from 'fs'
import { ProductData } from './ProductData';
import { CouponData } from './CouponData';

const db = new Database(':memory:');

fs.readFileSync(__dirname + '/create.sql').toString().split(';').map(sql => {
  db.exec(sql)
})

export class MyDatabase implements ProductData, CouponData {
  public async getProduct(idProduct: number): Promise<any> {
    try {
      const [result] = await this.dbAll(`select * from product where id_product = ${idProduct}`);
      return result;
    } catch (error) {
      return null;
    }
  }

  public async getCoupon(coupon: string): Promise<any> {
    try {
      const [result] = await this.dbAll(`select * from coupon where code = '${coupon}'`);
      return result;
    } catch (error) {
      return null;
    }
  }

  private async dbAll(query: string): Promise<Record<string, any>[]> { 
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
}
