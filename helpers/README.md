# 4th feb

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

   - Codebase: Maintain a single codebase for multiple deployments
   - Dependencies: Explicitly declare and isolate all dependencies
   - Configuration: Store configuration settings in the environment
   - Backing Services: Treat backing services (like databases and message queues) as attached resources that can be accessed via URLs or other locators stored in the configuration.
   - Build, Release, Run: Separate the build, release, and run stages of the application to streamline deployment processes and minimize errors.
   - Processes: Execute the application as one or more stateless processes. Any required data should be stored in a stateful backing service rather than within the application itself.
   - Port Binding: Export services via port binding, allowing the application to act as a standalone service that can listen for incoming requests without needing an external web server.
   - Concurrency: Scale applications horizontally by running multiple instances of stateless processes to handle increased load effectively.
   - Disposability: Design applications for fast startup and graceful shutdown to enhance resilience and facilitate easy scaling.
   - Dev/Prod Parity: Keep development, staging, and production environments as similar as possible to reduce discrepancies that could lead to bugs during deployment.
   - Logs: Treat logs as event streams that can be aggregated and analyzed separately from the application’s execution environment.
   - Admin Processes: Run administrative tasks as one-off processes from a machine running the latest production code, ensuring they are version-controlled alongside the application.

> NOTE
>
> Microservices - Multiple APIs with single entypoint
>
> Modulefederation - Make use of single webpack for multiple apps - introduced in webpack 5 useful for microfrontends
