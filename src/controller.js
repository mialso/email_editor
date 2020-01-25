import { getItem } from './view';
import { emailReducer } from './model';
import { CREATE_EMAIL } from './action';
import { compose, getRandomString } from './util';

export const handleRender = (parentElement, { getState, setState }) => (nextState) => {
    const state = getState();
    if (state === nextState) {
        return;
    }
    const emailListContainer = parentElement.querySelector('.EmailEditor-List');
    const emailInput = parentElement.querySelector('.EmailEditor-Input');
    if (!emailListContainer) {
        console.error('Unable to get .EmailEditor-List');
        return;
    }
    setState(nextState);
    emailListContainer.innerHTML = nextState.emailIds.map(getItem).join('');
    emailInput.value = '';
};

export const handleInputEmail = (render, { getState }) => compose(
    render,
    emailReducer(getState),
    (event) => ({ type: CREATE_EMAIL, payload: event.target.value }),
);

export const handleAddClick = (render, { getState }) => compose(
    render,
    emailReducer(getState),
    () => ({ type: CREATE_EMAIL, payload: `${getRandomString()}@email` }),
);

export const handleCountClick = () => {};
