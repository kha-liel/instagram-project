import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class SlideIndicator extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "slide-indicator";
    }

    constructor() {
        super();
        this.total = 0;
        this.currentIndex = 0;
    }

    static get properties() {
        return {
            ...super.properties,
            total: { type: Number},
            currentIndex: { type: Number}
        };
    }

    static get styles() {
        return [super.styles,
        css`
        .dots { 
            display: flex;
            gap: var(--ddd-spacing-2);
        }

        .dot {
            width: 12px;
            height: 12px;
            border-radius: var(--ddd-radius-circle);
            border: none;
            background-color: var(--ddd-theme-default-limestoneGray);
            padding: var(--ddd-spacing-0);
        }

        .dot.active {
            background-color: var(--ddd-theme-default-original87Pink);
        }
        `];
    }

    render() {
    let dots = [];
    for (let i = 0; i < this.total; i++) {
        dots.push(html`
            <button 
                @click="${this._handleDotClick}"
                data-index="${i}"
                class="dot ${i === this.currentIndex ? 'active' : ''}">
            </button>
            `);
    }
        return html`
        <div class="dots">
            ${dots}
        </div>
        `;
    }

    // added some stuff in for clicking indicator buttons
    _handleDotClick(e) {
        const indexChange = new CustomEvent("play-list-index-changed", {
            composed: true,
            bubbles: true,
            detail: {
                index: parseInt(e.target.dataset.index)
            },
        });
        this.dispatchEvent(indexChange);
    }

}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);