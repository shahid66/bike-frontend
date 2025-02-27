export type TProduct = {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  description: string;
  offered?: string;
  quantity: number;
  price: number;
  bestSell?: boolean;
  inStock: boolean;
  images: string[];
};
