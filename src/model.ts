export interface Items {
    currency: string;
    description: string;
    id: string;
    imageUrl: string;
    name: string;
    price: any;
    shippingPrice: any;
    quantity?: number;
};

export interface ProductProps {
  cart?: Items[];
  setCart?: any;
  products: Items[];
  amount?: any; 
  productToRemove?: any; 
};

export interface details {
  name?: any;
  address?: any;
  pin?: any;
  cardNumber?: any; 
  cardCvv?: any; 
  expiry?: any;
  closePage ? : any;
};