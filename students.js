document.addEventListener("DOMContentLoaded", () => {
  const graduated = document.getElementById("graduated");
  const gradDetails = document.getElementById("graduationDetails");
  const form = document.getElementById("studentForm");

  // Show/hide graduation details
  graduated.addEventListener("change", () => {
    gradDetails.classList.toggle("hidden", graduated.value !== "yes");
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentData = {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      location: document.getElementById("location").value,
      branch: document.getElementById("branch").value,
      graduated: graduated.value,
      gradYear: document.getElementById("gradYear")?.value || null,
      gradPercent: document.getElementById("gradPercent")?.value || null,
      currentYear: document.getElementById("currentYear").value,
      skills: document.getElementById("skills").value.split(",").map(s => s.trim().toLowerCase()),
      experience: document.getElementById("experience").value,
      portfolio: document.getElementById("portfolio").value
    };

    localStorage.setItem("studentData", JSON.stringify(studentData));

    // Redirect to recommendations page
    window.location.href = "recommendations.html";
  });
});
