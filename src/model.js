import {
    CREATE_EMAIL, CREATE_EMAILS_FROM_ARRAY, DELETE_EMAIL,
} from './action';
import { compose } from './util';

// Email model is designed according to RFC 2822
// https://tools.ietf.org/html/rfc2822#section-3.4
export const Email = {
    localPart: '',
    domain: '',
};

export function createEmail(emailString) {
    const id = emailString;
    const [ localPart, domain ] = emailString.split('@');
    return {
        id,
        localPart,
        domain,
    };
}

export function isValid(emailString) {
    const [ localPart, domain ] = emailString.split('@');
    return !!(localPart && domain);
}

export const initialState = {
    emailIds: [],
    emailById: {},
    inputValue: '',
};

// selectors
export const validEmailsList = (state) => state.emailIds.filter(isValid);

export const addEmail = (emailString) => (state) => {
    const newEmail = createEmail(emailString);
    return {
        emailIds: state.emailIds.concat(newEmail.id),
        emailById: {
            [newEmail.id]: newEmail,
            ...state.emailById,
        },
    };
};

export const removeEmail = (id) => (state) => {
    if (!id) {
        return state;
    }
    const { emailIds, emailById } = state;
    const removeIndex = emailIds.indexOf(id);
    if (removeIndex === -1) {
        return state;
    }
    emailIds.splice(removeIndex, 1);
    delete emailById[id];
    return { ...state };
};

export const addEmailsFromArray = (emailsArray) => (state) => {
    if (!Array.isArray(emailsArray)) {
        return state;
    }
    return compose(...emailsArray.map(addEmail))(state);
};

export const emailReducer = (getState) => (message) => {
    const state = getState();
    switch (message.type) {
        case CREATE_EMAIL: return addEmail(message.payload)(state);
        case CREATE_EMAILS_FROM_ARRAY: return addEmailsFromArray(message.payload)(state);
        case DELETE_EMAIL: return removeEmail(message.payload)(state);
        default: return state;
    }
};
