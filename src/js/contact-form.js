class ContactForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch("/src/components/contact-card.html");

    if (!response.ok) throw new Error("Failed to load HTML file");
    const html = await response.text();

    //this.shadowRoot.innerHTML = `<h2>Contact form custom component</h2>`;
    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("contact-form", ContactForm);
