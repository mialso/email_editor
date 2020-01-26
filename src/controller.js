import { emailReducer, validEmailsList } from './email.model';
import {
    createEmail, createEmailsFromArray, deleteEmail, updateInput,
} from './action';
import { compose, getRandomString, findParentDataKey } from './util';

export const handleInputEmail = ({ render, setState, getState }) => compose(
    render.updateInput,
    render.addEmailItem,
    setState,
    emailReducer(getState),
    (event) => {
        const { value } = event.target;
        if (value.endsWith(',') || value.endsWith(' ')) {
            return createEmail(event.target.value.slice(0, -1));
        }
        return updateInput(value);
    },
);

export const handleChangeEmail = ({ render, setState, getState }) => compose(
    render.updateInput,
    render.addEmailItem,
    setState,
    emailReducer(getState),
    (event) => createEmail(event.target.value),
);

export const handleItemDelete = ({ render, setState, getState }) => compose(
    render.removeEmailItem,
    setState,
    emailReducer(getState),
    (event) => deleteEmail(findParentDataKey(event, 'key')),
);

export const handleAddClick = ({ render, setState, getState }) => compose(
    render.updateInput,
    render.addEmailItem,
    setState,
    emailReducer(getState),
    () => createEmail(`${getRandomString()}@email`),
);

export const handleCountClick = ({ getState }) => () => {
    window.alert(`Valid Emails: ${validEmailsList(getState()).length}`);
};

export const handleEmailsGet = ({ getState }) => () => validEmailsList(getState());

export const handleEmailsSet = ({ render, setState, getState }) => compose(
    render.addEmailItem,
    render.removeEmailItem,
    setState,
    emailReducer(getState),
    createEmailsFromArray,
);

export const handleEmailsPaste = ({ render, setState, getState }) => compose(
    render.addEmailItem,
    setState,
    emailReducer(getState),
    (event) => {
        const emailsText = event.clipboardData.getData('text');
        event.preventDefault();
        return createEmailsFromArray(emailsText.split(','));
    },
);
