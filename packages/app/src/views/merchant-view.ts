import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

type Merchant = {
  id: string;
  name: string;
  monthlySpend?: number;
  transactions?: number;
  notes?: string;
};

export class MerchantViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem 4rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  `;

  @property({ attribute: "merchant-id" })
  merchantId?: string;

  @state()
  merchant: Merchant | null | undefined = undefined;

  connectedCallback() {
    super.connectedCallback();
    this.loadMerchant();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("merchantId")) {
      this.loadMerchant();
    }
  }

  async loadMerchant() {
    if (!this.merchantId) return;
    this.merchant = undefined; 
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(`/api/merchants/${this.merchantId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
  
      if (!res.ok) {
        console.error("merchant fetch failed:", res.status, await res.text());
        this.merchant = null;
        return;
      }
  
      this.merchant = (await res.json()) as Merchant;
    } catch (err) {
      console.error("merchant fetch error:", err);
      this.merchant = null;
    }
  }
  
  render() {
    if (this.merchant === undefined) {
      return html`<h1>Merchant</h1><p>Loading...</p>`;
    }

    if (this.merchant === null) {
      return html`<h1>Merchant</h1><p>Merchant not found.</p>`;
    }

    const m = this.merchant;
    return html`
      <h1>${m.name}</h1>
      <p><strong>ID:</strong> ${m.id}</p>
      <p><strong>Monthly spend:</strong> ${m.monthlySpend ?? "n/a"}</p>
      <p><strong>Transactions:</strong> ${m.transactions ?? "n/a"}</p>
      <p><strong>Notes:</strong> ${m.notes ?? "—"}</p>
    `;
  }
}

customElements.define("merchant-view", MerchantViewElement);
