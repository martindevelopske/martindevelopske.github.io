async function loadHeader() {
  const response = await fetch("/src/components/header.html");
  const headerHtml = await response.text();
  document.body.insertAdjacentHTML("afterbegin", headerHtml);

  //load the styles
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "/src/styles/header.css";
  cssLink.onload = () => {
    document.querySelector("header").style.visibility = "visible";
  };
  document.head.appendChild(cssLink);

  loadTheme();
}

// Function to initialize the theme
function loadTheme() {
  const themeToggleBtn = document.getElementById("themeToggle");

  if (!themeToggleBtn) {
    console.error("Theme toggle button not found!");
    return;
  }

  // Check saved theme or system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);
  //themeToggleBtn.textContent =
  //  savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  //
  themeToggleBtn.innerHTML =
    savedTheme === "dark"
      ? `
    <i class="fa-solid fa-sun"></i> 
    `
      : `
      <i class="fa-solid fa-moon"></i>
    `;
  // Toggle theme on button click
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggleBtn.innerHTML =
      savedTheme === "dark"
        ? `

      <i class="fa-solid fa-moon"></i>
    `
        : `

    <i class="fa-solid fa-sun"></i> 
    `;
  });

  console.log("Theme script initialized!");
}

loadHeader();
