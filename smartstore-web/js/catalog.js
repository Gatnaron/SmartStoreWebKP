document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.querySelector('.product-grid');

    fetch('http://localhost:8080/devices')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${device.img}" alt="${device.name}">
                    <h3>${device.name}</h3>
                    <p>Цена: ${device.price} руб.</p>
                    <button data-device-id="${device.id}">Добавить в корзину</button>
                `;
                productGrid.appendChild(productCard);
            });
        });

    productGrid.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const deviceId = event.target.getAttribute('data-device-id');
            const userId = 1; // Assume the user ID is 1 for now

            fetch(`http://localhost:8080/baskets/${userId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ deviceId })
            })
                .then(response => response.json())
                .then(data => {
                    alert('Товар добавлен в корзину');
                })
                .catch(error => {
                    console.error('Ошибка при добавлении товара в корзину:', error);
                });
        }
    });

    const basketModal = document.getElementById("basket-modal");
    const closeBasketModalButton = document.getElementById("close-basket-modal");
    const userBasketIcon = document.getElementById("user-basket-icon");

    // Открытие модального окна при клике на иконку корзины пользователя
    userBasketIcon.addEventListener("click", function(event) {
        event.preventDefault();
        basketModal.style.display = "block";
    });

    // Закрытие модального окна при клике на кнопку закрытия
    closeBasketModalButton.addEventListener("click", function(event) {
        basketModal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его области
    window.addEventListener("click", function(event) {
        if (event.target === basketModal) {
            basketModal.style.display = "none";
        }
    });
});

