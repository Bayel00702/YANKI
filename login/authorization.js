import {changeUser} from "../user.js";

if (localStorage.getItem('user') !== null) {
    location.href = 'http://localhost:63342/YANKI/index.html'
}


let authorF = document.querySelector('.authorization__first');
let authorS = document.querySelector('.authorization__second');

let titleF = document.querySelector('.authorization__content-titles_signUp');
let titleS = document.querySelector('.authorization__content-titles_signIn');

let signUpBtn = document.querySelector('.authorization__content-btn_signUp');
let signInBtn = document.querySelector('.authorization__content-btn_signIn');

signInBtn.addEventListener('click', () => {
    authorF.style.display = 'none';
    authorS.style.display = 'block';
    titleS.style.fontWeight = '600';
    titleS.style.fontSize = '30px';
    titleS.style.lineHeight = '20px';
    titleS.style.color = '#252525';
    signUpBtn.style.border = ' 1px solid #576067';
    signUpBtn.style.fontWeight = '600';
    signUpBtn.style.fontSize = '16px';
    signUpBtn.style.lineHeight = '20px';
    signUpBtn.style.color = '#576067';
    signUpBtn.style.padding = '10px';
    signInBtn.style.background = '#E5E5E5';
    signUpBtn.style.cursor = 'pointer';
    signUpBtn.style.border = 'none';
    signUpBtn.style.borderRadius = '15px'
});
signUpBtn.addEventListener('click', () => {
    authorS.style.display = 'none';
    authorF.style.display = 'block';
    titleF.style.fontWeight = '600';
    titleF.style.fontSize = '30px';
    titleF.style.lineHeight = '20px';
    titleF.style.color = '#252525';
    signInBtn.style.border = ' 1px solid #576067';
    signInBtn.style.fontWeight = '600';
    signInBtn.style.fontSize = '16px';
    signInBtn.style.lineHeight = '20px';
    signInBtn.style.color = '#576067';
    signInBtn.style.border = 'none';
    signInBtn.style.padding = '10px';
    signInBtn.style.background = '#E5E5E5';
    signInBtn.style.cursor = 'pointer'
});

let registerForm = document.querySelector('.signUp');
let loginForm = document.querySelector('.signIn');


const registerUser = (newUser) => {
    fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    }).then((response) => response.json())
        .then((response) => {
            changeUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            location.href = 'http://localhost:63342/YANKI/index.html'
        })
};

const loginUser = (newUser) => {
    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    }).then((response) => response.json())
        .then((response) => {
            changeUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            location.href = 'http://localhost:63342/YANKI/index.html';
            console.log(response)
        })
};


registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newUser = {
        name: event.target[1].value,
        surname: event.target[2].value,
        phone: event.target[3].value,
        email: event.target[4].value,
        password: event.target[5].value,
        favorites: [],
        cart : [],
        orders: []
    };

    registerUser(newUser)

});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newUser = {
        email: event.target[1].value,
        password: event.target[2].value,
    };

    loginUser(newUser)

});

