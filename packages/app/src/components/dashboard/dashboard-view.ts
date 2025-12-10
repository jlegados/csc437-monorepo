import { LitElement, html, css } from "lit";

interface Transaction {
  _id?: string;
  userid: string;
  amount: number;
  merchant: string;
  date: string;
}

export class DashboardView extends LitElement {
  static properties = {
    transactions: { type: Array }
  };

  transactions: Transaction[] = [];
  createRenderRoot() {
    return super.createRenderRoot();
  }

  static styles = css`
    :host {
      display: block;
      max-width: 1100px;
      margin: 3rem auto;
      padding: 0 1.5rem 4rem;
      font-family: Inter, sans-serif;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .card {
      background: rgba(255, 255, 255, 0.7);
      padding: 1.75rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      backdrop-filter: blur(18px);
      margin-bottom: 2rem;
    }

    .card h2 {
      margin: 0 0 0.75rem;
      font-size: 1.35rem;
      font-weight: 700;
    }

    ul {
      margin-top: 0.5rem;
      padding-left: 1.2rem;
      line-height: 1.7;
    }

    .actions {
      margin-top: 1rem;
    }

    .actions a {
      display: inline-block;
      margin-right: 1.5rem;
      font-weight: 600;
      color: #6A7BFF;
      text-decoration: none;
    }

    .actions a:hover {
      text-decoration: underline;
    }

    :host-context(body.dark-mode) .card {
      background: rgba(255,255,255,0.08);
      color: white;
      backdrop-filter: blur(22px);
      box-shadow: 0 8px 40px rgba(0,0,0,0.35);
    }

    :host-context(body.dark-mode) h1,
    :host-context(body.dark-mode) h2,
    :host-context(body.dark-mode) ul,
    :host-context(body.dark-mode) li {
      color: white;
    }

    :host-context(body.dark-mode) .actions a {
      color: #9CB2FF;
    }
  `;


  connectedCallback() {
    super.connectedCallback();
    this.loadTransactions();
  }

  async loadTransactions() {
    const userid =
      localStorage.getItem("coinbear.userId") ||
      localStorage.getItem("coinbear.token");

    if (!userid) return;

    try {
      const res = await fetch(`/api/transactions/${userid}`);
      if (!res.ok) throw new Error(res.statusText);

      this.transactions = await res.json();
      this.requestUpdate();
    } catch (err) {
      console.error("Dashboard failed to load transactions:", err);
    }
  }

  render() {
    const name =
      localStorage.getItem("coinbear.displayName") ||
      localStorage.getItem("coinbear.userId") ||
      "traveler";

    const total = this.transactions.reduce(
      (sum, t) => sum + (Number(t.amount) || 0),
      0
    );

    return html`
      <h1>Welcome back, ${name} 🐻</h1>

      <div class="card">
        <h2>Total Spending</h2>
        <p>$${total.toFixed(2)}</p>
      </div>

      <div class="card">
        <h2>Recent Transactions</h2>
        ${this.transactions.length === 0
          ? html`<p>No transactions yet.</p>`
          : html`
              <ul>
                ${this.transactions.map(
                  (t) => html`
                    <li>
                      <strong>${t.merchant}</strong>
                      — $${t.amount} on ${t.date}
                    </li>
                  `
                )}
              </ul>
            `}
      </div>

      <div class="actions">
        <a href="/app/transactions/add">+ Add Transaction</a>
        <a href="/app/merchants/add">+ Add Merchant</a>
      </div>
    `;
  }
}

customElements.define("dashboard-view", DashboardView);
