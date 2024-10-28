document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalCart');
  const cartLink = document.getElementById('cartLink');
  const closeBtn = document.getElementsByClassName('modal-cart-close')[0];

  cartLink.onclick = function () {
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
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
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalCart');
  const cartLink = document.getElementById('cartLink');
  const closeBtn = document.getElementsByClassName('modal-cart-close')[0];
  const searchInput = document.querySelector('.navbar--search');
  const productList = document.querySelector('.products--list');
  const products = Array.from(productList.children);

  cartLink.onclick = function () {
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
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
      openCartModal();
    });
  });

  function openCartModal() {
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    updateCartDisplay();
  }

  function closeCartModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

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

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    products.forEach((product) => {
      const productName = product
        .querySelector('.product--name')
        .textContent.toLowerCase();
      if (productName.includes(query)) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  });
});
