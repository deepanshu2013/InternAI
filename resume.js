document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm");
  const formSection = document.getElementById("formSection");
  const resumeSection = document.getElementById("resumeSection");
  const gradSelect = document.getElementById("graduate");
  const gradDetails = document.getElementById("gradDetails");
  const formBackBtn = document.getElementById("formBackBtn");

  // Create Edit Button dynamically in resume section
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "absolute top-4 right-4 px-3 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:brightness-110 transition";
  resumeSection.appendChild(editBtn);

  // Show/Hide Graduation Fields
  gradSelect.addEventListener("change", () => {
    gradDetails.classList.toggle("hidden", gradSelect.value !== "Yes");
  });

  // Form Submit -> Show Resume
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fill Resume Preview
    document.getElementById("rName").textContent = form.fullName.value;
    document.getElementById("rEmail").textContent = "Email: " + form.email.value;
    document.getElementById("rPhone").textContent = "Phone: " + form.phone.value;
    document.getElementById("rLocation").textContent = "Location: " + form.location.value;

    document.getElementById("r10").textContent =
      "10th: " + form.school10.value + " - " + form.percent10.value + "%";
    document.getElementById("r12").textContent =
      "12th: " + form.school12.value + " - " + form.percent12.value + "%";

    if (form.graduate.value === "Yes") {
      document.getElementById("rGrad").textContent =
        "Graduation: " +
        form.course.value +
        " in " +
        form.branch.value +
        " - " +
        form.gradPercent.value +
        "%";
    } else {
      document.getElementById("rGrad").textContent = "Graduation: Not Applicable";
    }

    document.getElementById("rSkills").textContent = form.skills.value || "-";
    document.getElementById("rExperience").textContent = form.experience.value || "-";
    document.getElementById("rProjects").textContent = form.projects.value || "-";
    document.getElementById("rPortfolio").textContent = form.portfolio.value || "-";

    // Hide form, show resume
    formSection.classList.add("hidden");
    resumeSection.classList.remove("hidden");
  });

  // Back Button -> Previous page from Form
  formBackBtn.addEventListener("click", () => {
    window.history.back();
  });

  // Edit Button -> Go back to form to edit details
  editBtn.addEventListener("click", () => {
    resumeSection.classList.add("hidden");
    formSection.classList.remove("hidden");
  });
});

// PDF Generation
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const form = document.getElementById("resumeForm");
  let y = 20;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("RESUME", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(16);
  doc.text(form.fullName.value, 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Email: ${form.email.value}`, 20, y); y += 6;
  doc.text(`Phone: ${form.phone.value}`, 20, y); y += 6;
  doc.text(`Location: ${form.location.value}`, 20, y); y += 10;

  doc.setFont("helvetica", "bold"); doc.text("Education:", 20, y); y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`10th: ${form.school10.value} - ${form.percent10.value}%`, 25, y); y += 6;
  doc.text(`12th: ${form.school12.value} - ${form.percent12.value}%`, 25, y); y += 6;
  if (form.graduate.value === "Yes") {
    doc.text(`Graduation: ${form.course.value} in ${form.branch.value} - ${form.gradPercent.value}%`, 25, y); y += 6;
  } else {
    doc.text("Graduation: Not Applicable", 25, y); y += 6;
  }
  y += 4;

  doc.setFont("helvetica", "bold"); doc.text("Skills:", 20, y); y += 6;
  doc.setFont("helvetica", "normal"); doc.text(form.skills.value || "-", 25, y); y += 10;

  doc.setFont("helvetica", "bold"); doc.text("Experience:", 20, y); y += 6;
  doc.setFont("helvetica", "normal"); doc.text(form.experience.value || "-", 25, y); y += 10;

  doc.setFont("helvetica", "bold"); doc.text("Projects:", 20, y); y += 6;
  doc.setFont("helvetica", "normal"); doc.text(form.projects.value || "-", 25, y); y += 10;

  doc.setFont("helvetica", "bold"); doc.text("Portfolio / LinkedIn:", 20, y); y += 6;
  doc.setFont("helvetica", "normal"); doc.text(form.portfolio.value || "-", 25, y);

  doc.save(`${form.fullName.value.replaceAll(" ", "_")}_Resume.pdf`);
}
