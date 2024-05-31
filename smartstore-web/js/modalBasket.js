document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById("basket-icon");
    const basketModal = document.getElementById("basket-modal");
    const closeBasketModalButton = document.getElementById("close-basket-modal");
    const checkoutButton = document.getElementById("checkout-button");

    basketIcon.addEventListener("click", function(event) {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        if (userId) {
            loadBasketItems(userId);
            basketModal.style.display = "block";
        } else {
            alert("Пожалуйста, войдите в систему, чтобы посмотреть корзину.");
        }
    });

    closeBasketModalButton.addEventListener("click", function(event) {
        basketModal.style.display = "none";
    });

    checkoutButton.addEventListener("click", function(event) {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        if (userId) {
            createOrder(userId);
        } else {
            alert("Пожалуйста, войдите в систему, чтобы оформить заказ.");
        }
    });
});

function loadBasketItems(userId) {
    const basketItemsContainer = document.getElementById("basket-items");
    const emptyBasketMessage = document.getElementById("empty-basket-message");

    if (!basketItemsContainer || !emptyBasketMessage) {
        console.error("Element with id 'basket-items' or 'empty-basket-message' not found in the DOM.");
        return;
    }

    fetch(`http://localhost:8080/baskets/${userId}`)
        .then(response => response.json())
        .then(items => {
            basketItemsContainer.innerHTML = "";
            if (items.length === 0) {
                emptyBasketMessage.classList.remove("hidden");
            } else {
                emptyBasketMessage.classList.add("hidden");
                items.forEach(item => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("basket-item");
                    itemElement.innerHTML = `
                        <img src="${item.device.img}" alt="${item.device.name}">
                        <span>${item.device.name}</span>
                        <span>${item.device.price} руб.</span>
                    `;
                    basketItemsContainer.appendChild(itemElement);
                });
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке товаров в корзине:", error);
            emptyBasketMessage.classList.remove("hidden");
            alert("Не удалось загрузить товары в корзине. Пожалуйста, попробуйте позже.");
        });
}

function createOrder(userId) {
    fetch(`http://localhost:8080/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId })
    })
    .then(response => {
        if (response.ok) {
            alert("Заказ успешно создан!");
            localStorage.removeItem("basket");
            loadBasketItems(userId);
            basketModal.style.display = "none";
        } else {
            throw new Error("Ошибка при создании заказа");
        }
    })
    .catch(error => {
        console.error("Ошибка при создании заказа:", error);
        alert("Не удалось создать заказ. Пожалуйста, попробуйте позже.");
    });
}
