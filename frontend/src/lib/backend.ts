import {
  Category,
  CategoryCreate,
  CategoryUpdate,
  Product,
  ProductCounts,
} from "./types";

const base = "/categories";
const productBase = "/api/products";
let headers = { "Content-Type": "application/json" };

export const categories = {
  getAll: (): Promise<Category[]> => fetch(base).then((r) => r.json()),
  getOne: (id: number) => fetch(`${base}/${id}`).then((r) => r.json()),
  create: (data: CategoryCreate): Promise<Category> =>
    fetch(base, { method: "Post", headers, body: JSON.stringify(data) }).then(
      (r) => r.json()
    ),
  update: (id: number, data: CategoryUpdate) =>
    fetch(base + "/" + id, {
      method: "Put",
      headers,
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  products: (id: number) =>
    fetch(base + "/" + id + "/Products").then((r) => r.json()),
  productCount: (): Promise<ProductCounts[]> =>
    fetch(base + "/ProductCount").then((r) => r.json()),
};
export const backend = {
  categories,
  products: {
    getOne: (id: number): Promise<Product> =>
      fetch(productBase + "/" + id).then((r) => r.json()),
    create: (data: Product) =>
      fetch(productBase, {
        method: "Post",
        headers,
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    update: (id: number, data: Product) =>
      fetch(productBase + "/" + id, {
        method: "Put",
        headers,
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: number) =>
      fetch(productBase + "/" + id, { method: "Delete", headers }).then((r) =>
        r.json()
      ),
  },
};
