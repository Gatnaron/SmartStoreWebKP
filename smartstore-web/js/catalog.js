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
            const userId = localStorage.getItem("userId");

            if (!userId) {
                alert("Пожалуйста, войдите в систему, чтобы добавить товар в корзину.");
                return;
            }

            fetch(`http://localhost:8080/baskets/${userId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ deviceId })
            })
                .then(response => {
                    if (response.ok) {
                        alert('Товар добавлен в корзину');
                    } else {
                        throw new Error("Ошибка при добавлении товара в корзину");
                    }
                })
                .catch(error => {
                    console.error('Ошибка при добавлении товара в корзину:', error);
                    alert('Не удалось добавить товар в корзину. Пожалуйста, попробуйте снова.');
                });
        }
    });
});
