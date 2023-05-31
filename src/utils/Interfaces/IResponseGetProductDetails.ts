
export interface IResponseGetProductsDetails {
  author: Author;
  items:  Items;
  categories: string[];
}

export interface Author {
  name:     string;
  lastname: string;
}

export interface Items {
  id:            string;
  title:         string;
  price:         Price;
  picture:       string;
  condition:     string;
  free_shipping: boolean;
  sold_quantity: number;
  description:   string;
}

export interface Price {
  currency: string;
  amount:   number;
  decimals: number;
}
