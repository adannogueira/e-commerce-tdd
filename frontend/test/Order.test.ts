import { Order } from '../checkout/src/domain/Order'
import { Product } from '../checkout/src/domain/Product'

it('should create an empty order', () => {
  const order = new Order('123.456.789-10', '29560000')
  expect(order.getTotal()).toBe('R$ 0,00')
})

it('should create an order with 3 items', () => {
  const order = new Order('123.456.789-10', '29560000')
  order.addItem(new Product(1, 'A', 1000))
  order.addItem(new Product(2, 'B', 5000))
  order.addItem(new Product(3, 'C', 30))
  expect(order.getTotal()).toBe('R$ 6.030,00')
})
