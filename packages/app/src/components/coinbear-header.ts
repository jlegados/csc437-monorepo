import { LitElement, html } from "lit";
import { Auth, Observer } from "@calpoly/mustang";
import "./cb-icon";

export class HeaderElement extends LitElement {
  static properties = {
    menuOpen: { type: Boolean },
    userId: { type: String },
    displayName: { type: String }
  };

  menuOpen = false;
  userId = "";
  displayName = "";

  private _auth = new Observer<Auth.Model>(this, "coinbear:auth");

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!document.getElementById("coinbear-header-style")) {
      const style = document.createElement("style");
      style.id = "coinbear-header-style";
      style.textContent = `

        .app-header {
          width: 100%;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--color-background-page, #f7f8fc);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .app-left {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .logo {
          font-size: 1.6rem;
        }

        .titles {
          display: flex;
          flex-direction: column;
          gap: 0px;
          line-height: 1.1;
        }

        .app-name {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .page-name {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .app-nav {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-icon {
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.05);
          font-size: 0.85rem;
          text-decoration: none;
          color: #111;
          transition: background 0.2s ease;
        }

        .btn-icon:hover {
          background: rgba(255,255,255,0.9);
        }

        .app-user {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        .btn {
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.7);
          padding: 6px 14px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.85rem;
        }

        .user-menu {
          position: relative;
        }

        .menu-panel {
          position: absolute;
          top: 115%;
          right: 0;
          width: 180px;
          background: rgba(255,255,255,0.95);
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 6px 24px rgba(0,0,0,0.14);
          padding: 0.4rem 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-5px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          z-index: 50;
        }

        .menu-panel.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .menu-panel a {
          padding: 0.6rem 1rem;
          display: block;
          color: #111;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .menu-panel a:hover {
          background: rgba(0,0,0,0.05);
        }

        body.dark-mode .app-header {
          background: #0f172a;
          border-color: rgba(255,255,255,0.06);
        }

        body.dark-mode .app-name,
        body.dark-mode .page-name,
        body.dark-mode .btn-icon,
        body.dark-mode .btn {
          color: #fff;
        }

        body.dark-mode .btn-icon {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
        }

        body.dark-mode .btn-icon:hover {
          background: rgba(255,255,255,0.12);
        }

        body.dark-mode .btn {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
        }

        body.dark-mode .menu-panel {
          background: rgba(255,255,255,0.06);
          color: white;
          border-color: rgba(255,255,255,0.15);
        }

        body.dark-mode .menu-panel a {
          color: white;
        }

        body.dark-mode .menu-panel a:hover {
          background: rgba(255,255,255,0.12);
        }
        .app-header {
          width: 100%;
          padding: 1.6rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;      /* WHITE HEADER */
          border-bottom: 1px solid rgba(0,0,0,0.05); /* subtle divider */
        }

        /* LEFT SIDE */
        .app-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .logo-large .cb-icon {
          width: 56px !important;
          height: 56px !important;
        }

        /* TITLES */
        .app-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #1b1e29;
        }

        .page-name {
          font-size: 1rem;
          color: #636c78;
          margin-top: -4px;
        }

        /* NAV PILL BUTTONS */
        .app-nav {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .nav-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          background: #dbe2f8;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          color: #1a1c22;
          border: 1px solid rgba(0,0,0,0.04);
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .nav-pill:hover {
          background: #cdd8f6;
          transform: translateY(-1px);
        }

        /* the small icons inside the pills */
        .nav-pill .cb-icon {
          opacity: 0.75;
        }

      `;
      document.head.appendChild(style);
    }

    this.displayName =
      localStorage.getItem("coinbear.displayName") || "";
    this.userId =
      localStorage.getItem("coinbear.userId") || "";

    this._auth.observe(({ user }) => {
      if (user?.authenticated) {
        this.userId = user.username;
        localStorage.setItem("coinbear.userId", this.userId);

        if (!this.displayName) {
          this.displayName = this.userId;
        }
      }
      this.requestUpdate();
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDark(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    document.body.classList.toggle("dark-mode", checked);
  }

  handleLogout(ev: Event) {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = "/login.html";
  }

  pageTitle() {
    const path = window.location.pathname;
    if (path.includes("edit")) return "Edit Profile";
    if (path.includes("profile")) return "Profile";
    return "Dashboard";
  }

  render() {
    const name = this.displayName || this.userId || "traveler";
    const pageName = this.pageTitle();
  
    return html`
      <header class="app-header">
        <div class="app-left">
          <div class="logo logo-large">
            <cb-icon name="store" size="48"></cb-icon>
          </div>
  
          <div class="titles">
            <p class="app-name">CoinBear</p>
            <p class="page-name">${pageName}</p>
          </div>
        </div>

        <nav class="app-nav">
          <a class="nav-pill" href="/app">
            <cb-icon name="graph" size="18"></cb-icon>
            Dashboard
          </a>

          <a class="nav-pill" href="/app/categories">
            <cb-icon name="folder" size="18"></cb-icon>
            Categories
          </a>

          <a class="nav-pill" href="/app/transactions">
            <cb-icon name="savings" size="18"></cb-icon>
            Transactions
          </a>

          <a class="nav-pill" href="/app/merchant">
            <cb-icon name="change" size="18"></cb-icon>
            Merchants
          </a>

        </nav>



        <!-- USER MENU -->
        <div class="app-user">
          <div class="user-menu">
            <button class="btn" @click=${this.toggleMenu}>
              Hi, ${name} ▾
            </button>

            <div class="menu-panel ${this.menuOpen ? "open" : ""}">
              <a href="/app/profile/${this.userId}">View Profile</a>
              <a href="/app/profile/${this.userId}/edit">Edit Profile</a>
              <a href="/auth/logout" @click=${this.handleLogout}>Logout</a>
            </div>
          </div>

          <label style="display:flex;align-items:center;gap:0.4rem;">
            <input type="checkbox" @change=${this.toggleDark} />
            Dark Mode
          </label>
        </div>
      </header>
    `;
  }
}

customElements.define("coinbear-header", HeaderElement);
