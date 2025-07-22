// Landon Jett's Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Landon Jett\'s Portfolio loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };
            
            // Basic form validation
            if (formData.name && formData.email && formData.message) {
                // Here you would typically send the data to your server
                // For now, we'll just show a success message
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Music player functionality (if audio elements are added)
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            // Pause other audio elements when one starts playing
            audioElements.forEach(otherAudio => {
                if (otherAudio !== this && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });
    });

    // Buy button click tracking
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track which beat/song was clicked
            const musicItem = this.closest('.music-item');
            const title = musicItem ? musicItem.querySelector('h3').textContent : 'Unknown';
            console.log(`Buy button clicked for: ${title}`);
            
            // Here you would typically redirect to payment/purchase page
            // For now, show an alert
            alert(`Redirecting to purchase page for "${title}"`);
        });
    });

    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll-to-top functionality
    const scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        }
    });

    // Social media link tracking
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`Social media link clicked: ${this.textContent}`);
        });
    });
});

// Function to add new music items dynamically
function addMusicItem(title, description, audioSrc, price) {
    const musicGrid = document.querySelector('.music-grid');
    if (!musicGrid) return;

    const musicItem = document.createElement('div');
    musicItem.className = 'music-item';
    musicItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        ${audioSrc ? `<audio controls><source src="${audioSrc}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : ''}
        <button class="buy-button">Buy Now - $${price}</button>
    `;
    
    musicGrid.appendChild(musicItem);
    
    // Add event listener to the new buy button
    const buyButton = musicItem.querySelector('.buy-button');
    buyButton.addEventListener('click', function(e) {
        console.log(`Buy button clicked for: ${title}`);
        alert(`Redirecting to purchase page for "${title}"`);
    });
}

// Function to load music items from a JSON file or API
async function loadMusicItems() {
    try {
        // This would typically fetch from your server or a JSON file
        // const response = await fetch('music-data.json');
        // const musicData = await response.json();
        
        // For demonstration, using sample data
        const sampleMusicData = [
            {
                title: "Sample Beat 1",
                description: "High-energy trap beat perfect for rap vocals",
                audioSrc: null, // Add your audio file paths here
                price: 25
            },
            {
                title: "Sample Topline 1",
                description: "Catchy pop melody with modern production",
                audioSrc: null, // Add your audio file paths here
                price: 50
            }
        ];
        
        sampleMusicData.forEach(item => {
            addMusicItem(item.title, item.description, item.audioSrc, item.price);
        });
        
    } catch (error) {
        console.error('Error loading music items:', error);
    }
}

// Call loadMusicItems when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below when you have music data to load
    // loadMusicItems();
});
