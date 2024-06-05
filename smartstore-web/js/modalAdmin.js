// Открытие модального окна редактирования товара
function openEditModal(product) {
    const modal = document.getElementById('edit-product-modal');
    modal.style.display = 'block';

    document.getElementById('edit-product-id').value = product.id;
    document.getElementById('edit-product-img').value = product.img;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-price').value = product.price;

    const brandSelect = document.getElementById('edit-product-brand');
    const typeSelect = document.getElementById('edit-product-type');

    // Устанавливаем текущие значения бренда и типа
    brandSelect.value = product.brand.id;
    typeSelect.value = product.type.id;
}

// Закрытие модального окна
function closeEditModal() {
    const modal = document.getElementById('edit-product-modal');
    modal.style.display = 'none';
}

// Обработчик для закрытия модального окна при клике на крестик
document.getElementById('close-edit-modal').onclick = closeEditModal;

// Обработчик для закрытия модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('edit-product-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Обработчик для формы редактирования товара
document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-product-id').value;
    const name = document.getElementById('edit-product-name').value;
    const price = parseFloat(document.getElementById('edit-product-price').value);
    const img = document.getElementById('edit-product-img').value;
    const typeId = parseInt(document.getElementById('edit-product-type').value);
    const brandId = parseInt(document.getElementById('edit-product-brand').value);

    const type = {
        id: typeId,
        name: document.getElementById('edit-product-type').selectedOptions[0].text
    };

    const brand = {
        id: brandId,
        name: document.getElementById('edit-product-brand').selectedOptions[0].text
    };

    const product = {
        id,
        name,
        price,
        img,
        type,
        brand
    };

    try {
        const response = await fetch(`http://localhost:8080/devices/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Товар успешно обновлен!');
            closeEditModal();
            loadProducts(); // Обновить список товаров
        } else {
            alert('Ошибка при обновлении товара.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Ошибка при обновлении товара.');
    }
});
