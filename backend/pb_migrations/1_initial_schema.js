/// <reference path="../pb_data/types.d.ts" />

// Migration: Initial schema for Forma Atelier
// Creates: products, categories, orders, order_items, wishlists

migrate((db) => {
  // ─── PRODUCTS ───────────────────────────────────────────────────────────────
  const products = new Collection({
    name: "products",
    type: "base",
    schema: [
      { name: "name",          type: "text",   required: true  },
      { name: "slug",          type: "text",   required: true  },
      { name: "description",   type: "editor", required: false },
      { name: "price",         type: "number", required: true  },
      { name: "collection",    type: "text",   required: false }, // "lumiere" | "ombra" | "terra"
      { name: "category",      type: "text",   required: false }, // "vestidos" | "abrigos" etc.
      { name: "sizes",         type: "json",   required: false }, // ["XS","S","M","L","XL"]
      { name: "images",        type: "file",   required: false, options: { maxSelect: 10, mimeTypes: ["image/jpeg","image/webp","image/png"] } },
      { name: "available",     type: "bool",   required: false },
      { name: "featured",      type: "bool",   required: false },
      { name: "care",          type: "json",   required: false }, // ["Dry clean only", ...]
      { name: "composition",   type: "text",   required: false }, // "100% Silk"
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_products_slug ON products (slug)",
    ],
    listRule:   "",   // public
    viewRule:   "",   // public
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });

  // ─── ORDERS ─────────────────────────────────────────────────────────────────
  const orders = new Collection({
    name: "orders",
    type: "base",
    schema: [
      { name: "user_id",       type: "relation", required: false, options: { collectionId: "_pb_users_auth_", maxSelect: 1 } },
      { name: "email",         type: "email",    required: true  },
      { name: "status",        type: "select",   required: true,  options: { values: ["pending","paid","shipped","delivered","cancelled"] } },
      { name: "total",         type: "number",   required: true  },
      { name: "items",         type: "json",     required: true  }, // snapshot of cart items
      { name: "shipping_name", type: "text",     required: false },
      { name: "shipping_address", type: "text",  required: false },
      { name: "shipping_city", type: "text",     required: false },
      { name: "shipping_zip",  type: "text",     required: false },
      { name: "notes",         type: "text",     required: false },
    ],
    listRule:   "@request.auth.id != '' && (user_id = @request.auth.id || @request.auth.collectionName = 'users')",
    viewRule:   "@request.auth.id != '' && (user_id = @request.auth.id || @request.auth.collectionName = 'users')",
    createRule: "",   // public (guest checkout)
    updateRule: "@request.auth.collectionName = 'users'",
    deleteRule: "@request.auth.collectionName = 'users'",
  });

  // ─── WISHLISTS ───────────────────────────────────────────────────────────────
  const wishlists = new Collection({
    name: "wishlists",
    type: "base",
    schema: [
      { name: "user_id",    type: "relation", required: true, options: { collectionId: "_pb_users_auth_", maxSelect: 1 } },
      { name: "product_id", type: "relation", required: true, options: { collectionId: "products",        maxSelect: 1 } },
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

  db.save(products);
  db.save(orders);
  db.save(wishlists);

}, (db) => {
  // Rollback
  db.dropTable("wishlists");
  db.dropTable("orders");
  db.dropTable("products");
});
