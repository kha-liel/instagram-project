import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class NavigationArrows extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "navigation-arrows";
    }

    constructor() {
        super();
        this.direction = 'right';
    }

    static get properties() {
        return {
            ...super.properties,
            direction: { type: String, reflect: true } // left or right
        };
    }

    static get styles() {
        return [super.styles,
        css`

        :host {
            display: block;
            pointer-events: auto;
        }

        button {
            background-color: var(--ddd-theme-default-limestoneGray);
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            //text-align: center;
            box-shadow: var(--ddd-boxShadow-sm);
            font-size: var(--ddd-font-size-3xs);
            //overflow: hidden;
            //line-height: 0;
        }

        .arrow-shape {
            color: var(--ddd-theme-default-black);
            width: 12px;
            height: 12px;
            border-top: 4px solid var(--ddd-theme-default-coalyGray);
            border-right: 4px solid var(--ddd-theme-default-coalyGray);
            transform: rotate(45deg);
            margin-left: -4px;
        }

        button.left {
            transform: rotate(180deg);
        }

        button.left:hover {
            transform: rotate(180deg) scale(1.08);
        }

        button:hover, button:focus {
            background: var(--ddd-theme-default-linestoneLight);
            outline: none;
        }
        `];
    }

    render() {
        const isLeft = this.direction === 'left';
        return html`
            <button class="${isLeft ? 'left' : ''}" aria-label="${isLeft ? 'Previous Slide' : 'Next Slide'}">
                <div class="arrow-shape"></div>
            </button>
        `;
    }

}

globalThis.customElements.define(NavigationArrows.tag, NavigationArrows);