import { LitElement, html } from "lit";
import { Auth, Observer } from "@calpoly/mustang";

interface Merchant {
  _id: string;
  name: string;
  category?: string;
  budget?: number;
}

export class MerchantListElement extends LitElement {
  static properties = {
    merchants: { state: true },
    loading: { state: true },
    error: { state: true }
  };

  merchants: Merchant[] = [];
  loading = false;
  error: string | null = null;

  // the *actual* logged-in user from Auth.Model.user
  authUser?: Auth.User;

  // (optional) use light DOM so your page.css works
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    console.log("[merchant-list] connected");

    // 👇 IMPORTANT: observe Auth.Model, not Auth.User
    const authObserver = new Observer<Auth.Model>(this, "coinbear:auth");

    authObserver.observe((auth) => {
        console.log("[merchant-list] auth changed:", auth);
      
        // auth.user might be undefined until auth loads fully
        if (!auth || !auth.user) {
          return; // WAIT — don't error yet!
        }
      
        this.authUser = auth.user;
      
        if (auth.user.authenticated) {
          this.error = null;
          this.loadMerchants();
        }
      });
      
  }

  async loadMerchants() {
    if (!this.authUser || !this.authUser.authenticated) {
      this.error = "HTTP 401 (not signed in)";
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      // ✅ send Authorization: Bearer <token>
      const headers = Auth.headers(this.authUser);

      // use whatever your server route is:
      // if your server uses app.use("/api/merchant", ...) then keep "/api/merchant"
      const response = await fetch("/api/merchant", { headers });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      this.merchants = await response.json();
      console.log("[merchant-list] loaded:", this.merchants);
    } catch (err: any) {
      console.error("[merchant-list] error:", err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) return html`<p>Loading merchants...</p>`;
    if (this.error) return html`<p style="color:red">${this.error}</p>`;
    if (!this.merchants.length) return html`<p>No merchants found.</p>`;

    return html`
      <ul>
        ${this.merchants.map(
          (m) => html`
            <li>
              <a href="/app/merchant/${m._id}">
                ${m.name} — ${m.category ?? "Uncategorized"}
              </a>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define("merchant-list", MerchantListElement);
