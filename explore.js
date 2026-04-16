document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('attractionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const attractionDetails = {
        'exeter-cathedral': {
            title: 'Exeter Cathedral',
            details: 'A stunning Gothic cathedral with a breathtaking vaulted ceiling, just a 5-minute walk from the hotel. A must-visit for its architectural beauty and historical significance.'
        },
        'underground-passages': {
            title: 'Underground Passages',
            details: 'Explore medieval tunnels beneath the city, offering a unique historical experience, located 0.3 miles away. Perfect for history enthusiasts.'
        },
        'royal-albert-museum': {
            title: 'Royal Albert Memorial Museum',
            details: 'An award-winning museum showcasing art, history, and culture, just a 7-minute walk from the hotel. Ideal for a cultural day out.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const attraction = button.getAttribute('data-attraction');
            modalTitle.textContent = attractionDetails[attraction].title;
            modalDetails.textContent = attractionDetails[attraction].details;
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));
});