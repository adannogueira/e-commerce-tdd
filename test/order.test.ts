import { Order } from '../src/order';

describe('Order', () => {
  it('Should not create an order with invalid CPF', () => {
    expect(() => new Order('abc.123.456-78')).toThrow('Invalid CPF');
  });

  it('Should not add a product with invalid quantity', () => {
    const order = new Order('000.000.001-91')
    const product = { description: 'bottle', price: 1.15, quantity: 0 }
    expect(() => order.addProduct(product)).toThrow('Invalid Quantity')
  })

  it('Should not add a product with invalid price', () => {
    const order = new Order('000.000.001-91')
    const product = { description: 'bottle', price: 0, quantity: 1 }
    expect(() => order.addProduct(product)).toThrow('Invalid Price')
  })

  it('Should create an order with 3 items, including description, price and quantity', () => {
    const order = new Order('000.000.001-91')
    order.addProduct({ description: 'bottle', price: 1.15, quantity: 1 })
    order.addProduct({ description: 'glass', price: 1.50, quantity: 4 })
    order.addProduct({ description: 'bag', price: 0.15, quantity: 1 })
    expect(order.currentItemCount()).toBe(3)
    expect(order.getTotalValue()).toBe(7.30)
  })

  it('Should sum total order gross value correctly', () => {
    const order = new Order('000.000.001-91')
    order.addProduct({ description: 'bottle', price: 1.15, quantity: 1 })
    order.addProduct({ description: 'glass', price: 1.50, quantity: 4 })
    order.addProduct({ description: 'bag', price: 0.15, quantity: 1 })
    expect(order.getTotalValue()).toBe(7.30)
  })

  it('Should create an order with discount coupon (percentage on order total)', () => {
    const order = new Order('000.000.001-91')
    order.addProduct({ description: 'bottle', price: 1.15, quantity: 1 })
    order.addProduct({ description: 'glass', price: 1.50, quantity: 4 })
    order.addProduct({ description: 'bag', price: 0.15, quantity: 1 })
    order.addDiscountPercent(10)
    expect(order.getTotalValue()).toBe(6.57)
  })
});
