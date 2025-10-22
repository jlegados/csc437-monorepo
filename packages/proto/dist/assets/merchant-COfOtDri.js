import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as o,E as s,x as a,a as n}from"./lit-element-DMCH56eX.js";function i(r){return r==null||Number.isNaN(r)?"—":r<0?`−$${Math.abs(r).toFixed(2)}`:`$${r.toFixed(2)}`}class d extends o{static properties={logoSrc:{type:String,attribute:"logo-src"},websiteHref:{type:String,attribute:"website-href"},phone:{type:String},category:{type:String},monthlySpend:{type:Number,attribute:"monthly-spend"},transactions:{type:Number},lastDate:{type:String,attribute:"last-date"}};logoSrc;websiteHref;phone;category;monthlySpend;transactions;lastDate;render(){return a`
      <article class="card">
        <div class="top">
          <a
            class="logo-wrap"
            href=${this.websiteHref??"#"}
            target=${this.websiteHref?"_blank":s}
            rel=${this.websiteHref?"noopener":s}
            aria-label="Merchant website"
          >
            ${this.logoSrc?a`<img class="logo" src=${this.logoSrc} alt="" />`:a`<div class="logo placeholder" aria-hidden="true"></div>`}
          </a>

          <div class="headings">
            <h1 class="name"><slot name="name">Merchant</slot></h1>
            <div class="subline">
              ${this.category?a`<span class="pill">${this.category}</span>`:s}
              ${this.phone?a`<a class="link" href="tel:${this.phone}">${this.phone}</a>`:s}
              ${this.websiteHref?a`<a class="link" href=${this.websiteHref} target="_blank" rel="noopener">Website</a>`:s}
            </div>
            <div class="address"><slot name="address">—</slot></div>
          </div>

          <div class="cta">
            <div class="muted">Total spent this month</div>
            <div class="kpi">${i(this.monthlySpend)}</div>
            <a class="btn btn-accent" href="/transaction.html">＋ Add Transaction</a>
          </div>
        </div>

        <dl class="stats">
          <div>
            <dt>Monthly Spend</dt>
            <dd>${i(this.monthlySpend)}</dd>
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
    `}static styles=n`
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
  `}customElements.define("merchant-detail",d);const l={"trader-joes":{name:"Trader Joe’s",logo:"/images/merchants/traderjoes.png",category:"Groceries",website:"https://www.traderjoes.com",phone:"+1 (800) 123-4567",address:"3970 Broad St, San Luis Obispo, CA",monthly:95,tx:2,last:"2025-09-21",notes:"Neighborhood grocery · accepts Apple Pay"},starbucks:{name:"Starbucks",logo:"/icons/noun-point-of-service-4256209.svg",category:"Coffee",website:"https://www.starbucks.com",phone:"+1 (800) 782-7282",address:"Downtown, San Luis Obispo, CA",monthly:28.5,tx:3,last:"2025-09-18",notes:"Daily caffeine run ☕︎"},pge:{name:"PG&E",logo:"/icons/noun-graph-4257817.svg",category:"Utilities",website:"https://www.pge.com",phone:"+1 (800) 743-5000",address:"Online billing",monthly:120,tx:1,last:"2025-09-07",notes:"Electric service"},amazon:{name:"Amazon",logo:"/icons/noun-folder-4257816.svg",category:"Shopping",website:"https://www.amazon.com",phone:"",address:"Online orders",monthly:64.99,tx:2,last:"2025-09-16",notes:"Prime orders"}},c=new URLSearchParams(location.search),p=c.get("m")||"trader-joes",e=l[p],t=document.getElementById("md");t&&e&&(t.setAttribute("logo-src",e.logo),t.setAttribute("website-href",e.website),t.setAttribute("phone",e.phone),t.setAttribute("category",e.category),t.setAttribute("monthly-spend",String(e.monthly)),t.setAttribute("transactions",String(e.tx)),t.setAttribute("last-date",e.last),t.querySelector('[slot="name"]').textContent=e.name,t.querySelector('[slot="address"]').textContent=e.address,t.querySelector('[slot="notes"]').textContent=e.notes);
