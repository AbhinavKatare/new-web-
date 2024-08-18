document.addEventListener('DOMContentLoaded', function() {
    const outreachLink = document.getElementById('outreach-link');
    const workshopsLink = document.getElementById('workshops-link');
    const outreachSection = document.getElementById('outreach-section');
    const workshopsSection = document.getElementById('workshops-section');

    outreachLink.addEventListener('click', function() {
        outreachSection.classList.add('active');
        workshopsSection.classList.remove('active');
        outreachLink.classList.add('active');
        workshopsLink.classList.remove('active');
    });

    workshopsLink.addEventListener('click', function() {
        workshopsSection.classList.add('active');
        outreachSection.classList.remove('active');
        workshopsLink.classList.add('active');
        outreachLink.classList.remove('active');
    });
});
