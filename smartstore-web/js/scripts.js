let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// Проверка наличия userId в localStorage при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        const userIcon = document.getElementById("user-icon");
        userIcon.addEventListener("click", function() {
            alert("Пожалуйста, войдите в систему.");
        });
    }
});
