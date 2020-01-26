import { getItem } from './view';
import { emailReducer, validEmailsList } from './model';
import {
    CREATE_EMAIL, CREATE_EMAILS_FROM_ARRAY, DELETE_EMAIL, UPDATE_INPUT,
} from './action';
import { compose, getRandomString, findParentDataKey } from './util';

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
        const newItems = document.createRange().createContextualFragment(itemsToAdd.map(getItem).join(''));
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

export const handleInputEmail = ({ maybeRender: { updateInput, addEmailItem }, setState }, { getState }) => compose(
    updateInput,
    addEmailItem,
    setState,
    emailReducer(getState),
    (event) => {
        const { value } = event.target;
        if (value.endsWith(',') || value.endsWith(' ')) {
            return { type: CREATE_EMAIL, payload: event.target.value.slice(0, -1) };
        }
        return { type: UPDATE_INPUT, payload: value };
    },
);

export const handleChangeEmail = ({ maybeRender: { updateInput, addEmailItem }, setState }, { getState }) => compose(
    updateInput,
    addEmailItem,
    setState,
    emailReducer(getState),
    (event) => ({ type: CREATE_EMAIL, payload: event.target.value }),
);

export const handleItemDelete = ({ maybeRender: { removeEmailItem }, setState }, { getState }) => compose(
    removeEmailItem,
    setState,
    emailReducer(getState),
    (event) => ({ type: DELETE_EMAIL, payload: findParentDataKey(event, 'key') }),
);

export const handleAddClick = ({ maybeRender: { addEmailItem, updateInput }, setState }, { getState }) => compose(
    updateInput,
    addEmailItem,
    setState,
    emailReducer(getState),
    () => ({ type: CREATE_EMAIL, payload: `${getRandomString()}@email` }),
);

export const handleCountClick = ({ getState }) => () => {
    window.alert(`Valid Emails: ${validEmailsList(getState()).length}`);
};

export const handleEmailsGet = ({ getState }) => () => validEmailsList(getState());

export const handleEmailsSet = ({ maybeRender: { removeEmailItem, addEmailItem }, setState }, { getState }) => compose(
    addEmailItem,
    removeEmailItem,
    setState,
    emailReducer(getState),
    (emailsArray) => ({ type: CREATE_EMAILS_FROM_ARRAY, payload: emailsArray }),
);

export const handleEmailsPaste = ({ maybeRender: { addEmailItem }, setState }, { getState }) => compose(
    addEmailItem,
    setState,
    emailReducer(getState),
    (event) => {
        const emailsText = event.clipboardData.getData('text');
        event.preventDefault();
        return { type: CREATE_EMAILS_FROM_ARRAY, payload: emailsText.split(',') };
    },
);
