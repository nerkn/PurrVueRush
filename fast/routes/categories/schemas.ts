export const Category = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    picture: { type: "string" },
    parent_id: { type: "number" },
    created_at: { type: "DateTime" },
    updated_at: { type: "DateTime" },
  },
};

export const CategoriesOptionsSchema = {
  getAll: {
    response: {
      200: {
        type: "array",
        items: Category,
      },
    },
  },
  getOne: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      200: Category,
    },
  },
  create: {
    body: {
      type: "object",
      required: ["name", "parent_id"],
      properties: {
        name: { type: "string" },
        picture: { type: "string" },
        parent_id: { type: "number" },
      },
    },
    response: {
      200: Category,
    },
  },
  update: {},
  delete: {},
};
