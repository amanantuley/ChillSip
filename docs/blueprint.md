# **App Name**: ChillSip

## Core Features:

- Home Page Showcase: Display featured cold drinks, brand highlights, and customer testimonials on the home page with 'Explore Drinks' and 'Order Now' CTAs.
- Product Catalog: Showcase a grid of cold drinks on the Products page, including image, name, price, flavor, and an 'Add to Cart' button. Products are dynamically fetched from Firestore, with category filtering.
- Detailed Product Views: Present detailed information for each product on its dedicated page, including a large image, description, ingredients, price, and quantity selector, along with an 'Add to Cart' button.
- User Authentication: Implement Firebase Authentication for user login and signup, including Google sign-in. User data will be stored in the Firestore 'users' collection.
- Shopping Cart: Enable users to view selected items, update quantities, see the total price, and proceed to checkout via the 'Place Order' button.
- Order Processing: Streamline the checkout process with a simple form and save order details to the Firestore 'orders' collection.
- Content Generation Tool: Generative AI tool uses the provided specifications to automatically generate detailed product descriptions for each drink.
- Admin Panel: Provide a secure admin login to add, edit, and delete drinks, as well as view a list of orders, with data fetched from Firestore.

## Style Guidelines:

- Primary color: Vibrant cyan (#48cae4) to evoke freshness and a summery mood.
- Background color: Very light cyan (#e0fbfc), nearly white, for a clean and airy feel.
- Accent color: Lemon yellow (#f0db4f) for CTAs and interactive elements, providing a pop of energy.
- Body and headline font: 'Poppins' for a clean, modern and readable style throughout the site.
- Use custom icons to represent drink categories and brand highlights.
- Mobile-first approach with a grid-based layout.
- Smooth transition effects, especially on hover and product interactions.