async function LoadFooter() {
  const response = await fetch("../components/footer.html");
  const footerHtml = await response.text();
  document.body.insertAdjacentHTML("afterend", footerHtml);

  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "../styles/footer.css";
  document.head.appendChild(cssLink);
}

LoadFooter();
