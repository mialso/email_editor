import { getItem } from './view';
import { emailReducer, validEmailsList } from './model';
import {
    CREATE_EMAIL, CREATE_EMAILS_FROM_ARRAY, DELETE_EMAIL, UPDATE_INPUT,
} from './action';
import { compose, getRandomString, findParentDataKey } from './util';

export const handleRender = (parentElement, { getState }) => (shouldUpdate) => {
    if (!shouldUpdate) {
        return;
    }
    const state = getState();
    // TODO
    // const emailEditorContainer = parentElement.querySelector('.EmailEditor-Editor');
    const emailListContainer = parentElement.querySelector('.EmailEditor-List');
    const emailInput = parentElement.querySelector('.EmailEditor-Input');
    if (!(emailListContainer && emailInput)) {
        console.error(`Unable to find either emailList:[${!!(emailListContainer)}] or emailInput:[${!!(emailInput)}] dom elements`);
        return;
    }
    emailListContainer.innerHTML = state.emailIds.map(getItem).join('');
    emailInput.value = state.inputValue;
    emailInput.scrollIntoView();
};

export const handleInputEmail = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
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

export const handleChangeEmail = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    (event) => ({ type: CREATE_EMAIL, payload: event.target.value }),
);

export const handleItemDelete = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    (event) => ({ type: DELETE_EMAIL, payload: findParentDataKey(event, 'key') }),
);

export const handleAddClick = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    () => ({ type: CREATE_EMAIL, payload: `${getRandomString()}@email` }),
);

export const handleCountClick = ({ getState }) => () => {
    window.alert(`Valid Emails: ${validEmailsList(getState()).length}`);
};

export const handleEmailsGet = ({ getState }) => () => validEmailsList(getState());

export const handleEmailsSet = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    (emailsArray) => ({ type: CREATE_EMAILS_FROM_ARRAY, payload: emailsArray }),
);

export const handleEmailsPaste = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    (event) => {
        const emailsText = event.clipboardData.getData('text');
        event.preventDefault();
        return { type: CREATE_EMAILS_FROM_ARRAY, payload: emailsText.split(',') };
    },
);
