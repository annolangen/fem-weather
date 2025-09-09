import { html, type TemplateResult } from "lit-html";

export function appTemplate(): TemplateResult {
  return html`
    <h1 class="font-display text-3xl font-bold underline">
      Hello from app.ts!
    </h1>
  `;
}
