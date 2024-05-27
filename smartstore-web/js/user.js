document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("User not logged in.");
        window.location.href = "index.html";
    } else {
        loadUserProfile(userId);
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
            alert("Profile updated successfully!");
            window.location.reload(); // Перезагружаем страницу для обновления данных
        } else {
            throw new Error("Profile update failed");
        }
    })
    .catch(error => {
        console.error("Profile update failed:", error);
        alert("Failed to update profile. Please try again.");
    });
}
