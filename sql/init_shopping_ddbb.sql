// INIT
// "CREATE" DB
use shopping;

// CREATE COLLECTION
db.createCollection("shopping_list");
db.createCollection("users");
db.createCollection("categories");
db.createCollection("products");


// CATEGORIES
db.categories.insert( { id: "1", name: "Lacteos", desc: "De origen animal", photo: "" } );
db.categories.insert( { id: "2", name: "Carnes", desc: "De origen animal", photo: "" } );
db.categories.insert( { id: "3", name: "Legumbres", desc: "De origen animal", photo: "" } );

// PRODUCTS
db.products.insert( { name: "Leche entera", id_category: "1", measure: "1", desc: "Leches pura entera", photo: "" } );
db.products.insert( { name: "Leche semi-desnatada", id_category: "1", measure: "1", desc: "Leches semi-desnatada", photo: "" } );
db.products.insert( { name: "Leche desnatada", id_category: "1", measure: "1", desc: "Leches desnatada", photo: "" } );
 
 
db.products.insert( { name: "Carne de buey", id_category: "2", measure: "1", desc: "Carne mejor al punto", photo: "" } );
db.products.insert( { name: "Carne de vaca", id_category: "2", measure: "1", desc: "Carne mejor poco hecha", photo: "" } );

db.products.insert( { name: "Guisantes", id_category: "3", measure: "500", desc: "En racimo", photo: "" } );
db.products.insert( { name: "Lentejas", id_category: "3", measure: "500", desc: "O las tomas...", photo: "" } );

// END