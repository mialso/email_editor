import { createEmailEditor, createStore } from './app.model';
import { initialState } from './email.model';
import { initialRender } from './render';

export function addEmailEditor(parentElement) {
    // create Editor
    const store = createStore(parentElement, initialState);
    const emailEditor = createEmailEditor(store);

    // initial render
    initialRender(store, parentElement);

    return emailEditor;
}

export default addEmailEditor;
