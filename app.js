const express = require("express");
const multiparty = require("multiparty");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { createHttpTerminator } = require("http-terminator");
const fs = require("fs");

const Product = require("./models/Product");
const Category = require("./models/category");
const Brand = require("./models/brands");

const app = express();
const port = 5000;

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page...!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// GET /search?q=burger&sort[price]=desc
app.get("/search", async (req, res) => {
  console.log(`Search Object String : ${JSON.stringify(req.query)}`);
  const { q, sort } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { image: { $regex: q, $options: "i" } },
      ],
    })
      .sort(sort)
      .exec();
    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "zinger", "price": 700, "status": true, image: "md1.png"}
app.post("/new-product", async (req, res) => {
  console.log("new-product request= ", req.body);
  const product = new Product(req.body);

  try {
    const prod = await product.save();
    res.send(prod);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.put("/product/:id", async (req, res) => {
  console.log(
    `updating product ${req.params.id} with ${JSON.stringify(req.body)}`
  );
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(product);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "sandwich", "price": 500, "status": true, image: file}
app.post("/upload", async (req, res) => {
  var form = new multiparty.Form({ uploadDir: "./public/images" });

  form.parse(req, async function (err, fields, files) {
    if (err) return res.send({ error: err.message });

    console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
    console.log(`files = ${JSON.stringify(files, null, 2)}`);

    let uploadedPath = files.image[0].path;
    let destPath = "./public/images/" + files.image[0].originalFilename;
    // Renamed to the real file name
    let fileName = "";
    try {
      await fs.promises.rename(uploadedPath, destPath);
      fileName = `./images/${files.image[0].originalFilename}`;
    } catch (err) {
      console.log(err.message);
    }

    const product = new Product({
      title: fields.title[0],
      price: fields.price[0],
      status: fields.status[0],
      image: fileName,
    });

    try {
      const prod = await product.save();
      console.log(`product = ${JSON.stringify(prod, null, 2)}`);
      res.send(prod);
    } catch (err) {
      res.send({ error: err.message });
    }
  });
});

//category

app.get("/categories", async (req, res) => {
  try {
    const category = await Category.find({});
    res.send(category);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "zinger", "price": 700, "status": true, image: "md1.png"}
app.post("/new-category", async (req, res) => {
  console.log("new-category request= ", req.body);
  const category = new Category(req.body);

  try {
    const cats = await category.save();
    res.send(cats);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.put("/category/:id", async (req, res) => {
  console.log(
    `updating category ${req.params.id} with ${JSON.stringify(req.body)}`
  );
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(category);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.delete("/category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.send(category);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "sandwich", "price": 500, "status": true, image: file}
app.post("/upload", async (req, res) => {
  var form = new multiparty.Form({ uploadDir: "./public/images" });

  form.parse(req, async function (err, fields, files) {
    if (err) return res.send({ error: err.message });

    console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
    console.log(`files = ${JSON.stringify(files, null, 2)}`);

    let uploadedPath = files.image[0].path;
    let destPath = "./public/images/" + files.image[0].originalFilename;
    // Renamed to the real file name
    let fileName = "";
    try {
      await fs.promises.rename(uploadedPath, destPath);
      fileName = `./images/${files.image[0].originalFilename}`;
    } catch (err) {
      console.log(err.message);
    }

    const category = new Category({
      title: fields.title[0],
      status: fields.status[0],
      image: fileName,
    });

    try {
      const cats = await category.save();
      console.log(`category = ${JSON.stringify(prod, null, 2)}`);
      res.send(cats);
    } catch (err) {
      res.send({ error: err.message });
    }
  });
});

//brand

app.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.send(brands);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.get("/brand/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// GET /search?q=burger&sort[price]=desc
app.get("/search", async (req, res) => {
  console.log(`Search Object String : ${JSON.stringify(req.query)}`);
  const { q, sort } = req.query;
  try {
    const brands = await Brand.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { image: { $regex: q, $options: "i" } },
      ],
    })
      .sort(sort)
      .exec();
    res.send(brands);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "zinger", "price": 700, "status": true, image: "md1.png"}
app.post("/new-brand", async (req, res) => {
  console.log("new-brand request= ", req.body);
  const brand = new Brand(req.body);

  try {
    const b = await brand.save();
    res.send(b);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.put("/brand/:id", async (req, res) => {
  console.log(
    `updating brand ${req.params.id} with ${JSON.stringify(req.body)}`
  );
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(brand);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.delete("/brand/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.send(brand);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// {"title": "sandwich", "price": 500, "status": true, image: file}
app.post("/upload", async (req, res) => {
  var form = new multiparty.Form({ uploadDir: "./public/images" });

  form.parse(req, async function (err, fields, files) {
    if (err) return res.send({ error: err.message });

    console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
    console.log(`files = ${JSON.stringify(files, null, 2)}`);

    let uploadedPath = files.image[0].path;
    let destPath = "./public/images/" + files.image[0].originalFilename;
    // Renamed to the real file name
    let fileName = "";
    try {
      await fs.promises.rename(uploadedPath, destPath);
      fileName = `./images/${files.image[0].originalFilename}`;
    } catch (err) {
      console.log(err.message);
    }

    const brand = new Brand({
      title: fields.title[0],
      status: fields.status[0],
      image: fileName,
    });

    try {
      const b = await product.save();
      console.log(`brand = ${JSON.stringify(prod, null, 2)}`);
      res.send(b);
    } catch (err) {
      res.send({ error: err.message });
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// ******************************************************************* //

const httpTerminator = createHttpTerminator({ server });

const db = {
  username: "sana_sarwat",
  password: "sanasarwat_123",
  database: "grocery-app",
};

const uri = `mongodb+srv://${db.username}:${db.password}@cluster0.qtjdt.mongodb.net/${db.database}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// Connect and handle initial connection errors
mongoose.connect(uri, options).then(
  () => {
    console.log("connected to mongodb");
  },
  (err) => {
    console.log("mongodb initial connection error", err);
  }
);

// To handle errors after initial connection was established
mongoose.connection.on("error", (err) => {
  console.log("mongodb runtime error", err);
});

function gracefulShutdown() {
  // First argument is [force], see mongoose doc.
  mongoose.connection.close(false, () => {
    console.log("MongoDb connection closed.");
  });
  httpTerminator.terminate();
}

// This will handle process.exit():
process.on("exit", gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGKILL", gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
process.on("uncaughtException", gracefulShutdown);
