// Terminal Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminal-content');
    const loaderContainer = document.querySelector('.loader-container');
    
    // Terminal commands and responses - Kali Linux style intel gathering
    const terminalLines = [
        { 
            command: 'sudo osint-framework --target "Yaakulya Sabbani"', 
            response: 'OSINT Framework initialized...\nSearching for target: Yaakulya Sabbani\nAccessing public databases...'
        },
        { 
            command: 'cat target_profile.json', 
            response: '{\n  "name": "Yaakulya Sabbani",\n  "role": "Machine Learning & Security Researcher",\n  "location": "Abu Dhabi, UAE",\n  "skills": ["Ethical Hacking", "Machine Learning", "Threat Detection"],\n  "achievement": "CEH at age 18",\n  "status": "Active"\n}'
        },
        { 
            command: 'launch --secure-mode --verbose', 
            response: 'Launching portfolio...\nLoading portfolio assets...\nLaunching interface...\n\n[SUCCESS] Portfolio loaded successfully'
        }
    ];

    // Function to simulate typing - faster typing speed
    const typeWriter = (element, text, i, callback) => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            // Faster typing speed with less variation
            setTimeout(() => typeWriter(element, text, i, callback), 10 + Math.random() * 10);
        } else if (callback) {
            setTimeout(callback, 300); // Shorter delay after typing
        }
    };

    // Execute terminal lines sequentially
    const executeTerminalLines = (lines, index) => {
        if (index >= lines.length) {
            // All lines have been executed, hide loader
            setTimeout(() => {
                loaderContainer.classList.add('hide-loader');
                
                // After loader is hidden, start animations
                setTimeout(() => {
                    startTypingAnimation();
                    animateSkills();
                    initParticles();
                }, 300);
            }, 500);
            return;
        }
        
        const line = lines[index];
        
        // Create terminal line
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'terminal-prompt';
        promptSpan.textContent = 'root@kali:~# ';
        
        const commandSpan = document.createElement('span');
        commandSpan.className = 'terminal-command';
        
        lineDiv.appendChild(promptSpan);
        lineDiv.appendChild(commandSpan);
        terminalContent.appendChild(lineDiv);
        
        // Type the command
        typeWriter(commandSpan, line.command, 0, () => {
            // Only after command is fully typed, create and type the response
            if (line.response) {
                const responseDiv = document.createElement('div');
                responseDiv.className = 'terminal-response';
                terminalContent.appendChild(responseDiv);
                
                // Type the response
                typeWriter(responseDiv, line.response, 0, () => {
                    // Only after response is fully typed, move to the next command
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                    setTimeout(() => {
                        executeTerminalLines(lines, index + 1);
                    }, 300);
                });
            } else {
                // If no response, move to the next command
                terminalContent.scrollTop = terminalContent.scrollHeight;
                setTimeout(() => {
                    executeTerminalLines(lines, index + 1);
                }, 300);
            }
        });
    };

    // Start terminal animation
    executeTerminalLines(terminalLines, 0);
});

// Particles.js initialization
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#a78bfa"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6d28d9",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Multi-text typing effect
function startTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const phrases = [
        "Machine Learning & Security Researcher",
        "Certified Ethical Hacker",
        "Cybersecurity Specialist",
        "AI & ML Enthusiast",
        "NYU Abu Dhabi Student"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If completed typing the current phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        }
        
        // If completed deleting the current phrase
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}

// Enhanced skills animation function
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.progress');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Add data-level attributes to show percentages on hover
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress-bar').getAttribute('data-progress');
        const skillName = item.querySelector('span');
        
        if (skillName && !skillName.hasAttribute('data-level')) {
            skillName.setAttribute('data-level', progress + '%');
        }
    });
    
    // Function to animate a single skill bar with delay
    const animateBar = (bar, index) => {
        setTimeout(() => {
            const progressValue = bar.parentElement.getAttribute('data-progress');
            bar.style.width = progressValue + '%';
        }, index * 100); // Stagger the animations
    };
    
    // Intersection Observer for progress bars
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                animateBar(entry.target, index);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all progress bars
    skillBars.forEach(bar => {
        progressObserver.observe(bar);
    });
};

// Call the animation function when DOM is loaded and on scroll
document.addEventListener('DOMContentLoaded', animateSkills);
window.addEventListener('scroll', animateSkills);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add floating animation to hero stats
document.querySelectorAll('.hero-stat').forEach((stat, index) => {
    stat.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Form validation for contact form (if added later)
const validateForm = (form) => {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    let isValid = true;

    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('error');
        isValid = false;
    }

    if (message && message.value.trim().length < 10) {
        message.classList.add('error');
        isValid = false;
    }

    return isValid;
};

// Add CSS classes for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border-color: #ef4444 !important;
        }
        
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        
        .scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }
    </style>
`); 