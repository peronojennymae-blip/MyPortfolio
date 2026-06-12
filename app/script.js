// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Profile Picture Upload
const profilePicUpload = document.getElementById('profilePicUpload');
const profilePic = document.getElementById('profilePic');

profilePicUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profilePic.src = event.target.result;
            localStorage.setItem('profilePic', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Click on profile picture to upload
document.querySelector('.profile-picture-container').addEventListener('click', () => {
    profilePicUpload.click();
});

// Load profile picture from localStorage
const savedProfilePic = localStorage.getItem('profilePic');
if (savedProfilePic) {
    profilePic.src = savedProfilePic;
}

// Project Image Upload (Multiple images per project)
const projectUploads = document.querySelectorAll('.project-upload');
const projectImages = document.querySelectorAll('.project-img');

projectUploads.forEach(upload => {
    upload.addEventListener('change', (e) => {
        const projectId = e.target.dataset.projectId;
        const files = e.target.files;
        
        if (files.length > 0) {
            // Get existing images for this project
            let projectImages = JSON.parse(localStorage.getItem(`project${projectId}Images`) || '[]');
            
            // Add new images
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    projectImages.push(event.target.result);
                    localStorage.setItem(`project${projectId}Images`, JSON.stringify(projectImages));
                    
                    // Update the thumbnail with the first image
                    const img = document.querySelector(`img[data-project-id="${projectId}"]`);
                    img.src = projectImages[0];
                };
                reader.readAsDataURL(file);
            });
        }
    });
});

// Click on project image to upload
document.querySelectorAll('.upload-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        const input = overlay.parentElement.querySelector('.project-upload');
        input.click();
    });
});

// Load project images from localStorage
document.querySelectorAll('.btn-view-project').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const imagePath = this.getAttribute('data-image');

        document.getElementById('projectImage').src = imagePath;
        document.getElementById('projectViewer').style.display = 'block';
    });
});


// Achievement Image Upload
const achievementUploads = document.querySelectorAll('.achievement-upload');
const achievementImages = document.querySelectorAll('.achievement-img');

achievementUploads.forEach(upload => {
    upload.addEventListener('change', (e) => {
        const achievementId = e.target.dataset.achievementId;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.querySelector(`img[data-achievement-id="${achievementId}"]`);
                img.src = event.target.result;
                localStorage.setItem(`achievement${achievementId}`, event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

// Click on achievement image to upload
document.querySelectorAll('.upload-overlay-small').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        const input = overlay.parentElement.querySelector('.achievement-upload');
        input.click();
    });
});

// Load achievement images from localStorage
achievementImages.forEach(img => {
    const achievementId = img.dataset.achievementId;
    const saved = localStorage.getItem(`achievement${achievementId}`);
    if (saved) {
        img.src = saved;
    }
});

// Save editable text to localStorage
document.querySelectorAll('.achievement-title').forEach(title => {
    const index = title.closest('.achievement-item').querySelector('.achievement-img').dataset.achievementId;
    
    // Load saved title
    const savedTitle = localStorage.getItem(`achievement-title-${index}`);
    if (savedTitle) {
        title.textContent = savedTitle;
    }
    
    // Save on blur
    title.addEventListener('blur', () => {
        localStorage.setItem(`achievement-title-${index}`, title.textContent);
    });
});

document.querySelectorAll('.achievement-desc').forEach(desc => {
    const index = desc.closest('.achievement-item').querySelector('.achievement-img').dataset.achievementId;
    
    // Load saved description
    const savedDesc = localStorage.getItem(`achievement-desc-${index}`);
    if (savedDesc) {
        desc.textContent = savedDesc;
    }
    
    // Save on blur
    desc.addEventListener('blur', () => {
        localStorage.setItem(`achievement-desc-${index}`, desc.textContent);
    });
});

// Lightbox functionality with gallery
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-lightbox');
const nextBtn = document.querySelector('.next-lightbox');
const currentImageSpan = document.getElementById('current-image');
const totalImagesSpan = document.getElementById('total-images');

let currentProjectGallery = [];
let currentImageIndex = 0;

// View project on button click
document.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.dataset.projectId;
        const projectImages = getProjectGallery(projectId);
        
        if (projectImages.length === 0) {
            alert('No images uploaded for this project yet. Click on the project image to add photos!');
            return;
        }
        
        currentProjectGallery = projectImages;
        currentImageIndex = 0;
        showLightboxImage();
        lightbox.classList.add('show');
    });
});

function getProjectGallery(projectId) {
    const savedImages = JSON.parse(localStorage.getItem(`project${projectId}Images`) || '[]');

    if (savedImages.length > 0) {
        return savedImages;
    }

    return Array.from(document.querySelectorAll(`.project-img[data-project-id="${projectId}"]`))
        .map(img => img.getAttribute('src'))
        .filter(src => src && !src.includes('placeholder.com'));
}

// View achievement on image click
achievementImages.forEach(img => {
    img.addEventListener('click', () => {
        currentProjectGallery = [img.src];
        currentImageIndex = 0;
        showLightboxImage();
        lightbox.classList.add('show');
    });
});

// Show current image in lightbox
function showLightboxImage() {
    if (currentProjectGallery.length > 0) {
        lightboxImage.src = currentProjectGallery[currentImageIndex];
        currentImageSpan.textContent = currentImageIndex + 1;
        totalImagesSpan.textContent = currentProjectGallery.length;
        
        // Enable/disable navigation buttons
        prevBtn.classList.toggle('disabled', currentImageIndex === 0);
        nextBtn.classList.toggle('disabled', currentImageIndex === currentProjectGallery.length - 1);
    }
}

// Previous image
prevBtn.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showLightboxImage();
    }
});

// Next image
nextBtn.addEventListener('click', () => {
    if (currentImageIndex < currentProjectGallery.length - 1) {
        currentImageIndex++;
        showLightboxImage();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeLightbox.click();
        }
    }
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
    }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Active navigation link highlight
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
