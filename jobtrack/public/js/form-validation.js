document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    let isValid = true;
    const errors = [];

    // Collect form inputs
    const firstName = form.querySelector('#first-name');
    const lastName = form.querySelector('#last-name');
    const email = form.querySelector('#email-signup');
    const password = form.querySelector('#password-signup');
    const confirmPassword = form.querySelector('#confirm-password');
    const phone = form.querySelector('#phone');
    const linkedin = form.querySelector('#linkedin');
    const jobCategory = form.querySelector('#job-categories');
    const jobType = form.querySelector('#job-type');
    const terms = form.querySelector('#terms');

    // Clear previous custom validation messages
    const clearValidity = (...fields) => {
      fields.forEach(field => field.setCustomValidity(""));
    };

    clearValidity(firstName, lastName, email, password, confirmPassword, jobCategory, jobType);

    // Validate required name fields
    if (!firstName.value.trim()) {
      firstName.setCustomValidity("First name is required.");
      isValid = false;
    }

    if (!lastName.value.trim()) {
      lastName.setCustomValidity("Last name is required.");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.setCustomValidity("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation
    const passwordValue = password.value;
    const passwordRules = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRules.test(passwordValue)) {
      password.setCustomValidity("Password must be at least 8 characters, include an uppercase letter and a number.");
      isValid = false;
    }

    // Confirm password
    if (confirmPassword.value !== passwordValue) {
      confirmPassword.setCustomValidity("Passwords do not match.");
      isValid = false;
    }

    // Optional: Phone number validation
    if (phone.value && !/^\+?\d{7,15}$/.test(phone.value.trim())) {
      phone.setCustomValidity("Please enter a valid phone number.");
      isValid = false;
    }

    // Optional: LinkedIn URL validation
    if (linkedin.value && !linkedin.value.startsWith('https://linkedin.com')) {
      linkedin.setCustomValidity("Enter a valid LinkedIn profile URL.");
      isValid = false;
    }

    // Job category
    if (!jobCategory.value) {
      jobCategory.setCustomValidity("Please select a job category.");
      isValid = false;
    }

    // Job type
    if (!jobType.value) {
      jobType.setCustomValidity("Please select a job type.");
      isValid = false;
    }

    // Terms checkbox
    if (!terms.checked) {
      alert("You must agree to the Terms of Service.");
      isValid = false;
    }

    // Final check
    if (!isValid) {
      e.preventDefault(); // Stop form submission
      form.reportValidity(); // Show validation errors
    }
  });
});
