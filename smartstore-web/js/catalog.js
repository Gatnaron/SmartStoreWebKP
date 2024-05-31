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
                    <button data-device-id="${device.id}">Добавить в корзину</button>
                `;
                productGrid.appendChild(productCard);
            });
        });

    productGrid.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const deviceId = event.target.getAttribute('data-device-id');
            addToBasket(deviceId);
        }
    });
});

function addToBasket(deviceId) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.push(deviceId);
    localStorage.setItem('basket', JSON.stringify(basket));
    alert('Товар добавлен в корзину');
}