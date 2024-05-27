document.addEventListener('DOMContentLoaded', function () {
    const basketItems = document.getElementById('basket-items');
    const userId = 1;

    fetch(`/api/baskets/${userId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const basketItem = document.createElement('div');
                basketItem.classList.add('basket-item');
                basketItem.innerHTML = `
                    <img src="${item.device.img}" alt="${item.device.name}">
                    <h3>${item.device.name}</h3>
                    <p>Цена: ${item.device.price} руб.</p>
                    <button data-item-id="${item.id}">Удалить</button>
                `;
                basketItems.appendChild(basketItem);
            });
        });

    basketItems.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const itemId = event.target.getAttribute('data-item-id');

            fetch(`http://localhost:8080/baskets/remove/${itemId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    event.target.parentElement.remove();
                    alert('Товар удален из корзины');
                })
                .catch(error => {
                    console.error('Ошибка при удалении товара из корзины:', error);
                });
        }
    });

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Купить все';
    buyButton.addEventListener('click', function () {
        fetch(`http://localhost:8080/baskets/${userId}/buyAll`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                basketItems.innerHTML = '';
                alert('Все товары куплены');
            })
            .catch(error => {
                console.error('Ошибка при покупке товаров:', error);
            });
    });
    basketItems.appendChild(buyButton);
});
