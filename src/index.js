import { createEmailEditor } from './app.model';
import { EmailEditor, actionClass } from './view';
import {
    handleChangeEmail, handleAddClick, handleCountClick, handleItemDelete,
    handleInputEmail, handleEmailsPaste,
} from './controller';

export function addEmailEditor(parentElement) {
    const emailEditorFragment = document.createRange().createContextualFragment(EmailEditor);

    // find dom elements to handle user interactions
    const emailInputElement = emailEditorFragment.querySelector(`.${actionClass.inputElement}`);
    const emailListElement = emailEditorFragment.querySelector(`.${actionClass.itemList}`);
    const emailAddButton = emailEditorFragment.querySelector(`.${actionClass.addButton}`);
    const emailCountButton = emailEditorFragment.querySelector(`.${actionClass.countButton}`);

    // create Editor
    const [ { maybeRender, setState, getState }, emailEditor ] = createEmailEditor(parentElement);

    // bind controllers to dom events
    emailInputElement.onchange = handleChangeEmail({ maybeRender, setState }, { getState });
    emailInputElement.oninput = handleInputEmail({ maybeRender, setState }, { getState });
    emailInputElement.onpaste = handleEmailsPaste({ maybeRender, setState }, { getState });

    emailAddButton.onclick = handleAddClick({ maybeRender, setState }, { getState });
    emailCountButton.onclick = handleCountClick({ getState });
    emailListElement.onclick = handleItemDelete({ maybeRender, setState }, { getState });

    // render the fragment to the dom via given parent element
    parentElement.appendChild(emailEditorFragment);

    return emailEditor;
}

export default addEmailEditor;
