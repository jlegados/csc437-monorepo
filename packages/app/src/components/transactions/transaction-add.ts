import { LitElement, html } from "lit";

export class TransactionAdd extends LitElement {
  createRenderRoot() {
    return this;
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const payload = {
      userid: localStorage.getItem("coinbear.userId") || "",
      merchant: String(data.get("merchant") || ""),
      amount: Number(data.get("amount") || 0),
      date: String(data.get("date") || "")
    };

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      alert("Failed to add transaction");
      return;
    }

    window.location.href = "/app";
  }

  render() {
    return html`
      <main class="page">
        <h1>Add Transaction</h1>

        <form @submit=${(e: Event) => this.onSubmit(e)}>
          <label>
            Merchant
            <input name="merchant" required />
          </label>

          <label>
            Amount
            <input type="number" step="0.01" name="amount" required />
          </label>

          <label>
            Date
            <input type="date" name="date" required />
          </label>

          <button>Add Transaction</button>
        </form>
      </main>
    `;
  }
}

customElements.define("transaction-add", TransactionAdd);
