document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    // Form submission handler
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate inputs
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        return;
      }
      
      if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        return;
      }
      
      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Logging in...';
      submitButton.disabled = true;
      
      try {
        // Simulate API call (replace with actual fetch to your backend)
        const loginSuccess = await simulateLogin(emailInput.value, passwordInput.value);
        
        if (loginSuccess) {
          // On successful login (redirect to dashboard in a real app)
          showSuccess('Login successful! Redirecting...');
          setTimeout(() => {
            window.location.href = '/dashboard.html'; // Change to your actual dashboard page
          }, 1500);
        } else {
          showError(null, 'Invalid email or password');
        }
      } catch (error) {
        showError(null, 'An error occurred. Please try again.');
        console.error('Login error:', error);
      } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
    
    // Input validation on blur
    emailInput.addEventListener('blur', function() {
      if (this.value && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email');
      } else {
        clearError(this);
      }
    });
    
    passwordInput.addEventListener('blur', function() {
      if (this.value && this.value.length < 6) {
        showError(this, 'Password must be at least 6 characters');
      } else {
        clearError(this);
      }
    });
    
    // Clear errors when user starts typing
    emailInput.addEventListener('input', function() {
      clearError(this);
    });
    
    passwordInput.addEventListener('input', function() {
      clearError(this);
    });
    
    // Helper functions
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    function showError(input, message) {
      clearError(input);
      
      if (input) {
        // Add error class to input
        input.classList.add('error');
        
        // Create and display error message
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '-0.8rem';
        errorElement.style.marginBottom = '1rem';
        errorElement.style.fontSize = '0.8rem';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      } else {
        // Show general error message
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message-general';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.textAlign = 'center';
        errorElement.style.marginTop = '1rem';
        
        // Insert before the submit button
        const submitButton = loginForm.querySelector('button[type="submit"]');
        loginForm.insertBefore(errorElement, submitButton);
      }
    }
    
    function clearError(input) {
      if (input) {
        input.classList.remove('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
          errorElement.remove();
        }
      } else {
        const generalError = loginForm.querySelector('.error-message-general');
        if (generalError) generalError.remove();
      }
    }
    
    function showSuccess(message) {
      // Remove any existing messages
      clearError();
      
      // Show success message
      const successElement = document.createElement('p');
      successElement.className = 'success-message';
      successElement.textContent = message;
      successElement.style.color = 'green';
      successElement.style.textAlign = 'center';
      successElement.style.marginTop = '1rem';
      
      // Insert before the submit button
      const submitButton = loginForm.querySelector('button[type="submit"]');
      loginForm.insertBefore(successElement, submitButton);
    }
    
    // Simulate login API call (replace with actual fetch in production)
    function simulateLogin(email, password) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // In a real app, this would check against your backend
          // For demo purposes, we'll simulate a successful login with any valid email and password >= 6 chars
          resolve(validateEmail(email) && password.length >= 6);
        }, 1000);
      });
    }
  });