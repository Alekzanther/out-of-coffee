#!/bin/bash
set -e
# set -e causes the whole script to exit when a command fails, so the script can't silently fail and startup mongo.

mongosh <<EOF
use admin
db.createUser(
  {
    user: "${MONGO_INITDB_ROOT_USERNAME}",
    pwd: "${MONGO_INITDB_ROOT_PASSWORD}",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

use ${MONGO_INITDB_DATABASE}
db.createCollection("orders")
db.createCollection("items")
db.createCollection("baseorders")
db.items.insert({ "name": "russin", "productUrl": "https://www.mat.se/butik/russin-krav-salta-kvarn-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/42660-280.jpg" })
db.items.insert({ "name": "bananer", "productUrl": null, "productImageUrl": null })
db.items.insert({ "name": "grönt te", "productUrl": "https://www.mat.se/butik/gront-te-krav-kung-markatt-20p", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/23843-280.jpg" })
db.items.insert({ "name": "havredryck", "productUrl": "https://www.mat.se/butik/havredryck-deluxe-oatly-1l", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/100219-280.jpg" })
db.items.insert({ "name": "kanel", "productUrl": "https://www.mat.se/butik/kanel-malen-garant-eko-43g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/102251-280.jpg" })
db.items.insert({ "name": "start", "productUrl": "https://www.mat.se/butik/start-naturell-granola-start-11kg", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/127624-280.jpg" })
db.items.insert({ "name": "kaffe", "productUrl": "https://www.mat.se/butik/bryggkaffe-mellan-classic-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/7056-280.jpg" })
db.items.insert({ "name": "smör", "productUrl": "https://www.mat.se/butik/ekologiskt-82-svenskt-smor-fran-arla-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/4858-280.jpg" })
db.items.insert({ "name": "blåbärsylt", "productUrl": "https://www.mat.se/butik/blabarssylt-garant-eko-400g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/91225-280.jpg" })

db.orders.insert({ "status": "DELIvERED", "creationDate": 1602280800000, "endDate": 1602885600000, "isBaseOrder": false, "items": [ { "name": "bananer", "productUrl": null, "productImageUrl": null }, { "name": "havredryck", "productUrl": "https://www.mat.se/butik/havredryck-deluxe-oatly-1l", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/100219-280.jpg" }, { "name": "kanel", "productUrl": "https://www.mat.se/butik/kanel-malen-garant-eko-43g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/102251-280.jpg" }, { "name": "kaffe", "productUrl": "https://www.mat.se/butik/bryggkaffe-mellan-classic-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/7056-280.jpg" } ] })
db.base_orders.insert({ "active": true, "items": [ { "name": "kaffe", "productUrl": "https://www.mat.se/butik/bryggkaffe-mellan-classic-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/7056-280.jpg" }, { "name": "start", "productUrl": "https://www.mat.se/butik/start-naturell-granola-start-11kg", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/127624-280.jpg" }, { "name": "blåbärsylt", "productUrl": "https://www.mat.se/butik/blabarssylt-garant-eko-400g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/91225-280.jpg" } ] })
EOF
