import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

interface Merchant {
  name: string;
  address?: string;
  notes?: string;
  logoSrc?: string;
  websiteHref?: string;
  phone?: string;
  category?: string;
  monthlySpend?: number;
  transactions?: number;
  lastDate?: string;
}

export class MerchantList extends LitElement {
  @property({ type: String }) src?: string;

  @state() private merchants: Merchant[] = [];
  @state() private loading = true;
  @state() private error: string | null = null;

  static styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--space-6, 1.25rem);
      align-items: stretch;
    }
    .muted {
      opacity: 0.7;
      font-size: 0.95rem;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    merchant-card {
      cursor: pointer;
      transition: transform 0.1s ease-in-out;
    }
    merchant-card:hover {
      transform: scale(1.02);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(src: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      this.merchants = Array.isArray(json) ? (json as Merchant[]) : [];
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      this.merchants = [];
    } finally {
      this.loading = false;
    }
  }

  private renderCard(m: Merchant) {
    const key = m.name
    .toLowerCase()
    .replace(/['’]/g, "")   
    .replace(/&/g, "")      
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
        return html`
      <a href="/merchant-detail.html?m=${key}">
        <merchant-card
          img-src=${m.logoSrc ?? ""}
          logo-src=${m.logoSrc ?? ""}
          category=${m.category ?? ""}
          address=${m.address ?? ""}
          notes=${m.notes ?? ""}
          phone=${m.phone ?? ""}
          monthly-spend=${m.monthlySpend ?? 0}
          transactions=${m.transactions ?? 0}
          last-date=${m.lastDate ?? ""}
        >
          ${m.name}
        </merchant-card>
      </a>
    `;
  }

  render() {
    if (this.loading) return html`<p class="muted">Loading merchants…</p>`;
    if (this.error) return html`<p role="alert">Error: ${this.error}</p>`;
    if (!this.merchants.length)
      return html`<p class="muted">No merchants found.</p>`;
    return html`<div class="grid">
      ${this.merchants.map((m) => this.renderCard(m))}
    </div>`;
  }
}

/** Guarded registration */
const TAG = "merchant-list";
if (!customElements.get(TAG)) {
  customElements.define(TAG, MerchantList);
}
