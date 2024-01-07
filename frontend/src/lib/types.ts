export type Category = {
  id: number;
  name: string;
  picture: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  productCount?: number;
};
export type ProductCounts = {
  cid: number;
  c: number;
};

export type CategoryCreate = {
  name: string;
  parent_id: number;
};

export type CategoryUpdate = {
  name: string;
  parent_id: number;
};
export type Product = {
  id: number;
  name: string;
  category_id: number;
  picture: string;
  created_at: Date;
  updated_at: Date;
};
export type EventWFile = Event & { target: { files: Blob[] } };
