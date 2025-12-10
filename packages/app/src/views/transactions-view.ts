import { LitElement, html, css } from "lit";

interface Transaction {
  merchant: string;
  amount: number;
  date: string;
}

type MonthGroups = Record<string, Transaction[]>;

export class TransactionsView extends LitElement {
  static properties = {
    transactions: { type: Array, attribute: false }
  };

  transactions: Transaction[] = [];

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 880px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 2rem;
    }

    section {
      margin-bottom: 2rem;
    }

    section h2 {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }

    .card {
      background: white;
      padding: 1.2rem 1.4rem;
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    }

    ul {
      margin: 0;
      padding-left: 1.2rem;
      line-height: 1.6;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();

    const auth = document.querySelector("mu-auth") as any;

    if (auth.user?.username && auth.user.username !== "anonymous") {
      this.loadTransactions(auth.user.username);
    }

    auth.addEventListener("auth:change", (e: any) => {
      const user = e.detail.user;
      if (user?.username && user.username !== "anonymous") {
        this.loadTransactions(user.username);
      }
    });
  }

  async loadTransactions(userId: string) {
    const res = await fetch(`/api/transactions/${userId}?t=${Date.now()}`, {
      cache: "no-store"
    });
    const data = await res.json();
    this.transactions = Array.isArray(data) ? data : [];
  }

  groupByMonth(list: Transaction[]): MonthGroups {
    const groups: MonthGroups = {};
    list.forEach((tx: Transaction) => {
      const d = new Date(tx.date);
      const month = d.toLocaleString("en-US", { month: "long" });
      const year = d.getFullYear();
      const key = `${month} ${year}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return groups;
  }

  render() {
    const grouped = this.groupByMonth(this.transactions);

    return html`
      <h1>All Transactions</h1>

      ${Object.keys(grouped).length === 0
        ? html`<p>No transactions found.</p>`
        : Object.entries(grouped).map(
            ([month, items]: [string, Transaction[]]) => html`
              <section>
                <h2>${month}</h2>
                <div class="card">
                  <ul>
                    ${items.map(
                      (t: Transaction) => html`
                        <li>
                          <strong>${t.merchant}</strong> —
                          $${t.amount} on ${t.date}
                        </li>
                      `
                    )}
                  </ul>
                </div>
              </section>
            `
          )}
    `;
  }
}

customElements.define("transactions-view", TransactionsView);
