import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";

import "./components/coinbear-header";
import "./components/dashboard/dashboard-view";
import "./components/transactions/transaction-add";
import "./components/merchant/merchant-add";

import "./components/profile/profile-view";
import "./components/profile/profile-edit";

import "./views/merchant-list";
import "./views/merchant-view";
import "./views/home-view";
import "./views/about-view";
import "./views/transactions-view"

import { ProfileViewElement } from "./components/profile/profile-view";
import { ProfileEditElement } from "./components/profile/profile-edit";


const originalFetch = window.fetch;

window.fetch = (async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const token = localStorage.getItem("token") || localStorage.getItem("coinbear.token");

  if (token) {
    init = {
      ...(init || {}),
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`
      }
    };
  }

  return originalFetch(input, init);
} as typeof window.fetch);


const routes = [
  {
    path: "/app/profile/:userid/edit",
    view: (params: any) =>
      html`<profile-edit user-id=${params.userid}></profile-edit>`
  },
  {
    path: "/app/profile/:userid",
    view: (params: any) =>
      html`<profile-view user-id=${params.userid}></profile-view>`
  },
  {
    path: "/app/transactions/add",
    view: () => html`<transaction-add></transaction-add>`
  },
  {
    path: "/app/merchants/add",
    view: () => html`<merchant-add></merchant-add>`
  },

  {
    path: "/app/merchant",
    view: () => html`<merchant-list></merchant-list>`
  },
  {
    path: "/app/merchants",
    view: () => html`<merchant-list></merchant-list>`
  },
  {
    path: "/app/merchant/:id",
    view: (params: any) =>
      html`<merchant-view merchant-id=${params.id}></merchant-view>`
  },

  {
    path: "/app/about",
    view: () => html`<about-view></about-view>`
  },
  {
    path: "/app/transactions",
    view: () => html`<transactions-view></transactions-view>`
  },  
  {
    path: "/app",
    view: () => html`<dashboard-view></dashboard-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];


define({
  "mu-history": History.Provider,
  "mu-auth": Auth.Provider,
  "mu-store": Store.Provider,

  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "coinbear:history", "coinbear:auth");
    }
  },

  "profile-view": ProfileViewElement,
  "profile-edit": ProfileEditElement
});
