document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById("basket-icon");
    const basketModal = document.getElementById("basket-modal");
    const closeBasketModalButton = document.getElementById("close-basket-modal");
    const checkoutButton = document.getElementById("checkout-button");

    basketIcon.addEventListener("click", function(event) {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert('Пожалуйста, войдите в систему, чтобы посмотреть корзину.');
            return;
        }
        fetchBasketId(userId)
            .then(basketId => {
                if (basketId) {
                    loadBasketItems(basketId);
                    basketModal.style.display = "block"; // Показываем модальное окно корзины
                } else {
                    alert('Корзина не найдена.');
                }
            })
            .catch(error => {
                console.error('Ошибка при получении корзины:', error);
                alert('Ошибка при получении корзины: ' + error.message);
            });
    });

    closeBasketModalButton.addEventListener("click", function(event) {
        basketModal.style.display = "none"; // Закрываем модальное окно корзины при клике на кнопку закрытия
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

function fetchBasketId(userId) {
    return fetch(`http://localhost:8080/baskets/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка при получении идентификатора корзины");
            }
            return response.json();
        })
        .then(data => data.id)
        .catch(error => {
            console.error("Ошибка при получении идентификатора корзины:", error);
            throw error;
        });
}

function loadBasketItems(basketId) {
    const basketItemsContainer = document.getElementById("basket-items");
    const emptyBasketMessage = document.getElementById("empty-basket-message");
    const checkoutButton = document.getElementById("checkout-button");

    fetch(`http://localhost:8080/baskets/${basketId}/items`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка при загрузке товаров в корзине");
            }
            return response.json();
        })
        .then(items => {
            basketItemsContainer.innerHTML = "";
            if (items.length === 0) {
                emptyBasketMessage.classList.remove("hidden");
                checkoutButton.classList.add("hidden");
            } else {
                emptyBasketMessage.classList.add("hidden");
                checkoutButton.classList.remove("hidden");
                items.forEach(item => {
                    if (item.device && item.device.img && item.device.name && item.device.price) {
                        const itemElement = document.createElement("div");
                        itemElement.classList.add("basket-item");
                        itemElement.innerHTML = `
                            <img src="${item.device.img}" alt="${item.device.name}">
                            <span>${item.device.name}</span>
                            <span>${item.device.price} руб.</span>
                            <span>Количество: ${item.quantity}</span>
                        `;
                        basketItemsContainer.appendChild(itemElement);
                    } else {
                        console.warn("Некорректный элемент корзины:", item);
                    }
                });
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке товаров в корзине:", error);
            alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
        });
}

function createOrder(userId) {
    fetch(`http://localhost:8080/orders/${userId}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            alert("Заказ успешно создан!");
            const basketId = localStorage.getItem("basketId");
            loadBasketItems(basketId);
            document.getElementById("basket-modal").style.display = "none"; // Закрываем модальное окно корзины
        } else {
            throw new Error("Ошибка при создании заказа");
        }
    })
    .catch(error => {
        console.error("Ошибка при создании заказа:", error);
        alert("Не удалось создать заказ. Пожалуйста, попробуйте позже.");
    });
}