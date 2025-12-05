import { LitElement, html } from "lit";
import { Auth, Observer } from "@calpoly/mustang";

interface Merchant {
  _id: string;
  name: string;
  category?: string;
  budget?: number;
}

export class MerchantViewElement extends LitElement {
  static properties = {
    merchantId: { type: String, attribute: "merchant-id" },
    merchant: { state: true },
    loading: { state: true },
    error: { state: true }
  };

  merchantId = "";
  merchant?: Merchant;
  loading = false;
  error: string | null = null;

  authUser?: Auth.User;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    const obs = new Observer<Auth.Model>(this, "auth");
    obs.observe((model) => {
      this.authUser = model.user;

      if (this.merchantId) {
        this.loadMerchant();
      }
    });
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("merchantId") && this.merchantId) {
      this.loadMerchant();
    }
  }

  async loadMerchant() {
    if (!this.authUser) return;

    this.loading = true;
    this.error = null;

    try {
      const headers = Auth.headers(this.authUser);

      const response = await fetch(`/api/merchants/${this.merchantId}`, {
        headers
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      this.merchant = await response.json();
    } catch (err: any) {
      console.error("Error loading merchant:", err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) return html`<p>Loading...</p>`;
    if (this.error) return html`<p style="color:red">${this.error}</p>`;
    if (!this.merchant) return html`<p>No merchant found.</p>`;

    const m = this.merchant;

    return html`
      <section>
        <h2>${m.name}</h2>
        <p>Category: ${m.category ?? "—"}</p>
        <p>Budget: $${m.budget?.toFixed?.(2) ?? "0.00"}</p>

        <button @click=${() =>
          (window.location.href = `/app/merchant/${m._id}/edit`)}>
          Edit Merchant
        </button>
      </section>
    `;
  }
}

customElements.define("merchant-view", MerchantViewElement);
