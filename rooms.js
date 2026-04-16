document.addEventListener('DOMContentLoaded', () => {

    // ======================
    // Modal Functionality
    // ======================
    const modal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    // Room details based on your content sheet
    const roomDetails = {
        'classic-single': {
            title: 'Classic Single Room',
            details: '1 Single Bed • Sleeps 1<br><br>Comfortable single room featuring free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, and iron/ironing board.'
        },
        'classic-double': {
            title: 'Classic Double Room',
            details: '1 Double Bed • Sleeps 2<br><br>Spacious and comfortable double room with free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, and iron/ironing board.'
        },
        'classic-twin': {
            title: 'Classic Twin Room',
            details: '2 Single Beds • Sleeps 2<br><br>Ideal for friends or colleagues with free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, and iron/ironing board.'
        },
        'classic-twin-accessible': {
            title: 'Classic Twin (Fully Accessible)',
            details: '2 Single Beds • Fully Accessible • Sleeps 2<br><br>Designed for guests with accessibility needs, featuring free WiFi, private bathroom, flat-screen TV and all standard amenities.'
        },
        'executive-double': {
            title: 'Executive Double Room',
            details: '1 Double Bed • Sleeps 2<br><br>Upgraded Executive room with enhanced amenities including free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, iron/ironing board and additional comforts.'
        },
        'junior-suite': {
            title: 'Junior Suite',
            details: '1 Double Bed • Separate seating area • Sleeps 2<br><br>Spacious Junior Suite offering free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, iron/ironing board and enhanced comfort.'
        },
        'classic-family': {
            title: 'Classic Family Room',
            details: '1 Double Bed + 1 Single Bed • Sleeps 3<br><br>Perfect for families with free WiFi, private bathroom, flat-screen TV, tea/coffee facilities, hair dryer, and iron/ironing board.'
        }
    };

    // Add click event to all "Details" buttons (if you add them later)
    // For now, since your current HTML doesn't have .details-btn, we can keep it ready

    // ======================
    // Filter Functionality
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            // Filter cards
            roomCards.forEach(card => {
                const type = card.getAttribute('data-type');
                if (filter === 'all' || type === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ======================
    // Animation on Scroll
    // ======================
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));

    // Optional: If you add modal buttons later, this will handle them
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const roomKey = button.getAttribute('data-room');
            if (roomDetails[roomKey]) {
                modalTitle.textContent = roomDetails[roomKey].title;
                modalDetails.innerHTML = roomDetails[roomKey].details;
                modal.classList.add('active');
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});