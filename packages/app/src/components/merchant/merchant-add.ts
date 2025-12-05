import { LitElement, html } from "lit";

export class MerchantAdd extends LitElement {
  createRenderRoot() {
    return this;
  }

  private async onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    console.log("New Merchant:", data);

    alert("Merchant added!");

    window.location.href = "/app/merchant";
  }

  render() {
    return html`
      <main class="merchant-page">
        <h1>Add Merchant</h1>

        <form class="form-card" @submit=${this.onSubmit}>
          <label>
            Merchant Name
            <input name="name" placeholder="Target, Starbucks, etc" required />
          </label>

          <label>
            Category
            <select name="category">
              <option>Food</option>
              <option>Gas</option>
              <option>Shopping</option>
              <option>Online</option>
            </select>
          </label>

          <label>
            Notes
            <input name="notes" placeholder="Optional notes..." />
          </label>

          <button class="btn-primary">Add Merchant</button>
        </form>
      </main>
    `;
  }
}

customElements.define("merchant-add", MerchantAdd);
