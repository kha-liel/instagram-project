/**
 * Copyright 2026 kha-liel
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-slide.js";
import "./navigation-arrows.js";
import "./slide-indicator.js";

/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class PlayListProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-project";
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
      foxData : { type: Object }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: transparent;
        border: none;
        font-family: var(--ddd-font-navigation);
      }
      .container {
        position: relative;
        display: flex;
        align-items: center;
        background-color: var(--ddd-theme-default-slateMaxLight);
        padding: var(--ddd-spacing-12);
        width: 800px;
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
        ::slotted(play-list-slide) {
          --ddd-font-size-xl: var(--ddd-font-size-l)
        }
      }
      .slide-viewer {
        width: 100%;
        max-width: 800px;
      }

      @media (max-width: 600px) {
        .navigation-controls {
          position: static;
          transform: none;
          padding: var(--ddd-spacing-4) 0;
          justify-content: space-around;
        }
      }
      ::slotted(play-list-slide:not([active])) {
        display: none;
      }
      ::slotted(play-list-slide[active]) {
        display: block;
      }
      .navigation-controls {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        padding: 0 var(--dd-spacing-5);
        z-index: 10;
      }
      .dots-indicator-container {
        position: absolute;
        bottom: var(--ddd-spacing-10);
        left: var(--ddd-spacing-20);
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


  async getFox() {
    const response = await fetch('https://randomfox.ca/floof/');
    const data = await response.json();
    this.foxData = data;
    this.updateSlidesWithFox(data.image);
  }

  updateSlidesWithFox(imageUrl) {
    const newSlide = document.createElement('play-list-slide');
    newSlide.setAttribute('top-heading','Random Fox');
    newSlide.setAttribute('subheading','Check-in 1');
    newSlide.setAttribute('image',imageUrl);
    newSlide.setAttribute('active','');
    newSlide.innerHTML = `<p>Source: ${imageUrl}</p>`;

    this.innerHTML = '';
    this.appendChild(newSlide);

    this.total = 1;
  }


  handleSlotChange (e) {
    const slides = Array.from(this.querySelectorAll('play-list-slide'));
    this.total = slides.length;
  }

  handleIndexChange(e) {
    this.index = e.detail.index;
  }

  prevSlide() {
    const slides = Array.from(this.querySelectorAll('play-list-slide'));
    if (this.index <= 0) {
      this.index = slides.length - 1;
    } else {
      this.index--;
    }
  }

  nextSlide () {
    const slides = Array.from(this.querySelectorAll('play-list-slide'));
    if (this.index >= slides.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  updatedVisibleSlide() {
    const slides = Array.from(this.querySelectorAll('play-list-slide'));
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


firstUpdated() {
  console.log("Component loaded, fetching fox...");
  this.getFox();
  this.updatedVisibleSlide();
}

updated(changedProperties) {
  if (changedProperties.has('index')) {
    this.updatedVisibleSlide();
  }
}
}

globalThis.customElements.define(PlayListProject.tag, PlayListProject);