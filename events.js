// events.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Example: Adding a click event listener to all "Register Now" buttons
    const registerButtons = document.querySelectorAll('.btn-primary');

    registerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Thank you for your interest! Registration functionality will be implemented soon.');
        });
    });

    // Example: Filter events by date or type
    // You can add filter functionality here based on your requirements
    // const filterSelect = document.querySelector('#filter-select');
    // filterSelect.addEventListener('change', (event) => {
    //     const selectedFilter = event.target.value;
    //     filterEvents(selectedFilter);
    // });

    // Function to filter events (Example)
    // function filterEvents(filter) {
    //     const events = document.querySelectorAll('.event');
    //     events.forEach(event => {
    //         if (event.dataset.type === filter || filter === 'all') {
    //             event.style.display = 'flex';
    //         } else {
    //             event.style.display = 'none';
    //         }
    //     });
    // }

    // Example: Modal popup for event details
    const eventImages = document.querySelectorAll('.event-image');
    eventImages.forEach(image => {
        image.addEventListener('click', (event) => {
            const eventDetails = event.target.closest('.event').querySelector('.event-info').innerHTML;
            showModal(eventDetails);
        });
    });

    // Function to show modal with event details
    function showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }
});
