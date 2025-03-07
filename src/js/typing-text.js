class TypingText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const text =
      this.getAttribute("data-text") ||
      "Crafting elegant code into seamless and beautiful digital experiences.";
    let index = 0;
    const speed = 50; // Typing speed in ms

    const container = document.createElement("span");
    this.shadowRoot.appendChild(container);

    const typeText = () => {
      if (index < text.length) {
        container.innerHTML += text[index];
        index++;
        setTimeout(typeText, speed);
      }
    };

    typeText();
  }
}

customElements.define("typing-text", TypingText);
