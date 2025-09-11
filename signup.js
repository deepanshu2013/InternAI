document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    if (!nameInput.value || !emailInput.value || !passwordInput.value || !confirmInput.value) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    if (passwordInput.value !== confirmInput.value) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    // Prepare user data
    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    // Save user data locally (for demo only, no backend yet)
    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("User Data (to send to backend):", userData);

    // Redirect directly to Student Info page
    alert("✅ Signup successful! Redirecting...");
    window.location.href = "students.html";  // student info page
  });
});
