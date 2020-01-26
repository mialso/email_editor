import { EmailItem, EmailEditor, actionClass } from './view';
import {
    handleChangeEmail, handleAddClick, handleCountClick, handleItemDelete,
    handleInputEmail, handleEmailsPaste,
} from './controller';

export const initialRender = (store, parentElement) => {
    const emailEditorFragment = document.createRange().createContextualFragment(EmailEditor());

    // find dom elements to handle user interactions
    const emailInputElement = emailEditorFragment.querySelector(`.${actionClass.inputElement}`);
    const emailListElement = emailEditorFragment.querySelector(`.${actionClass.itemList}`);
    const emailAddButton = emailEditorFragment.querySelector(`.${actionClass.addButton}`);
    const emailCountButton = emailEditorFragment.querySelector(`.${actionClass.countButton}`);

    // bind controllers to dom events
    emailInputElement.onchange = handleChangeEmail(store);
    emailInputElement.oninput = handleInputEmail(store);
    emailInputElement.onpaste = handleEmailsPaste(store);

    emailAddButton.onclick = handleAddClick(store);
    emailCountButton.onclick = handleCountClick(store);
    emailListElement.onclick = handleItemDelete(store);

    // render the fragment to the dom via given parent element
    parentElement.appendChild(emailEditorFragment);
};

export const handleRender = (parentElement, { getState }) => {
    const updateInput = (shouldUpdate) => {
        if (!shouldUpdate) {
            return false;
        }
        const { inputValue } = getState();
        const emailInput = parentElement.querySelector('.EmailEditor-Input');
        if (!emailInput) {
            console.error(`Unable to find either emailInput:[${!!(emailInput)}] dom element`);
            return false;
        }
        emailInput.value = inputValue;
        emailInput.scrollIntoView();
        return true;
    };

    const removeEmailItem = (shouldUpdate) => {
        if (!shouldUpdate) {
            return false;
        }
        const { emailIds } = getState();
        // TODO
        const emailEditorContainer = parentElement.querySelector('.EmailEditor-Editor');
        if (!emailEditorContainer) {
            console.error(`Unable to find either emailEditor:[${!!(emailEditorContainer)}] dom element`);
            return false;
        }
        const renderedEmailItems = emailEditorContainer.childNodes;
        const itemsToRemove = [];
        renderedEmailItems.forEach((item) => {
            const emailKey = item.dataset && item.dataset.key;
            if (emailKey && !emailIds.includes(emailKey)) {
                itemsToRemove.push(item);
            }
        });
        itemsToRemove.forEach((item) => emailEditorContainer.removeChild(item));
        return true;
    };

    const addEmailItem = (shouldUpdate) => {
        if (!shouldUpdate) {
            return false;
        }
        const { emailIds } = getState();
        // TODO
        const emailEditorContainer = parentElement.querySelector('.EmailEditor-Editor');
        const emailInput = parentElement.querySelector('.EmailEditor-Input');
        if (!emailEditorContainer) {
            console.error(`Unable to find either emailEditor:[${!!(emailEditorContainer)}] dom element`);
            return false;
        }
        // TODO: this is (better?) possible with prev state data
        const renderedEmailItems = Array.from(emailEditorContainer.childNodes)
            .map((node) => node.dataset && node.dataset.key)
            .filter((key) => !!key);
        const itemsToAdd = emailIds.filter((emailId) => !renderedEmailItems.includes(emailId));
        if (!itemsToAdd.length) {
            return true;
        }
        const newItems = document.createRange().createContextualFragment(itemsToAdd.map(EmailItem).join(''));
        while (newItems.children.length) {
            emailEditorContainer.insertBefore(newItems.children.item(0), emailInput);
        }
        return true;
    };
    return {
        updateInput,
        removeEmailItem,
        addEmailItem,
    };
};
