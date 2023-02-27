export interface ProductData {
  getProduct(idProduct: number): Promise<Product | null>
}

export type Product = {
  id_product: number,
  description: string,
  price: number,
  largura: number,
  altura: number,
  profundidade: number,
  peso: number,
  currency: string
}