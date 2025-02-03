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
