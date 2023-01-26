

let loginBtn = document.querySelector('#login');
let login = document.querySelector('.burMenu');
let loginExit = document.querySelector('.burMenu__menu-text');

loginBtn.onclick = function () {
    login.style.display = 'flex';
};
loginExit.onclick = function () {
    login.style.display = 'none';
};