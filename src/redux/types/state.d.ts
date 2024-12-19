import { IProduct, ICategories, IMainCategories } from "@/types/app";

interface IUser {
  id: string;
  name: string;
  email: string;
  gender: string;
  products: IProduct[] | [];
  profile: IProfile | null
}

interface IProduct {
  id: string;
  userId: string;
  name_product: string;
  img_product: string;
  price: number;
  rating: number;
  description: string;
  sku: string;
  diskon?: number;
}

interface IProfile {
  id: string;
  avatar: string;
  banner: string
  bio: string
  userId: string
}