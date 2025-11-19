// packages/app/src/views/profile-view.ts
import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";

import type { Model } from "../model";
import type { Msg } from "../message";

type Profile = {
  username: string;
  name: string;
  email: string;
};

export class ProfileViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id" })
  userid?: string;

  @state()
  private loading = false;

  @state()
  private error: string | null = null;

  @state()
  private profile: Profile | null = null;

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 40rem;
      margin: 0 auto;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }

    h2 {
      margin-bottom: 0.75rem;
    }

    .muted {
      color: #555;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    pre {
      background: #111;
      color: #f5f5f5;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      font-size: 0.8rem;
    }
  `;

  constructor() {
    super("coinbear:model");
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.userid) {
      this.loadProfile(this.userid);
    }
  }

  updated(changed: Map<string, unknown>) {
    // If the URL user-id changes, reload the profile
    if (changed.has("userid") && this.userid) {
      this.loadProfile(this.userid);
    }
  }

  private async loadProfile(userid: string) {
    this.loading = true;
    this.error = null;
    this.profile = null;

    try {
      const res = await fetch(`/api/profile/${encodeURIComponent(userid)}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as Profile;
      this.profile = data;
    } catch (err) {
      console.error("Profile load error:", err);
      this.error = String(err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    const { userid } = this;

    if (!userid) {
      return html`<h2>Profile View</h2>
        <p class="muted">No user id provided in URL.</p>`;
    }

    if (this.loading) {
      return html`<h2>Profile View</h2>
        <p>User id attribute: <b>${userid}</b></p>
        <p>Loading profile…</p>`;
    }

    if (this.error) {
      return html`<h2>Profile View</h2>
        <p>User id attribute: <b>${userid}</b></p>
        <p>Could not load profile: ${this.error}</p>`;
    }

    if (!this.profile) {
      return html`<h2>Profile View</h2>
        <p>User id attribute: <b>${userid}</b></p>
        <p>No profile found.</p>`;
    }

    const p = this.profile;

    return html`
      <h2>Profile for ${p.username}</h2>
      <p><b>Name:</b> ${p.name}</p>
      <p><b>Email:</b> ${p.email}</p>

      <h3>Raw profile JSON:</h3>
      <pre>${JSON.stringify(p, null, 2)}</pre>
    `;
  }
}
