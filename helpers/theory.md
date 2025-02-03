# 4th feb

[&#8592;back to main page](../README.md)

### Theoritical Quesitions

1. What are microfrontends? Explain briefly

   Microfrontends bring the concept of microservices into the browser. It is a collection of small independent modules which collectively form a large application

   Key Characteristics:

   - Independence - each has its own build steps, repo
   - Modularity - can be developed without affecting other modules
   - Diverse technology - can use different frameworks

   They communicate using

   - shared global states
   - web storages
   - custom events

2. What are SPAs?

   SPA Stands for single page application. It makes use of a single html document and dynamically updates the content without doing full reloads

   - Faster loading
   - Enhanced UX
   - Less SEO friendly

3. What are MPAs?

   A Multi-Page Application (MPA) is a traditional web application structure that consists of multiple HTML pages. Each user action, such as clicking a link or submitting a form, results in the loading of a new page from the server.

   - SEO Friendly
   - Full page reloads
   - More reliance on browser (multiple fetches)

4. What are 12-Factors to be considered for CloudNative Apps?

   Codebase, Dependencies, Configuration, Backing Services, Build Release Run, Processes, Port Binding, Concurrency, Disposability, Dev Prod Parity, Logs, Admin

> NOTE
>
> Microservices - Multiple APIs with single entypoint (API Gateway)
>
> Modulefederation - Feature introduced in Webpack 5, that allows multiple applications to share code. Helps in microfrontends.
>
> - Remote - exposing application
> - Host - consuming application

5. Different Rendering techinques

   | Rendering Technique                       | Description                                                                                                                                                                                                                                                                            | Example Framework/Library                                                                                                   |
   | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
   | **Client-Side Rendering (CSR)**           | The browser loads a minimal HTML file, and JavaScript is responsible for rendering the content dynamically. common in single-page applications (SPAs) and is suitable for highly interactive applications but can be less SEO-friendly due to delayed content loading.                 | **React** - A popular JavaScript library for building user interfaces, often used for CSR applications[1][2].               |
   | **Server-Side Rendering (SSR)**           | The server generates the complete HTML for a page on each request and sends it to the client. This method improves initial load times and SEO, as users receive fully rendered pages, but can increase server load due to dynamic content generation for every request.                | **Next.js** - A React framework that supports SSR, allowing developers to create server-rendered applications easily[1][6]. |
   | **Static Site Generation (SSG)**          | All pages are pre-built at build time into static HTML files, which are served directly to users. This technique offers fast performance and lower server overhead, making it ideal for content that doesn't change frequently, but it requires rebuilding the site to update content. | **Gatsby** - A React-based framework that enables SSG, creating fast static websites from React components[6].              |
   | **Incremental Static Regeneration (ISR)** | Similar to SSG, but allows for individual pages to be regenerated on demand when requested. This method combines the benefits of static generation with the ability to update content without a full rebuild, though it may lead to initial delays for first-time visitors.            | **Next.js** - Also supports ISR, allowing selective regeneration of static pages without a full rebuild[1][6].              |
   | **Edge Side Rendering (ESR)**             | Content is rendered at the edge of the network, closer to the user, which reduces latency and improves load times. This technique leverages CDN capabilities to serve dynamic content efficiently while maintaining good performance.                                                  | **Cloudflare Workers** - A platform that allows developers to run JavaScript at the edge, enabling ESR capabilities[6].     |
   | **Progressive Web App (PWA)**             | A web application that uses modern web capabilities to deliver an app-like experience. PWAs can leverage service workers for offline functionality and cache resources effectively, enhancing user experience across different devices and network conditions.                         | **Angular** - Offers tools and libraries to build PWAs with features like service workers and caching[2][3].                |

6. What is atomic design pattern?

   In atomic design pattern, we break down the entire aplication layout into smallest possible components called as Atoms. We make use of these atoms to build the web pages

   Introduced by brad frost in 2013

   5 stages

   | Sl No | Stage     | Description                               | Example                |
   | ----- | --------- | ----------------------------------------- | ---------------------- |
   | 1     | Atom      | Smallest possible component               | Button                 |
   | 2     | Molecule  | Couple of atoms form a molecule           | Search Bar with Button |
   | 3     | Organism  | Molecules combined together               | Header                 |
   | 4     | Templates | Page level object                         | Major chunk of a page  |
   | 5     | Page      | Entire page - made up of all other stages | Page                   |

   > Design tokens: Ref Razorpay's token. Colors, padding, margins

7. Explain how browser caches using http headers

   **Without using headers**

   When you request a resource, the first time it is requested it is downloaded from the server and browser caches the requested resource.

   When you request it again, it checks if the resources is in cache, then it will return from there else it will get it from server

   **Using headers**

   There are many headers that can be used to determine whether the resource is cached or not. These need to be set by the server

   ```
   Cache-control: max-age=86400;
   Expires:
   <!-- Time stamp when the cache should get purged -->

   ETag:
   <!-- Stands for entity tag. Changes everytime the resource is change in the server -->

   Last-Modified
   ```

   - request server
   - server sends the resources with the headers
   - next time it checks these headers and uses if it is not expired
   - if expired, makes call with Etag or Last-Modified

8. Explain browser caching using service workers without using http headers

   **Service workers**

   A service worker is code that runs in background, separate from webpage. It can intercept requests, cache files and serve them from cache.

   Key concepts:

   1. Installation phase: When it is registered, it goes through installation phase where we can pre-cache essential resources. (css, js, images)
   2. Fetch Events: service worker listens on fetch events. and decices where to serve the request from
   3. Caching Strategies:

      1. Cache first - check cache not found request

      2. Network first - get from n/w if fails serve cache

      3. Stale-While-Revalidate - serve from cache and fetch in bg. If there is new version, update both cache and view

   ```js
   const registerServiceWorker = async () => {
     if ("serviceWorker" in navigator) {
       try {
         const registration = await navigator.serviceWorker.register("/sw.js");
         console.log("Service worker registered:", registration);
       } catch (error) {
         console.error("Service worker registration failed:", error);
       }
     }
   };
   registerServiceWorker();

   // sw.js
   const CACHE_NAME = "my-cache-v1";
   const urlsToCache = [
     "/",
     "/index.html",
     "/styles.css",
     "/script.js",
     "/image.png",
   ];

   // Install event - cache resources
   self.addEventListener("install", (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME).then((cache) => {
         return cache.addAll(urlsToCache);
       })
     );
   });

   // Fetch event - respond with cached resource or fetch from network
   self.addEventListener("fetch", (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         // Return cached response if found, otherwise fetch from network
         return response || fetch(event.request);
       })
     );
   });
   ```

   **Advantages of Service Worker over HTTP**

   1. HTTP relies on server to set Cache-control, Last-Modified headers. Service worker it can decide what to cache
   2. HTTP only works online. Service workers offers offline support.
   3. HTTP is browser level. Service worker is more fine grained.

      | Feature                  | HTTP Caching                  | Service Workers Caching                  |
      | ------------------------ | ----------------------------- | ---------------------------------------- |
      | **Control**              | Limited (server headers)      | Full programmatic control                |
      | **Offline Support**      | No                            | Yes                                      |
      | **Caching Strategies**   | Static                        | Dynamic and customizable                 |
      | **Cache Management**     | Limited                       | Fine-grained and versioned               |
      | **Background Sync**      | No                            | Yes                                      |
      | **Push Notifications**   | No                            | Yes                                      |
      | **Performance**          | Depends on headers            | Optimized for repeat visits              |
      | **Server Dependency**    | Requires server configuration | No server dependency                     |
      | **Advanced Features**    | Limited                       | Preloading, A/B testing, dynamic caching |
      | **Cross-Origin Caching** | Tricky due to CORS            | More flexible                            |

9. What are core web vitals?

   - LCP - Largest contentful paint - Marks time at which largest text / image is painted. < 2.5 seconds
   - INP - Interaction to Next Paint - It assess responsiveness of the app to user interactions. INP of 200 milliseconds or less.
   - CLS - Cumulative Layout shift - To provide a good user experience, pages should maintain a CLS of 0.1. or less.

10. What is critical rendering path?

    Critical rendering path is the set of steps that browser follows to convert the HTML, CSS and JS code into pixels on the screen

    ```
    HTML → DOM → Render Tree → Layout → Paint → Compositing
          ↑
          CSS → CSSOM
    ```

    Using HTML, DOM is formed, where each node is an element
    Using CSS, CSSOM is formed. It needs to process all the css files (because it is render blocking).
    Render Tree includes the elements that are visible and in the document (removes `display: none`)
    Layout(Reflow) calculates the exact position of the elements
    Paint - Converts the render tree into pixels
    Composting - if there are overlapping layers, browser merges and forms a single layer
