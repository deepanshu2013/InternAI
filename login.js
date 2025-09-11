document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!emailInput.value || !passwordInput.value) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    const loginData = {
      email: emailInput.value,
      password: passwordInput.value
    };

    console.log("Login Data (to send to backend):", loginData);

    // 👉 For now: just simulate login success and redirect
    alert("✅ Login successful! Redirecting...");
    window.location.href = "students.html";  // change to your actual student info page
  });
});
