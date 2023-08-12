import { Connection } from '../database/Connection';
import { CoordinateData } from '../../domain/data/CoordinateData';
import { Coordinates } from '../../domain/entities/Coordinates';

export class Database implements CoordinateData {
  public constructor(private readonly connection: Connection) {}

  public async getCoordinate(cep: string): Promise<Coordinates> {
    const [result] = await this.connection.query(`select * from 'cep' where code = '${cep.replace(/\D/g, '')}'`)
    if (!result) throw new Error(`CEP ${cep} not found`);
    return Coordinates.create({ latitude: result.lat, longitude: result.lng });
  }
}
