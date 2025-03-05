import { getNotes } from "./notes.js";

class NoteList extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this.loadDataFromStorage();
        this.updateStyle();
    }

    loadDataFromStorage() {
        const serializedData = localStorage.getItem('notes');
        let localStoragedata = serializedData  ? JSON.parse(serializedData) : [];

        return Array.isArray(localStoragedata) ? localStoragedata : [];
    }

    updateStyle() {
        this._style.innerText = `
        :host {
            width: 100%;
            min-height: 78vh;
            background-color: #F9F9F9;
        }

        .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 16px;

            padding: 50px;

            
        }
        `;
    }

    connectedCallback() {
        this.render();
    }


    render() {
        const oldContainer = this._shadowRoot.querySelector('.container');
        if (oldContainer) {
            oldContainer.remove();
        }

        const container = document.createElement('div');
        container.classList.add('container');

        const data = getNotes();
        const localData = this.loadDataFromStorage();
        console.log("Data dari getNotes():", data);
console.log("Data dari localStorage:", localData);

        const newData = [...data, ...localData];

        if (newData.length > 0) {
            newData.forEach(note => {
                const item = document.createElement('note-item');
                
                item.setAttribute('title', note.title);
                item.setAttribute('body', note.body);

                container.appendChild(item);
            });
        } else {
            const emptyMessage = document.createElement('h2');
            emptyMessage.innerText = 'Tidak ada catatan!';
            container.appendChild(emptyMessage);
        }

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(container);
    }
}

customElements.define('note-list', NoteList);
