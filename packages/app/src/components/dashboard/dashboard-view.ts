// packages/app/src/components/dashboard/dashboard-view.ts
import { LitElement, html} from "lit";

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
    return this; // use Light DOM so page.css works
  }

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
      <main class="dashboard-page">
        <h1>Welcome back, ${name} 🐻</h1>

        <section class="dashboard-cards">
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

          <p>
            <a href="/app/transactions/add">Add Transaction</a>
            |
            <a href="/app/merchants/add">Add Merchant</a>
          </p>
        </section>
      </main>
    `;
  }
}

customElements.define("dashboard-view", DashboardView);
