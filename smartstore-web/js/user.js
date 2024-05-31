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
    fetch(`http://localhost:8080/orders/${userId}`)
    .then(response => response.json())
    .then(orders => {
        const ordersContainer = document.getElementById("orders");
        ordersContainer.innerHTML = "";
        if (orders.length === 0) {
            ordersContainer.innerText = "У вас нет заказов.";
        } else {
            orders.forEach(order => {
                const orderElement = document.createElement("div");
                orderElement.classList.add("order");
                orderElement.innerHTML = `
                    <h3>Заказ #${order.id}</h3>
                    <p>Дата: ${new Date(order.createdAt).toLocaleString()}</p>
                    <p>Товары:</p>
                    <ul>
                        ${order.devices.map(device => `<li>${device.name} - ${device.price} руб.</li>`).join('')}
                    </ul>
                `;
                ordersContainer.appendChild(orderElement);
            });
        }
    })
    .catch(error => {
        console.error("Error loading orders:", error);
        alert("Failed to load orders. Please try again.");
    });
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
        alert("Failed to update profile. Please try again.");
    });
}