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
        background-color: var(--ddd-theme-default-white);
        border: 1px solid var(--ddd-theme-default-limestoneGray);
        border-radius: var(--ddd-radius-sm);
        font-family: var(--ddd-font-primary);
        max-width: 450px;
        margin: auto;
        overflow: hidden;
      }
      
      .card-header {
        display: flex;
        align-items: center;
        padding: var(--ddd-spacing-3);
      }

      .avatar {
        width: 32px;
        height: 32px;
        background-color: var(--ddd-theme-default-skyBlue);
        border-radius: var(--ddd-radius-circle);
        margin-right: var(--ddd-spacing-3);
      }
      
      .top-heading {
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
      }

      .fox-image {
        width: 100%;
        display: block;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }

      .card-content {
        padding: var(--ddd-spacing-4);
        text-align: left;
      }

      .subheading {
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-fefault-coalyGray);
        margin-right: var(--ddd-spacing-2);
        display: inline;
      }
    
      .details {
        display: inline;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        line-height: var(--ddd-lh-120);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="play-list-slide">
        <div class="card-header">
          <div class="avatar"></div>
          <span class="top-heading">${this.topHeading}</span>
        </div>

        <img class="fox-image" src="${this.image}" alt="Random Fox Image">

        <div class="card-content">
          <span class="subheading">${this.topHeading}</span>
          <div class="details">
            <slot></slot>
          </div>
        </div>
      </div>
        `;
}

}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);