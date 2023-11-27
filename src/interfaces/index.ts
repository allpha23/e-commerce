export type ProductType = {
  id: string,
  title: string,
  thumbnail: string,
  price: number,
};

export type UserType = {
  name: string,
  email: string,
  address: string,
  postalCode: number | undefined,
  city: string,
  country: string,
};

export type CartProduct = {
  product: ProductType,
  amout: number,
};

export type OrderType = UserType & {
  orderTime: Date | undefined,
  products: CartProduct[]
};
