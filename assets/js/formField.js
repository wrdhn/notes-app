import { getNotes, notesData } from './notes.js';

class formField extends  HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode:'open' });
        this._style = document.createElement('style');

        this.updateStyle();
    }

    updateStyle() {
        this._style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        :host {
            width: 95%;
            height: 90vh;
            border:none;
            padding: 50px !important;
            border-radius: 16px;
            background-color: #ffffff;
            font-family: "Poppins", sans-serif;
        }

        .new-note {
            width: 100%;
            margin-inline: 10px;
        }

        h1 {
            text-align: center;
            color: black;
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;

            margin-top: 50px;
        }

        label {
            font-size: 1.3rem;
            font-weight: 600;
            color: #504B38;
        }

        input, textarea {
            color: #504B38;

            font-size: 1.1rem;
            font-weight: 400;

            padding: 10px;

            transition: 50ms linear;

        }

        input {
            border:none;

            font-weight: 400;
            font-size: 2.5rem;
            font-family: serif;

            margin-bottom: 50px;

            background-color: #ffffff;
        }

        input::placeholder {
            color: #E7E7E7;
        }

        textarea {
            border: none;
            height: 200px;
            border-radius: 8px;

            background-color: #ffffff;
        }

        input:focus, textarea:focus {
            outline: none;
            border: none;
            // box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.3);
        }

        .line {
        background-color: #E7E7E7;
        height: 2px;
        border: none;
        margin: 0;
        }

        .button-container {
        margin-top: 100px;

        display: flex;
        justify-content: space-between;
        }

        button {
        padding: 15px;
        width: 49%;

        font-size: 1.3rem;
        font-weight: 600;

        border: 0;
        border-radius: 16px;

        transition: 100ms linear;
        }

        #saveButton {
        background-color: #ffffff;
        color: black;

        border:2px solid black;
        }

        #deleteButton {
        background-color: #000000;
        color: #ffffff;
        }
        
        #saveButton:hover {
        border: 2px solid black;

        background-color: black;
        color: #ffffff;
        }

        #deleteButton:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: #ffffff;
        }

        @media screen and (max-width: 768px){
            :host {
                padding: 50px 10px !important;
                height: 90vh;
            }

            .button-container {
                margin-top: 50px !important;
            }

        }


        `
    }

    connectedCallback() {
        this.updateStyle();
        this.render();
    
        const saveButton = this._shadowRoot.getElementById('saveButton');
        saveButton.removeEventListener('click', this.handleSave);
        saveButton.addEventListener('click', this.handleSave);
    }
    
    handleSave = (event) => {
        this.saveData();
        console.log('Data disimpan!', getNotes());
    };
    
    render() {
        this._shadowRoot.innerHTML = '';

        const container = document.createElement('div');
        container.classList.add('new-note');

        const title = document.createElement('div');
        title.setAttribute('id', 'formTitle');

        const text = document.createElement('h1');
        text.textContent = 'Tambah Catatan';

        const form = document.createElement('form');

        const labelJudul = document.createElement('label');
        labelJudul.setAttribute('for', 'title');
        labelJudul.textContent = 'Judul';

        const inputTitle = document.createElement('input');
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('name', 'title');
        inputTitle.setAttribute('id', 'title');
        inputTitle.setAttribute('placeholder', 'Title of This Note');

        const line = document.createElement('hr');
        line.classList.add('line');

        const labelNote = document.createElement('label');
        labelNote.setAttribute('for', 'note');
        labelNote.textContent = 'Body';

        const line2 = line.cloneNode(true);

        const inputNote = document.createElement('textarea');
        inputNote.setAttribute('name', 'note');
        inputNote.setAttribute('id', 'note');

        const button = document.createElement('div');
        button.classList.add('button-container');

        const saveButton = document.createElement('button');
        saveButton.setAttribute('type', 'submit');
        saveButton.setAttribute('name', 'save');
        saveButton.setAttribute('id', 'saveButton')
        saveButton.textContent = 'Save';

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'reset');
        deleteButton.setAttribute('name', 'delete');
        deleteButton.setAttribute('id', 'deleteButton')
        deleteButton.textContent = 'Delete';
        
        form.appendChild(inputTitle);
        form.appendChild(labelNote);
        form.appendChild(line);
        form.appendChild(inputNote);
        form.appendChild(line2);
        form.appendChild(button);
        button.appendChild(saveButton);
        button.appendChild(deleteButton);

        title.appendChild(text);
        container.appendChild(title);
        container.appendChild(form);

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(container);
    }

    generateNoteID() {
        const randomChars = Math.random().toString(36).substring(2, 8);
        const randomNumbers = Math.floor(10000 + Math.random() * 90000);
        return `notes-aB-${randomChars}${randomNumbers}`;
      }
     
    saveData() {
        const titleValue = this._shadowRoot.getElementById('title').value;
        const noteValue = this._shadowRoot.getElementById('note').value;
        const date = new Date().toISOString();
        const data = {
            id: this.generateNoteID(),
            title: titleValue,
            body: noteValue,
            createdAt: date,
            archived: false,
        }

        this.saveToLocalStorage(data);
    }

    saveToLocalStorage(data) {
        if(Storage) {
            const parsed = JSON.stringify(notesData);
            const STORAGE_KEY = 'notes';
            const existingNotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            existingNotes.push(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingNotes));
            
            this._shadowRoot.getElementById('title').value = '';
            this._shadowRoot.getElementById('note').value = '';
    
        }
    }



}

customElements.define('form-field', formField);