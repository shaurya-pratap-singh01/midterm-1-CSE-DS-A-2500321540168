
const API = "/products";

const form = document.getElementById("form");
const productsTable = document.getElementById("products");

let editingId = null;

// Fetch and display products
async function loadProducts() {
    const response = await fetch(API);
    const products = await response.json();

    productsTable.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct(${product.id})">Update</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;

        productsTable.appendChild(row);
    });
}

// Add product
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value
    };

    if (editingId === null) {
        // POST request
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        alert("Product added successfully!");
    } else {
        // PUT request
        await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        alert("Product updated successfully!");
        editingId = null;
        form.querySelector("button").textContent = "Add Product";
    }

    form.reset();
    loadProducts();
});

// Update product
async function editProduct(id) {
    const response = await fetch(`${API}/${id}`);
    const product = await response.json();

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;

    editingId = id;

    form.querySelector("button").textContent = "Update Product";
}

// Delete product
async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        alert("Product deleted successfully!");
        loadProducts();
    }
}

// Load products when page opens
loadProducts();
