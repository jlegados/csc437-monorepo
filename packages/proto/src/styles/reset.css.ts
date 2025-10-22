import { css } from "lit";

const reset = css`
  *,*::before,*::after { box-sizing: border-box; }
  :host { font: inherit; color: inherit; }
  img { display: block; max-width: 100%; height: auto; }
`;

export default reset;
