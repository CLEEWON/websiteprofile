$(document).ready(function() {
    // Set active navigation
    const currentPage = location.pathname.split("/").pop();
    $('nav a').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });

    // ScrollReveal animations
    ScrollReveal().reveal('.skill-card, .timeline-item, .profile-container', {
        distance: '50px',
        duration: 1000,
        easing: 'ease-out',
        interval: 200
    });

    // Set current year in footer
    $('#year').text(new Date().getFullYear());

    // Smooth hover effects
    $('.skill-card, nav a').hover(
        function() {
            $(this).css('transition', 'all 0.3s ease');
        },
        function() {
            $(this).css('transition', 'all 0.3s ease');
        }
    );
});

// Portfolio Filter
$('.filter-btn').click(function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    const filter = $(this).data('filter');
    if (filter === 'all') {
        $('.portfolio-item, .gallery-item').show();
    } else {
        $('.portfolio-item, .gallery-item').hide();
        $(`.portfolio-item[data-category="${filter}"], .gallery-item[data-category="${filter}"]`).show();
    }
});

// Contact Form Submission
$('#messageForm').submit(function(e) {
    e.preventDefault();
    alert('Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.');
    this.reset();
});

// Lightbox Simulation
$('[data-lightbox="gallery"]').click(function(e) {
    e.preventDefault();
    const imgSrc = $(this).attr('href');
    const lightbox = `
        <div class="lightbox">
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Gallery Image">
                <button class="close-btn">&times;</button>
            </div>
        </div>
    `;
    $('body').append(lightbox);
});

$(document).on('click', '.lightbox, .close-btn', function() {
    $('.lightbox').remove();
});

// Testimonial Slider (Simple Version)
let currentTestimonial = 0;
const testimonials = $('.testimonial');

function showTestimonial(index) {
    testimonials.hide();
    $(testimonials[index]).fadeIn();
}

// Initialize
showTestimonial(0);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Data proyek (bisa diganti dengan data asli Anda)
const projects = {
    project1: {
        title: "CLEEWON's Personal Account",
        category: "Website",
        description: "CLEEWON's Personal Account didesain untuk menampilkan personality cleewon yang dingin tetapi tidak kejam",
        technologies: ["Figma", "Canva", "Capcut"],
        images: ["project1-thumb.PNG"],
        demoUrl: "#",
        sourceUrl: "#"
    },
    project2: {
        title: "Sandoch's Business Account",
        category: "Business Account",
        description: "Sandoch's Business Account didesain untuk menampilkan menu makanan yang ada di Sandoch dan brandingan yang ada di Sandoch",
        technologies: ["Excel", "Figma", "Canva", "Capcut"],
        images: ["project2-thumb.PNG"],
        demoUrl: "#",
        sourceUrl: "#"
    },
    project3: {
        title: "Prodigy's Business Account",
        category: "Business Account",
        description: "Prodigy's Business Account didesain untuk menampilkan Brand Clothing dari Prodigy Cloth.",
        technologies: ["Photoshop", "Figma", "Canva", "Capcut"],
        images: ["project3-thumb.PNG"],
        demoUrl: "#",
        sourceUrl: "#"
    }
};

// Fungsi untuk membuka modal
function openModal(projectId) {
    const project = projects[projectId];
    const modalContent = `
        <div class="modal-images">
            ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
        </div>
        <div class="modal-info">
            <h2>${project.title}</h2>
            <div class="project-meta">
                <span class="meta-item">${project.category}</span>
                ${project.technologies.map(tech => `<span class="meta-item">${tech}</span>`).join('')}
            </div>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.demoUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                <a href="${project.sourceUrl}" target="_blank"><i class="fab fa-github"></i> Source Code</a>
            </div>
        </div>
    `;
    
    $('.modal-body').html(modalContent);
    $('#projectModal').addClass('active');
    $('body').css('overflow', 'hidden');
}

// Fungsi untuk menutup modal
function closeModal() {
    $('#projectModal').removeClass('active');
    $('body').css('overflow', 'auto');
}

// Event listeners
$(document).ready(function() {
    // Buka modal saat tombol "Lihat Detail" diklik
    $('.view-btn').click(function(e) {
        e.preventDefault();
        const projectId = $(this).closest('.portfolio-item').data('project');
        openModal(projectId);
    });
    
    // Tutup modal
    $('.close-modal').click(closeModal);
    
    // Tutup modal saat klik di luar konten
    $(document).mouseup(function(e) {
        if ($(e.target).closest('.modal-content').length === 0 && $('#projectModal').hasClass('active')) {
            closeModal();
        }
    });
    
    // Tutup modal dengan ESC key
    $(document).keyup(function(e) {
        if (e.key === "Escape" && $('#projectModal').hasClass('active')) {
            closeModal();
        }
    });
});