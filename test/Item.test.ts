import { Item } from '../src/Item';

describe('Item', () => {
  it('Should get items total value', () => {
    // Arrange
    const idProduct = 1;
    const price = 100;
    const quantity = 2;

    // Act
    const item = new Item(idProduct, price, quantity);

    // Assert
    expect(item.getTotal()).toEqual(price * quantity);
  });
});
