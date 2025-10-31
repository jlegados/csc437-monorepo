import { html, css, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";

function fmtCurrency(n?: number) {
  if (n == null || Number.isNaN(n)) return "—";
  return n < 0 ? `−$${Math.abs(n).toFixed(2)}` : `$${n.toFixed(2)}`;
}

export class MerchantDetailElement extends LitElement {
  static properties = {
    logoSrc:       { type: String, attribute: "logo-src" },
    websiteHref:   { type: String, attribute: "website-href" },
    phone:         { type: String },
    category:      { type: String },
    monthlySpend:  { type: Number, attribute: "monthly-spend" },
    transactions:  { type: Number },
    lastDate:      { type: String, attribute: "last-date" },

    name:          { type: String },
    address:       { type: String },
    notes:         { type: String }
  } as const;

  logoSrc?: string;
  websiteHref?: string;
  phone?: string;
  category?: string;
  monthlySpend?: number;
  transactions?: number;
  lastDate?: string;

  name?: string;
  address?: string;
  notes?: string;

  @state() private loading = false;
  @state() private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    const slug = new URLSearchParams(location.search).get("m");
    if (slug) this.load(slug);
  }

  private async load(slug: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await fetch(`/merchants/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const m = await res.json();

      // Map JSON → component props
      this.name         = m.name ?? this.name;
      this.logoSrc      = m.logoSrc ?? this.logoSrc;
      this.websiteHref  = m.websiteHref ?? this.websiteHref;
      this.phone        = m.phone ?? this.phone;
      this.category     = m.category ?? this.category;
      this.monthlySpend = m.monthlySpend ?? this.monthlySpend;
      this.transactions = m.transactions ?? this.transactions;
      this.lastDate     = m.lastDate ?? this.lastDate;
      this.address      = m.address ?? this.address;
      this.notes        = m.notes ?? this.notes;
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    } finally {
      this.loading = false;
    }
  }

  /** Render */
  override render() {
    if (this.loading) return html`<p class="muted">Loading…</p>`;
    if (this.error)   return html`<p role="alert">Error: ${this.error}</p>`;

    return html`
      <article class="card">
        <div class="top">
          <a
            class="logo-wrap"
            href=${this.websiteHref ?? "#"}
            target=${this.websiteHref ? "_blank" : nothing}
            rel=${this.websiteHref ? "noopener" : nothing}
            aria-label="Merchant website"
          >
            ${this.logoSrc
              ? html`<img class="logo" src=${this.logoSrc} alt="" />`
              : html`<div class="logo placeholder" aria-hidden="true"></div>`}
          </a>

          <div class="headings">
            <h1 class="name">
              ${this.name ?? html`<slot name="name">Merchant</slot>`}
            </h1>
            <div class="subline">
              ${this.category ? html`<span class="pill">${this.category}</span>` : nothing}
              ${this.phone
                ? html`<a class="link" href="tel:${this.phone}">${this.phone}</a>`
                : nothing}
              ${this.websiteHref
                ? html`<a class="link" href=${this.websiteHref} target="_blank" rel="noopener">Website</a>`
                : nothing}
            </div>
            <div class="address">
              ${this.address ?? html`<slot name="address">—</slot>`}
            </div>
          </div>

          <div class="cta">
            <div class="muted">Total spent this month</div>
            <div class="kpi">${fmtCurrency(this.monthlySpend)}</div>
            <a class="btn btn-accent" href="/transaction.html">＋ Add Transaction</a>
          </div>
        </div>

        <dl class="stats">
          <div>
            <dt>Monthly Spend</dt>
            <dd>${fmtCurrency(this.monthlySpend)}</dd>
          </div>
          <div>
            <dt>Transactions</dt>
            <dd>${this.transactions ?? "—"}</dd>
          </div>
          <div>
            <dt>Last Transaction</dt>
            <dd>${this.lastDate ?? "—"}</dd>
          </div>
        </dl>

        <p class="notes">
          ${this.notes ?? html`<slot name="notes"></slot>`}
        </p>
      </article>
    `;
  }

  static styles = css`
    :host { display:block; grid-column:1 / -1; color: var(--text, #0f172a); transition: background .3s, color .3s; }
    .card { background: var(--surface-2, #fff); border-radius: var(--radius, 16px); box-shadow: var(--shadow, 0 4px 14px rgba(2,6,23,.12)); padding: 1rem 1.25rem; display: grid; gap: 1rem; }
    .top { display:grid; grid-template-columns: 80px 1fr auto; gap:1rem; align-items:center; }
    .logo-wrap { display:grid; place-items:center; width:80px; height:80px; border-radius:16px; background: var(--surface-1,#f3f4f6); overflow:hidden; }
    .logo { width:100%; height:100%; object-fit:cover; display:block; }
    .logo.placeholder { background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.03)); }
    .headings { display:grid; gap:.4rem; }
    .name { font-size:1.35rem; line-height:1.2; margin:0; }
    .subline { display:flex; flex-wrap:wrap; gap:.5rem .75rem; align-items:center; color: var(--text-muted, rgba(15,23,42,.65)); font-size:.95rem; }
    .pill { display:inline-flex; align-items:center; gap:.35rem; padding:.15rem .5rem; border-radius:999px; background: var(--surface-1,#f3f4f6); color: var(--text,#0f172a); border:1px solid var(--line,rgba(0,0,0,.08)); font-size:.8rem; font-weight:600; }
    .link { text-decoration: underline; text-underline-offset: 2px; }
    .address { color: var(--text-muted, rgba(15,23,42,.65)); font-size:.95rem; }
    .cta { text-align:right; display:grid; gap:.4rem; justify-items:end; }
    .muted { color: var(--text-muted, rgba(15,23,42,.65)); font-size:.85rem; }
    .kpi { font-size:1.6rem; font-weight:700; line-height:1; }
    .btn { display:inline-flex; align-items:center; justify-content:center; padding:.5rem .75rem; border-radius: var(--radius,16px); border:1px solid var(--line, rgba(0,0,0,.08)); background: var(--surface-1,#f3f4f6); cursor:pointer; transition: background .2s; }
    .btn-accent { background: var(--accent, #ffc7c2); color: var(--accent-ink, #4a1210); border-color: transparent; box-shadow: var(--shadow-soft, 0 2px 8px rgba(2,6,23,.08)); font-weight:600; }
    .stats { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:.75rem; padding-top:.25rem; }
    .stats dt { font-size:.8rem; color: var(--text-muted, rgba(15,23,42,.65)); font-weight:600; }
    .stats dd { margin:.15rem 0 0; font-size:1.05rem; font-weight:600; }
    .notes { margin-top:.25rem; }
    @media (max-width: 720px) {
      .top { grid-template-columns: 64px 1fr; align-items:start; }
      .cta { grid-column:1 / -1; justify-items:start; text-align:left; }
      .logo-wrap { width:64px; height:64px; border-radius:12px; }
    }
  `;
}

customElements.define("merchant-detail", MerchantDetailElement);
