import { LitElement, html, css } from "lit";

export class AboutViewElement extends LitElement {
  static styles = css`
    section {
      padding: 1.5rem;
    }
  `;

  render() {
    return html`
      <section>
        <h1>About</h1>
        <p>This is the about view.</p>
      </section>
    `;
  }
}

customElements.define("about-view", AboutViewElement);
