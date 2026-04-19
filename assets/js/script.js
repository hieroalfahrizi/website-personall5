// ========== SMART BRIDGE ACADEMY - MAIN SCRIPT ==========

document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU ==========
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu on link click
    const allNavLinks = document.querySelectorAll('.nav-links li a');
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // ========== SMOOTH SCROLL ==========
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== "#" && href !== "#!" && href !== "") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // ========== SCROLL REVEAL ANIMATION ==========
    const fadeElements = document.querySelectorAll('.program-card, .layanan-card, .vm-card, .tentang-text, .tentang-img, .testimoni-card, .faq-card, .statistik-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.stat-number');
    
    function startCounter(counter) {
        const text = counter.innerText;
        const target = parseInt(counter.getAttribute('data-target') || text.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                counter.innerText = target + (text.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + (text.includes('+') ? '+' : '');
            }
        }, 20);
    }
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama');
            const email = document.getElementById('email');
            const telepon = document.getElementById('telepon');
            const pesan = document.getElementById('pesan');
            
            const namaValue = nama ? nama.value.trim() : '';
            const emailValue = email ? email.value.trim() : '';
            const pesanValue = pesan ? pesan.value.trim() : '';
            
            if (!namaValue) {
                showAlert('Mohon isi Nama Lengkap', 'error');
                nama.focus();
                return;
            }
            
            if (!emailValue) {
                showAlert('Mohon isi Email', 'error');
                email.focus();
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                showAlert('Format email tidak valid', 'error');
                email.focus();
                return;
            }
            
            if (!pesanValue) {
                showAlert('Mohon isi Pesan', 'error');
                pesan.focus();
                return;
            }
            
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                
                setTimeout(function() {
                    showAlert('Terima kasih ' + namaValue + '! Pesan Anda telah terkirim. Kami akan membalas dalam 1x24 jam.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1000);
            }
        });
    }
    
    // Global showAlert function
    window.showAlert = function(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) return;
        
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-message alert-' + type;
        alertDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <i class="fas fa-times close-alert" style="cursor:pointer;"></i>
        `;
        
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alertDiv);
        
        const closeBtn = alertDiv.querySelector('.close-alert');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                alertDiv.remove();
            });
        }
        
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    };

    console.log('Smart Bridge Academy website loaded successfully!');
});