export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  base_price: number; // Asegúrate de que esta propiedad está definida
  image: string;
}