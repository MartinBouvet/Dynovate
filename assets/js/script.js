document.addEventListener("DOMContentLoaded", function() {
    // Gestion du loader
    window.addEventListener("load", function() {
        setTimeout(() => {
            const loader = document.querySelector(".loader-container");
            if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);
            }
        }, 1500); // Affiche le loader pendant 1.5 secondes minimum
    });

    // Animation de l'icône Hero
    const iconContainers = document.querySelectorAll(".icon-container");
    iconContainers.forEach(container => {
        const delay = container.getAttribute("data-delay") || 0;
        container.style.animationDelay = `${delay}s`;
    });

    // Navigation responsive
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function() {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Animation des barres du hamburger
            const spans = navToggle.querySelectorAll("span");
            if (navToggle.classList.contains("active")) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }

    // Gestion du menu déroulant sur mobile
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector("a");
        if (window.innerWidth <= 768 && dropdownLink) {
            dropdownLink.addEventListener("click", function(e) {
                e.preventDefault();
                dropdown.classList.toggle("active");
            });
        }
    });

    // Navbar qui change de couleur au scroll
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // Gestion du chatbot
    const chatbotToggle = document.querySelector(".chatbot-toggle");
    const chatbotWindow = document.querySelector(".chatbot-window");
    const chatbotClose = document.querySelector(".chatbot-close");
    const chatbotInput = document.querySelector(".chatbot-input input");
    const chatbotSend = document.querySelector(".send-btn");
    const chatbotMessages = document.querySelector(".chatbot-messages");

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener("click", function() {
            chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
        });

        if (chatbotClose) {
            chatbotClose.addEventListener("click", function() {
                chatbotWindow.style.display = "none";
            });
        }

        if (chatbotInput && chatbotSend && chatbotMessages) {
            // Fonction pour envoyer un message
            const sendMessage = () => {
                const message = chatbotInput.value.trim();
                if (message) {
                    // Ajouter le message de l'utilisateur
                    addMessage(message, "user");
                    chatbotInput.value = "";
                    
                    // Simulation de réponse
                    setTimeout(() => {
                        getChatbotResponse(message);
                    }, 1000);
                }
            };

            // Envoyer message avec le bouton
            chatbotSend.addEventListener("click", sendMessage);
            
            // Envoyer message avec Enter
            chatbotInput.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    sendMessage();
                }
            });
        }
    }

    // Fonction pour ajouter un message au chatbot
    function addMessage(text, sender) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        
        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Fonction pour obtenir une réponse du chatbot
    function getChatbotResponse(message) {
        // Réponses prédéfinies
        const responses = [
            "Merci pour votre message. Un de nos conseillers va vous répondre rapidement.",
            "Nous proposons plusieurs solutions d'IA pour améliorer vos communications. Souhaitez-vous en savoir plus sur une solution spécifique ?",
            "Dynovate offre des solutions pour mail, réseaux sociaux, téléphone et web. Quel canal vous intéresse le plus ?",
            "Je comprends votre question. Pour plus de détails, pourriez-vous me préciser votre secteur d'activité ?",
            "Excellente question ! Nos solutions sont personnalisables selon vos besoins spécifiques."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, "bot");
    }

    // Animation au scroll pour les éléments
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".service-card, .benefit-item, .feature-box");
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = "1";
                element.style.transform = element.classList.contains("benefit-item") 
                    ? "translateX(0)" 
                    : "translateY(0)";
            }
        });
    };

    // Initialiser les styles pour l'animation
    const elementsToAnimate = document.querySelectorAll(".service-card, .benefit-item, .feature-box");
    elementsToAnimate.forEach(element => {
        element.style.opacity = "0";
        element.style.transition = "all 0.5s ease";
        
        if (element.classList.contains("benefit-item")) {
            element.style.transform = "translateX(-20px)";
        } else {
            element.style.transform = "translateY(20px)";
        }
    });

    // Lancer l'animation au chargement initial et au scroll
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Appel initial pour les éléments déjà visibles

    // Appliquer la classe 'scrolled' à la navbar dès le chargement si nécessaire
    if (window.scrollY > 50) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.add("scrolled");
        }
    }
});