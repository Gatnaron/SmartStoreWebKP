document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");
    const registerForm = document.getElementById("register-form");
    const userIcon = document.getElementById("user-icon");
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");

    userIcon.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block"; // Показываем модальное окно при клике на иконку пользователя
    });

    closeModalButton.addEventListener("click", function(event) {
        modal.style.display = "none"; // Закрываем модальное окно при клике на кнопку закрытия
    });

    authForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("auth-email").value;
        const password = document.getElementById("auth-password").value;
        loginUser(email, password);
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const address = document.getElementById("register-address").value;
        registerUser(email, password, address);
    });
});

function loginUser(email, password) {
    fetch(`http://localhost:8080/users/login?email=${email}&password=${password}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Login failed");
        }
    })
    .then(user => {
        localStorage.setItem("userId", user.id); // Сохраняем id пользователя в локальное хранилище
        closeModal(); // Закрываем модальное окно
    })
    .catch(error => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
    });
}

function registerUser(email, password, address) {
    fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password, address: address })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Registration failed");
        }
    })
    .then(message => {
        alert(message);
        closeModal(); // Закрываем модальное окно после успешной регистрации
    })
    .catch(error => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
    });
}