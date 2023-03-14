import { CoordinateData } from '../domain/data/CoordinateData';
import { ProductData } from '../domain/data/ProductData';
import { DistanceCalculator } from '../domain/entities/DistanceCalculator';
import { FreightCalculator } from '../domain/entities/FreightCalculator';

export class SimulateFreight {
  constructor(
    private readonly productData: ProductData,
    private readonly coordinateData: CoordinateData
    ) {}

  async execute(
    items: { idProduct: number, quantity: number }[],
    from: string,
    to: string
  ): Promise<number> {
    let freight = 0;
    const fromCoordinate = await this.coordinateData.getCoordinate(from);
    const toCoordinate = await this.coordinateData.getCoordinate(to);
    const distance = DistanceCalculator.calculate(fromCoordinate, toCoordinate);
    for (const item of items) {
      const product = await this.productData.getProduct(item.idProduct);
      if (!product) throw new Error('Product not found')
      freight += FreightCalculator.calculate(product, distance) * item.quantity;
    }
    return freight;
  }
}