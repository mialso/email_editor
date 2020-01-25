import { EmailEditor } from './view';
import { initialState } from './model';
import {
    handleRender, handleInputEmail, handleAddClick, handleCountClick,
} from './controller';

let currentState = initialState;

const getState = () => currentState;
const setState = (nextState) => {
    currentState = nextState;
};

export function addEmailEditor(element) {
    const parentElement = element;
    const emailEditorFragment = document.createRange().createContextualFragment(EmailEditor);
    // dom elements to handle user interactions
    const emailInputElement = emailEditorFragment.querySelector('.EmailEditor-Input');
    const emailAddButton = emailEditorFragment.querySelector('.EmailEditor-Button--AddEmail');
    const emailCountButton = emailEditorFragment.querySelector('.EmailEditor-Button--GetCount');

    const render = handleRender(parentElement, { setState, getState });
    emailInputElement.onchange = handleInputEmail(render, { getState });
    emailAddButton.onclick = handleAddClick(render, { getState });
    emailCountButton.onclick = handleCountClick;
    parentElement.appendChild(emailEditorFragment);
}

export default addEmailEditor;
