import { LitElement, html, css } from "lit";
import { Auth } from "@calpoly/mustang";

export class ProfileEditElement extends LitElement {
  static properties = {
    userId: { type: String, attribute: "user-id" },
    profile: { type: Object },
    status: { type: String }
  };

  userId = "";
  profile: any = null;
  status = "idle";

  createRenderRoot() {
    return this;
  }

  /* ---------------------------- */
  /* DASHBOARD-STYLE PAGE + CARD  */
  /* ---------------------------- */
  static styles = css`
    :host {
      font-family: Inter, sans-serif;
      display: block;
    }

    /* Page container matching dashboard spacing */
    .page-container {
      max-width: 900px;
      margin: 3rem auto;
      padding: 0 1.5rem 4rem;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1rem;
      color: #6b7280;
      margin-bottom: 2rem;
    }

    /* Dashboard-style card */
    .card {
      background: rgba(255, 255, 255, 0.85);
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(148,163,184,0.18);
    }

    /* Form layout */
    .profile-form {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      margin-top: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      gap: 0.4rem;
      font-size: 0.95rem;
    }

    input {
      padding: 0.6rem 0.8rem;
      border-radius: 10px;
      border: 1px solid rgba(148,163,184,0.45);
      font-size: 1rem;
    }

    input:disabled {
      background: #f3f4f6;
      color: #6b7280;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
      border-radius: 10px;
      padding: 0.6rem 1.1rem;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-secondary {
      padding: 0.6rem 1.1rem;
      border-radius: 10px;
      border: 1px solid #4f46e5;
      font-weight: 600;
      color: #4f46e5;
      text-decoration: none;
    }

    /* ---------------------------- */
    /* DARK MODE (matches dashboard) */
    /* ---------------------------- */
    :host-context(body.dark-mode) .card {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.1);
      box-shadow: 0 8px 40px rgba(0,0,0,0.35);
    }

    :host-context(body.dark-mode) h1,
    :host-context(body.dark-mode) .subtitle,
    :host-context(body.dark-mode) label {
      color: white;
    }

    :host-context(body.dark-mode) input {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.25);
      color: white;
    }

    :host-context(body.dark-mode) .btn-secondary {
      color: #a5b4fc;
      border-color: #a5b4fc;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("userId") && this.userId) {
      this.loadProfile();
    }
  }

  async loadProfile() {
    this.status = "loading";

    try {
      const authFetch = (Auth as any).fetch ?? fetch;
      const res = await authFetch(`/api/profile/${this.userId}`);
      if (!res.ok) throw new Error(res.statusText);

      this.profile = await res.json();
      this.status = "ready";
    } catch (err) {
      console.error(err);
      this.status = "error";
    }
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if (!this.profile) return;

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const updated = {
      ...this.profile,
      name: String(data.get("name")),
      email: String(data.get("email"))
    };

    try {
      const authFetch = (Auth as any).fetch ?? fetch;

      const res = await authFetch(`/api/profile/${this.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });

      const saved = await res.json();
      window.dispatchEvent(new CustomEvent("profile:updated", { detail: saved }));
      window.location.assign(`/app/profile/${this.userId}`);
    } catch (err) {
      console.error(err);
      alert("Unable to save profile.");
    }
  }

  /* ---------------------------- */
  /* DASHBOARD-STYLE RENDER UI    */
  /* ---------------------------- */
  render() {
    if (this.status === "loading" || this.status === "idle") {
      return html`
        <div class="page-container">
          <div class="card">Loading profile...</div>
        </div>
      `;
    }

    if (this.status === "error" || !this.profile) {
      return html`
        <div class="page-container">
          <div class="card">Unable to load profile.</div>
        </div>
      `;
    }

    const p = this.profile;

    return html`
      <div class="page-container">
        <h1>Edit Profile</h1>
        <p class="subtitle">Update your CoinBear details</p>

        <div class="card">
          <form class="profile-form" @submit=${this.onSubmit}>
            <label>
              User ID
              <input name="userid" .value=${p.userid} disabled />
            </label>

            <label>
              Name
              <input name="name" .value=${p.name ?? ""} />
            </label>

            <label>
              Email
              <input type="email" name="email" .value=${p.email ?? ""} />
            </label>

            <div class="actions">
              <button class="btn-primary" type="submit">Save Changes</button>
              <a class="btn-secondary" href="/app/profile/${p.userid}">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("profile-edit", ProfileEditElement);
