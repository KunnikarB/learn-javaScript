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

// Add products to the DOM
document.querySelector('.js-products--list').innerHTML = productsContainer;

// Sort products

document.addEventListener('DOMContentLoaded', () => {
  const sortDropdown = document.getElementById('sort');
  const productList = document.querySelector('.products--list');
  const products = Array.from(productList.children);

  sortDropdown.addEventListener('change', () => {
    const sortOrder = sortDropdown.value;
    const sortedProducts = products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector('.product--price').textContent.replace('$', '')
      );
      const priceB = parseFloat(
        b.querySelector('.product--price').textContent.replace('$', '')
      );

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    // Clear the product list
    while (productList.firstChild) {
      productList.removeChild(productList.firstChild);
    }

    // Append the sorted products
    sortedProducts.forEach((product) => {
      productList.appendChild(product);
    });
  });
});

// Filter products
