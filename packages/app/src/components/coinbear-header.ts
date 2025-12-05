import { LitElement, html } from "lit";
import { Auth, Observer } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  static properties = {
    menuOpen: { type: Boolean },
    userId: { type: String },
    displayName: { type: String }
  };

  menuOpen = false;
  userId = "";
  displayName = "";

  // Listen to Mustang Auth provider
  private _auth = new Observer<Auth.Model>(this, "coinbear:auth");

  createRenderRoot() {
    // Use global CSS instead of Shadow DOM
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    //
    // 1️⃣ Load cached values first
    //
    this.displayName = localStorage.getItem("coinbear.displayName") || "";
    this.userId = localStorage.getItem("coinbear.userId") || "";

    //
    // 2️⃣ Sync with Auth system
    //
    this._auth.observe(({ user }) => {
      if (user?.authenticated) {
        const userid = user.username;

        this.userId = userid;
        localStorage.setItem("coinbear.userId", userid);

        // If name not in localStorage yet, fallback to userid
        if (!this.displayName) {
          this.displayName = userid;
        }
      }

      this.requestUpdate();
    });

    //
    // 3️⃣ Listen for profile edits (from <profile-edit>)
    //
    window.addEventListener("profile:updated", (event: any) => {
      const profile = event.detail;
      if (!profile) return;

      // Update name + ID everywhere
      if (profile.name) {
        this.displayName = profile.name;
        localStorage.setItem("coinbear.displayName", profile.name);
      }

      if (profile.userid) {
        this.userId = profile.userid;
        localStorage.setItem("coinbear.userId", profile.userid);
      }

      this.requestUpdate(); // 🔥 instantly redraw header
    });
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private closeMenu() {
    this.menuOpen = false;
  }

  private toggleDark(ev: Event) {
    const checked = (ev.currentTarget as HTMLInputElement).checked;
    document.body.classList.toggle("dark-mode", checked);
  }

  private handleLogout(ev: Event) {
    ev.preventDefault();
    this.closeMenu();
  
    // Clear ALL identity keys
    localStorage.removeItem("coinbear.userId");
    localStorage.removeItem("coinbear.displayName");
    localStorage.removeItem("coinbear.token");
    localStorage.removeItem("token");        // used by your login.html
    localStorage.removeItem("username");     // used by your login.html
  
    // also clear header state
    this.userId = "";
    this.displayName = "";
  
    // Force-refresh the whole app so <mu-auth> resets
    window.location.href = "/login.html";
  }
  

  private pageTitle(): string {
    const path = window.location.pathname;

    if (path.includes("/edit")) return "Edit Profile";
    if (path.includes("/profile")) return "Profile";
    if (path.includes("/merchant")) return "Merchants";

    return "Dashboard";
  }

  render() {
    const nameToShow = this.displayName || this.userId || "traveler";
    const pageName = this.pageTitle();

    return html`
      <header class="app-header">
        <div class="app-left">
          <div class="logo logo-large">🐻</div>
          <div class="titles">
            <p class="app-name">CoinBear</p>
            <p class="page-name">${pageName}</p>
          </div>
        </div>

        <nav class="app-nav">
          <a is="nav-link" href="/app" class="btn-icon"><span>Budget</span></a>
          <a is="nav-link" href="/app" class="btn-icon"><span>Categories</span></a>
          <a is="nav-link" href="/app" class="btn-icon"><span>Goals</span></a>
          <a is="nav-link" href="/app/merchant" class="btn-icon"><span>Merchants</span></a>
        </nav>

        <div class="app-user">
          <div class="user-menu">
            <button class="btn btn-soft" @click=${this.toggleMenu}>
              Hi, ${nameToShow} ▾
            </button>

            <div class="menu-panel ${this.menuOpen ? "open" : ""}">
              <a
                is="nav-link"
                href=${`/app/profile/${this.userId}`}
                @click=${this.closeMenu}
              >View Profile</a>

              <a
                is="nav-link"
                href=${`/app/profile/${this.userId}/edit`}
                @click=${this.closeMenu}
              >Edit Profile</a>

              <a href="/auth/logout" @click=${this.handleLogout}>Logout</a>
            </div>
          </div>

          <label style="display:flex; align-items:center; gap:0.35rem;">
            <input type="checkbox" @change=${this.toggleDark} />
            Dark mode
          </label>
        </div>
      </header>
    `;
  }
}

customElements.define("coinbear-header", HeaderElement);
