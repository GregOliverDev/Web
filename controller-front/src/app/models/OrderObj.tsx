import OrderProd from "./OrderProd";

interface OrderObj {
  _id: string;
  numberOrder: number;
  registrationClient: string;
  strClientVend: string;
  priceVend: number;
  priceDesc: number;
  products: OrderProd[];
}

export default OrderObj;
