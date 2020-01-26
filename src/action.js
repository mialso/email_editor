export const UPDATE_INPUT = 'UPDATE_INPUT';

export const CREATE_EMAIL = 'CREATE_EMAIL';
export const CREATE_EMAILS_FROM_ARRAY = 'CREATE_EMAILS_FROM_ARRAY';
export const DELETE_EMAIL = 'DELETE_EMAIL';

export const updateInput = (value) => ({ type: UPDATE_INPUT, payload: value });
export const createEmail = (string) => ({ type: CREATE_EMAIL, payload: string });
export const createEmailsFromArray = (emailsArray) => ({
    type: CREATE_EMAILS_FROM_ARRAY,
    payload: emailsArray,
});
export const deleteEmail = (id) => ({ type: DELETE_EMAIL, payload: id });
