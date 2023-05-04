import {changeUser, user} from "../../user.js";

let title = document.querySelector('.coat__right-title');
let price = document.querySelector('.coat__right-price');
let category = document.querySelector('.coat__right-category');
let rating = document.querySelector('.coat__right-rating');
let description = document.querySelector('.coat__right-desc');
let img = document.querySelector('.coat__left-big__img');
let addCart = document.querySelector('.coat__add-cart');
let addFavorites = document.querySelector('.coat__add-favorites');
let trendRow = document.querySelector('.trending__row');






const  getRelatedProducts = (productCategory, id) => {
  fetch(`http://localhost:3000/products?category=${productCategory}&id_ne=${id}`)
      .then((response) => response.json())
      .then((response) => {
          trendRow.innerHTML = '';
          response.forEach((item) => {
              trendRow.innerHTML +=   `
                <div class="trending__card">
                        <a href="?product=${item.id}">
                            <img src="${item.image}" alt="" class="trending__card-img">
                        </a>
                        
                        <div class="trending__card-info">
                            <h3 class="trending__card-title">
                                ${item.title}
                            </h3>
                            <p class="trending__card-category">
                            ${item.category}
                            </p>
                            <div class="trending__card-bottom">
                                <p class="trending__card-price">
                                ${item.price} $
                                   
                                </p>
                                <div class="trending__card-purchased">
                                ${item.rating.count} people purchased
                                </div>
                            </div>
                        </div>
                    </div>`
          });
      })
};

const getOneProduct = () => {
  fetch(`http://localhost:3000/products/${location.search.split('=')[1]}`)
      .then((response) => response.json())
      .then((response) => {
          title.textContent = response.title;
          price.textContent = `${response.price}$`;
          category.textContent = response.category;
          img.setAttribute('src', response.image);
          rating.textContent = response.rating.rate;
          description.textContent = response.description;
          addCart.dataset.id = response.id;
          addFavorites.dataset.id = response.id;
          getRelatedProducts(response.category, response.id);

          if (user.favorites.some((item) => item.id === response.id)) {
              addFavorites.textContent = 'Удалить из избранных'
          } else {
              addFavorites.textContent = 'Добавить в избранное'
          }


          addFavorites.addEventListener('click', () => {
              fetch(`http://localhost:3000/users/${user.id}`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({

                      favorites: user.favorites.some((item) => item.id === response.id) ?
                          user.favorites.filter((item) => item.id !== response.id) :
                          [...user.favorites, response]
                  })
              }).then((response) => response.json())
                  .then((response) => {
                      changeUser(response);
                      localStorage.setItem('user', JSON.stringify(response));
                      getOneProduct();
                  })
          });

          addCart.addEventListener('click', () => {
              fetch(`http://localhost:3000/users/${user.id}`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({

                      cart: user.cart.some((item) => item.id === response.id) ?
                          user.cart.map((item) => {
                              if (item.id !== response.id){
                                  return {...item, count:item.count + 1}
                              }
                          }) :
                          [...user.cart, {
                          ...response,
                              count: 1
                          }]
                  })
              }).then((response) => response.json())
                  .then((response) => {
                      changeUser(response);
                      localStorage.setItem('user', JSON.stringify(response));
                      getOneProduct();
                  })
          });

      })
};

getOneProduct();




