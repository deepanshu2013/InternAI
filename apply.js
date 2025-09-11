document.addEventListener("DOMContentLoaded", () => {
  const internshipTitle = document.getElementById("internshipTitle");
  const companyName = document.getElementById("companyName");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const skills = document.getElementById("skills");
  const motivation = document.getElementById("motivation");
  const resumeFile = document.getElementById("resumeFile");
  const applyForm = document.getElementById("applyForm");
  const backBtn = document.getElementById("backBtn");

  // Load internship info from localStorage (set when "Apply Now" clicked)
  const selectedInternship = JSON.parse(localStorage.getItem("selectedInternship")) || {};
  internshipTitle.textContent = selectedInternship.title || "Internship Title";
  companyName.textContent = selectedInternship.company || "Company Name";

  // Pre-fill applicant info if saved previously
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  if (studentData.fullName) fullName.value = studentData.fullName;
  if (studentData.email) email.value = studentData.email;
  if (studentData.phone) phone.value = studentData.phone;
  if (studentData.skills) skills.value = studentData.skills.join(", ");

  // Form submission
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedInternship.title} at ${selectedInternship.company}!\nWe will contact you soon.`);
    window.location.href ="submit.html";
    applyForm.reset();
  });

  // Back to recommendations page
  backBtn.addEventListener("click", () => {
    window.location.href = "recommendations.html";
  });
});
