class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    constructor() {
        super();

        this._shadowRoot= this.attachShadow({ mode: 'open'});
        this._style = document.createElement('style');

        this.updateStyle();
    }

    updateStyle() {
        this._style.textContent =`
            .footer-bar {
            display: flex;
            align-items: center;

            padding: 15px 10px;

            color: #000000;
            background-color: #E7E7E7;
            }

            p {
            margin-inline-start: 10px;
            font-size: 1.2rem;
            font-family: "Poppins", sans-serif;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = '';

        const footerBar = document.createElement('div');
        footerBar.classList.add('footer-bar');
        const text = document.createElement('p');
        text.textContent = "© 2025 Yhustya";
        footerBar.appendChild(text);

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(footerBar);
    }
}

customElements.define('footer-bar', FooterBar);