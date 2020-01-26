import { initialState } from './model';
import {
    handleRender, handleEmailsGet, handleEmailsSet,
} from './controller';

export function cloneState(state) {
    return JSON.parse(JSON.stringify(state));
}

export function createEmailEditor(parentElement) {
    // observable stuff
    const listeners = [];

    const unsubscribe = (listener) => () => {
        const listenerIndex = listeners.indexOf(listener);
        listeners.splice(listenerIndex, 1);
    };

    const subscribe = (listener) => {
        if (typeof listener !== 'function') {
            return null;
        }
        listeners.push(listener);
        return unsubscribe(listener);
    };

    // state management
    let currentState = Object.freeze(initialState);

    const getState = () => currentState;
    const setState = (nextState) => {
        const hasChanges = currentState !== nextState;
        if (hasChanges) {
            currentState = Object.freeze(nextState);
            const stateCopy = cloneState(nextState);
            listeners.forEach(
                (listener) => window.setTimeout(() => listener && listener(stateCopy), 0),
            );
        }
        return hasChanges;
    };

    // initialize renderer
    const maybeRender = handleRender(parentElement, { getState });

    return [
        { maybeRender, setState, getState },
        Object.freeze({
            subscribe,
            getEmails: handleEmailsGet({ getState }),
            setEmails: handleEmailsSet({ maybeRender, setState }, { getState }),
        }),
    ];
}
