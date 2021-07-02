const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  title: String,
  status: Boolean,
  image: String,
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;

// const createDocument = async () => {
//   try {
//     const reactProduct1 = new Brand({
//       title: "uniliver",
//       image: "brands/01.jpg",
//       status: true,
//     });

//     const reactProduct2 = new Brand({
//       title: "lu",
//       image: "brands/02.jpg",
//       status: true,
//     });

//     const reactProduct3 = new Brand({
//       title: "abc",
//       image: "brands/03.jpg",
//       status: true,
//     });

//     const result = await Brand.insertMany([
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
