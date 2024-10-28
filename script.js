// JavaScript Code

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Handle Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMessage = document.getElementById('error-message');
      
      // Simple email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
      }
      
      // Password validation: at least 1 number and 1 symbol
      const numberRegex = /[0-9]/;
      const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!numberRegex.test(password) || !symbolRegex.test(password)) {
        errorMessage.textContent = 'Password must contain at least 1 number and 1 symbol.';
        return;
      }
      
      // For demonstration, accept any valid email/password
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    });
  }

  // Check if user is logged in
  if (localStorage.getItem('loggedIn') !== 'true') {
    if (window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'login.html';
    }
  }

  // Handle Logout
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    });
  }

  // Handle Finance Form Submission
  const financeForm = document.getElementById('financeForm');
  if (financeForm) {
    financeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const income = parseFloat(document.getElementById('income').value);
      const expenses = parseFloat(document.getElementById('expenses').value);
      const savings = parseFloat(document.getElementById('savings').value);
      const goal = parseFloat(document.getElementById('goal').value);
      const debts = parseFloat(document.getElementById('debts').value) || 0;

      let adviceText = '';

      // Predefined Logic for Basic Advice
      if (savings / income > 0.2) {
        adviceText += '<strong>Great job!</strong> Keep up the high savings rate.<br>';
      } else if (savings / income < 0.1) {
        adviceText += '<strong>Warning:</strong> Try to increase your savings rate.<br>';
      } else {
        adviceText += '<strong>Good:</strong> Your savings rate is on track.<br>';
      }

      if (expenses / income > 0.5) {
        adviceText += '<strong>Alert:</strong> Consider cutting back on expenses.<br>';
      } else {
        adviceText += '<strong>Good:</strong> Your expenses are within a healthy range.<br>';
      }

      // Advanced Investing Advice Logic
      if (savings > debts) {
        adviceText += '<strong>Investing Advice:</strong> With your savings exceeding your debts, consider diversifying your investments into higher-yield assets like ETFs or mutual funds.<br>';
      } else if (savings < debts) {
        adviceText += '<strong>Investing Advice:</strong> It\'s advisable to prioritize debt repayment before making significant investments.<br>';
      } else {
        adviceText += '<strong>Investing Advice:</strong> Maintain a balanced approach between saving and debt repayment.';
      }

      // Additional Financial Insights
      const netWorth = savings - debts;
      adviceText += `<br><strong>Your Net Worth:</strong> $${netWorth.toFixed(2)}.`;

      // Display the Advice with Fade-in Animation
      const adviceDiv = document.getElementById('advice');
      adviceDiv.innerHTML = adviceText;
      adviceDiv.style.opacity = 1;
      adviceDiv.classList.add('fade-in');
    });
  }

  // Scroll Animations for Benefits and Features Sections
  const animatedElements = document.querySelectorAll('.benefit, .feature');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
});