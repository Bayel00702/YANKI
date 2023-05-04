
export let user = {
    email : ''
};

let headerUserName = document.querySelector('.header__user-name');
let headerUserAction = document.querySelector('.header__user-action');

if (localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user'));
    headerUserName.textContent = `${user.name} ${user.surname}`;
    headerUserAction.textContent = 'Выйти'
} else {
    headerUserAction.textContent = 'Войти'
}


headerUserAction.addEventListener('click' , () => {
    if (headerUserAction.textContent === 'Войти'){
        location.href = 'http://localhost:63342/YANKI/login/index.html'
    } else {
        localStorage.removeItem('user');
        user = {email: ''};
        location.href = 'http://localhost:63342/YANKI/index.html'
    }
});

export const changeUser = (newUser) => {
    user = newUser
};

