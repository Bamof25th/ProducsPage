
Done ✅:  GitHub => https://github.com/Bamof25th/ProducsPage Link => https://producs-page-2.vercel.app/

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


 * Limitations:
   
 1. App does not use search optimizations like debounce and lazy loading.
 2. App does not have a product detail page.
 3. We could have used revalidation to update the data on the client side if we had a real api.
 4. We could have used 12 products in a single page a s limit to perfect the ui/ux.
 5. Using redux is not required for this small app could  have used contextAPI instead.  


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

* Functional Requirement :

1. Use https://dummyjson.com/docs to find JSON contract for fetching products and product categories.

2. Display all categories and make it selectable (single-select).

3. Show products for the selected category otherwise show products from all categories when no category selected.

1. While fetching products use pagination parameter and keep size 10.

(If given combination has 50 products we need to show all products in the single page without UI pagination but instead of fetching all products at once we have to fetch the data in batches i.e first 1-10 then 11 - 20.. so on and display whichever is fetched till now)

4. Implement Search for the products.

5. List down if there are any limitations of your app as comments in “App.js”.

Technical Requirement:

1. Use only functional components.

2. Use Redux to store and retrieve product and category data.

3. Selected Category and search input should be stored as queryparams

4. Good UI and UX will brownie.






