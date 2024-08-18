document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('href').substring(1);
            filterCourses(category);
        });
    });

    // Function to filter courses based on the selected category
    function filterCourses(category) {
        courseCards.forEach(card => card.style.display = 'none');

        let startIndex, endIndex;
        switch (category) {
            case 'previous-courses':
                startIndex = 0;
                endIndex = 3;
                break;
            case 'current-courses':
                startIndex = 3;
                endIndex = 6;
                break;
            case 'upcoming-courses':
                startIndex = 6;
                endIndex = 9;
                break;
            default:
                startIndex = 0;
                endIndex = courseCards.length;
        }

        for (let i = startIndex; i < endIndex; i++) {
            if (courseCards[i]) {
                courseCards[i].style.display = 'block';
            }
        }
    }

    // Make each course card clickable and link to a specific course page
    courseCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            window.location.href = `/courses/course${index + 1}.html`;
        });
    });

    // Show all courses by default
    filterCourses('all');
});

