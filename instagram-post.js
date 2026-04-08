import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class InstagramPost extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "instagram-post";
      }

    constructor() {
        super();
        this.topHeading = "TOP LINE HEADING";
        this.subheading = "Slide #, sub-heading";
        this.title = "Screenreader accessibility";
        this.active = false;
        this.liked = false;
    }

    // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      topHeading: { type : String, attribute: "top-heading" },
      subheading: { type : String, attribute: "subheading" },
      title: { type: String },
      active: { type: Boolean, reflect : true },
      image: { type: String },
      avatar: { type: String},
      liked: { type: Boolean, reflect: true},
      total: { type: Number},
      currentIndex: { type: Number, attribute: "current-index" }
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
        color: var(--ddd-theme-default-coalyGray);
        border-radius: var(--ddd-radius-sm);
        font-family: var(--ddd-font-primary);
        width: 100%;
        max-width: 800px;
        margin: auto;
        overflow: hidden;
        --icon-color: light-dark(var(--ddd-theme-default-colayGray), var(--ddd-theme-default-linestoneLight));
        --heart-color: light-dark(#262626, #f5f5f5);
      }
      
      .post-actions {
        display: flex;
        justify-content: space-between;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
      }
      .card-header {
        display: flex;
        align-items: center;
        padding: var(--ddd-spacing-3);
      }

      .avatar-img {
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
        padding: var(--ddd-spacing-1) var(--ddd-spacing-4) var(--ddd-spacing-4) var(--ddd-spacing-4);
        text-align: left;
      }

      .subheading {
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
        margin-right: var(--ddd-spacing-2);
        display: inline;
      }
    
      .details {
        display: inline;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        line-height: var(--ddd-lh-120);
      }

      .post-actions {
        display: flex;
        justify-content: space-between;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-4);
        align-items: center;
      }

      .like-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 32px;
        color: var(--heart-color);
        margin-left: 0;
        padding: 0;
        align-items: center;
      }

      .like-btn.liked {
        color: #ed4956;
      }

      .share-btn {
        background: none;
        border: 1px solid var(--ddd-theme-default-coalyGray);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: 20px;
        color: var(--icon-color);
      }

      .dots-indicator-container {
        display: flex;
        justify-content: center;
        margin-top: var(--ddd-spacing-4);
        padding-bottom: var(--ddd-spacing-2);
        z-index: 5;
        position: relative;
      }

    `];
  }

  toggleLike() {
    this.liked = !this.liked;
  }

  copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied!")
  }

  // Lit render the HTML
  render() {
    return html`

      <div class="instagram-post">
        <div class="card-header">
          <img src="${this.avatar}" class="avatar-img" alt="${this.topHeading}'s avatar">
          <span class="top-heading">${this.topHeading}</span>
        </div>

        <img class="fox-image" src="${this.image}" alt="Post Image">
        <div class="dots-indicator-container">
        <slide-indicator
          .total="${this.total}"
          .currentIndex="${this.currentIndex}"
          @play-list-index-changed="${this._handleDotClick}">
        </slide-indicator>
        </div>

        <div class="post-actions">
          <button class="like-btn" @click="${this.toggleLike}">
            ${this.liked ? html`<span>&#10084;&#65039;</span>` : html`<span>&#129293;</span>`}
          </button>

          <button class="share-btn" @click="${this.copyLink}">
            <span>Share</span>
          </button>
        </div>

        <div class="card-content">
          <span class="subheading">${this.topHeading}</span>
          <div class="details">
            <slot></slot>
          </div>
        </div>
      </div>
        `;
  }

  _handleDotClick(e) {
    this.dispatchEvent(new CustomEvent('dot-clicked', {
      detail: { index: e.detail.index },
      bubbles: true,
      composed: true
    }));
  }
}

globalThis.customElements.define(InstagramPost.tag, InstagramPost);