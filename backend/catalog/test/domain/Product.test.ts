import { Product } from '../../src/domain/entities/Product';

describe('Product', () => {
  it(`should not build a product with invalid dimensions`, () => {
    // Arrange
    const productData = {
      idProduct: 1,
      description: 'Camera',
      price: 1000,
      width: -20,
      height: 15,
      length: 10,
      weight: 1,
      currency: 'BRL'
    };

    // Act & Assert
    expect(() => new Product(productData)).toThrow('Invalid product dimension');
  });

  it(`should not build a product with invalid weight`, () => {
    // Arrange
    const productData = {
      idProduct: 1,
      description: 'Camera',
      price: 1000,
      width: 20,
      height: 15,
      length: 10,
      weight: -1,
      currency: 'BRL'
    };

    // Act & Assert
    expect(() => new Product(productData)).toThrow('Invalid product weight');
  });
})