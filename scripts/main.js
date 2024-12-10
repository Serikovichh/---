
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');

            if (!name.value.trim()) {
                alert('Name is required.');
                name.focus();
                event.preventDefault();
                return;
            }

            if (!validateEmail(email.value)) {
                alert('Please enter a valid email address.');
                email.focus();
                event.preventDefault();
                return;
            }
        });
    }

    function validateEmail(email) {
        const re = /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/;
        return re.test(email);
    }

    const workshopSelect = document.getElementById('workshop');
    if (workshopSelect) {
        fetch('/api/workshops')
            .then(response => response.json())
            .then(data => {
                data.forEach(workshop => {
                    const option = document.createElement('option');
                    option.value = workshop.id;
                    option.textContent = workshop.title;
                    workshopSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading workshops:', error));
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/submit-registration', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message); 
                    window.location.href = '/'; 
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.error}`);
                }
            } catch (err) {
                console.error('Error submitting registration:', err);
                alert('An error occurred. Please try again later.');
            }
        });
    }
});
