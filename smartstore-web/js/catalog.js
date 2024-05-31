document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.querySelector('.product-grid');

    fetch('http://localhost:8080/devices/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${device.img}" alt="${device.name}">
                    <h3>${device.name}</h3>
                    <p>Цена: ${device.price} руб.</p>
                    <button data-user-id="1" data-device-id="${device.id}">Добавить в корзину</button>
                `;
                productGrid.appendChild(productCard);
            });
        });

    productGrid.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const userId = event.target.getAttribute('data-user-id');
            const deviceId = event.target.getAttribute('data-device-id');
            addToBasket(userId, deviceId);
        }
    });
});

function addToBasket(userId, deviceId) {
    fetch(`http://localhost:8080/baskets/add/${userId}/${deviceId}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            alert('Товар успешно добавлен в корзину');
        } else {
            throw new Error('Failed to add to basket');
        }
    })
    .catch(error => {
        console.error('Ошибка при добавлении товара в корзину:', error);
        alert('Ошибка при добавлении товара в корзину: ' + error.message);
    });
}
