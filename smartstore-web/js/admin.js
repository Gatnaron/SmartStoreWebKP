// admin.js
document.addEventListener("DOMContentLoaded", function() {
    loadBrands();
    loadTypes();
    loadProducts();
    loadExistingBrands();
    loadExistingTypes();

    document.getElementById("add-product-form").onsubmit = function(event) {
        event.preventDefault();
        addProduct();
    };

    document.getElementById("add-brand-form").onsubmit = function(event) {
        event.preventDefault();
        addBrand();
    };

    document.getElementById("add-type-form").onsubmit = function(event) {
        event.preventDefault();
        addType();
    };
});

function loadBrands() {
    // Пример запроса для загрузки брендов с сервера
    // Замените на реальный запрос к серверу
    const brands = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" }
    ];

    const brandSelect = document.getElementById("product-brand");
    brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand.id;
        option.textContent = brand.name;
        brandSelect.appendChild(option);
    });
}

function loadTypes() {
    // Пример запроса для загрузки типов с сервера
    // Замените на реальный запрос к серверу
    const types = [
        { id: 1, name: "Смартфон" },
        { id: 2, name: "Планшет" }
    ];

    const typeSelect = document.getElementById("product-type");
    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type.id;
        option.textContent = type.name;
        typeSelect.appendChild(option);
    });
}

function loadProducts() {
    // Пример запроса для загрузки товаров с сервера
    // Замените на реальный запрос к серверу
    const products = [
        { img: "img/product1.jpg", name: "iPhone 12", price: 799.99, brand: "Apple", type: "Смартфон", info: "Описание продукта 1" },
        { img: "img/product2.jpg", name: "Galaxy Tab S7", price: 649.99, brand: "Samsung", type: "Планшет", info: "Описание продукта 2" }
    ];

    const productsTableBody = document.getElementById("products-table").getElementsByTagName("tbody")[0];
    products.forEach(product => {
        const row = productsTableBody.insertRow();
        row.insertCell(0).textContent = product.img;
        row.insertCell(1).textContent = product.name;
        row.insertCell(2).textContent = product.price;
        row.insertCell(3).textContent = product.brand;
        row.insertCell(4).textContent = product.type;
        row.insertCell(5).textContent = product.info;
    });
}

function loadExistingBrands() {
    // Пример запроса для загрузки брендов с сервера
    // Замените на реальный запрос к серверу
    const brands = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" }
    ];

    const brandsTableBody = document.getElementById("brands-table").getElementsByTagName("tbody")[0];
    brands.forEach(brand => {
        const row = brandsTableBody.insertRow();
        row.insertCell(0).textContent = brand.id;
        row.insertCell(1).textContent = brand.name;
    });
}

function loadExistingTypes() {
    // Пример запроса для загрузки типов с сервера
    // Замените на реальный запрос к серверу
    const types = [
        { id: 1, name: "Смартфон" },
        { id: 2, name: "Планшет" }
    ];

    const typesTableBody = document.getElementById("types-table").getElementsByTagName("tbody")[0];
    types.forEach(type => {
        const row = typesTableBody.insertRow();
        row.insertCell(0).textContent = type.id;
        row.insertCell(1).textContent = type.name;
    });
}

function addProduct() {
    const img = document.getElementById("product-img").value;
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const brand = document.getElementById("product-brand").value;
    const type = document.getElementById("product-type").value;
    const infoTitle = document.getElementById("product-info-title").value;
    const infoDescription = document.getElementById("product-info-description").value;

    // Пример отправки данных на сервер
    // Замените на реальный запрос к серверу
    console.log({
        img,
        name,
        price,
        brand,
        type,
        infoTitle,
        infoDescription
    });

    alert("Товар добавлен!");
    // Очистка формы
    document.getElementById("add-product-form").reset();
    loadProducts(); // Перезагрузка таблицы товаров
}

function addBrand() {
    const name = document.getElementById("brand-name").value;

    // Пример отправки данных на сервер
    // Замените на реальный запрос к серверу
    console.log({ name });

    alert("Бренд добавлен!");
    // Очистка формы
    document.getElementById("add-brand-form").reset();
    loadBrands(); // Перезагрузка списка брендов
    loadExistingBrands(); // Перезагрузка таблицы брендов
}

function addType() {
    const name = document.getElementById("type-name").value;

    // Пример отправки данных на сервер
    // Замените на реальный запрос к серверу
    console.log({ name });

    alert("Тип добавлен!");
    // Очистка формы
    document.getElementById("add-type-form").reset();
    loadTypes(); // Перезагрузка списка типов
    loadExistingTypes(); // Перезагрузка таблицы типов
}
