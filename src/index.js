import { EmailEditor, actionClass } from './view';
import { initialState } from './model';
import {
    handleRender, handleChangeEmail, handleAddClick, handleCountClick,
    handleEmailsGet, handleEmailsSet, handleItemDelete, handleInputEmail,
    handleEmailsPaste,
} from './controller';

// observable stuff
const listeners = [];

export const unsubscribe = (listener) => () => {
    const listenerIndex = listeners.indexOf(listener);
    listeners.splice(listenerIndex, 1);
};

export const subscribe = (listener) => {
    if (typeof listener !== 'function') {
        return null;
    }
    listeners.push(listener);
    return unsubscribe(listener);
};

// state management
let currentState = initialState;

export const getState = () => currentState;
export const setState = (nextState) => {
    const hasChanges = currentState !== nextState;
    if (hasChanges) {
        currentState = Object.freeze(nextState);
        listeners.forEach(
            (listener) => window.setTimeout(() => listener && listener(currentState), 0),
        );
    }
    return hasChanges;
};

export function addEmailEditor(parentElement) {
    const emailEditorFragment = document.createRange().createContextualFragment(EmailEditor);

    // initialize renderer
    const maybeRender = handleRender(parentElement, { getState });

    // find dom elements to handle user interactions
    const emailInputElement = emailEditorFragment.querySelector(`.${actionClass.inputElement}`);
    const emailListElement = emailEditorFragment.querySelector(`.${actionClass.itemList}`);
    const emailAddButton = emailEditorFragment.querySelector(`.${actionClass.addButton}`);
    const emailCountButton = emailEditorFragment.querySelector(`.${actionClass.countButton}`);

    // bind controllers to dom events
    emailInputElement.onchange = handleChangeEmail({ maybeRender, setState }, { getState });
    emailInputElement.oninput = handleInputEmail({ maybeRender, setState }, { getState });
    emailInputElement.onpaste = handleEmailsPaste({ maybeRender, setState }, { getState });

    emailAddButton.onclick = handleAddClick({ maybeRender, setState }, { getState });
    emailCountButton.onclick = handleCountClick({ getState });
    emailListElement.onclick = handleItemDelete({ maybeRender, setState }, { getState });

    // render the fragment to the dom via given parent element
    parentElement.appendChild(emailEditorFragment);

    return {
        subscribe,
        getEmails: handleEmailsGet({ getState }),
        setEmails: handleEmailsSet({ maybeRender, setState }, { getState }),
    };
}

export default addEmailEditor;
