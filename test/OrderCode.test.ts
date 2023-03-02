import { OrderCode } from '../src/OrderCode';

describe('OrderCode', () => {
  it('Should create a code for an order', () => {
    // Arrange
    const orderDate = new Date('2023/01/01');
    const sequence = 1;

    // Act
    const orderCode = new OrderCode(({ orderDate, sequence }));

    // Assert
    expect(orderCode.getCode()).toBe('202300000001');
  });
});
