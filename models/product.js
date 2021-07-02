const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  status: Boolean,
  description: String,
  units: Number,
  category: { type: "ObjectId", ref: "Category" },
  brand: { type: "ObjectId", ref: "Brand" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// const createDocument = async () => {
//   try {
//     const reactProduct1 = new Product({
//       title: "corn beans",
//       price: 10000,
//       image: "samsung-40-inch-black-led.jpg",
//       status: true,
//       description: "hello this is my product",
//       units: 5,
//       category: "60df508f855ccb40941bb034",
//       brand: "60df541239bcf033c09f2c58",
//     });

//     const reactProduct2 = new Product({
//       title: "eggs",
//       price: 10000,
//       image: "samsung-40-inch-black-led.jpg",
//       status: true,
//       description: "hello this is my product",
//       units: 5,
//       category: "60df508f855ccb40941bb031",
//       brand: "60df541239bcf033c09f2c58",
//     });

//     const reactProduct3 = new Product({
//       title: "apple",
//       price: 10000,
//       image: "samsung-40-inch-black-led.jpg",
//       status: true,
//       description: "hello this is my product",
//       units: 5,
//       category: "60df508f855ccb40941bb02f",
//       brand: "60df541239bcf033c09f2c56",
//     });
//     const reactProduct4 = new Product({
//       title: "carrot",
//       price: 10000,
//       image: "samsung-40-inch-black-led.jpg",
//       status: true,
//       description: "hello this is my product",
//       units: 5,
//       category: "60df508f855ccb40941bb02e",
//       brand: "60df541239bcf033c09f2c57",
//     });

//     const result = await Product.insertMany([
//       reactProduct4,
//       reactProduct3,
//       reactProduct2,
//       reactProduct1,
//     ]);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// createDocument();
