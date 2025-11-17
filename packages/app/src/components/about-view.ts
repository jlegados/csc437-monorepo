import { html, css, LitElement } from "lit";
export class AboutViewElement extends LitElement {
  static styles = css`section{padding:16px}`;
  render() { return html`<section><h2>About</h2><p>CoinBear SPA with Mustang routing.</p></section>`; }
}
customElements.define("about-view", AboutViewElement);
