export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Brand = {
  __typename?: 'Brand';
  _id: Scalars['ID']['output'];
  brandLogo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subLogo?: Maybe<Scalars['String']['output']>;
  totalProducts?: Maybe<Scalars['Int']['output']>;
};

export type BrandInput = {
  brandLogo: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type BrandResponse = {
  __typename?: 'BrandResponse';
  messages: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  categoryName: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  totalProducts?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Companies = {
  __typename?: 'Companies';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  information?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number: Scalars['Int']['output'];
  officialLogo: Scalars['String']['output'];
  officialName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  registerNumber: Scalars['String']['output'];
  timesheet?: Maybe<Scalars['String']['output']>;
  totalProducts: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CompanyInput = {
  email: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  officialLogo: Scalars['String']['input'];
  officialName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  registerNumber: Scalars['String']['input'];
};

export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  message: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Response;
  createBrand: BrandResponse;
  createCategory: Category;
  createCompany: CompanyResponse;
  createOrder: OrderResponse;
  createProduct: ProductResponse;
  createStore: StoreResponse;
  getUploadSignature: Signature;
  login: AuthResponse;
  recoverPassword: Response;
  signUp: User;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateBrandArgs = {
  input: BrandInput;
};


export type MutationCreateCategoryArgs = {
  categoryName: Scalars['String']['input'];
};


export type MutationCreateCompanyArgs = {
  input: CompanyInput;
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateStoreArgs = {
  input: StoreInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRecoverPasswordArgs = {
  input: RecoverPasswordInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type OptionTypeInput = {
  color?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  size?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OptionTypes = {
  __typename?: 'OptionTypes';
  color?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  size?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID']['output'];
  availableHours?: Maybe<Scalars['Float']['output']>;
  cancelReason?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyRegister?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  declinedAt?: Maybe<Scalars['Date']['output']>;
  discount: Scalars['Float']['output'];
  isCompany?: Maybe<Scalars['Boolean']['output']>;
  leftQuantity: Scalars['Int']['output'];
  phoneNumber: Scalars['String']['output'];
  pickUpLocation: Scalars['String']['output'];
  pickedStaff?: Maybe<Scalars['Float']['output']>;
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  shipmentTotal?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
  userAddress: Scalars['String']['output'];
  waitUntil?: Maybe<Scalars['Date']['output']>;
};

export type OrderInput = {
  availableHours?: InputMaybe<Scalars['Float']['input']>;
  discount: Scalars['Float']['input'];
  leftQuantity: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
  pickUpLocation: Scalars['String']['input'];
  pickedStaff?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
  userAddress: Scalars['String']['input'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  message: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  brand: Array<Scalars['ID']['output']>;
  category: Array<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  detail?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  optionTypes?: Maybe<OptionTypes>;
  productProperties?: Maybe<Properties>;
  quantity: Scalars['Int']['output'];
  soldQuantity?: Maybe<Scalars['Int']['output']>;
  store?: Maybe<Array<Scalars['ID']['output']>>;
  totalQuantity: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ProductInput = {
  brand?: InputMaybe<Array<Scalars['ID']['input']>>;
  category: Array<Scalars['ID']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  optionTypes?: InputMaybe<OptionTypeInput>;
  productProperties?: InputMaybe<PropertyInput>;
  quantity: Scalars['Int']['input'];
  store?: InputMaybe<Array<Scalars['ID']['input']>>;
  totalQuantity: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  message: Scalars['String']['output'];
};

export type Properties = {
  __typename?: 'Properties';
  _id: Scalars['ID']['output'];
  position: Scalars['String']['output'];
  properties: SubProperties;
  value: Scalars['String']['output'];
};

export type PropertyInput = {
  position: Scalars['String']['input'];
  properties: SubPropertyInput;
  value: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Maybe<Category>>;
  getCategory: Array<Category>;
  getOrder: Array<Order>;
  getProduct: Array<Product>;
  getProductById: Product;
  getShop: Array<Companies>;
  getShopById: Companies;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryGetCategoryArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetProductByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetShopByIdArgs = {
  _id: Scalars['ID']['input'];
};

export type RecoverPasswordInput = {
  password: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Signature = {
  __typename?: 'Signature';
  _id: Scalars['ID']['output'];
  apiKey: Scalars['String']['output'];
  cloudName: Scalars['String']['output'];
  folder: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type StoreInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  short_name?: InputMaybe<Scalars['String']['input']>;
  storeLocation?: InputMaybe<Scalars['String']['input']>;
  timesheets?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StoreResponse = {
  __typename?: 'StoreResponse';
  message: Scalars['String']['output'];
};

export type Stores = {
  __typename?: 'Stores';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  short_name?: Maybe<Scalars['String']['output']>;
  storeLocation?: Maybe<Scalars['String']['output']>;
  timesheets?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  totalProducts: Scalars['Int']['output'];
};

export type SubProperties = {
  __typename?: 'SubProperties';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  presentation: Scalars['String']['output'];
};

export type SubPropertyInput = {
  name: Scalars['String']['input'];
  presentation: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  age?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhoneNumber?: Maybe<Scalars['String']['output']>;
  companyRegister?: Maybe<Scalars['String']['output']>;
  cookie?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Scalars['String']['output']>;
  isCompany?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  newPassword?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  passwordResetToken?: Maybe<Scalars['String']['output']>;
  passwordResetTokenExpire?: Maybe<Scalars['String']['output']>;
  pfp?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};
