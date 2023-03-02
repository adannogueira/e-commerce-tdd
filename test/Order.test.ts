import { Order } from '../src/Order';

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
  })
});
