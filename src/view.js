import { isValid } from './model';
import { copy } from './text';

import './style.css';

export const actionClass = {
    inputElement: 'EmailEditor-Input',
    addButton: 'EmailEditor-Button--AddEmail',
    countButton: 'EmailEditor-Button--GetCount',
};

export const EmailEditor = `
    <div class="EmailEditor">
        <div class="EmailEditor-Title">${copy().title()}</div>
        <div class="EmailEditor-Content">
            <div class="EmailEditor-List"></div>
            <input class="${actionClass.inputElement}" type="email" placeholder="${copy().inputPlaceholder()}"></input>
        </div>
        <div class="EmailEditor-Actions">
            <button class="${actionClass.addButton}">${copy().addEmail()}</button>
            <button class="${actionClass.countButton}">${copy().countEmails()}</button>
        </div>
    </div>
`;

export function getItem(id) {
    if (!isValid(id)) {
        return `
            <span class="EmailEditor-Item">
                <span class=" EmailEditor-Item--invalid">${id}</span>
            </span>
        `;
    }
    return `<span class="EmailEditor-Item EmailEditor-Item--valid">${id}</span>`;
}
