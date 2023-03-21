
import { Coordinates } from './Coordinates';

const MILES_TO_KM = 1.609344;
export class DistanceCalculator {
	static calculate (from: Coordinates, to: Coordinates) {
		if (from.latitude == to.latitude && from.longitude == to.longitude) return 0;
		const radlat1 = (Math.PI * from.latitude) / 180;
		const radlat2 = (Math.PI * to.latitude) / 180;
		const theta = from.longitude - to.longitude;
		const radtheta = (Math.PI * theta) / 180;
		let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (distance > 1) distance = 1;
		distance = Math.acos(distance);
		distance = (distance * 180) / Math.PI;
		distance = distance * 60 * 1.1515;
		distance = distance * MILES_TO_KM;
		return distance;
	}
}