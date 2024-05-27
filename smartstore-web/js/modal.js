document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");
    const registerForm = document.getElementById("register-form");
    const userIcon = document.getElementById("user-icon");
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");

    if (userIcon) {
        userIcon.addEventListener("click", function(event) {
            event.preventDefault();
            const userId = localStorage.getItem("userId");
            if (userId) {
                console.log("User already logged in, redirecting to profile.");
                window.location.href = "user.html";
            } else {
                console.log("User not logged in, showing modal.");
                modal.style.display = "block"; // Показываем модальное окно при клике на иконку пользователя
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener("click", function(event) {
            modal.style.display = "none"; // Закрываем модальное окно при клике на кнопку закрытия
        });
    }

    if (authForm) {
        authForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-password").value;
            loginUser(email, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;
            const address = document.getElementById("register-address").value;
            registerUser(email, password, address);
        });
    }
});

function loginUser(email, password) {
    fetch(`http://localhost:8080/users/login?email=${email}&password=${password}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Login failed");
        }
    })
    .then(user => {
        console.log("Login successful, user ID:", user.id);
        localStorage.setItem("userId", user.id);
        window.location.href = "user.html";
    })
    .catch(error => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
    });
}

function registerUser(email, password, address) {
    console.log("Attempting to register with email:", email);
    fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, address })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Registration failed");
        }
    })
    .then(message => {
        console.log("Registration successful:", message);
        alert(message);
        modal.style.display = "none"; // Закрываем модальное окно после успешной регистрации
    })
    .catch(error => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
    });
}
