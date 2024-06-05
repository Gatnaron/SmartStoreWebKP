document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("User not logged in.");
        window.location.href = "index.html";
    } else {
        loadUserProfile(userId);
        loadUserOrders(userId);
    }

    const profileForm = document.getElementById("edit-mode");
    const editButton = document.getElementById("edit-settings");
    const viewMode = document.getElementById("view-mode");
    const logoutButton = document.getElementById("logout-button");

    if (editButton) {
        editButton.addEventListener("click", function() {
            viewMode.style.display = "none";
            profileForm.style.display = "block";
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("userId");
            window.location.href = "index.html";
        });
    }

    if (profileForm) {
        profileForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const password = document.getElementById("edit-password").value;
            const address = document.getElementById("edit-address").value;
            updateUserProfile(userId, password, address);
        });
    }

    // Close QR modal
    const qrModal = document.getElementById("qr-modal");
    const closeQrModalButton = document.getElementById("close-qr-modal");

    closeQrModalButton.addEventListener("click", function() {
        qrModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === qrModal) {
            qrModal.style.display = "none";
        }
    });
});

function loadUserProfile(userId) {
    fetch(`http://localhost:8080/users/${userId}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch user data");
        }
    })
    .then(user => {
        document.getElementById("email").innerText = user.email;
        document.getElementById("address").innerText = user.address;
    })
    .catch(error => {
        console.error("Error loading profile data:", error);
        alert("Failed to load profile data. Please try again.");
    });
}

function loadUserOrders(userId) {
    fetch(`http://localhost:8080/orders/user/${userId}`)
    .then(response => response.json())
    .then(orders => {
        const ordersContainer = document.getElementById("orders");
        ordersContainer.innerHTML = "";
        if (orders.length === 0) {
            ordersContainer.innerText = "У вас нет заказов.";
        } else {
            orders.forEach(order => {
                const orderElement = document.createElement("div");
                orderElement.classList.add("order-card");
                orderElement.innerHTML = `
                    <h3>Заказ #${order.id}</h3>
                    <p>Дата: ${new Date(order.dateTime).toLocaleString()}</p>
                    <p>Сумма: ${order.totalAmount} руб.</p>
                    <button class="qr-button" data-order-id="${order.id}"></button>
                `;
                ordersContainer.appendChild(orderElement);
            });

            // Add event listeners for QR buttons
            const qrButtons = document.querySelectorAll(".qr-button");
            qrButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const orderId = button.getAttribute("data-order-id");
                    generateQRCode(userId, orderId);
                });
            });
        }
    })
    .catch(error => {
        console.error("Error loading orders:", error);
        alert("Не удалось загрузить заказы. Пожалуйста, попробуйте позже.");
    });
}

function generateQRCode(userId, orderId) {
    const qrModal = document.getElementById("qr-modal");
    const qrCodeContainer = document.getElementById("qrcode");

    // Clear any existing QR code
    qrCodeContainer.innerHTML = "";

    // Generate new QR code
    const qrCode = new QRCode(qrCodeContainer, {
        text: `user_id:${userId}, order_id:${orderId}`,
        width: 256,
        height: 256,
    });

    // Display the modal
    qrModal.style.display = "block";
}

function updateUserProfile(userId, password, address) {
    fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, address })
    })
    .then(response => {
        if (response.ok) {
            alert("Profile updated successfully.");
            window.location.reload();
        } else {
            throw new Error("Failed to update profile");
        }
    })
    .catch(error => {
        console.error("Error updating profile:", error);
        alert("Не удалось обновить профиль. Пожалуйста, попробуйте позже.");
    });
}
