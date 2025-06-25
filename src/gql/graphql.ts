export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type AddUserInput = {
  email: Scalars["String"]["input"];
  firstname: Scalars["String"]["input"];
  lastname?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
};

export type BrandInput = {
  brandLogo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type CompanyInput = {
  email: Scalars["String"]["input"];
  location?: InputMaybe<Scalars["String"]["input"]>;
  officialLogo: Scalars["String"]["input"];
  officialName: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  registerNumber: Scalars["String"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type OptionTypeInput = {
  color?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  size?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type OrderInput = {
  availableHours?: InputMaybe<Scalars["Float"]["input"]>;
  discount: Scalars["Float"]["input"];
  leftQuantity: Scalars["Int"]["input"];
  phoneNumber: Scalars["String"]["input"];
  pickUpLocation: Scalars["String"]["input"];
  pickedStaff?: InputMaybe<Scalars["Float"]["input"]>;
  productId: Scalars["ID"]["input"];
  quantity: Scalars["Int"]["input"];
  total: Scalars["Float"]["input"];
  unitPrice: Scalars["Float"]["input"];
  userAddress: Scalars["String"]["input"];
};

export type ProductInput = {
  brand?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  category: Array<Scalars["ID"]["input"]>;
  detail?: InputMaybe<Scalars["String"]["input"]>;
  discount?: InputMaybe<Scalars["Float"]["input"]>;
  name: Scalars["String"]["input"];
  optionTypes?: InputMaybe<OptionTypeInput>;
  productProperties?: InputMaybe<PropertyInput>;
  quantity: Scalars["Int"]["input"];
  store?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  totalQuantity: Scalars["Int"]["input"];
  unitPrice: Scalars["Float"]["input"];
};

export type PropertyInput = {
  position: Scalars["String"]["input"];
  properties: SubPropertyInput;
  value: Scalars["String"]["input"];
};

export type RecoverPasswordInput = {
  password: Scalars["String"]["input"];
  resetToken: Scalars["String"]["input"];
};

export type SignUpInput = {
  email: Scalars["String"]["input"];
  firstname: Scalars["String"]["input"];
  lastname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignatureInput = {
  folder: Scalars["String"]["input"];
};

export type StoreInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  short_name?: InputMaybe<Scalars["String"]["input"]>;
  storeLocation?: InputMaybe<Scalars["String"]["input"]>;
  timesheets?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SubPropertyInput = {
  name: Scalars["String"]["input"];
  presentation: Scalars["String"]["input"];
};

export type VideoUploadInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  youtubeUrl: Scalars["String"]["input"];
};
