import './style.css';

export const EmailEditor = `
    <div class="EmailEditor">
        <div class="EmailEditor-Title">Share Board name with others</div>
        <div class="EmailEditor-Content">
            <div class="EmailEditor-List"></div>
            <input class="EmailEditor-Input" type="email" placeholder="add more people..."></input>
        </div>
        <div class="EmailEditor-Actions">
            <button class="EmailEditor-Button--AddEmail">Add email</button>
            <button class="EmailEditor-Button--GetCount">Get emails count</button>
        </div>
    </div>
`;

export function getItem(id) {
    return `<span class="EmailEditor-Item">${id}</span>`;
}
