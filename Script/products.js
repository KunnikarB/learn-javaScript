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

// Add to cart
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalCart');
  const cartLink = document.getElementById('cartLink');
  const closeBtn = document.getElementsByClassName('modal-cart-close')[0];
  const cartItems = [];
  const cartDisplay = document.querySelector('.modal-cart-content p');

  cartLink.onclick = function () {
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    updateCartDisplay();
  };

  closeBtn.onclick = function () {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  };

  const addToCartButtons = document.querySelectorAll('.product--buy');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const product = event.target.closest('.product.card');
      const productName = product.querySelector('.product--name').textContent;
      const productPrice = product.querySelector('.product--price').textContent;

      cartItems.push({
        name: productName,
        price: productPrice,
      });

      displayConfirmation(productName);
      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    if (cartItems.length === 0) {
      cartDisplay.textContent = 'Your cart is empty.';
    } else {
      cartDisplay.innerHTML =
        '<ul>' +
        cartItems
          .map((item) => `<li>${item.name} - ${item.price}</li>`)
          .join('') +
        '</ul>';
    }
  }

  function displayConfirmation(productName) {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-message';
    confirmation.textContent = `${productName} has been added to the cart.`;
    document.body.appendChild(confirmation);

    setTimeout(() => {
      confirmation.remove();
    }, 3000);
  }
});
