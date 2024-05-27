document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");
    const registerForm = document.getElementById("register-form");
    const userIcon = document.getElementById("user-icon");
    const modal = document.getElementById("modal");
    const closeModalButtons = document.querySelectorAll("[id^=close-modal]"); // Ищем все элементы с ID, начинающимся с "close-modal"
    const switchToAuthLink = document.getElementById("switch-to-auth");
    const switchToRegisterLink = document.getElementById("switch-to-register");
    const authContainer = document.getElementById("auth-container");
    const registerContainer = document.getElementById("register-container");

    // Открытие модального окна при клике на иконку пользователя
    if (userIcon) {
        userIcon.addEventListener("click", function(event) {
            event.preventDefault();
            const userId = localStorage.getItem("userId");
            if (userId) {
                window.location.href = "user.html";
            } else {
                modal.style.display = "block"; // Показываем модальное окно при клике на иконку пользователя
            }
        });
    }

    // Закрытие модального окна
    closeModalButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            modal.style.display = "none"; // Закрываем модальное окно при клике на кнопку закрытия
        });
    });

    // Переключение на форму регистрации
    if (switchToRegisterLink) {
        switchToRegisterLink.addEventListener("click", function(event) {
            event.preventDefault();
            authContainer.style.display = "none";
            registerContainer.style.display = "block";
        });
    }

    // Переключение на форму авторизации
    if (switchToAuthLink) {
        switchToAuthLink.addEventListener("click", function(event) {
            event.preventDefault();
            registerContainer.style.display = "none";
            authContainer.style.display = "block";
        });
    }

    // Обработка формы авторизации
    if (authForm) {
        authForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-password").value;
            loginUser(email, password);
        });
    }

    // Обработка формы регистрации
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
        },
    })
    .then(response => {
        console.log("Response status:", response.status);
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .then(user => {
        console.log("Login successful, user ID:", user.id);
        localStorage.setItem("userId", user.id); // Сохраняем id пользователя в локальное хранилище
        window.location.href = "user.html"; // Перенаправляем пользователя на страницу профиля
    })
    .catch(error => {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);  // Отображаем точное сообщение об ошибке
    });
}

function registerUser(email, password, address) {
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
        alert(message);
        modal.style.display = "none"; // Закрываем модальное окно после успешной регистрации
    })
    .catch(error => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
    });
}