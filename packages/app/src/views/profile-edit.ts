import { View, Form, History } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";

import type { Model, Profile } from "../model";
import type { Msg } from "../message";

export class ProfileEditElement extends View<Model, Msg> {
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
        {}
      ]);
    }
  }

  private handleSubmit(event: Form.SubmitEvent<Profile>) {
    if (!this.userid) return;

    const profile = event.detail;

    this.dispatchMessage([
      "profile/save",
      { userid: this.userid, profile },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.userid}`
          }),
        onFailure: (err) => console.error("Save failed:", err)
      }
    ]);
  }

  render() {
    if (!this.profile) return html`<p>Loading...</p>`;

    return html`
      <h2>Edit Profile</h2>

      <mu-form
        .init=${this.profile}
        @mu-form:submit=${this.handleSubmit.bind(this)}
      >
        <label>
          Name
          <input name="name" />
        </label>
        <label>
          Email
          <input name="email" />
        </label>
        <button>Save</button>
      </mu-form>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 20rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      gap: 0.25rem;
    }

    input {
      padding: 0.25rem 0.5rem;
    }
  `;
}

customElements.define("profile-edit", ProfileEditElement);
