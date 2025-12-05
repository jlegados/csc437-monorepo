import { LitElement, html } from "lit";

// Log when module loads
console.log("[profile-view] module loaded");

export class ProfileViewElement extends LitElement {
  static properties = {
    userId: { type: String, attribute: "user-id" },
    loading: { state: true },
    error: { state: true },
    profile: { state: true }
  };

  userId = "";
  loading = false;
  error: string | null = null;
  profile: any = null;

  // Use light DOM so global page.css applies
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    const attr = this.getAttribute("user-id");
    console.log("[profile-view] connected, user-id attr =", attr);

    if (attr) {
      this.userId = attr;
      this.loadProfile();
    } else {
      console.warn("[profile-view] No user-id attribute provided");
    }
  }

  private loadProfile() {
    this.loading = true;
    this.error = null;
    this.requestUpdate();

    console.log("[profile-view] Loading profile for:", this.userId);

    fetch(`/api/profile/${this.userId}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((res: Response) => {
        console.log("[profile-view] Response:", res.status, res.statusText);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        }
        return res.json();
      })
      .then((profile: any) => {
        console.log("[profile-view] Loaded profile:", profile);

        this.profile = profile;
        this.loading = false;

        // 🔥 UPDATE LOCAL STORAGE for header
        if (profile && typeof profile === "object") {
          const { userid, name } = profile;

          if (userid) {
            window.localStorage.setItem("coinbear.userId", userid);
            this.userId = this.userId || userid;
          }
          if (name) {
            window.localStorage.setItem("coinbear.displayName", name);
          }
        }

        // 🔥 Notify other components that profile has been loaded
        window.dispatchEvent(
          new CustomEvent("profile:loaded", {
            detail: this.profile
          })
        );

        this.requestUpdate();
      })
      .catch((err: unknown) => {
        console.error("[profile-view] Load error:", err);
        this.error = String(err);
        this.loading = false;
        this.requestUpdate();
      });
  }

  render() {
    if (this.loading) {
      return html`<p>Loading profile...</p>`;
    }

    if (this.error) {
      return html`<p style="color:red;">Error: ${this.error}</p>`;
    }

    if (!this.profile) {
      return html`<p>No profile loaded.</p>`;
    }

    const p = this.profile;

    return html`
      <main class="profile-page">
        <section class="profile-card">
          <header class="profile-header">
            <h1>Your Profile</h1>
            <p class="profile-subtitle">Account Information</p>
          </header>

          <p><strong>User ID:</strong> ${p.userid}</p>
          <p><strong>Name:</strong> ${p.name}</p>
          <p><strong>Email:</strong> ${p.email}</p>

          <p class="profile-actions">
            <a href="/app/profile/${p.userid}/edit" class="btn-primary">
              Edit Profile
            </a>
          </p>
        </section>
      </main>
    `;
  }
}

customElements.define("profile-view", ProfileViewElement);
