import { getItem } from './view';
import { emailReducer, validEmailsCount } from './model';
import { CREATE_EMAIL } from './action';
import { compose, getRandomString } from './util';

export const handleRender = (parentElement, { getState }) => (shouldUpdate) => {
    if (!shouldUpdate) {
        return;
    }
    const state = getState();
    const emailListContainer = parentElement.querySelector('.EmailEditor-List');
    const emailInput = parentElement.querySelector('.EmailEditor-Input');
    if (!(emailListContainer && emailInput)) {
        console.error(`Unable to find either emailList:[${!!(emailListContainer)}] or emailInput:[${!!(emailInput)}] dom elements`);
        return;
    }
    emailListContainer.innerHTML = state.emailIds.map(getItem).join('');
    emailInput.value = '';
};

export const handleInputEmail = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    (event) => ({ type: CREATE_EMAIL, payload: event.target.value }),
);

export const handleAddClick = ({ maybeRender, setState }, { getState }) => compose(
    maybeRender,
    setState,
    emailReducer(getState),
    () => ({ type: CREATE_EMAIL, payload: `${getRandomString()}@email` }),
);

export const handleCountClick = ({ getState }) => () => {
    window.alert(`Valid Emails: ${validEmailsCount(getState())}`);
};
