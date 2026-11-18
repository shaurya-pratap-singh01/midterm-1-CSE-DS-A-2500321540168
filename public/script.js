
const API = "/products";

async function loadProducts() {
    const res = await fetch(API);
    const data = await res.json();

    document.getElementById("products").innerHTML = data.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.category}</td>
        </tr>
    `).join("");
}

document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    e.target.reset();
    loadProducts();
};

loadProducts();
