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
 {"name":"Snabbnudlar Kycklingsmak 85g Samyang","productUrl":"https://mathem.se/varor/snabbnudlar/snabbnudlar-kyckling-85g-samyang-95873","productImageUrl":"https://static.mathem.se/shared/images/products/original/07350035210107_c1n1.jpg","isFavorite":false,"mathemId":"95873"},
 {"name":"Chips Sourcream & Onion 275g Estrella","productUrl":"https://mathem.se/varor/chips-med-smak/chips-sourcream-o-onion-300g-estrella","productImageUrl":"https://static.mathem.se/shared/images/products/original/chips-sourcream-o-onion-275g-estrella.jpeg","isFavorite":false,"mathemId":"14424"},
 {"name":"Kaffe Brygg Mellanrost 450g Gevalia","productUrl":"https://mathem.se/varor/bryggkaffe/kaffe-brygg-mellanrost-500g-gevalia","productImageUrl":"https://static.mathem.se/shared/images/products/original/08711000530085_c1r1.jpeg.jpg","isFavorite":false,"mathemId":"14804"},
 {"name":"Färsk Mellanmjölk 1,5% 1,5L Arla","productUrl":"https://mathem.se/varor/mellanmjolk/mellanmjolk-1-5--1-5l-arla","productImageUrl":"https://static.mathem.se/shared/images/products/original/farsk-mellanmjolk-1-5--1-5l-arla-2.jpg","isFavorite":false,"mathemId":"15664"},
 {"name":"Ägg Frigående Inomhus 15-p S 762g Kronägg","productUrl":"https://mathem.se/varor/agg/agg-s-ib-15-p-kronagg-ab","productImageUrl":"https://static.mathem.se/shared/images/products/original/agg-frigaende-inomhus-15-p-s-762g-kronagg-2.jpg","isFavorite":false,"mathemId":"99980"}
]

db.items.insertMany(itemsArr)
let baseOrderItems = db.items.find({}, { "_id": 1 }).toArray().map((item) => item._id);
let firstFive = baseOrderItems.slice(0, 4);
let lastFive = baseOrderItems.slice(5);
db.orders.insertOne({ "status": "DELIVERED", "creationDate": 1602280800000, "endDate": 1602885600000, "isBaseOrder": false, "items": firstFive })
db.orders.insertOne({ "status": "PENDING", "creationDate": 1636671600000, "endDate": 1637276400000, "isBaseOrder": false, "items": lastFive })
db.baseorders.insertOne({ "active": true, "items": baseOrderItems.slice(3, 8) })

EOF
