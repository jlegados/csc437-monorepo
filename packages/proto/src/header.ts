import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth, Events } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--surface-1, #fff);
      border-bottom: 1px solid var(--surface-3, #ddd);
      padding: 0.75rem 1rem;
    }
    .left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .titles {
      display: flex;
      flex-direction: column;
    }
    .app-name {
      font-family: var(--font-display, 'Fredoka');
      font-weight: 700;
      margin: 0;
    }
    nav {
      display: flex;
      gap: 1rem;
    }
    nav a {
      text-decoration: none;
      color: var(--color-text, #333);
      font-weight: 600;
    }
    nav a[aria-current="page"] {
      text-decoration: underline;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    button {
      border: none;
      background: var(--surface-2, #eee);
      border-radius: 6px;
      padding: 0.4rem 0.7rem;
      cursor: pointer;
    }
  `;

  // --- AUTH OBSERVER ---
  private _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  @state() loggedIn = false;
  @state() userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;
      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  // --- render helpers ---
  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) =>
          Events.relay(e, "auth:message", ["auth/signout"])}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`<a href="/login.html">Sign In…</a>`;
  }

  render() {
    return html`
      <header>
        <div class="left">
          <img src="/images/coinbear.png" alt="CoinBear" class="logo" width="40" />
          <div class="titles">
            <h1 class="app-name">CoinBear</h1>
            <div><slot name="page-title"></slot></div>
          </div>
        </div>

        <nav>
          <a href="/budget.html">Budget</a>
          <a href="/category.html">Categories</a>
          <a href="/goal.html">Goals</a>
          <a href="/merchants.html" aria-current="page">Merchants</a>
        </nav>

        <div class="right">
          <span>Hello, ${this.userid || "traveler"}</span>
          ${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
        </div>
      </header>
    `;
  }
}

customElements.define("blz-header", HeaderElement);
