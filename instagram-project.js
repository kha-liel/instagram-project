/**
 * Copyright 2026 kha-liel
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-post.js";
import "./navigation-arrows.js";
import "./slide-indicator.js";

/**
 * `instagram-project`
 * 
 * @demo index.html
 * @element instagram-project
 */
export class InstagramProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-project";
  }
  
  constructor() {
    super();
    this.index = 0;
    this.total = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number, reflect : true },
      total : { type: Number},
      // foxData : { type: Object }
      posts : { type: Array }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-potential10);
        border: none;
        font-family: var(--ddd-font-navigation);
      }
      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: var(--ddd-spacing-4);
        width: 100%;
        min-height: 300px;
        border-radius: var(--ddd-radius-xs);
        border: none;
      }

      @media (max-wdith: 1024px) {
        .container {
          width: 95vw;
          margin: var(--ddd-spacing-4) auto;
          min-height: auto;
        }
        ::slotted(instagram-post) {
          --ddd-font-size-xl: var(--ddd-font-size-l)
        }
      }
      .slide-viewer {
        width: 100%;
        max-width: 800px;
        position: relative;
      }

      @media (max-width: 600px) {
        .navigation-controls {
          position: static;
          transform: none;
          padding: var(--ddd-spacing-4) 0;
          justify-content: space-around;
        }
      }
      ::slotted(instagram-post:not([active])) {
        display: none;
      }
      ::slotted(instagram-post[active]) {
        display: block;
      }
      .navigation-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        max-width: 925px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        padding: var(--dd-spacing-5);
        z-index: 10;
      }
      .dots-indicator-container {
        display: flex;
        justify-content: center;
        margin-top: var(--ddd-spacing-4);
        width: 100%;
      }

  
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="container">
      <div class="navigation-controls">
        <navigation-arrows direction="left" @click="${this.prevSlide}"></navigation-arrows>
        <navigation-arrows direction="right" @click="${this.nextSlide}"></navigation-arrows>
      </div>
      <div class="slide-viewer">
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
      <div class="dots-indicator-container">
        <slide-indicator
          .total="${this.total}"
          .currentIndex="${this.index}"
          @play-list-index-changed="${this.handleIndexChange}">
        </slide-indicator>
      </div>
    </div>
    `;
  }

  // take this out
  /* async getFox() {
    const response = await fetch('https://randomfox.ca/floof/');
    const data = await response.json();
    this.foxData = data;
    this.updateSlidesWithFox(data.image);
  } */

// async getFox() replacement
async getData() {
  const dataUrl = new URL('./posts.json', import.meta.url).href;
  const response = await fetch(dataUrl);
  const data = await response.json();
  this.posts = data.posts;
  this.renderFromData();
}

// updateSlidesWithFox() replacement
renderFromData() {
  this.innerHTML = '';
  this.posts.forEach((post, i) => {
    const item = document.createElement('instagram-post');
    item.setAttribute('top-heading', post.username);
    item.setAttribute('image', post.image);

    if (post.avatar) {
      item.setAttribute('avatar', post.avatar);
    }

    if (i === 0) {
      item.setAttribute('active', '');
    }

    item.innerHTML = `<span>${post.caption}</span>`;
    this.appendChild(item);
  });
  this.total = this.posts.length; // sets total posts = 15
}

  // take this out
  /* updateSlidesWithFox(imageUrl) {
    const newSlide = document.createElement('instagram-post');
    newSlide.setAttribute('top-heading','fox_explorer_2026');
    newSlide.setAttribute('subheading','Look at this floof! #foxes');
    newSlide.setAttribute('image',imageUrl);
    newSlide.setAttribute('active','');
    newSlide.innerHTML = `Look at this floof! #foxes`;

    this.innerHTML = '';
    this.appendChild(newSlide);
    this.total = 1;
  } */


  updateQueryParam(key, value) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(key, value);
    history.pushState(null, '', currentUrl.toString());
  }

  handleSlotChange (e) {
    const slides = Array.from(this.querySelectorAll('instagram-post'));
    this.total = slides.length;
  }

  handleIndexChange(e) {
    this.index = e.detail.index;
  }

  prevSlide() {
    const slides = Array.from(this.querySelectorAll('instagram-post'));
    if (this.index <= 0) {
      this.index = slides.length - 1;
    } else {
      this.index--;
    }
  }

  nextSlide () {
    const slides = Array.from(this.querySelectorAll('instagram-post'));
    if (this.index >= slides.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  updatedVisibleSlide() {
    const slides = Array.from(this.querySelectorAll('instagram-post'));
    this.total = slides.length;
    
    if (this.index >= slides.length) {
      this.index = 0;
    }
    slides.forEach((slide,i) => {
      if (i === this.index) {
        slide.setAttribute('active', '')
    } else { 
      slide.removeAttribute('active');
    }
    });
  }

// changed to fit check in 2
firstUpdated() {
  this.getData();
} 

updated(changedProperties) {
  if (changedProperties.has('index')) {
    this.updatedVisibleSlide();
    this.updateQueryParam('activeIndex', this.index);
  }
}
}

globalThis.customElements.define(InstagramProject.tag, InstagramProject);