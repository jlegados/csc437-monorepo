import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";

import type { Model, Profile } from "../model";
import type { Msg } from "../message";

export class ProfileViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id" })
  userid?: string;

  constructor() {
    super("coinbear:model");
  }

  get profile(): Profile | undefined {
    return this.model.profile;
  }

  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === "user-id" && newVal && newVal !== oldVal) {
      this.dispatchMessage([
        "profile/load",
        { userid: newVal },
        {} // empty reactions object
      ]);
    }
  }

  render() {
    if (!this.userid) return html`<p>No user id provided.</p>`;

    const profile = this.profile;

    if (this.model.profileStatus === "loading")
      return html`<p>Loading...</p>`;

    if (!profile) return html`<p>No profile loaded.</p>`;

    return html`
      <h2>${profile.username}'s Profile</h2>
      <p>Name: ${profile.name}</p>
      <p>Email: ${profile.email}</p>

      <a is="mu-link" href="/app/profile/${this.userid}/edit">Edit</a>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;
}

customElements.define("profile-view", ProfileViewElement);
