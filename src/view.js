import { isValid } from './model';
import { copy } from './text';

import './style.css';

export const actionClass = {
    inputElement: 'EmailEditor-Input',
    itemList: 'EmailEditor-Editor',
    itemRemoveButton: 'EmailEditor-ItemRemove',
    addButton: 'EmailEditor-Button--AddEmail',
    countButton: 'EmailEditor-Button--GetCount',
};

export const EmailEditor = `
    <div class="EmailEditor">
        <div class="EmailEditor-Content">
            <div class="EmailEditor-Title">
                ${copy().title().start}<b>${copy().title().name}</b>${copy().title().end}
            </div>
            <div class="${actionClass.itemList}">
                <input class="${actionClass.inputElement}" type="text" placeholder="${copy().inputPlaceholder()}"></input>
            </div>
        </div>
        <div class="EmailEditor-Actions">
            <button class="${actionClass.addButton}">${copy().addEmail()}</button>
            <button class="${actionClass.countButton}">${copy().countEmails()}</button>
        </div>
    </div>
`;

export const RemoveIcon = `
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/>
    </svg>
`;

export const RemoveButton = () => `
    <button class="${actionClass.itemRemoveButton}">
        ${RemoveIcon}
    </button>
`;

export function getItem(id) {
    if (!isValid(id)) {
        return `
            <span class="EmailEditor-Item" data-key="${id}">
                <span class="EmailEditor-Item--invalid EmailEditor-TextWrap">${id}</span>
                ${RemoveButton(id)}
            </span>
        `;
    }
    return `
        <span class="EmailEditor-Item EmailEditor-Item--valid" data-key="${id}">
            <span class="EmailEditor-TextWrap">${id}</span>
            ${RemoveButton(id)}
        </span>
    `;
}
