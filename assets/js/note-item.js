class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this.updateStyle();
    }

    updateStyle() {
        this._style.innerText = `
            .note-item {
                border: 2px solid #000000;
                border-radius: 16px;
                padding: 16px;
                margin-bottom: 16px;
                background: #FFFFFF;
            }

            h2 {
                color: #000000;
                margin: 0;
                font-size: 1.2em;
            }

            p {
                color: #000000;
                margin-top: 8px;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = '';

        const container = document.createElement('div');
        container.classList.add('note-item');

        const title = document.createElement('h2');
        title.innerText = this.getAttribute('title') || 'No Title';

        const noteBody = document.createElement('p');
        noteBody.innerText = this.getAttribute('body') || 'No Content';

        container.appendChild(title);
        container.appendChild(noteBody);

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(container);
    }
}

customElements.define('note-item', NoteItem);
