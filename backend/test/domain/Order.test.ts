import { Order } from '../../checkout/src/domain/entities/Order';
import { Product } from '../../checkout/src/domain/entities/Product';

const SEQUENCE = 1;

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
    expect(() => new Order(invalidCpf, SEQUENCE)).toThrow('Invalid CPF');
  });

  it('Should create an order with three items', () => {
    // Arrange
    const product1 = new Product({ 
      idProduct: 1,
      description: 'A',
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3
    });
    const product2 = new Product({ 
      idProduct: 2,
      description: 'B',
      price: 5000,
      width: 50,
      height: 50,
      length: 50, 
      weight:22
    });
    const product3 = new Product({ 
      idProduct: 3,
      description: 'C',
      price: 30,
      width: 10,
      height: 10,
      length: 10,
      weight: 1
    });
    const order = makeSut();

    // Act
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product3, 3);
    order.addFreight(260)

    // Assert
    expect(order.getTotal()).toBe(6350);
  });

  it('Should not create an order with negative item quantity', () => {
    // Arrange
    const product1 = new Product({ 
      idProduct: 1,
      description: 'A',
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3
    });
    const order = makeSut();

    // Act & Assert
    expect(() => order.addItem(product1, -1)).toThrow('Invalid product quantity');
  });

  it('Should not create an order with duplicated item', () => {
    // Arrange
    const product1 = new Product({ 
      idProduct: 1,
      description: 'A',
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3
    });
    const product2 = new Product({ 
      idProduct: 1,
      description: 'A',
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3
    });
    const order = makeSut();
    order.addItem(product1, 1)
    
    // Act & Assert
    expect(() => order.addItem(product2, 1)).toThrow('Invalid cart');
  });

  it('Should create an order with order code', () => {
    // Arrange
    const validCpf = '987.654.321-00';
    const sequence = 1;
    const product1 = new Product({ 
      idProduct: 1,
      description: 'A',
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3
    });
    
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