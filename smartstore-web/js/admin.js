document.addEventListener("DOMContentLoaded", function() {
    loadBrands();
    loadTypes();
    loadProducts();

    document.getElementById("add-product-form").addEventListener("submit", addProduct);
    document.getElementById("add-brand-form").addEventListener("submit", addBrand);
    document.getElementById("add-type-form").addEventListener("submit", addType);
});

function loadBrands() {
    fetch("http://localhost:8080/brands")
        .then(response => response.json())
        .then(brands => {
            const brandSelect = document.getElementById("product-brand");
            brandSelect.innerHTML = "";
            brands.forEach(brand => {
                if (brand && brand.name) {
                    const option = document.createElement("option");
                    option.value = brand.id;
                    option.textContent = brand.name;
                    brandSelect.appendChild(option);
                }
            });

            const brandsTableBody = document.getElementById("brands-table").querySelector("tbody");
            brandsTableBody.innerHTML = "";
            brands.forEach(brand => {
                if (brand && brand.name) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${brand.id}</td>
                        <td>${brand.name}</td>
                        <td><button onclick="deleteBrand(${brand.id})">Удалить</button></td>
                    `;
                    brandsTableBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error loading brands:", error));
}

function loadTypes() {
    fetch("http://localhost:8080/types")
        .then(response => response.json())
        .then(types => {
            const typeSelect = document.getElementById("product-type");
            typeSelect.innerHTML = "";
            types.forEach(type => {
                if (type && type.name) {
                    const option = document.createElement("option");
                    option.value = type.id;
                    option.textContent = type.name;
                    typeSelect.appendChild(option);
                }
            });

            const typesTableBody = document.getElementById("types-table").querySelector("tbody");
            typesTableBody.innerHTML = "";
            types.forEach(type => {
                if (type && type.name) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${type.id}</td>
                        <td>${type.name}</td>
                        <td><button onclick="deleteType(${type.id})">Удалить</button></td>
                    `;
                    typesTableBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error loading types:", error));
}

function loadProducts() {
    fetch("http://localhost:8080/devices/all")
        .then(response => response.json())
        .then(products => {
            const productsTableBody = document.getElementById("products-table").querySelector("tbody");
            productsTableBody.innerHTML = "";
            products.forEach(product => {
                if (product && product.name) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><img src="${product.img}" alt="${product.name}" width="50"></td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.brand.name}</td>
                        <td>${product.type.name}</td>
                        <td>
                            <button onclick="editProduct(${product.id})">Редактировать</button>
                            <button onclick="deleteProduct(${product.id})">Удалить</button>
                        </td>
                    `;
                    productsTableBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error loading products:", error));
}

function addProduct(event) {
    event.preventDefault();

    const img = document.getElementById("product-img").value;
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const brandId = parseInt(document.getElementById("product-brand").value);
    const typeId = parseInt(document.getElementById("product-type").value);

    fetch("http://localhost:8080/devices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            img: img,
            name: name,
            price: price,
            brandId: brandId,
            typeId: typeId
        })
    })
    .then(response => response.json())
    .then(product => {
        console.log("Product added:", product);
        loadProducts(); // Обновляем список продуктов после добавления нового
    })
    .catch(error => console.error("Error adding product:", error));
}

function addBrand(event) {
    event.preventDefault();

    const name = document.getElementById("brand-name").value;

    fetch("http://localhost:8080/brands", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    .then(response => response.json())
    .then(brand => {
        console.log("Brand added:", brand);
        loadBrands(); // Обновляем список брендов после добавления нового
    })
    .catch(error => console.error("Error adding brand:", error));
}

function addType(event) {
    event.preventDefault();

    const name = document.getElementById("type-name").value;

    fetch("http://localhost:8080/types", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    .then(response => response.json())
    .then(type => {
        console.log("Type added:", type);
        loadTypes(); // Обновляем список типов после добавления нового
    })
    .catch(error => console.error("Error adding type:", error));
}

function deleteProduct(productId) {
    fetch(`http://localhost:8080/devices/${productId}`, {
        method: "DELETE"
    })
    .then(() => {
        console.log("Product deleted:", productId);
        loadProducts(); // Обновляем список продуктов после удаления
    })
    .catch(error => console.error("Error deleting product:", error));
}

function deleteBrand(brandId) {
    fetch(`http://localhost:8080/brands/${brandId}`, {
        method: "DELETE"
    })
    .then(() => {
        console.log("Brand deleted:", brandId);
        loadBrands(); // Обновляем список брендов после удаления
    })
    .catch(error => console.error("Error deleting brand:", error));
}

function deleteType(typeId) {
    fetch(`http://localhost:8080/types/${typeId}`, {
        method: "DELETE"
    })
    .then(() => {
        console.log("Type deleted:", typeId);
        loadTypes(); // Обновляем список типов после удаления
    })
    .catch(error => console.error("Error deleting type:", error));
}

function editProduct(productId) {
    const newName = prompt("Введите новое название товара:");
    const newPrice = prompt("Введите новую цену товара:");

    if (newName !== null && newPrice !== null) {
        fetch(`http://localhost:8080/devices/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                price: parseFloat(newPrice)
            })
        })
        .then(response => response.json())
        .then(product => {
            console.log("Product edited:", product);
            loadProducts(); // Обновляем список продуктов после редактирования
        })
        .catch(error => console.error("Error editing product:", error));
    }
}

function editBrand(brandId) {
    const newName = prompt("Введите новое название бренда:");

    if (newName !== null) {
        fetch(`http://localhost:8080/brands/${brandId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName
            })
        })
        .then(response => response.json())
        .then(brand => {
            console.log("Brand edited:", brand);
            loadBrands(); // Обновляем список брендов после редактирования
        })
        .catch(error => console.error("Error editing brand:", error));
    }
}

function editType(typeId) {
    const newName = prompt("Введите новое название типа:");

    if (newName !== null) {
        fetch(`http://localhost:8080/types/${typeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName
            })
        })
        .then(response => response.json())
        .then(type => {
            console.log("Type edited:", type);
            loadTypes(); // Обновляем список типов после редактирования
        })
        .catch(error => console.error("Error editing type:", error));
    }
}

