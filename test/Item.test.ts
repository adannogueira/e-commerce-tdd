import { Item } from '../src/domain/entities/Item';

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

  it('Should not create an Item with invalid quantity', () => {
    // Arrange
    const idProduct = 1;
    const price = 100;
    const quantity = -2; 

    // Act & Assert
    expect(() => new Item(idProduct, price, quantity))
      .toThrow('Invalid product quantity');
  });
});
