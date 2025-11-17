import { html, css, LitElement } from "lit";
export class HomeViewElement extends LitElement {
  static styles = css`section{padding:16px}`;
  render() {
    return html`
      <section>
        <h2>Home</h2>
        <p>SPA is running. Try the links in the header.</p>
        <p><a href="/app/merchant/trader-joes">Go to example merchant route</a></p>
      </section>
    `;
  }
}
customElements.define("home-view", HomeViewElement);
