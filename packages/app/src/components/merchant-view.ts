import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Merchant { id:string; name:string; category?:string; logoSrc?:string; websiteHref?:string; phone?:string; notes?:string; }

export class MerchantViewElement extends LitElement {
  static styles = css`section{padding:16px} img{max-height:48px}`;
  @property({ attribute: "merchant-id" }) merchantId?: string;
  @state() merchant?: Merchant;
  @state() error?: string;

  connectedCallback(): void { super.connectedCallback(); this.load(); }

  async load() {
    try {
      const res = await fetch(`/api/merchants/${this.merchantId}`);
      if (!res.ok) throw new Error(`Failed to load merchant: ${res.status}`);
      this.merchant = await res.json();
    } catch (e:any) { this.error = e?.message || String(e); }
  }

  render() {
    if (this.error) return html`<section><h2>Error</h2><pre>${this.error}</pre></section>`;
    if (!this.merchant) return html`<section><p>Loading…</p></section>`;
    const m = this.merchant;
    return html`
      <section>
        <h2>${m.name}</h2>
        ${m.logoSrc ? html`<img src="${m.logoSrc}" alt="${m.name}" />` : null}
        <p><b>Category:</b> ${m.category || "—"}</p>
        <p><b>Phone:</b> ${m.phone || "—"}</p>
        <p><b>Website:</b> ${m.websiteHref ? html`<a href="${m.websiteHref}" target="_blank">${m.websiteHref}</a>` : "—"}</p>
        <p><b>Notes:</b> ${m.notes || "—"}</p>
      </section>
    `;
  }
}
customElements.define("merchant-view", MerchantViewElement);
