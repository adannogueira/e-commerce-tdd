import { Coupon } from '../src/domain/entities/Coupon';
import { Order } from '../src/domain/entities/Order';
import { Product } from '../src/domain/entities/Product';

const sequence = 1;

describe('Order', () => {
  it('Should create an empty order with a valid CPF', () => {
    // Act
    const order = makeSut();

    // Assert
    expect(order.getTotal()).toBe(0);
  });

  it('Should not create an order with invalid CPF', () => {
    // Arrange
    const invalidCpf = '111.111.111-00';

    // Act & Assert
    expect(() => new Order(invalidCpf, sequence)).toThrow('Invalid CPF');
  });

  it('Should create an order with three items', () => {
    // Arrange
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(2, 'B', 5000, 50, 50, 50, 22);
    const product3 = new Product(3, 'C', 30, 10, 10, 10, 1);
    const order = makeSut();

    // Act
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product3, 3);

    // Assert
    expect(order.getTotal()).toBe(6350);
  });

  it('Should not create an order with negative item quantity', () => {
    // Arrange
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const order = makeSut();

    // Act & Assert
    expect(() => order.addItem(product1, -1)).toThrow('Invalid product quantity');
  });

  it('Should not create an order with duplicated item', () => {
    // Arrange
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const order = makeSut();
    order.addItem(product1, 1)
    
    // Act & Assert
    expect(() => order.addItem(product2, 1)).toThrow('Invalid cart');
  });

  it('Should create an order with three items', () => {
    // Arrange
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const product2 = new Product(2, 'B', 5000, 50, 50, 50, 22);
    const product3 = new Product(3, 'C', 30, 10, 10, 10, 1);
    const order = makeSut();

    // Act
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product3, 3);

    // Assert
    expect(order.getTotal()).toBe(6350);
  });

  it('Should create an order with order code', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const sequence = 1;
    const product1 = new Product(1, 'A', 1000, 100, 30, 10, 3);
    
    const order = new Order(validCpf, sequence);

    // Act
    order.addItem(product1, 1);

    // Assert
    expect(order.getCode()).toBe('202300000001');
  });
});

const makeSut = () => {
  const validCpf = '987.654.321-00';
  const sequence = 1;
  const order = new Order(validCpf, sequence);
  return order;
}