import { Coupon } from '../src/Coupon';
import { Order } from '../src/Order';
import { Product } from '../src/Product';

describe('Order', () => {
  it('Should create an empty order with a valid CPF', () => {
    // Arrange
    const validCpf = '987.654.321-00';

    // Act
    const order = new Order(validCpf);

    // Assert
    expect(order.getTotal()).toBe(0);
  });

  it('Should not create an order with invalid CPF', () => {
    // Arrange
    const invalidCpf = '111.111.111-00';

    // Act & Assert
    expect(() => new Order(invalidCpf)).toThrow('Invalid CPF');
  });

  it('Should create an order with three items', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(2, 'B', 5000, 50, 50, 50, 22);
    const product3 = new Product(3, 'C', 30, 10, 10, 10, 1);
    const order = new Order(validCpf);

    // Act
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product3, 3);

    // Assert
    expect(order.getTotal()).toBe(6090);
  });

  it('Should not create an order with negative item quantity', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const order = new Order(validCpf);

    // Act & Assert
    expect(() => order.addItem(product1, -1)).toThrow('Invalid product quantity');
  });

  it('Should not create an order with duplicated item', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const order = new Order(validCpf);
    order.addItem(product1, 1)
    // Act & Assert
    expect(() => order.addItem(product2, 1)).toThrow('Invalid cart');
  });

  it('Should create an order with three items', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(2, 'B', 5000, 50, 50, 50, 22);
    const product3 = new Product(3, 'C', 30, 10, 10, 10, 1);
    const order = new Order(validCpf);

    // Act
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product3, 3);

    // Assert
    expect(order.getTotal()).toBe(6090);
  });
});
