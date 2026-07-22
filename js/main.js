document.addEventListener("DOMContentLoaded", function () {  // Ce bloc attend que le HTML soit entièrement chargé avant d'exécuter le script,
                                                             // pour être sûr que tous les éléments du DOM existent déjà.
    // ===========================
    // NAVBAR
    // ===========================
    
    // Gère l'apparence de la barre de navigation lors du défilement de la page.

    const navbar = document.querySelector(".nav-summit"); // Sélectionne l'élément de la barre de navigation.
    

    window.addEventListener("scroll", function () { // À chaque défilement de la page.

        if (window.scrollY > 80) {  // Si l'utilisateur a défilé de plus de 80px vers le bas.
            navbar.classList.add("navbar-scroll"); // ...on ajoute une classe CSS qui change le style de la navbar
        } else {  // Sinon (en haut de page)
            navbar.classList.remove("navbar-scroll");   // ...on retire cette classe pour revenir au style initial.
        }

    });

    // ===========================
    // MENU HAMBURGER
    // ===========================
    // Gère l'ouverture/fermeture du menu mobile (icône "hamburger").

    const menuToggle = document.querySelector(".menu-toggle"); // Le bouton hamburger cliquable.
    const menu = document.querySelector(".nav-summit ul");  // La liste de liens du menu de navigation.

    menuToggle.addEventListener("click", function () { // Au clic sur le bouton hamburger...
        menu.classList.toggle("active");  // ...on bascule (ajoute/retire) la classe "active" qui affiche ou cache le menu.
    });
 // ===========================
 // ANIMATIONS AU SCROLL
 // ===========================
 // Anime l'apparition des sections lorsqu'elles deviennent visibles à l'écran.

const sections = document.querySelectorAll(".fade-in, .slide-in, .zoom-in"); // Récupère tous les éléments ayant une classe d'animation (fondu, glissement, zoom).

const observer = new IntersectionObserver(function(entries){ // Crée un observateur qui détecte quand un élément entre dans la zone visible du navigateur.

    entries.forEach(function(entry){ // Pour chaque élément observé...

        if(entry.isIntersecting){   // ...si l'élément est actuellement visible à l'écran...

            entry.target.classList.add("visible"); // ...on ajoute la classe "visible" qui déclenche l'animation CSS.
 

        }

    });

},{
    threshold:0.2 // L'animation se déclenche dès que 20% de l'élément est visible.
});

sections.forEach(function(section){  // Pour chaque section trouvée...

    observer.observe(section);  // ...on demande à l'observateur de la surveiller.

});


// ===========================
// SYSTÈME D'ONGLETS (TABS)
// ===========================

// Permet de basculer entre différents contenus via des boutons d'onglets.
 

const boutons = document.querySelectorAll(".tab-btn");// Tous les boutons d'onglets.
const contenus = document.querySelectorAll(".tab-content"); // Tous les blocs de contenu associés aux onglets.
 

boutons.forEach(function(bouton){ // Pour chaque bouton d'onglet...
    
 
    bouton.addEventListener("click", function(){  // ...au clic sur ce bouton...
 
      
        boutons.forEach(function(btn){
            btn.classList.remove("active");    // On désactive visuellement tous les boutons.
         
        });
 
        contenus.forEach(function(contenu){
            contenu.classList.remove("active");    // On cache tous les contenus d'onglets.
         
        });
 
        bouton.classList.add("active");   // On active visuellement le bouton cliqué.
 
      
        const id = bouton.dataset.tab;   // Récupère l'identifiant du contenu à afficher (attribut data-tab).
      
        document.getElementById(id).classList.add("active");    // Affiche le contenu correspondant à l'onglet cliqué.
 
     
    });
 
});

// ===========================
// FILTRAGE DES INTERVENANTS
// ===========================
// Permet de filtrer les cartes des intervenants par catégorie.

const boutonsFiltre = document.querySelectorAll(".filter-btn"); // Boutons de filtre (ex: "Tous", "Conférenciers", "Invités", etc.).
const cartes = document.querySelectorAll(".speaker-card"); // Toutes les cartes d'intervenants affichées.

boutonsFiltre.forEach(function(bouton){ // Pour chaque bouton de filtre...

    bouton.addEventListener("click", function(){ // ...au clic...

         // Enlever le bouton actif

        boutonsFiltre.forEach(function(btn){
            btn.classList.remove("active"); // Désactive visuellement tous les boutons de filtre. 
        });

        bouton.classList.add("active");  // Active visuellement le bouton cliqué.
         
            // Catégorie choisie
        const categorie = bouton.dataset.filter;  // Récupère la catégorie à filtrer (attribut data-filter).

        cartes.forEach(function(carte){      // Pour chaque carte d'intervenant...

            if(categorie === "all"){  // Si le filtre choisi est "tous"...

                carte.classList.remove("hidden"); // ...on affiche toutes les cartes.

            }else if(carte.dataset.category === categorie){   // Si la catégorie de la carte correspond au filtre choisi

                carte.classList.remove("hidden");    // ...on l'affiche.

            }else{   // Sinon (catégorie différente)...

                carte.classList.add("hidden"); // ...on la cache.

            }

        });

    });

});

// ================================
// VALIDATION DU FORMULAIRE
// ================================

// Valide les champs du formulaire d'inscription avant l'envoi.

const form = document.getElementById("registration-form"); // Le formulaire d'inscription.

if (form) {

    const fullname = document.getElementById("fullname"); // Champ nom complet.
    const email = document.getElementById("email"); // Champ email.
    const phone = document.getElementById("phone");  // Champ téléphone.
    const participation = document.getElementById("participation");   // Champ type de participation (select).
    const country = document.getElementById("country"); // Champ pays (select).
    const message = document.getElementById("message");// Champ message/commentaire.
    const successAlert = document.getElementById("global-success"); // Message de succès affiché après validation.

    function showError(input, msg) {    // Affiche un message d'erreur sous un champ donné.
        const formGroup = input.parentElement; // Récupère le conteneur parent du champ (pour styliser tout le groupe).
        formGroup.classList.remove("success");  // Retire l'état "succès" s'il était présent.
        formGroup.classList.add("error"); // Ajoute l'état "erreur" (ex: bordure rouge).
        formGroup.querySelector(".error-message").textContent = msg;  // Affiche le texte du message d'erreur.
    }

    function showSuccess(input) { 
        // Marque un champ comme valide.
        const formGroup = input.parentElement;
        formGroup.classList.remove("error");// Retire l'état "erreur".
        formGroup.classList.add("success");  // Ajoute l'état "succès" (ex: bordure verte).
        formGroup.querySelector(".error-message").textContent = "";   // Vide le message d'erreur.
    }

    function checkEmail(emailValue) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);     // Vérifie que l'email a un format valide via une expression régulière simple.
    }

    function checkPhone(phoneValue) {
        return /^[0-9+\s]{8,20}$/.test(phoneValue); // Vérifie que le téléphone contient uniquement des chiffres, espaces, ou "+",
                                                 // avec une longueur comprise entre 8 et 20 caractères.
    }

    form.addEventListener("submit", function(e) { // À la soumission du formulaire...

        e.preventDefault();  // ...on empêche le rechargement par défaut de la page.
 
        let isValid = true;  // Variable qui suivra si tous les champs sont valides.

        // Nom
        if (fullname.value.trim() === "") {
            showError(fullname, "Veuillez saisir votre nom.");   // Si le champ nom est vide (après suppression des espaces)...
            isValid = false;
        } else {
            showSuccess(fullname);
        }

        // Email
        if (email.value.trim() === "") {
            showError(email, "Veuillez saisir votre email.");  // Si l'email est vide...
            isValid = false;
        } else if (!checkEmail(email.value.trim())) {
            showError(email, "Adresse email invalide.");   // Si l'email est rempli mais mal formaté...
            isValid = false;
        } else {
            showSuccess(email);
        }

        // Téléphone
        if (phone.value.trim() === "") {
            showError(phone, "Veuillez saisir votre téléphone.");    // Si le téléphone est vide...
            isValid = false;
        } else if (!checkPhone(phone.value.trim())) {
            showError(phone, "Numéro invalide.");   // Si le format du téléphone est invalide...
            isValid = false;
        } else {
            showSuccess(phone);
        }

        // Participation

        if (participation.value === "") {
            showError(participation, "Choisissez un type.");   // Si aucune option de participation n'est sélectionnée...
            isValid = false;
        } else {
            showSuccess(participation);
        }

        // Pays
        if (country.value === "") {
            showError(country, "Sélectionnez un pays.");    // Si aucun pays n'est sélectionné...
            isValid = false;
        } else {
            showSuccess(country);
        }

        // Message
        if (message.value.trim().length < 20) {
            showError(message, "20 caractères minimum.");   // Si le message contient moins de 20 caractères...
            isValid = false;
        } else {
            showSuccess(message);
        }

        // Succès
        if (isValid) {   // Si tous les champs sont valides...

            successAlert.style.display = "flex";   // ...on affiche le message de succès global.

            form.reset(); // On réinitialise le formulaire (vide tous les champs).

            document
                .querySelectorAll(".form-group") // On retire les styles "succès" de tous les groupes de champs
                .forEach(group => group.classList.remove("success")); // pour que le formulaire soit propre lors d'une nouvelle utilisation.

            window.scrollTo({
                top: 0,
                behavior: "smooth"   // On fait remonter la page en haut en douceur pour montrer le message de succès.
            });

        } else {  // Si au moins un champ est invalide...


            successAlert.style.display = "none";  // ...on masque le message de succès. 
        }

    });

}

// ================================
// Bouton Retour en haut
// ================================
// Gère l'affichage et le comportement du bouton "retour en haut de page".

const backToTop = document.getElementById("backToTop"); // Le bouton "retour en haut".

if (backToTop) {   // Si ce bouton existe sur la page...

    window.addEventListener("scroll", () => { // À chaque défilement...

        if (window.scrollY > 300) { // Si on a défilé de plus de 300px...
            backToTop.classList.add("show");  // ...on affiche le bouton.
        } else {  // Sinon...
            backToTop.classList.remove("show");  // ...on le cache.
        }

    });

    backToTop.addEventListener("click", () => {  // Au clic sur le bouton...

        window.scrollTo({
            top: 0,
            behavior: "smooth"   // ...on remonte en haut de la page avec une animation fluide.
        });

    });

}
// ================================
// Année dynamique du footer
// ================================
// Met à jour automatiquement l'année affichée dans le pied de page.

const currentYear = document.getElementById("currentYear"); // L'élément qui doit afficher l'année en cours.

if (currentYear) {  // Si cet élément existe...
    currentYear.textContent = new Date().getFullYear(); // ...on y insère l'année actuelle (calculée automatiquement).
}

// ================================
// GESTION DU THÈME CLAIR / SOMBRE
// ================================
// Permet à l'utilisateur de basculer entre thème clair et sombre,
// et de mémoriser son choix dans le navigateur.


const themeToggle = document.getElementById("theme-toggle"); // Le bouton qui permet de changer de thème.

// Charger le thème enregistré
const savedTheme = localStorage.getItem("theme"); // Récupère le thème précédemment enregistré par l'utilisateur (s'il existe).

if (savedTheme === "light") { // Si le thème enregistré est "light" (clair)...
    document.documentElement.setAttribute("data-theme", "light"); // ...on applique l'attribut qui active le thème clair via le CSS.
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>'; // On affiche une icône de lune (pour proposer de repasser en sombre).
} else {  // Sinon (thème sombre par défaut ou non défini)...
    document.documentElement.removeAttribute("data-theme"); // ...on retire l'attribut de thème clair (donc thème sombre par défaut).
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';  // On affiche une icône de soleil (pour proposer de passer en clair).
}

themeToggle.addEventListener("click", () => {  // Au clic sur le bouton de changement de thème...

    const isLight = document.documentElement.getAttribute("data-theme") === "light"; // On vérifie si le thème actuel est déjà "light".

    if (isLight) {  // Si on est actuellement en thème clair...

        document.documentElement.removeAttribute("data-theme");  // ...on repasse en thème sombre.
        localStorage.setItem("theme", "dark");   // On enregistre ce choix pour la prochaine visite.
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';   // On met à jour l'icône (soleil = passer en clair).

    } else {  // Sinon (on est en thème sombre)...

        document.documentElement.setAttribute("data-theme", "light");  // ...on passe en thème clair.
        localStorage.setItem("theme", "light"); // On enregistre ce choix.
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';// On met à jour l'icône (lune = passer en sombre).

    }

});

// ================================
// COMPTE À REBOURS DE LA CONFÉRENCE
// ================================

// Date fictive de la conférence (20 mai 2027 à 09h00)
const targetDate = new Date("2027-05-20T09:00:00").getTime();

// Récupération des éléments HTML qui afficheront le temps restant
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// Fonction qui met à jour le compte à rebours
function updateCountdown() {

    // Date et heure actuelles
    const now = new Date().getTime();

    // Calcul du temps restant avant la conférence
    const distance = targetDate - now;

    // Si la date est dépassée, afficher uniquement des zéros
    if (distance <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;
    }

    // Calcul du nombre de jours restants
    days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));

    // Calcul du nombre d'heures restantes
    hours.textContent = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    // Calcul du nombre de minutes restantes
    minutes.textContent = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    // Calcul du nombre de secondes restantes
    seconds.textContent = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

}

// Premier affichage du compte à rebours dès le chargement de la page
updateCountdown();

// Mise à jour automatique du compte à rebours toutes les secondes
setInterval(updateCountdown, 1000);

// ================================
// COMPTEURS ANIMÉS AU SCROLL
// ================================

// Sélectionne tous les éléments contenant une statistique
const counters = document.querySelectorAll(".stat_number");

// Création d'un observateur qui détecte lorsque les compteurs
// deviennent visibles à l'écran
const observerCounter = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        // Si le compteur n'est pas encore visible, ne rien faire
        if (!entry.isIntersecting) return;

        // Récupère le compteur actuellement affiché
        const counter = entry.target;

        // Récupère la valeur finale à atteindre (data-target)
        const target = Number(counter.dataset.target);

        // Valeur de départ du compteur
        let value = 0;

        // Détermine l'incrément à chaque mise à jour
        const increment = Math.ceil(target / 80);

        // Lance l'animation du compteur
        const timer = setInterval(() => {

            // Augmente progressivement la valeur
            value += increment;

            // Arrête l'animation lorsque la valeur cible est atteinte
            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            // Met à jour le texte affiché
            counter.textContent = value.toLocaleString();

        }, 20);

        // Désactive l'observation pour éviter de relancer l'animation
        observerCounter.unobserve(counter);

    });

}, {
    // Déclenche l'animation lorsque 50 % de l'élément est visible
    threshold: 0.5
});

// Commence à observer chacun des compteurs
counters.forEach(counter => {

    observerCounter.observe(counter);

});
// Lecture / Pause
playPauseBtn.addEventListener("click", function () {

    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        playPauseBtn.setAttribute("aria-label", "Mettre la vidéo en pause");
        playPauseBtn.setAttribute("title", "Pause");
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        playPauseBtn.setAttribute("aria-label", "Lire la vidéo");
        playPauseBtn.setAttribute("title", "Lecture");
    }

});

// Son / Muet
muteBtn.addEventListener("click", function () {

    video.muted = !video.muted;

    if (video.muted) {
        muteBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
        muteBtn.setAttribute("aria-label", "Activer le son");
        muteBtn.setAttribute("title", "Activer le son");
    } else {
        muteBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
        muteBtn.setAttribute("aria-label", "Couper le son");
        muteBtn.setAttribute("title", "Couper le son");
    }

});
});