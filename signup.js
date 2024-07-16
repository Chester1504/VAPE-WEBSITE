document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const signupLink = document.querySelector('a[href="signup.html"]');
    const logoutLink = document.getElementById('logout');

    // Check if the user is already logged in
    if (localStorage.getItem('token')) {
        if (signupLink) signupLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'inline';
    } else {
        if (logoutLink) logoutLink.style.display = 'none';
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Perform form validation
            if (email === '' || password === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Perform login process
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.auth && data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('token');
            fetch('http://localhost:3000/logout', {
                method: 'POST'
            })
            .then(() => {
                window.location.href = 'signup.html';
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
