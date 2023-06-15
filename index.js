import express from "express";
const app = express();
const port = 3001;

let products = [
  {
    id: 1,
    name: "Product 1",
    price: 5,
    quantity: 5,
  },
  {
    id: 2,
    name: "Product 2",
    price: 10,
    quantity: 8,
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    quantity: 12,
  },
  {
    id: 4,
    name: "Product 4",
    price: 18,
    quantity: 5,
  },
  {
    id: 5,
    name: "Product 5",
    price: 15,
    quantity: 8,
  },
  {
    id: 6,
    name: "Product 6",
    price: 30,
    quantity: 12,
  },
];
app.use(express.json());
// console.log(products);

//Excercise#1

app.get("/", (req, res) => {
  res.send("Hello World i am dani");
});

//Excercise#2
app.get("/products", (req, res) => {
  res.json(products);
});

//Exercise 03 (Find a product that matches id)
app.get("/products/:id", (req, res) => {
  //   console.log(req.params);
  const { id } = req.params;
  const findProduct = products.find((prod) => {
    return prod.id === Number(id);
  });
  if (findProduct) {
    res.json(findProduct);
  } else {
    // res.send("NOT FOUND");
    res.status(404).json({ message: "NOT FOUND" });
  }
});

//Exercise 04 (Delete a product taht matches id)

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const findProduct = products.find((prod) => {
    return prod.id === Number(id);
  });
  if (findProduct) {
    const newProducts = products.filter((ele) => {
      if (ele.id !== findProduct.id) {
        return ele;
      }
    });
    // console.log(newProducts);
    res.json(newProducts);
    res.status(200).json({ message: "Deleted Successfully" });
  } else {
    res.status(404).json({ message: "NOT FOUND" });
  }
});

//Excercise 5: filtering using query parameters.

app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const filterProducts = products.filter((ele) => {
    return ele.price >= Number(minPrice) && ele.price <= Number(maxPrice);
  });
  if (filterProducts) {
    res.json(filterProducts);
  } else {
    res.status(200).json([]);
  }
});

// Excercise 6: Post request

app.post("/products", (req, res) => {
  const { id, name, price, quantity } = req.body;
  const product2 = { id, name, price, quantity };
  // console.log(product2);
  products.push(product2);
  res.json(products);
});

//Exercise 07:•	Implement the handling of a PUT request to the endpoint http://localhost:3001/products/:id.

app.put("/products/:id", (req, res) => {
  const { name, price, quantity } = req.body;
  const { id } = req.params;
  const productNew = { id, name, price, quantity };
  console.log(id, name, price, quantity);
  let found;
  products = products.map((product) => {
    if (product.id === Number(id)) {
      found = true;
      return productNew;
    }
    return product;
  });
  if (found) {
    res.json(products);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
