import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

type Merchant = {
  _id?: string;
  id?: string;              // slug
  name: string;
  logoSrc?: string;
  websiteHref?: string;
  phone?: string;
  category?: string;
  monthlySpend?: number;
  transactions?: number;
  lastDate?: string;
  notes?: string;
};

export class MerchantListElement extends LitElement {
  static styles = css`
    :host { display: block; }
    .grid { display: grid; gap: 12px; }
  `;

  @property({ reflect: true }) src?: string;

  @state() merchants: Merchant[] = [];
  @state() loading = false;
  @state() error?: string;

  // --- AUTH OBSERVER + USER
  private _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  private _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      // If already have a URL and we just logged in, hydrate now.
      if (this.src && this._user?.authenticated && this.merchants.length === 0) {
        this.hydrate(this.src);
      }
    });
  }

  // Build Authorization header when authenticated
  get authorization(): HeadersInit | undefined {
    return this._user?.authenticated
      ? {
          Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
        }
      : undefined;
  }

  // Re-hydrate when src changes
  updated(changed: Map<string, unknown>) {
    if (changed.has("src") && this.src) {
      this.hydrate(this.src);
    }
  }

  render() {
    if (this.loading) return html`<p>Loading…</p>`;
    if (this.error) return html`<p class="error">${this.error}</p>`;
    return html`
      <div class="grid">
        ${this.merchants.map(
          (m) => html`
            <merchant-card
              name=${m.name}
              .logoSrc=${m.logoSrc}
              .websiteHref=${m.websiteHref}
              .notes=${m.notes}
              .category=${m.category}
              .monthlySpend=${m.monthlySpend}
              .transactions=${m.transactions}
              .lastDate=${m.lastDate}
            ></merchant-card>
          `
        )}
      </div>
    `;
  }

  async hydrate(url: string) {
    this.loading = true;
    this.error = undefined;
    try {
      const res = await fetch(url, {
        headers: this.authorization as HeadersInit
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to view merchants.");
        if (res.status === 403) throw new Error("Session expired. Please log in again.");
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as Merchant[] | { items: Merchant[] };
      this.merchants = Array.isArray(data) ? data : data.items ?? [];
    } catch (err: any) {
      this.error = err?.message ?? String(err);
    } finally {
      this.loading = false;
    }
  }
}

customElements.define("merchant-list", MerchantListElement);
