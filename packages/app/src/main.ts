import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";

import { HeaderElement as CoinbearHeaderElement } from "./components/coinbear-header";
import "./views/home-view";
import "./views/about-view";
import "./views/merchant-view";
import "./views/profile-view";

import type { Model } from "./model";
import { init } from "./model";
import type { Msg } from "./message";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";

const routes: Switch.Route[] = [
  {
    path: "/app/profile/:userid",
    view: (params: Switch.Params) =>
      html`<profile-view user-id=${params.userid}></profile-view>`
  },
  {
    path: "/app/merchant/:id",
    view: (params: Switch.Params) =>
      html`<merchant-view merchant-id=${params.id}></merchant-view>`
  },
  { path: "/app/about", view: () => html`<about-view></about-view>` },
  { path: "/app", view: () => html`<home-view></home-view>` },
  { path: "/", redirect: "/app" }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "coinbear:history", "coinbear:auth");
    }
  },
  "mu-store": class CoinbearStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update as any, init, "coinbear:auth");
    }
  },
  "coinbear-header": CoinbearHeaderElement,
  "profile-view": ProfileViewElement
});
