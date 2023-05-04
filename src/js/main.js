


let trendRow = document.querySelector('.trending__row');
let trendBtn = document.querySelector('.trending__btn');


const getAllTrends = (limit = 5) => {
    fetch(`http://localhost:3000/products?_sort=rating.rate&_order=desc&_limit=${limit}`)
        .then((response) => response.json())
        .then((response) => {
            trendRow.innerHTML = '';
            response.forEach((item) => {
                trendRow.innerHTML +=   `
                <div class="trending__card">
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
                            </div>
                        </div>
                    </div>`
            });
        })

};

getAllTrends();
trendBtn.addEventListener('click', () => {
    if (trendBtn.textContent === 'See more') {
        getAllTrends(10);
        trendBtn.textContent = 'Hide'
    } else {
        getAllTrends();
        trendBtn.textContent = 'See more'
    }
});
