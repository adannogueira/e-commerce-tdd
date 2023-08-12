export interface FreightGateway {
  calculateFreight(params: FreightParams): Promise<number>
}

export type FreightParams = {
  items: { volume: number, density: number, quantity: number }[],
  from: string,
  to: string
}