

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const termsChecked = document.getElementById('terms').checked;
    const passInput=document.getElementById("password").value;
    if(passInput.length<=8){
        const passLength=document.getElementsByClassName("password-length")[0];
        passLength.textContent="Password Must be a Minimum of 8 Characters!";
    }
    if (!termsChecked) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    // Here you would typically send the data to your server
    const RegisteredUser={username, email, password};
    console.log('Signup submitted:', RegisteredUser);
    
    // Show success message (in a real app, you'd handle this properly)
    alert(`Welcome, ${username}! Your account has been created.`);
    signupForm.reset();
});

// Login link
const loginLink = document.getElementById('loginLink');
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecting to login page...');
    // In a real app, you would redirect to the login page
    // window.location.href = '/login';
});

export default RegisteredUser