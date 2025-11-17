import { define, Auth, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { HeaderElement } from "./components/coinbear-header";
import "./views/home-view";
import "./views/about-view";
import "./views/merchant-view";

const routes: Switch.Route[] = [
  {
    path: "/app/merchant/:id",
    view: (params: Switch.Params) => html`
      <merchant-view merchant-id=${params.id}></merchant-view>
    `
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
  "blazing-header": HeaderElement
});
