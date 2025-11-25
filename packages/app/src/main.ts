import { Auth, History, Switch, Store, define, Form } from "@calpoly/mustang";
import { html } from "lit";

import type { Msg } from "./message";
import type { Model } from "./model";
import update from "./update";
import { init } from "./model";

import "./components/coinbear-header";
import "./views/home-view";
import "./views/about-view";
import "./views/merchant-view";
import "./views/profile-view";
import "./views/profile-edit";


const routes: Switch.Route[] = [
  {
    path: "/app/merchant/:merchantid",
    view: (params) =>
      html`<merchant-view merchant-id=${params.merchantid}></merchant-view>`
  },

  {
    path: "/app/profile/:userid",
    view: (params) =>
      html`<profile-view user-id=${params.userid}></profile-view>`
  },
  {
    path: "/app/profile/:userid/edit",
    view: (params) =>
      html`<profile-edit user-id=${params.userid}></profile-edit>`
  },

  {
    path: "/app/about",
    view: () => html`<about-view></about-view>`
  },

  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },

  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "coinbear:history", "coinbear:auth");
    }
  },
  "mu-store": class MyStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "coinbear:auth");
    }
  },
  "mu-form": Form.Element
});
