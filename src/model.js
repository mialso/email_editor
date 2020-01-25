import { CREATE_EMAIL } from './action';

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

export function addEmail(state, emailString) {
    if (!isValid(emailString)) {
        return state;
    }
    const newEmail = createEmail(emailString);
    return {
        emailIds: state.emailIds.concat(newEmail.id),
        emailById: {
            [newEmail.id]: newEmail,
            ...state.emailById,
        },
    };
}

export const emailReducer = (getState) => (message) => {
    const state = getState();
    switch (message.type) {
        case CREATE_EMAIL: return addEmail(state, message.payload);
        default: return state;
    }
};
