import { Product } from '../src/domain/entities/Product';

describe('Product', () => {
  it(`should calculate it's own density`, () => {
    // Arrange
    const product = new Product(1, 'Camera', 1000, 20, 15, 10, 1, 'BRL');

    // Act
    const density = product.calculateDensity();

    // Assert
    expect(density).toEqual(333.33);
  })
})