import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {
  @state() formData: LoginFormData = {};
  @property() api: string = "/auth/login";
  @property() redirect: string = "/index.html";
  @state() error?: string;

  static styles = css`
    form { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .error { color:#b00020; width:100%; }
    button[disabled]{ opacity:.5; cursor:not-allowed; }
  `;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username && this.formData.password);
  }

  render() {
    // NOTE: event bindings are attributes *on* the <form> tag
    return html`
      <form @input=${this.handleInput} @submit=${this.handleSubmit}>
        <slot></slot>
        <slot name="button">
          <button type="submit" ?disabled=${!this.canSubmit}>Login</button>
        </slot>
        <p class="error">${this.error ?? ""}</p>
      </form>
    `;
  }

  private handleInput = (e: Event) => {
    const t = e.target as HTMLInputElement | null;
    if (!t?.name) return;
    this.formData = { ...this.formData, [t.name]: t.value };
  };

  private handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    this.error = undefined;
  
    // use the state collected via @input events
    const data = this.formData as { username?: string; password?: string };
  
    if (!data.username || !data.password) {
      this.error = "Please enter username and password.";
      return;
    }
  
    try {
      const res = await fetch(this.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.username, password: data.password })
      });
  
      if (res.status !== 200) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Login failed");
      }
  
      const { token } = (await res.json()) as { token: string };
  
      // notify <mu-auth>
      this.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: this.redirect }]
        })
      );
  
      // fallback redirect
      if (this.redirect) window.location.href = this.redirect;
    } catch (err: any) {
      this.error = String(err?.message || err || "Login failed");
    }
  };  
}

customElements.define("login-form", LoginFormElement);
