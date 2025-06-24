const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const DARK_MODE_STORAGE_KEY = "darkModeEnabled";
const moonIconClass = "fa-moon";
const sunIconClass = "fa-sun";

function updateToggleIcon() {
  const icon = darkModeToggle.querySelector("i");
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove(moonIconClass);
    icon.classList.add(sunIconClass);
  } else {
    icon.classList.remove(sunIconClass);
    icon.classList.add(moonIconClass);
  }
}

// 1. Check for user preference on page load
const savedMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
if (savedMode === "true") {
  body.classList.add("dark-mode");
} else if (
  savedMode === null &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // Optional: If no preference saved, check OS dark mode preference
  body.classList.add("dark-mode");
}
updateToggleIcon();

// 2. Add event listener to the toggle button
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  // 3. Save the current preference to localStorage
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem(DARK_MODE_STORAGE_KEY, isDarkMode);
  updateToggleIcon();
});
