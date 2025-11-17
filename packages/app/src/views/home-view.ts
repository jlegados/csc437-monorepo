import { LitElement, html, css } from "lit";

export class HomeViewElement extends LitElement {
  static styles = css`
    section {
      padding: 1.5rem;
    }
  `;

  render() {
    return html`
      <section>
        <h1>Home</h1>
        <p>This is the SPA home view.</p>
      </section>
    `;
  }
}

customElements.define("home-view", HomeViewElement);
