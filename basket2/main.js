import {user, changeUser} from "../user.js";

let cart = document.querySelector('.order__row');


const addCartList = () => {
  cart.innerHTML = '';

  if (user.cart.length){
      user.cart.forEach((item) => {
          cart.innerHTML += `
        <div class="order__card">
                    <div class="order__card-info order__card-info2">
                        <img class="order__img" src="${item.image}" alt="">

                        <div class="order__card-info__text">
                            <p class="order__card-info__text-subtitle">арт. 1589956</p>
                            <h3 class="order__card-info__text-title">${item.title}</h3>
                        </div>
                    </div>

                    <span><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="15" cy="15" r="14.85" stroke="#252525" stroke-width="0.3"/>
<circle cx="15" cy="15" r="12" fill="#6F83A4"/>
</svg>

</span>

                    <div class="order__card-size">
                        <p class="order__card-size__text">M<span><svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 3.88903L8.88906 -3.05043e-05L10 1.11091L5 6.1109L1.32478e-08 1.11091L1.11094 -3.04116e-05L5 3.88903Z" fill="#E0BEA2"/>
</svg>
</span></p>
                    </div>

                    <div class="order__card-number">
                        <p class="order__card-number__text">
                                <span  data-id="${item.id}" class="order__minus"><svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0.285706H5.71429H4.28571H0V1.71428H4.28571H5.71429H10V0.285706Z" fill="#E0BEA2"/>
</svg>
</span>
                            <span>${item.count}</span>
                            <span  data-id="${item.id}" class="order__plus"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.28571 4.28571V0H5.71429V4.28571H10V5.71429H5.71429V10H4.28571V5.71429H0V4.28571H4.28571Z" fill="#E0BEA2"/>
</svg>
</span>
                        </p>
                    </div>

                    <div class="order__card-price">
                        <p class="order__card-price__text">${item.price * item.count}$</p>

                        <span data-id="${item.id}" class="order__del"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 5H25V7.5H22.5V23.75C22.5 24.0815 22.3683 24.3995 22.1339 24.6339C21.8995 24.8683 21.5815 25 21.25 25H3.75C3.41848 25 3.10054 24.8683 2.86612 24.6339C2.6317 24.3995 2.5 24.0815 2.5 23.75V7.5H0V5H6.25V1.25C6.25 0.918479 6.3817 0.600537 6.61612 0.366116C6.85054 0.131696 7.16848 0 7.5 0H17.5C17.8315 0 18.1495 0.131696 18.3839 0.366116C18.6183 0.600537 18.75 0.918479 18.75 1.25V5ZM20 7.5H5V22.5H20V7.5ZM8.75 11.25H11.25V18.75H8.75V11.25ZM13.75 11.25H16.25V18.75H13.75V11.25ZM8.75 2.5V5H16.25V2.5H8.75Z" fill="#E0BEA2"/>
</svg>
</span>
                    </div>
                </div>
      `;
          let allDeleteBtn = document.querySelectorAll('.order__del');
          let allMinusBtn = document.querySelectorAll('.order__minus');
          let allPlusBtn = document.querySelectorAll('.order__plus');

          Array.from(allDeleteBtn).forEach((item) => {
              item.addEventListener('click', () => {
                  fetch(`http://localhost:3000/users/${user.id}`, {
                      method: 'PATCH',
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          cart: user.cart.filter((el) => {
                              return el.id != item.dataset.id
                          })
                      })
                  }).then((response) => response.json())
                      .then((response) => {
                          changeUser(response);
                          localStorage.setItem('user', JSON.stringify(response));
                          addCartList()
                      })
              })
          });

          Array.from(allMinusBtn).forEach((item) => {
              item.addEventListener('click', () => {
                  fetch(`http://localhost:3000/users/${user.id}`, {
                      method: 'PATCH',
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          cart: user.cart.find(el => el.id == item.dataset.id).count === 1 ?
                              user.cart.filter((el) => {
                                  return el.id != item.dataset.id
                              }) : user.cart.map((el) => {
                                  if (el.id == item.dataset.id){
                                      return {...el, count: el.count - 1}
                                  }
                                  return el
                              })
                      })
                  }).then((response) => response.json())
                      .then((response) => {
                          changeUser(response);
                          localStorage.setItem('user', JSON.stringify(response));
                          addCartList()

                      })
              })
          });

          Array.from(allPlusBtn).forEach((item) => {
              item.addEventListener('click', () => {
                  fetch(`http://localhost:3000/users/${user.id}`, {
                      method: 'PATCH',
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          cart: user.cart.map((el) => {
                              if (el.id == item.dataset.id){
                                  return {...el, count: el.count + 1}
                              }
                              return el
                          })
                      })
                  }).then((response) => response.json())
                      .then((response) => {
                          changeUser(response)
                          localStorage.setItem('user', JSON.stringify(response))
                          addCartList()
                      })
              })
          });


      });
  }

};

addCartList();

