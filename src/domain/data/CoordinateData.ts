import { Coordinates } from '../entities/Coordinates';

export interface CoordinateData {
  getCoordinate(cep: string): Promise<Coordinates>
}