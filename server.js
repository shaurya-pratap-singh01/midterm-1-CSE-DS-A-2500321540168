
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let products = [
    { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 2, name: "Mouse", price: 500, category: "Accessories" },
    { id: 3, name: "Keyboard", price: 1000, category: "Accessories" }
];

app.get("/products", (req, res) => {
    res.status(200).json(products);
});

app.post("/products", (req, res) => {
    const product = {
        id: products.length + 1,
        ...req.body
    };

    products.push(product);
    res.status(201).json(product);
});

app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (!product)
        return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
});

app.put("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (!product)
        return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.status(200).json({ message: "Product deleted" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
