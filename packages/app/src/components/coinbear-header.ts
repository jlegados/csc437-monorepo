import { LitElement, css, html } from "lit";

export class HeaderElement extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }

    .logo {
      font-weight: 700;
      font-size: 1.4rem;
    }

    nav a {
      margin-left: 1.5rem;
      text-decoration: none;
      color: rebeccapurple;
      font-weight: 500;
      cursor: pointer;
    }

    nav a:hover {
      text-decoration: underline;
    }
  `;

  private goToLogin(e: Event) {
    e.preventDefault();
    window.location.href = "/login.html"; // force real navigation
  }

  private logout(e: Event) {
    e.preventDefault();
    // Clear all auth info
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect to login
    window.location.href = "/login.html";
  }

  render() {
    const username = localStorage.getItem("username");

    return html`
      <header>
        <div class="logo">CoinBear</div>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/about">About</a>
          <a href="/app/merchant/target">Target</a>

          ${username
            ? html`
                <a href="/app/profile/${username}">Profile</a>
                <a href="#" @click=${this.logout}>Logout</a>
              `
            : html`
                <a href="/login.html" @click=${this.goToLogin}>Login</a>
              `}
        </nav>
      </header>
    `;
  }
}
