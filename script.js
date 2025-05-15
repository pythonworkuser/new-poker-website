// Enhanced JavaScript file for Poker Info Hub

document.addEventListener('DOMContentLoaded', () => {
    console.log('Poker Info Hub website loaded!');

    // Add a class to the body when the page loads for potential CSS animations
    document.body.classList.add('page-loaded');

    // Smooth scrolling for anchor links on the CURRENT page
    // This will only work for links pointing to sections within the same HTML file
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default and smooth scroll if the link is on the current page
            // Check if the href is just '#' or starts with '#', indicating an internal link
            if (this.getAttribute('href') === '#' || this.getAttribute('href').startsWith('#')) {
                 e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Scroll to the top of the element
                    });
                }
            }
        });
    });

    // Apply staggered fade-in/slide-in animation to relevant elements
    // We will apply animations based on element classes
    const animatedElements = document.querySelectorAll('.content-section, .ranking-item, .content-area, .sidebar');

    animatedElements.forEach((element, index) => {
        // Use a timeout to apply animation with a delay
        setTimeout(() => {
            // Determine which animation to apply based on element class
            let animationName = 'fadeIn'; // Default animation

            if (element.classList.contains('content-area')) {
                 animationName = 'slideInUp';
            } else if (element.classList.contains('sidebar')) {
                 // Determine slide direction based on class
                 if (element.classList.contains('left-sidebar')) {
                     animationName = 'slideInRight'; // Slide in from right for left sidebar on desktop
                 } else if (element.classList.contains('right-sidebar')) {
                      animationName = 'slideInRight'; // Slide in from right for right sidebar on desktop
                 }
                 // On smaller screens, sidebars might stack and use a different animation
                 // This is handled by the CSS media query overriding the animation
            }

            // Apply the animation and delay
            element.style.animationName = animationName;
            element.style.animationDuration = '0.8s'; // Same duration as defined in CSS
            element.style.animationTimingFunction = 'ease-out'; // Same timing function
            element.style.animationFillMode = 'forwards'; // Keep the end state of the animation

             // Add staggered delay only for content sections and ranking items within the main content area
             // Or for sidebars on desktop
            if (element.classList.contains('content-section') || element.classList.contains('ranking-item') || (element.classList.contains('sidebar') && window.innerWidth > 992)) {
                 element.style.animationDelay = `${index * 0.1}s`; // Stagger delay by 0.1s per element
            } else {
                 element.style.animationDelay = '0s'; // No stagger for main content area itself or sidebars on mobile
            }

            element.style.opacity = 1; // Make visible to allow animation to play
        }, 50); // Small initial delay before staggering starts
    });


    // Highlight active navigation link based on the current page URL
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // Get the filename

    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');

        // Check if the link's href matches the current page filename
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
         // Special case for the home page link when on the root URL
        if (currentPage === '' && linkHref === 'index.html') {
             link.classList.add('active');
        }
         // Handle links with anchors on the index page
        if (currentPage === 'index.html' && linkHref.startsWith('index.html#')) {
             // This requires more complex logic to check scroll position,
             // which is already partially implemented in the scroll listener above.
             // We'll rely on the scroll listener for highlighting anchor links on the index page.
        }
    });

    // Re-implement the scroll listener for highlighting nav links on the index page
    // This part remains largely the same as the previous version
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        const sections = document.querySelectorAll('.content-section');
        const indexPageNavLinks = document.querySelectorAll('nav ul li a[href^="index.html#"], nav ul li a[href="index.html"], nav ul li a[href="/"]');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Check if the top of the section is within the viewport
                if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
                    current = section.getAttribute('id');
                }
            });

            indexPageNavLinks.forEach(link => {
                link.classList.remove('active');
                 // Check if the link's href matches the current section ID or is the index page link
                if (link.getAttribute('href').includes(`#${current}`) || (current === '' && (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/'))) {
                    link.classList.add('active');
                }
            });
        });

        // Optional: Add a class to the nav link for the initially visible section on load
        // This part needs to be careful not to override the page-based highlighting on other pages
        if (currentPage === '' || currentPage === 'index.html') {
             const initialSection = document.elementFromPoint(10, window.innerHeight / 2); // Check element near center of viewport
             if (initialSection) {
                 const initialSectionId = initialSection.closest('.content-section')?.getAttribute('id');
                 if (initialSectionId) {
                     document.querySelector(`nav ul li a[href="index.html#${initialSectionId}"]`)?.classList.add('active');
                 } else {
                      // If no section is initially visible (e.g., at the very top), highlight the index link
                      document.querySelector('nav ul li a[href="index.html"], nav ul li a[href="/"]')?.classList.add('active');
                 }
             }
        }
    }


});

// You can add more advanced JavaScript features here, such as:
// - Fetching news updates from an API
// - Implementing a simple quiz or interactive guide
// - Dynamic loading of content based on user interaction
