1.  Create a polyfill for map

    ```js
    Array.prototype.myMap = function (callbackFunction) {
      const result = [];
      for (let i = 0; i < this.length; i++) {
        result.push(callbackFunction(this[i], i, this));
      }
      return arr;
    };
    ```

2.  Create a polyfill for reduce

    ```js
    Array.prototype.myReduce = function (callback, initialValue) {
      let accumulator = initialValue || this[0];

      for (let i = 0; i < this.length; i++) {
        // if undefined we need to skip the first value
        if (initialValue === undefined) {
          accumulator = this[i];
          initialValue = this[i];
        } else accumulator = callback(accumulator, this[i], i, this);
      }

      return accumulator;
    };
    ```

3.  Create polyfill for call apply and bind

    ```js
    // polyfill for call, apply and bind

    Function.prototype.myCall = function (context, ...args) {
      context = context || window;
      const fn = Symbol();
      context[fn] = this;
      const result = context[fn](...args);
      delete context[fn];
      return result;
    };

    Function.prototype.myApply = function (context, args) {
      context = context || window;
      const fn = Symbol();
      context[fn] = this;
      const result = context[fn](...args);
      delete context[fn];
      return result;
    };

    Function.prototype.myBind = function (context, ...args) {
      const fn = this;
      return function (...innerArgs) {
        return fn.apply(context, [...args, ...innerArgs]);
      };
    };
    ```

4.  Products API

    ```html
    <select id="sortOrder">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <div id="products"></div>
    <script src="productsApi.js">
    ```

    ```js
    const productsContainer = document.getElementById("products");
    const sortOrderSelect = document.getElementById("sortOrder");

    async function fetchProducts() {
      const products = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => json)
        .catch((error) => console.error(error));
      return products;
    }

    function renderProducts(products) {
      productsContainer.innerHTML = ""; // Clear the container
      products.forEach((product) => {
        const wrapper = document.createElement("div");
        const title = document.createElement("h2");
        const price = document.createElement("h4");
        title.innerText = product.title;
        price.innerText = product.price;

        // append all to wrapper
        wrapper.appendChild(title);
        wrapper.appendChild(price);

        productsContainer.appendChild(wrapper);
      });
    }

    async function initApp() {
      // make api call
      const unsortedProducts = await fetchProducts();
      console.log(unsortedProducts);
      // handle sortChange
      sortOrderSelect.addEventListener("change", function (e) {
        const sortedProducts = sortProducts(
          [...unsortedProducts],
          e.target.value
        );
        renderProducts(sortedProducts);
      });

      renderProducts(sortProducts(unsortedProducts, "asc"));
    }

    function sortProducts(products, order) {
      return products.sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    initApp();
    ```

5.  Cart API

    ```html
    <div id="cart"></div>
    <script src="cartApi.js"></script>
    ```

    ```js
    const cartContainer = document.querySelector(".cart");

    async function fetchCartItems() {
      const response = await fetch("https://fakestoreapi.com/carts/6");
      const cartItems = await response.json();
      const productCalls = cartItems.products.map((product) =>
        fetch(`https://fakestoreapi.com/products/${product.productId}`)
      );
      const products = await Promise.all(productCalls);
      const productData = await Promise.all(
        products.map((product) => product.json())
      );
      const prod = cartItems.products.map((product, index) => ({
        ...product,
        ...productData[index],
      }));
      return {
        ...cartItems,
        products: prod,
      };
    }
    ```

6.  Debounce

    ```js
    function debounce(func, delay) {
      let timeoutId;

      return function (...args) {
        // Clear previous timeout
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
    ```

7.  Throttling

    ```js
    // Throttle function to limit the rate of function execution
    function throttle(func, limit) {
      // Flag to track whether function is currently in throttle state
      let inThrottle;

      // Return a new function that wraps the original function
      return function (...args) {
        // Execute only if not currently throttled
        if (!inThrottle) {
          // Invoke the original function with its arguments
          func.apply(this, args);

          // Set throttle flag to prevent immediate re-execution
          inThrottle = true;

          // Set a timeout to reset the throttle flag after specified limit
          setTimeout(() => {
            // Allow function to be executed again after time limit
            inThrottle = false;
          }, limit);
        }
      };
    }
    ```

8.  Pokemon detials

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>Pokemon Viewer</title>
      </head>
      <body>
        <select id="pokemonSelect">
          <option value="">Select a Pokemon</option>
        </select>
        <div id="pokemonDetails"></div>

        <script>
          const pokemonSelect = document.getElementById("pokemonSelect");
          const detailsContainer = document.getElementById("pokemonDetails");
          const cache = new Map();

          async function fetchPokemonList() {
            const response = await fetch(
              "https://pokeapi.co/api/v2/pokemon?limit=151"
            );
            const data = await response.json();
            return data.results;
          }

          async function fetchPokemonDetails(url) {
            if (cache.has(url)) {
              return cache.get(url);
            }

            const response = await fetch(url);
            const data = await response.json();
            cache.set(url, data);
            return data;
          }

          function displayPokemonDetails(pokemon) {
            detailsContainer.innerHTML = `
                      <h2>${pokemon.name}</h2>
                      <img src="${pokemon.sprites.front_default}" alt="${
              pokemon.name
            }">
                      <p>Height: ${pokemon.height}</p>
                      <p>Weight: ${pokemon.weight}</p>
                      <p>Types: ${pokemon.types
                        .map((type) => type.type.name)
                        .join(", ")}</p>
                  `;
          }

          async function initApp() {
            const pokemons = await fetchPokemonList();

            pokemonSelect.innerHTML += pokemons
              .map(
                (pokemon) =>
                  `<option value="${pokemon.url}">${pokemon.name}</option>`
              )
              .join("");

            pokemonSelect.addEventListener("change", async (e) => {
              if (!e.target.value) return;

              const pokemon = await fetchPokemonDetails(e.target.value);
              displayPokemonDetails(pokemon);
            });
          }

          initApp();
        </script>
      </body>
    </html>
    ```
