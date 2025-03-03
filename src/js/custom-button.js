class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    //create a link element for the external class
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../styles/button.css";
    link.onload = () => {
      console.log("css loaded...");
    };
    link.onerror = () => {
      console.log("css error ");
    };
    //create the button element
    const button = document.createElement("button");
    button.textContent = this.getAttribute("label") || "Click Me";

    //append everything to the shadow dom
    this.shadowRoot.append(link, button);

    //store the reference to the button for event handling
    this.button = button;
  }

  connectedCallback() {
    this.button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("buttonClicked", {
          detail: { message: "Button was clicked" },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}

//register the component
customElements.define("custom-btn", CustomButton);
