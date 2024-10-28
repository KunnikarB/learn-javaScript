import { products } from '../data/data-products.js';

let productsContainer = '';

products.forEach((product) => {
  productsContainer += ` 
    <div class="product card">
              <img
                alt="This is an image"
                src="${product.img}"
                class="product--image"
              />
              <div class="product--text">
                <h1 class="product--name">
                  ${product.name}
                </h1>
                <p class="product--description">
                  ${product.des}
                </p>
                <button class="product--buy">Buy Now</button>
                <p class="product--price">$${product.price}</p>
              </div>
            </div>
  `;
});

document.querySelector('.js-products--list').innerHTML = productsContainer;



