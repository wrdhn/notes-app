class navApp extends HTMLElement {
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
            :host {
            font-family: "Poppins", sans-serif !important;

            }
            .nav-bar {
            display: flex;
            align-items: center;

            padding: 10px;

            color: black;
            background-color: #FFFFFF;

            box-shadow: 0 2px 6px #B9B28A;

            }

            h1 {
            margin-inline-start: 10px;
            font-size: 2rem;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = '';

        const navBar = document.createElement('div');
        navBar.classList.add('nav-bar');
        const title = document.createElement('h1');
        title.textContent = 'Notes App';
        navBar.appendChild(title);

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(navBar);
    }
}

customElements.define('nav-bar', navApp);