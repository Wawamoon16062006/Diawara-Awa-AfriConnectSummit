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




});