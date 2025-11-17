import { LitElement, html, css } from "lit";

export class HeaderElement extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.25rem;
    }

    .brand {
      font-weight: 700;
      font-size: 1.3rem;
    }

    nav a {
      margin-left: 1rem;
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <header>
        <div class="brand">CoinBear</div>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/about">About</a>
          <a href="/app/merchant/target">Target</a>
        </nav>
      </header>
    `;
  }
}
