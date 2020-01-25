export function compose(...funcs) {
    if (!(Array.isArray(funcs) && funcs.length)) {
        return (arg) => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function getRandomString() {
    return Math.random().toString().substring(2);
}
