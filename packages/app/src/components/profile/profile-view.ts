import { LitElement, html, css } from "lit";

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

  /* ---------------------------- */
  /* DASHBOARD CARD + PAGE STYLES */
  /* ---------------------------- */
  static styles = css`
    :host {
      display: block;
      font-family: Inter, sans-serif;
    }

    .page-container {
      max-width: 900px;
      margin: 3rem auto;
      padding: 0 1.5rem 4rem;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1rem;
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .card {
      background: rgba(255, 255, 255, 0.85);
      padding: 2rem;
      border-radius: 20px;
      border: 1px solid rgba(148,163,184,0.18);
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      backdrop-filter: blur(18px);
    }

    p {
      margin: 0.4rem 0;
      font-size: 1.05rem;
    }

    .actions {
      margin-top: 1.6rem;
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
      padding: 0.6rem 1.1rem;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
    }

    /* ---------------------------- */
    /* DARK MODE */
    /* ---------------------------- */
    :host-context(body.dark-mode) .card {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.1);
      box-shadow: 0 8px 40px rgba(0,0,0,0.35);
    }

    :host-context(body.dark-mode) h1,
    :host-context(body.dark-mode) p {
      color: white;
    }

    :host-context(body.dark-mode) .subtitle {
      color: #a5b4fc;
    }

    :host-context(body.dark-mode) .btn-primary {
      background: #6366f1;
    }
  `;

  createRenderRoot() {
    return this; // use light DOM so global styles work
  }

  connectedCallback() {
    super.connectedCallback();
    this.userId = this.getAttribute("user-id") ?? "";
    if (this.userId) this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.error = null;

    fetch(`/api/profile/${this.userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((profile) => {
        this.profile = profile;
        this.loading = false;

        // update header values
        window.localStorage.setItem("coinbear.displayName", profile.name);
        window.localStorage.setItem("coinbear.userId", profile.userid);

        window.dispatchEvent(
          new CustomEvent("profile:loaded", { detail: profile })
        );
      })
      .catch((err) => {
        console.error(err);
        this.error = String(err);
        this.loading = false;
      });
  }

  /* ---------------------------- */
  /* RENDER UI                    */
  /* ---------------------------- */
  render() {
    if (this.loading) {
      return html`<div class="page-container"><div class="card">Loading...</div></div>`;
    }

    if (this.error) {
      return html`<div class="page-container">
        <div class="card" style="color:red;">Error: ${this.error}</div>
      </div>`;
    }

    if (!this.profile) {
      return html`<div class="page-container">
        <div class="card">Profile not found.</div>
      </div>`;
    }

    const p = this.profile;

    return html`
      <div class="page-container">
        <h1>Your Profile</h1>
        <p class="subtitle">Account Information</p>

        <div class="card">
          <p><strong>User ID:</strong> ${p.userid}</p>
          <p><strong>Name:</strong> ${p.name}</p>
          <p><strong>Email:</strong> ${p.email}</p>

          <div class="actions">
            <a href="/app/profile/${p.userid}/edit" class="btn-primary">
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("profile-view", ProfileViewElement);
