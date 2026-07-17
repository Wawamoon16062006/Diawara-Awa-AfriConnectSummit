document.addEventListener("DOMContentLoaded", function () {

    // ===========================
    // NAVBAR
    // ===========================

    const navbar = document.querySelector(".nav-summit");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {
            navbar.classList.add("navbar-scroll");
        } else {
            navbar.classList.remove("navbar-scroll");
        }

    });


    // ===========================
    // MENU HAMBURGER
    // ===========================

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-summit ul");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

// ===========================
// ANIMATIONS AU SCROLL
// ===========================

const sections = document.querySelectorAll(".fade-in, .slide-in, .zoom-in");

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.2
});

sections.forEach(function(section){

    observer.observe(section);

});

const boutons = document.querySelectorAll(".tab-btn");
const contenus = document.querySelectorAll(".tab-content");

boutons.forEach(function(bouton){

    bouton.addEventListener("click", function(){

        boutons.forEach(function(btn){
            btn.classList.remove("active");
        });

        contenus.forEach(function(contenu){
            contenu.classList.remove("active");
        });

        bouton.classList.add("active");

        const id = bouton.dataset.tab;
        document.getElementById(id).classList.add("active");

    });

});

// ===========================
// FILTRAGE DES INTERVENANTS
// ===========================

const boutonsFiltre = document.querySelectorAll(".filter-btn");
const cartes = document.querySelectorAll(".speaker-card");

boutonsFiltre.forEach(function(bouton){

    bouton.addEventListener("click", function(){

        // Enlever le bouton actif
        boutonsFiltre.forEach(function(btn){
            btn.classList.remove("active");
        });

        bouton.classList.add("active");

        // Catégorie choisie
        const categorie = bouton.dataset.filter;

        cartes.forEach(function(carte){

            if(categorie === "all"){

                carte.classList.remove("hidden");

            }else if(carte.dataset.category === categorie){

                carte.classList.remove("hidden");

            }else{

                carte.classList.add("hidden");

            }

        });

    });

});

// ================================
// VALIDATION DU FORMULAIRE
// ================================

const form = document.getElementById("registration-form");

if (form) {

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const participation = document.getElementById("participation");
    const country = document.getElementById("country");
    const message = document.getElementById("message");
    const successAlert = document.getElementById("global-success");

    function showError(input, msg) {
        const formGroup = input.parentElement;
        formGroup.classList.remove("success");
        formGroup.classList.add("error");
        formGroup.querySelector(".error-message").textContent = msg;
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove("error");
        formGroup.classList.add("success");
        formGroup.querySelector(".error-message").textContent = "";
    }

    function checkEmail(emailValue) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    }

    function checkPhone(phoneValue) {
        return /^[0-9+\s]{8,20}$/.test(phoneValue);
    }

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        let isValid = true;

        // Nom
        if (fullname.value.trim() === "") {
            showError(fullname, "Veuillez saisir votre nom.");
            isValid = false;
        } else {
            showSuccess(fullname);
        }

        // Email
        if (email.value.trim() === "") {
            showError(email, "Veuillez saisir votre email.");
            isValid = false;
        } else if (!checkEmail(email.value.trim())) {
            showError(email, "Adresse email invalide.");
            isValid = false;
        } else {
            showSuccess(email);
        }

        // Téléphone
        if (phone.value.trim() === "") {
            showError(phone, "Veuillez saisir votre téléphone.");
            isValid = false;
        } else if (!checkPhone(phone.value.trim())) {
            showError(phone, "Numéro invalide.");
            isValid = false;
        } else {
            showSuccess(phone);
        }

        // Participation
        if (participation.value === "") {
            showError(participation, "Choisissez un type.");
            isValid = false;
        } else {
            showSuccess(participation);
        }

        // Pays
        if (country.value === "") {
            showError(country, "Sélectionnez un pays.");
            isValid = false;
        } else {
            showSuccess(country);
        }

        // Message
        if (message.value.trim().length < 20) {
            showError(message, "20 caractères minimum.");
            isValid = false;
        } else {
            showSuccess(message);
        }

        // Succès
        if (isValid) {

            successAlert.style.display = "flex";

            form.reset();

            document
                .querySelectorAll(".form-group")
                .forEach(group => group.classList.remove("success"));

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            successAlert.style.display = "none";

        }

    });

}

// ================================
// Bouton Retour en haut
// ================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ================================
// Année dynamique du footer
// ================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const themeToggle = document.getElementById("theme-toggle");

// Charger le thème enregistré
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
} else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle.addEventListener("click", () => {

    const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {

        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';

    } else {

        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';

    }

});

});