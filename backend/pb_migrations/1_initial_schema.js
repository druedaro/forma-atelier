/// <reference path="../pb_data/types.d.ts" />

// Migration: Initial schema for Forma Atelier
// Collections: products, orders, wishlists

migrate((db) => {
  const dao = new Dao(db);

  // ─── PRODUCTS ───────────────────────────────────────────────────────────────
  const products = new Collection({
    name: "products",
    type: "base",
    schema: [
      { name: "name",          type: "text",   required: true  },
      { name: "slug",          type: "text",   required: true  },
      { name: "description",   type: "editor", required: false },
      { name: "price",         type: "number", required: true  },
      { name: "collection",    type: "text",   required: false },
      { name: "category",      type: "text",   required: false },
      { name: "sizes",         type: "json",   required: false },
      { name: "images",        type: "file",   required: false,
        options: { maxSelect: 10, mimeTypes: ["image/jpeg","image/webp","image/png"] } },
      { name: "available",     type: "bool",   required: false },
      { name: "featured",      type: "bool",   required: false },
      { name: "care",          type: "json",   required: false },
      { name: "composition",   type: "text",   required: false },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_products_slug ON products (slug)",
    ],
    listRule:   "",
    viewRule:   "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });
  dao.saveCollection(products);

  // ─── ORDERS ─────────────────────────────────────────────────────────────────
  const orders = new Collection({
    name: "orders",
    type: "base",
    schema: [
      { name: "email",            type: "email",  required: true  },
      { name: "status",           type: "select", required: true,
        options: { values: ["pending","paid","shipped","delivered","cancelled"] } },
      { name: "total",            type: "number", required: true  },
      { name: "items",            type: "json",   required: true  },
      { name: "shipping_name",    type: "text",   required: false },
      { name: "shipping_address", type: "text",   required: false },
      { name: "shipping_city",    type: "text",   required: false },
      { name: "shipping_zip",     type: "text",   required: false },
      { name: "notes",            type: "text",   required: false },
    ],
    listRule:   null,
    viewRule:   null,
    createRule: "",   // public guest checkout
    updateRule: null,
    deleteRule: null,
  });
  dao.saveCollection(orders);

  // ─── WISHLISTS ───────────────────────────────────────────────────────────────
  const wishlists = new Collection({
    name: "wishlists",
    type: "base",
    schema: [
      { name: "user_id",    type: "relation", required: true,
        options: { collectionId: "_pb_users_auth_", maxSelect: 1 } },
      { name: "product_id", type: "relation", required: true,
        options: { collectionId: "products", maxSelect: 1 } },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_wishlists_user_product ON wishlists (user_id, product_id)",
    ],
    listRule:   "@request.auth.id = user_id",
    viewRule:   "@request.auth.id = user_id",
    createRule: "@request.auth.id != ''",
    updateRule: null,
    deleteRule: "@request.auth.id = user_id",
  });
  dao.saveCollection(wishlists);

}, (db) => {
  // Rollback
  const dao = new Dao(db);
  ["wishlists", "orders", "products"].forEach((name) => {
    try {
      const col = dao.findCollectionByNameOrId(name);
      dao.deleteCollection(col);
    } catch (_) {}
  });
});
