// Example internship dataset
const internships = [
  { title: "Software Development Intern", skills: ["javascript", "react", "html", "css"], company: "PM Internship Scheme", img: "https://img.icons8.com/color/96/source-code.png" },
  { title: "Data Analyst Intern", skills: ["python", "sql", "excel"], company: "DataCorp", img: "https://img.icons8.com/color/96/combo-chart.png" },
  { title: "AI/ML Intern", skills: ["python", "machine learning", "tensorflow"], company: "AI Labs", img: "https://img.icons8.com/color/96/artificial-intelligence.png" },
  { title: "Cybersecurity Intern", skills: ["networking", "linux", "cryptography"], company: "Microsoft", img: "https://img.icons8.com/color/96/security-checked.png" },
  { title: "Digital Marketing Intern", skills: ["seo", "analytics", "communication"], company: "Meta", img: "https://img.icons8.com/color/96/marketing.png" },
  { title: "UI/UX Design Intern", skills: ["figma", "wireframing", "prototyping"], company: "Figma", img: "https://img.icons8.com/color/96/design.png" }
];

// Get student data from localStorage
const studentData = JSON.parse(localStorage.getItem("studentData")) || { skills: [] };
const studentSkills = studentData.skills || [];

// Get the container where cards will be displayed
const container = document.getElementById("internshipCards");
container.innerHTML = "";

// Loop through internships and generate cards dynamically
internships.forEach((internship, index) => {
  // Calculate match percentage
  const matchedSkills = internship.skills.filter(skill => studentSkills.includes(skill));
  const matchPercent = Math.round((matchedSkills.length / internship.skills.length) * 100);

  // Determine border color based on match %
  let borderColor = "border-red-500";
  if (matchPercent >= 70) borderColor = "border-green-500";
  else if (matchPercent >= 40) borderColor = "border-yellow-500";

  // Create the card element
  const card = document.createElement("div");
  card.className = `p-6 bg-white/10 backdrop-blur-lg border ${borderColor} rounded-2xl shadow-2xl transform transition hover:-translate-y-2 hover:shadow-xl`;
  card.innerHTML = `
    <img src="${internship.img}" alt="${internship.title}" class="w-16 h-16 mb-4">
    <h3 class="text-xl font-bold mb-1">${internship.title}</h3>
    <p class="text-gray-300 mb-2">Company: ${internship.company}</p>
    <p class="text-gray-400 mb-2">Required Skills: ${internship.skills.join(", ")}</p>
    <span class="px-3 py-1 text-sm rounded-full ${borderColor.replace("border-", "bg-")}/30 text-gray-200 font-semibold">
      Match: ${matchPercent}%
    </span>
    <button class="mt-4 w-full py-2 bg-pink-600 hover:bg-pink-500 rounded-xl font-semibold transition transform hover:scale-105 applyBtn">
      Apply Now
    </button>
  `;
  container.appendChild(card);

  // Add click event to Apply Now button
  const applyBtn = card.querySelector(".applyBtn");
  applyBtn.addEventListener("click", () => {
    // Save selected internship in localStorage
    localStorage.setItem("selectedInternship", JSON.stringify(internship));
    // Redirect to Apply Now page
    window.location.href = "apply.html";
  });
});
