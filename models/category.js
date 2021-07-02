const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: String,
  status: Boolean,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

// const createDocument = async () => {
//   try {
//     const freshVegitable = new Category({
//       title: "Fresh Vegitables",
//       status: true,
//     });

//     const freshFruit = new Category({
//       title: "Fresh Friuts",
//       status: true,
//     });

//     const dairy = new Category({
//       title: "Dairy & Eggs",
//       status: true,
//     });

//     const braekfast = new Category({
//       title: "BreakFast",
//       status: true,
//     });

//     const frozen = new Category({
//       title: "Frozen",
//       status: true,
//     });

//     const organic = new Category({
//       title: "Oragnic",
//       status: true,
//     });

//     const cannedFood = new Category({
//       title: "Canned Food",
//       status: true,
//     });

//     const juices = new Category({
//       title: "Bavrage & Juice",
//       status: true,
//     });

//     const coffee = new Category({
//       title: "Coffee & Snaks",
//       status: true,
//     });

//     const jams = new Category({
//       title: "Sauce & Jams",
//       status: true,
//     });

//     const result = await Category.insertMany([
//       cannedFood,
//       braekfast,
//       dairy,
//       jams,
//       coffee,
//       juices,
//       freshFruit,
//       freshVegitable,
//       organic,
//       frozen,
//     ]);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// createDocument();
