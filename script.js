document.addEventListener('DOMContentLoaded', function() {
    
  
    const containers = [
        document.getElementById('container-1'),
     
        document.getElementById('container-2'), 
        document.getElementById('container-3'),
        document.getElementById('container-4')
    ];

    const lines = [
        document.getElementById('line-1'),
        document.getElementById('line-2'),
        document.getElementById('line-3'),
        document.getElementById('line-4')
    ];

    function checkContainerInView() {

        containers.forEach((container, index) => {
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const line = lines[index];

            // Define the visibility criteria:
            const isVisible = (
                rect.top <= window.innerHeight * 0.75 && 
                rect.bottom >= window.innerHeight * 0.55 
            );

        
            if (line) { 
                if (isVisible) {
                    // If this container is visible, make its line active
                    line.classList.add('line-active');
                } else {
                    // If it's not visible, make its line inactive
                    line.classList.remove('line-active');
                }
            }
        });
    }

    // 4. Attach the function to the scroll event
    window.addEventListener('scroll', checkContainerInView);


    checkContainerInView();

    let slideIndex = 0;
    const cardsPerView = 3;

    const carousel = document.getElementById('carousel');
    const rightArrow = document.querySelector('.right-arrow');
    const leftArrow = document.querySelector('.left-arrow');
    const items = carousel ? carousel.querySelectorAll('.project-item') : [];
    const totalItems = items.length;
    const maxSlides = totalItems > 0 ? Math.ceil(totalItems / cardsPerView) : 1;
    
    function updateControls() {
        if (leftArrow) {
            leftArrow.style.opacity = slideIndex === 0 ? '0.5' : '1';
            leftArrow.style.pointerEvents = slideIndex === 0 ? 'none' : 'auto';
        }
        if (rightArrow) {
            rightArrow.style.opacity = slideIndex === maxSlides - 1 ? '0.5' : '1';
            rightArrow.style.pointerEvents = slideIndex === maxSlides - 1 ? 'none' : 'auto';
        }
    }

    function slideCards(direction) {
        if (!carousel) return; 

        if (direction === 'right') {
            if (slideIndex < maxSlides - 1) {
                slideIndex++;
            }
        } else if (direction === 'left') {
            if (slideIndex > 0) {
                slideIndex--;
            }
        }

        const transformValue = `translateX(-${slideIndex * 100}%)`;

        carousel.style.transform = transformValue;

        updateControls();
    }
    
    if (rightArrow) rightArrow.addEventListener('click', () => slideCards('right'));
    if (leftArrow) leftArrow.addEventListener('click', () => slideCards('left'));
    if (carousel) updateControls(); 


    const targetH1 = document.querySelector('.header-content h1');
    const textToType = 'RONIX';
    let charIndex = 0;
    const typingSpeed = 200; 

    if (targetH1) {
        targetH1.textContent = ''; 

        function typeText() {
            if (charIndex < textToType.length) {
                targetH1.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            }
        }

        typeText();
    }
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-navbar').offsetHeight || 
                                     window.innerHeight * 0.12; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Hide mobile menu after clicking a link
                const mobileMenu = document.getElementById('navbarNav');
                if (mobileMenu && mobileMenu.classList.contains('show-menu')) {
                    mobileMenu.classList.remove('show-menu');
                }
            }
        });
    });

    // ---

    
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('navbarNav');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
       
            navLinks.classList.toggle('show-menu');
            
          
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('show-menu')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }


    // --- Netlify-form AJAX submit handler (Contact + Newsletter forms) ---
    // Submits in the background so the visitor never leaves the page, and
    // shows an inline success/error message via the .form-feedback element
    // that follows the <form> (see data-feedback-for on that element).
    function encodeFormData(formEl) {
        const data = new FormData(formEl);
        return new URLSearchParams(data).toString();
    }

    document.querySelectorAll('form[data-netlify="true"]').forEach(function (formEl) {
        formEl.addEventListener('submit', function (e) {
            e.preventDefault();

            const feedbackEl = document.querySelector('[data-feedback-for="' + formEl.id + '"]');
            const submitBtn = formEl.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : null;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending...';
            }
            if (feedbackEl) {
                feedbackEl.classList.remove('is-success', 'is-error');
                feedbackEl.textContent = '';
            }

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encodeFormData(formEl)
            })
                .then(function (response) {
                    if (!response.ok) throw new Error('Network response was not ok');
                    if (feedbackEl) {
                        feedbackEl.textContent = "Thanks — we'll be in touch shortly.";
                        feedbackEl.classList.add('is-success');
                    }
                    formEl.reset();
                })
                .catch(function () {
                    if (feedbackEl) {
                        feedbackEl.textContent = "Something went wrong — please email us directly instead.";
                        feedbackEl.classList.add('is-error');
                    }
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
        });
    });

});
// Smooth Scrolling for all anchor links starting with '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) { 
            e.preventDefault(); 
            
            const navbarElement = document.querySelector('.main-navbar');
            const headerOffset = navbarElement ? navbarElement.offsetHeight : 0;
            
            // Special handling for the down arrow in the header
            // Agar target #home hai (jo aapka container-2 hai)
            let offsetAdjustment = headerOffset;
            
            if (targetId === '#home') { 
                // Arrow ke liye, hum thoda kam offset denge taaki woh content ki shuruaat par aaye
                offsetAdjustment = headerOffset * 0.9; // Example: 90% of navbar height
            }
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offsetAdjustment; 

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Hide mobile menu after clicking a link
            const mobileMenu = document.getElementById('navbarNav');
            if (mobileMenu && mobileMenu.classList.contains('show-menu')) {
                mobileMenu.classList.remove('show-menu');
            }
        }
    });
});