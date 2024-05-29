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
            const userId = localStorage.getItem('userId');
            if (userId) {
                fetch(`http://localhost:8080/baskets/add?userId=${userId}&deviceId=${deviceId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add item to basket');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Товар добавлен в корзину');
                })
                .catch(error => {
                    console.error('Ошибка при добавлении товара в корзину:', error);
                });
            } else {
                alert('Пожалуйста, войдите в систему, чтобы добавить товар в корзину.');
            }
        }
    });
});
