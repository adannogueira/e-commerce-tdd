import { Database } from 'sqlite3'
import fs from 'fs'
import { Product, ProductData } from './ProductData';
import { CouponData } from './CouponData';
import { Order, OrderData } from './OrderData';

const db = new Database(':memory:');

fs.readFileSync(__dirname + '/create.sql').toString().split(';').map(sql => {
  db.exec(sql)
})

export class MyDatabase implements ProductData, CouponData, OrderData {
  public async getProduct(idProduct: number): Promise<Product | null> {
    try {
      const [{
        id_product,
        description,
        price,
        largura,
        altura,
        profundidade,
        peso,
        currency
      }] = await this.dbAll(`select * from product where id_product = ${idProduct}`);
      return {
        id_product,
        description,
        price: parseFloat(price),
        largura: parseInt(largura),
        altura: parseInt(altura),
        profundidade: parseInt(profundidade),
        peso: parseInt(peso),
        currency
      };
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

  public async addOrder({
    couponCode,
    couponPercentage,
    code,
    cpf,
    email,
    freight,
    total
  }: Order): Promise<any> {
    try {
      const [result] = await this.dbAll(`
        insert into 'order' (
          coupon_code,
          coupon_percentage,
          code,
          cpf,
          email,
          issue_date,
          freight,
          total
        ) values (
          '${couponCode}',
          '${couponPercentage}',
          '${code}',
          '${cpf}',
          '${email}',
          'now()',
          '${freight}',
          '${total}'
        )
      `);
      return result;
    } catch (error) {
      return null;
    }
  }

  public async getLastOrder(): Promise<number> {
    const result = await this.dbAll(`select id_order from 'order' order by oid desc limit 1`);
    return result?.[0]?.id || 0;
  }

  public async getOrder(cpf: string): Promise<any> {
    const [result] = await this.dbAll(`select * from 'order' where cpf = '${cpf}'`);
    return result;
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
