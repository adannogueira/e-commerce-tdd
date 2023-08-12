import { CoordinateData } from '../domain/data/CoordinateData';
import { DistanceCalculator } from '../domain/entities/DistanceCalculator';
import { FreightCalculator } from '../domain/entities/FreightCalculator';

export class CalculateFreight {
  constructor(
    private readonly coordinateData: CoordinateData
    ) {}

  async execute({ items, from, to }: Params): Promise<number> {
    let freight = 0;
    let distance = 0;
    if (from && to) {
      const fromCoordinate = await this.coordinateData.getCoordinate(from);
      const toCoordinate = await this.coordinateData.getCoordinate(to);
      if (!fromCoordinate || !toCoordinate) throw new Error('Coordinates not found')
      distance = DistanceCalculator.calculate(fromCoordinate, toCoordinate);
    }
    for (const item of items) {
      freight += FreightCalculator.calculate(item.volume, item.density, distance, item.quantity);
    }
    return freight;
  }
}

type Params = {
  items: { volume: number, density: number, quantity: number }[],
  from: string,
  to: string
}