/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6blq5lzwq284b93")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_products_slug` ON `products` (`slug`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzbujlhf",
    "name": "sizes",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 5242880
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqqpqrpg",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/webp",
        "image/png",
        "image/avif"
      ],
      "thumbs": null,
      "maxSelect": 10,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mrzipqsm",
    "name": "care",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 5242880
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6blq5lzwq284b93")

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_products_slug ON products (slug)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzbujlhf",
    "name": "sizes",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 0
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqqpqrpg",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/webp",
        "image/png"
      ],
      "thumbs": null,
      "maxSelect": 10,
      "maxSize": 0,
      "protected": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mrzipqsm",
    "name": "care",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 0
    }
  }))

  return dao.saveCollection(collection)
})
