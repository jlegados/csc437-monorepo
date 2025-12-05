import { LitElement, html } from "lit";
import { Auth } from "@calpoly/mustang";

export class ProfileEditElement extends LitElement {
  static properties = {
    userId: { type: String, attribute: "user-id" },
    profile: { type: Object },
    status: { type: String }
  };

  userId = "";
  profile: any = null;
  status: "idle" | "loading" | "ready" | "error" = "idle";

  createRenderRoot() {
    // Use global styles (page.css) instead of shadow DOM
    return this;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("userId") && this.userId) {
      this.loadProfile();
    }
  }

  private async loadProfile() {
    this.status = "loading";

    try {
      const authFetch = (Auth as any).fetch ?? fetch;

      const response = await authFetch(`/api/profile/${this.userId}`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error(response.statusText);

      this.profile = await response.json();
      this.status = "ready";
    } catch (err) {
      console.error("Error loading profile:", err);
      this.status = "error";
    }
  }

  /** SAVE PROFILE — includes the Step 3 global broadcast */
  private async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.profile) return;

    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const updatedProfile = {
      ...this.profile,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? "")
    };

    try {
      const authFetch = (Auth as any).fetch ?? fetch;

      const response = await authFetch(`/api/profile/${this.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile)
      });

      if (!response.ok) throw new Error(response.statusText);

      // ⭐ NEW: fetch the saved profile from server
      const saved = await response.json();

      // ⭐ NEW: broadcast event so coinbear-header updates instantly
      window.dispatchEvent(
        new CustomEvent("profile:updated", {
          detail: saved
        })
      );

      // redirect back to profile view
      window.location.assign(`/app/profile/${this.userId}`);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Unable to save profile.");
    }
  }

  render() {
    if (this.status === "loading" || this.status === "idle") {
      return html`
        <main class="profile-page">
          <section class="profile-card">
            <p>Loading profile...</p>
          </section>
        </main>
      `;
    }

    if (this.status === "error" || !this.profile) {
      return html`
        <main class="profile-page">
          <section class="profile-card">
            <p class="profile-error">No profile loaded.</p>
          </section>
        </main>
      `;
    }

    const p = this.profile;

    return html`
      <main class="profile-page">
        <section class="profile-card">
          <header class="profile-header">
            <div>
              <h1>Edit Profile</h1>
              <p class="profile-subtitle">Update your CoinBear details</p>
            </div>
          </header>

          <form class="profile-form" @submit=${(e: Event) => this.onSubmit(e)}>
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

            <div class="profile-form-actions">
              <button type="submit" class="btn-primary">Save Changes</button>
              <a class="btn-secondary" href="/app/profile/${p.userid}">
                Cancel
              </a>
            </div>
          </form>
        </section>
      </main>
    `;
  }
}

customElements.define("profile-edit", ProfileEditElement);
