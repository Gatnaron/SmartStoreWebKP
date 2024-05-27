document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        // Если пользователь не аутентифицирован, перенаправляем его на страницу входа
        window.location.href = "index.html";
    } else {
        // Получаем данные пользователя и отображаем их на странице
        fetch(`http://localhost:8080/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                document.getElementById("email").textContent = user.email;
                document.getElementById("address").textContent = user.address;
            })
            .catch(error => console.error("Error fetching user data:", error));
    }
});
