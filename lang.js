// lang.js

// Grab dropdown
const languageSelect = document.getElementById("languageSelect");

// Local fallback translations (if API fails)
const fallbackTranslations = {
  hi: {
    "InternAI": "इंटर्नएआई",
    "Login": "लॉगिन",
    "Sign Up": "साइन अप",
    "Find Your Perfect Internship": "अपनी सही इंटर्नशिप खोजें",
    "An AI-powered engine to recommend the best internships from PM Internship Scheme and beyond.":
      "एआई संचालित इंजन जो पीएम इंटर्नशिप योजना और अन्य से सर्वश्रेष्ठ इंटर्नशिप की सिफारिश करता है।",
    "Get Started": "शुरू करें",
    "© 2025 InternAI. All rights reserved.": "© 2025 इंटर्नएआई. सभी अधिकार सुरक्षित।"
  },
  fr: {
    "InternAI": "InternAI",
    "Login": "Connexion",
    "Sign Up": "S'inscrire",
    "Find Your Perfect Internship": "Trouvez votre stage parfait",
    "An AI-powered engine to recommend the best internships from PM Internship Scheme and beyond.":
      "Un moteur alimenté par l'IA pour recommander les meilleurs stages du programme PM et au-delà.",
    "Get Started": "Commencer",
    "© 2025 InternAI. All rights reserved.": "© 2025 InternAI. Tous droits réservés."
  }
  // 👉 Add more fallback translations if needed
};

// Function to translate text via MyMemory API
async function translateText(text, targetLang) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    const data = await res.json();
    if (data?.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    throw new Error("Empty translation");
  } catch (err) {
    console.warn("API failed, using fallback for:", text);
    return fallbackTranslations[targetLang]?.[text] || text;
  }
}

// Function to translate the whole page
async function translatePage(targetLang) {
  const elements = document.querySelectorAll("[data-translate]");

  for (let el of elements) {
    const originalText = el.dataset.original || el.innerText;

    // Save original text (only once)
    if (!el.dataset.original) {
      el.dataset.original = originalText;
    }

    if (targetLang === "en") {
      el.innerText = el.dataset.original;
      continue;
    }

    el.innerText = await translateText(originalText, targetLang);
  }

  // Save selected language for next pages
  localStorage.setItem("selectedLang", targetLang);
}

// Event listener
languageSelect?.addEventListener("change", (e) => {
  translatePage(e.target.value);
});

// Apply saved language on load
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLang") || "en";
  if (languageSelect) {
    languageSelect.value = savedLang;
  }
  if (savedLang !== "en") {
    translatePage(savedLang);
  }
});
