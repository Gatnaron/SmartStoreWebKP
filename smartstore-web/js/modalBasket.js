document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById("basket-icon");
    const basketModal = document.getElementById("basket-modal");
    const closeBasketModalButton = document.getElementById("close-basket-modal");
    const basketItemsContainer = document.getElementById("basket-items");
    const emptyBasketMessage = document.getElementById("empty-basket-message");

    basketIcon.addEventListener("click", function(event) {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        if (userId) {
            loadBasketItems(userId);
            basketModal.style.display = "block"; // Показываем модальное окно корзины
        } else {
            alert("Пожалуйста, войдите в систему, чтобы посмотреть корзину.");
        }
    });

    closeBasketModalButton.addEventListener("click", function(event) {
        basketModal.style.display = "none"; // Закрываем модальное окно корзины при клике на кнопку закрытия
    });
});

function loadBasketItems(userId) {
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