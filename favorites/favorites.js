import {user} from "../user.js";
import {changeUser} from "../user.js";

let favoritesRow = document.querySelector('.favorites__row');
let favoritesEmpty = document.querySelector('.favorites__empty');
favoritesEmpty.style.color = '#252525';

const getAllFavorites = () => {
    favoritesRow.innerHTML = '';
    if(user.favorites.length){
        favoritesEmpty.style.display = 'none';
        user.favorites.forEach((item) => {
        favoritesRow.innerHTML += `
              <div class="trending__card favorites__card">
                        <a href="./basket/index.html?product=${item.id}">
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
                                
                                <span data-id="${item.id}" class="favorites__del-btn"><?xml version="1.0" ?>

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="25" height="25" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">

<defs>

<style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style>

</defs>

<title/>

<g id="cross">

<line class="cls-1" x1="7" x2="25" y1="7" y2="25"/>

<line class="cls-1" x1="7" x2="25" y1="25" y2="7"/>

</g>

</svg></span>
                            </div>
                        </div>
                        
                    </div>
        `
    });

    let favoritesDel = document.querySelectorAll('.favorites__del-btn');
    Array.from(favoritesDel).forEach((item) => {
        item.addEventListener('click', () => {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorites: user.favorites.filter((el) => {
                        return el.id != item.dataset.id
                    })
                })
            }).then((response) => response.json())
                .then((response) => {
                    changeUser(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    getAllFavorites();
                })
        })
    });
         }else
{
    favoritesEmpty.style.display = 'block'
}
};

getAllFavorites();