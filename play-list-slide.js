import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class PlayListSlide extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "play-list-slide";
      }

    constructor() {
        super();
        this.topHeading = "TOP LINE HEADING";
        this.subheading = "Slide #, sub-heading";
        this.title = "Screenreader accessibility";
        this.active = false;
    }

    // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      topHeading: { type : String, attribute: "top-heading" },
      subheading: { type : String, attribute: "subheading" },
      title: { type: String },
      active: { type: Boolean, reflect : true },
      image: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: transparent;
        font-family: var(--ddd-font-primary);
        font-weight: var(--ddd-font-weight-medium);
      }
      :host([active]) {
        display: block;
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      
      .top-heading{
        font-size: var(--ddd-font-size-xxs);
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        color: var(--ddd-theme-default-link);
        max-width: 250px;

      }
      .subheading {
        font-size: var(--ddd-font-size-xxl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-info);
        max-width: 250px;
      }
      hr {
        width: 80px;
        min-height: 1px;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-left: 0;
        margin-right: auto;
        color: var(--ddd-theme-default-skyBlue);
        margin-top: 4px;
      }
      .details {
        min-height: 200px;
        max-height: 200px;
        max-width: 450px;
        color: var(--ddd-theme-default-coalyGray);
        font-weight: var(--ddd-font-weight-regular);
        line-height: var(--ddd-lh-140);
        text-align: left;
        overflow-y: auto;
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
        <div class="play-list-slide" title="${this.title}">
            <div class="wrapper">
                <span class="top-heading">${this.topHeading}</span>
                <br>
                <span class="subheading">${this.subheading}</span>
                <hr>
                <img src="${this.image}" alt="Fox" style="width:100%; border-radisu:8px;">
                <div class="details">
                  <slot></slot>
                </div>
            </div>
        </div>`;
}

}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);