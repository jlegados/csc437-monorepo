import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as i,i as s,E as a,x as t}from"./lit-element-DMCH56eX.js";const o=i`
  *,*::before,*::after { box-sizing: border-box; }
  :host { font: inherit; color: inherit; }
  img { display: block; max-width: 100%; height: auto; }
`;function r(e){return e==null||Number.isNaN(e)?"—":e<0?`−$${Math.abs(e).toFixed(2)}`:`$${e.toFixed(2)}`}class n extends s{static properties={logoSrc:{type:String,attribute:"logo-src"},websiteHref:{type:String,attribute:"website-href"},phone:{type:String},category:{type:String},monthlySpend:{type:Number,attribute:"monthly-spend"},transactions:{type:Number},lastDate:{type:String,attribute:"last-date"}};logoSrc;websiteHref;phone;category;monthlySpend;transactions;lastDate;render(){return t`
      <article class="card">
        <div class="top">
          <a
            class="logo-wrap"
            href=${this.websiteHref??"#"}
            target=${this.websiteHref?"_blank":a}
            rel=${this.websiteHref?"noopener":a}
            aria-label="Merchant website"
          >
            ${this.logoSrc?t`<img class="logo" src=${this.logoSrc} alt="" />`:t`<div class="logo placeholder" aria-hidden="true"></div>`}
          </a>

          <div class="headings">
            <h1 class="name"><slot name="name">Merchant</slot></h1>
            <div class="subline">
              ${this.category?t`<span class="pill">${this.category}</span>`:a}
              ${this.phone?t`<a class="link" href="tel:${this.phone}">${this.phone}</a>`:a}
              ${this.websiteHref?t`<a class="link" href=${this.websiteHref} target="_blank" rel="noopener">Website</a>`:a}
            </div>
            <div class="address"><slot name="address">—</slot></div>
          </div>

          <div class="cta">
            <div class="muted">Total spent this month</div>
            <div class="kpi">${r(this.monthlySpend)}</div>
            <a class="btn btn-accent" href="/transaction.html">＋ Add Transaction</a>
          </div>
        </div>

        <dl class="stats">
          <div>
            <dt>Monthly Spend</dt>
            <dd>${r(this.monthlySpend)}</dd>
          </div>
          <div>
            <dt>Transactions</dt>
            <dd>${this.transactions??"—"}</dd>
          </div>
          <div>
            <dt>Last Transaction</dt>
            <dd>${this.lastDate??"—"}</dd>
          </div>
        </dl>

        <p class="notes"><slot name="notes"></slot></p>
      </article>
    `}static styles=[o,i`
      :host {
        display: block;
        grid-column: 1 / -1;
        color: var(--text, #0f172a);
        transition: background 0.3s ease, color 0.3s ease;
      }

      .card {
        background: var(--surface-2, #ffffff);
        border-radius: var(--radius, 16px);
        box-shadow: var(--shadow, 0 4px 14px rgba(2,6,23,.12));
        padding: 1rem 1.25rem;
        display: grid;
        gap: 1rem;
      }

      .top {
        display: grid;
        grid-template-columns: 80px 1fr auto;
        gap: 1rem;
        align-items: center;
      }

      .logo-wrap {
        display: grid;
        place-items: center;
        width: 80px;
        height: 80px;
        border-radius: 16px;
        background: var(--surface-1, #f3f4f6);
        overflow: hidden;
      }

      .logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .logo.placeholder {
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.05),
          rgba(0, 0, 0, 0.03)
        );
      }

      .headings {
        display: grid;
        gap: 0.4rem;
      }

      .name {
        font-size: 1.35rem;
        line-height: 1.2;
        margin: 0;
      }

      .subline {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 0.75rem;
        align-items: center;
        color: var(--text-muted, rgba(15,23,42,.65));
        font-size: 0.95rem;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.15rem 0.5rem;
        border-radius: 999px;
        background: var(--surface-1, #f3f4f6);
        color: var(--text, #0f172a);
        border: 1px solid var(--line, rgba(0,0,0,.08));
        font-size: 0.8rem;
        font-weight: 600;
      }

      .link {
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .address {
        color: var(--text-muted, rgba(15,23,42,.65));
        font-size: 0.95rem;
      }

      .cta {
        text-align: right;
        display: grid;
        gap: 0.4rem;
        justify-items: end;
      }

      .muted {
        color: var(--text-muted, rgba(15,23,42,.65));
        font-size: 0.85rem;
      }

      .kpi {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius, 16px);
        border: 1px solid var(--line, rgba(0,0,0,.08));
        background: var(--surface-1, #f3f4f6);
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .btn-accent {
        background: var(--accent, #ffc7c2);
        color: var(--accent-ink, #4a1210);
        border-color: transparent;
        box-shadow: var(--shadow-soft, 0 2px 8px rgba(2,6,23,.08));
        font-weight: 600;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
        padding-top: 0.25rem;
      }

      .stats dt {
        font-size: 0.8rem;
        color: var(--text-muted, rgba(15,23,42,.65));
        font-weight: 600;
      }

      .stats dd {
        margin: 0.15rem 0 0;
        font-size: 1.05rem;
        font-weight: 600;
      }

      .notes {
        margin-top: 0.25rem;
      }

      @media (max-width: 720px) {
        .top {
          grid-template-columns: 64px 1fr;
          align-items: start;
        }
        .cta {
          grid-column: 1 / -1;
          justify-items: start;
          text-align: left;
        }
        .logo-wrap {
          width: 64px;
          height: 64px;
          border-radius: 12px;
        }
      }
    `]}customElements.get("merchant-detail")||customElements.define("merchant-detail",n);
