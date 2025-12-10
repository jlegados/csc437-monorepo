import { LitElement, html, css } from "lit";

export class CBIcon extends LitElement {
  static properties = {
    name: { type: String },
    size: { type: Number }   
  };

  name = "";
  size = 22; 
  createRenderRoot() {
    return this; 
  }

  render() {
    if (!this.name) return "";

    const s = this.size || 22;

    return html`
      <img
        class="cb-icon"
        src="/icons/${this.name}.svg"
        alt="${this.name} icon"
        width="${s}"
        height="${s}"
      />
    `;
  }

  static styles = css`
    .cb-icon {
      vertical-align: middle;
      opacity: 0.85;
    }
  `;
}

customElements.define("cb-icon", CBIcon);
