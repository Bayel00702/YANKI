
let catalogProduct = document.querySelector('.catalog__product-right');
let catalogPagination = document.querySelector('.catalog__pagination');
let catalogSearch = document.querySelector('.catalog__size-input');
let catalogForm = document.querySelector('.catalog__size-price');
let catalogSelect = document.querySelector('.catalog__size-select');

let page = 1;

const getActiveLink = () => {
    let categoryItems = document.querySelectorAll('.catalog__product-left__list-link');



    Array.from(categoryItems).forEach((item) => {
        if (location.search === item.getAttribute('href')){
            item.classList.add('active')
        }

    })

};

getActiveLink();

const getAllCategory = (title = '', from = 0, view = '') => {
    let select = view.length ? `&_sort=price&_order=${view}` : '';
    let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`;
    fetch(` http://localhost:3000/products?${category}&_page=${page}&_limit=9&title_like=${title}&price_gte=${from}${select}`)
        .then((response) => response.json())
        .then((response) => {
            catalogProduct.innerHTML = '';
            response.forEach((item) => {
                catalogProduct.innerHTML += `
                    <div class="catalog__product-right__card">
                       <div class="catalog__product-right__image">
                       <a href="../basket/index.html?product=${item.id}">
                                                  <img src="${item.image}" alt="" class="catalog__product-right__img">

</a>
                       </div>

                       <h2 class="catalog__product-right__title">${item.title}</h2>
                       <p class="catalog__product-right__text">${item.category}</p>
                    
                       <h3 class="catalog__product-right__price">${item.price} $</h3>
                   </div>
                `
            })
        })
};

getAllCategory();

const getAllProductsCount = (title = '', from = 0, view = '') => {
    let select = view.length ? `&_sort=price&_order=${view}` : '';
    let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`;
    fetch(`http://localhost:3000/products?${category}&title_like=${title}&price_gte=${from}${select}`)
        .then((response) => response.json())
        .then((response) => {
            catalogPagination.innerHTML = '';
            for (let i = 1; i <= Math.ceil(response.length / 7); i++){
                catalogPagination.innerHTML += `
                     <button style="background: ${page === i ? '#E0BEA2' : 'white'}" data-id="${i}" class="catalog__pagination-btn">${i}</button>
                `
            }

            let paginationBtn = document.querySelectorAll('.catalog__pagination-btn');

            Array.from(paginationBtn).forEach((item) => {
                item.addEventListener('click', () => {
                    page = +item.dataset.id
                    Array.from(paginationBtn).forEach((el) => {
                        if (page === +el.dataset.id){
                            el.style.background = '#E0BEA2'
                        } else {
                            el.style.background = 'white'
                        }
                    });
                    getAllCategory(catalogSearch.value, catalogForm.value, catalogSelect.value);
                })
            })
        });


};

getAllProductsCount();

catalogSearch.addEventListener('input', () => {
    getAllCategory(catalogSearch.value, catalogForm.value, catalogSelect.value);
    getAllProductsCount(catalogSearch.value, catalogForm.value, catalogSelect.value)
});

catalogForm.addEventListener('input', () => {
    getAllCategory(catalogSearch.value, catalogForm.value, catalogSelect.value);
    getAllProductsCount(catalogSearch.value, catalogForm.value, catalogSelect.value)
});

catalogSelect.addEventListener('change', () => {
    getAllCategory(catalogSearch.value, catalogForm.value, catalogSelect.value);
    getAllProductsCount(catalogSearch.value, catalogForm.value, catalogSelect.value)
});


