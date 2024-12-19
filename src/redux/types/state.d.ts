import { IUser, IProduct, ICategories, IMainCategories } from "@/types/app";

interface IAuthState {
  isLogin: boolean;
  token: string;
  user: IUser;
}

interface ProductsState {
  products: IProduct[];
  categories: ICategories[];
  searchTerm: string;
  categoriesId: string;
  mainCategoriesId: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  loading: boolean;
  error: string | null;
}
