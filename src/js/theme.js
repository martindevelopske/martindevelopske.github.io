document.addEventListener("DOMContentLoaded", () => {
  console.log("dom context loaded");
  const themeToggleBtn = document.getElementById("themeToggle");
  if (!themeToggleBtn) {
    console.error("Theme toggle button not found!");
    return;
  }
  // Check local storage for a saved theme, or default to system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Update button text based on current theme
  themeToggleBtn.textContent =
    savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  // Toggle theme on button click
  themeToggleBtn.addEventListener("click", () => {
    console.log("you really want to change the theme?");
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update button text
    themeToggleBtn.textContent =
      newTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  });
});
