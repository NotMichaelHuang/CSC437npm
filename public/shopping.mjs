const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 10
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    console.log("Product created");

    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;
  
    const details = document.createElement('div');
    details.className = 'product-details';
  
    const h3 = document.createElement('h3');
    h3.textContent = product.name;
  
    const desc = document.createElement('p');
    desc.textContent = product.description;
  
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price}`;
  
    const bottomRow = document.createElement('div');
  
    const button = document.createElement('button');
    button.className = 'buy-button';
    button.textContent = 'Add to cart';

    // Event Listener
    button.addEventListener('click', () => {
       product.numInCart++; 
       rerenderAllProducts(product);
       rerenderCart();
    });
  
    const cartCount = document.createElement('span');
    cartCount.className = 'num-in-cart';
    cartCount.textContent = `${product.numInCart} in cart`;
  
    // Nesting
    bottomRow.appendChild(button);
    bottomRow.appendChild(cartCount);
  
    details.appendChild(h3);
    details.appendChild(desc);
    details.appendChild(price);
    details.appendChild(bottomRow);
  
    article.appendChild(img);
    article.appendChild(details);
  
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const container = document.querySelector('.product-list');

    // 1. remove all <article>s
    const article = container.querySelectorAll('article');
    article.forEach(article => article.remove());

    // 2. recreate them using the data in PRODUCTS
    /* 3. modify the re-creation so it uses shouldProductBeVisible() 
        (details are near the bottom of the lab directions)
    */
    PRODUCTS.forEach(product => {
        if(shouldProductBeVisible(product))
        {
            const newArticle = renderProductCard(product);
            container.append(newArticle);
        } 
    })

    // You can remove and recreate the heading element if it makes things easier.
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
    const container = document.querySelector(".cart-items");
    container.innerHTML = ''; // Clear everything in it

    PRODUCTS.forEach(product => {
        if(product.numInCart > 0)
        {
            console.log("Cart created");

            const par = document.createElement('p');
            par.textContent = product.name + " x" + product.numInCart;

            const btn = document.createElement('button');
            btn.className = "remove-button";
            btn.textContent = "Remove";

            btn.addEventListener('click', () => {
                product.numInCart--;
                rerenderAllProducts();
                rerenderCart();
            })

            container.append(par);
            container.append(btn);
        } 
    });
}

const minPriceInput = document.querySelector("#minPrice");
minPriceInput.addEventListener('input', () => {
    rerenderAllProducts();
});
const maxPriceInput = document.querySelector("#maxPrice");
maxPriceInput.addEventListener('input', () => {
    rerenderAllProducts();
});
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = parseFloat(minPriceInput.value);
    const max = parseFloat(maxPriceInput.value);

    const inMinRange = isNaN(min) || product.price >= min;
    const inMaxRange = isNaN(max) || product.price <= max;

    console.log(inMinRange && inMaxRange);
    return inMinRange && inMaxRange;
}

// Execution
rerenderAllProducts();
rerenderCart();

