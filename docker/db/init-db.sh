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
let itemsArr = [
  { "name": "russin", "productUrl": "https://www.mat.se/butik/russin-krav-salta-kvarn-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/42660-280.jpg" },
  { "name": "bananer", "productUrl": "https://www.mat.se/butik/banan-rattvisemarkt-ca-850g", "productImageUrl": "https://www.mat.se/butik/gront-te-krav-kung-markatt-20p" },
  { "name": "grönt te", "productUrl": "https://www.mat.se/butik/gront-te-krav-kung-markatt-20p", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/23843-280.jpg" },
  { "name": "kanel", "productUrl": "https://www.mat.se/butik/kanel-malen-garant-eko-43g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/102251-280.jpg" },
  { "name": "havredryck", "productUrl": "https://www.mat.se/butik/havredryck-deluxe-oatly-1l", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/100219-280.jpg" },
  { "name": "start", "productUrl": "https://www.mat.se/butik/start-naturell-granola-start-11kg", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/127624-280.jpg" },
  { "name": "kaffe", "productUrl": "https://www.mat.se/butik/bryggkaffe-mellan-classic-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/7056-280.jpg" },
  { "name": "smör", "productUrl": "https://www.mat.se/butik/ekologiskt-82-svenskt-smor-fran-arla-500g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/4858-280.jpg" },
  { "name": "blåbärsylt", "productUrl": "https://www.mat.se/butik/blabarssylt-garant-eko-400g", "productImageUrl": "https://d1hr6nb56yyl1.cloudfront.net/product-images/91225-280.jpg" }
]

db.items.insertMany(itemsArr)
let baseOrderItems = db.items.find({}, { "_id": 1 }).toArray().map((item) => item._id);
let firstFive = baseOrderItems.slice(0, 4);
let lastFive = baseOrderItems.slice(5);
db.orders.insertOne({ "status": "DELIVERED", "creationDate": 1602280800000, "endDate": 1602885600000, "isBaseOrder": false, "items": firstFive })
db.orders.insertOne({ "status": "PENDING", "creationDate": 1636671600000, "endDate": 1637276400000, "isBaseOrder": false, "items": lastFive })
db.baseorders.insertOne({ "active": true, "items": baseOrderItems.slice(3, 8) })

EOF
