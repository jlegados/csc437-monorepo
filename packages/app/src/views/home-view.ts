import { LitElement, html } from "lit";
import "../components/dashboard/dashboard-view";

export class HomeViewElement extends LitElement {
  createRenderRoot() {
    return this; // use global CSS
  }

  render() {
    return html`<dashboard-view></dashboard-view>`;
  }
}

customElements.define("home-view", HomeViewElement);
