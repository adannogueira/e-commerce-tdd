export class Coordinates {
	public static create({ latitude, longitude }: Props): Coordinates {
		return new Coordinates(latitude, longitude);
	}

	private constructor (readonly latitude: number, readonly longitude: number) { }
}

type Props = { latitude: number, longitude: number };
