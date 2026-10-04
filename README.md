# Addis Eats 🍽️

Addis Eats is a responsive food-ordering web application built with React.

The project simulates a modern food-ordering experience in Addis Ababa, allowing customers to browse dishes, search and filter the menu, manage a persistent shopping cart, place orders, save favorites, view order history, and see estimated delivery times.

The application also includes an admin panel for managing dishes, dish availability, customer orders, and basic sales analytics.

## Features

### Customer Features

* Browse a menu of 38 dishes
* Search dishes instantly
* Filter dishes by category
* View individual dish details
* Quick-view dishes
* Add dishes to the cart
* Increase and decrease item quantities
* Remove items from the cart
* Persistent cart using localStorage
* Live cart badge count
* Live ETB totals
* Favorites / wishlist
* Persistent favorites
* Checkout form
* Checkout validation
* Special delivery instructions
* Delivery fee calculation
* Estimated delivery time
* Order confirmation receipt
* Order history
* Reorder previous orders
* Dark and light theme
* Persistent theme preference
* Skeleton loading states
* Loading, empty, and error states
* Responsive design
* Keyboard accessibility
* ETB currency formatting

### Dish Availability

Each dish has an availability status.

Administrators can enable or disable dishes from the admin menu manager.

When a dish is disabled:

* It remains visible to customers
* It is marked as unavailable
* Customers cannot add it to the cart
* Customers cannot order it

### Admin Features

* Protected admin login
* Admin dashboard
* Revenue overview
* Total order count
* Average order value
* Top-selling dishes
* Order-status statistics
* Add dishes
* Edit dishes
* Delete dishes
* Search admin menu items
* Enable or disable dish availability
* Persistent admin menu data
* View customer orders
* View order details
* Update order status
* Delete orders
* Return to the customer application
* Dark and light theme support

## Routes

### Customer Routes

| Route        | Page           |
| ------------ | -------------- |
| `/`          | Home           |
| `/menu`      | Full Menu      |
| `/menu/:id`  | Dish Details   |
| `/cart`      | Shopping Cart  |
| `/checkout`  | Checkout       |
| `/favorites` | Favorites      |
| `/orders`    | Order History  |
| `/login`     | Customer Login |
| `/receipt`   | Order Receipt  |

### Admin Routes

| Route           | Page             |
| --------------- | ---------------- |
| `/admin/login`  | Admin Login      |
| `/admin`        | Dashboard        |
| `/admin/menu`   | Menu Management  |
| `/admin/orders` | Order Management |

## Technologies Used

* React
* React Router
* JavaScript
* Zustand
* Zustand Persist Middleware
* Vite
* CSS
* localStorage
* sessionStorage

## Project Structure

```text
Addis-Eats-React/
│
├── public/
│   ├── dishes.json
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── admin/
│   │   ├── AdminLayout.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DishForm.jsx
│   │   ├── DishManager.jsx
│   │   ├── OrderManager.jsx
│   │   ├── RequireAdmin.jsx
│   │   └── useAdminAuth.js
│   │
│   ├── api/
│   │   └── orders.js
│   │
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   ├── RequireAuth.jsx
│   │   └── useAuth.js
│   │
│   ├── cart/
│   │   ├── Cart.jsx
│   │   ├── CartBadge.jsx
│   │   └── cartStore.js
│   │
│   ├── checkout/
│   │   ├── Checkout.jsx
│   │   ├── Field.jsx
│   │   └── validate.jsx
│   │
│   ├── favorites/
│   │   ├── Favorites.jsx
│   │   └── favoriteStore.js
│   │
│   ├── hooks/
│   │   └── useFetch.js
│   │
│   ├── menu/
│   │   ├── CategoryBar.jsx
│   │   ├── Dish.jsx
│   │   ├── DishDetail.jsx
│   │   ├── DishItem.jsx
│   │   ├── DishList.jsx
│   │   └── Menu.jsx
│   │
│   ├── orders/
│   │   ├── Orders.jsx
│   │   └── orderStore.js
│   │
│   ├── theme/
│   │   ├── ThemeContext.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── ui/
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   └── Skeleton.jsx
│   │
│   ├── utils/
│   │   ├── estimateDeliveryTime.js
│   │   └── formatCurrency.js
│   │
│   ├── App.jsx
│   ├── ErrorBoundary.jsx
│   ├── Home.jsx
│   ├── index.css
│   ├── Layout.jsx
│   ├── Login.jsx
│   ├── main.jsx
│   ├── NotFound.jsx
│   ├── Receipt.jsx
│   └── ScrollToTop.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── PROFILE.md
├── README.md
└── vite.config.js
```

## Menu Data

The menu currently contains 38 dishes across several categories:

* Ethiopian
* Pizza
* Burgers
* International
* Breakfast
* Drinks

Each dish can contain information such as:

* Name
* Amharic name
* Description
* Ingredients
* Price
* Category
* Fasting status
* Spice level
* Preparation time
* Special status
* Availability
* Image

Menu data is initially loaded from `public/dishes.json`.

Administratively modified menu data is persisted in browser storage.

## State Management

Zustand is used for application state that needs to be shared across components.

### Cart Store

The cart store manages:

* Cart items
* Item quantities
* Adding items
* Increasing quantities
* Decreasing quantities
* Removing items
* Clearing the cart
* Persistent cart data

### Order Store

The order store manages:

* Customer orders
* Order history
* Order status
* Order updates
* Reordering
* Persistent order data

### Favorites

Favorites are managed with a dedicated Zustand store and persisted locally.

### Theme

The application uses a theme context to manage the current light/dark theme and a theme toggle for switching between them.

## Authentication

Customer authentication is handled through the authentication context and protected routes.

Checkout is protected so that a customer must be signed in before completing an order.

The admin section uses a separate admin authentication flow.

## Loading, Empty, and Error States

The application provides feedback for different application states, including:

* Menu loading
* Skeleton menu loading
* Empty search results
* Empty category results
* Empty cart
* Empty favorites
* Empty order history
* Menu loading errors
* Invalid or unavailable content
* Application/component errors through an error boundary

## Accessibility

Accessibility improvements include:

* Skip-to-content navigation
* Keyboard-operable controls
* Visible focus states
* Accessible navigation labels
* Descriptive button labels
* Keyboard-accessible modal dialogs
* Tab and Shift+Tab focus handling
* Escape-key modal closing
* Responsive layouts for different screen sizes

## Responsive Design

The application is designed for desktop, tablet, and mobile screen sizes.

Responsive styling covers:

* Navigation
* Menu cards
* Search and category controls
* Cart
* Checkout
* Favorites
* Order history
* Modals
* Admin dashboard
* Admin forms
* Admin order management

## Currency

All prices and order totals are displayed in Ethiopian Birr (ETB).

Currency formatting is handled through the reusable `formatCurrency` utility.

## Delivery Estimation

The application calculates an estimated delivery time using:

* Dish preparation time
* A delivery-time range

The estimated delivery time is shown during checkout and stored with the order.

## Admin Dashboard

The admin dashboard provides an overview of order and sales data, including:

* Total revenue
* Number of orders
* Average order value
* Top-selling dishes
* Order status counts

## Admin Login

For demonstration purposes, the admin panel currently uses:

```text
Username: admin
Password: admin123
```

This authentication system is intended for a frontend training project and is not production-grade authentication.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Build Verification

The project can be verified with:

```bash
npm run build
```

The production build currently completes successfully with Vite.

## Project Purpose

Addis Eats was developed as part of the React / Next.js training module.

The project demonstrates practical use of:

* Component-based React development
* React Router
* Feature-based project organization
* Shared state management
* Zustand
* Persistent browser storage
* Context API
* Form handling and validation
* Conditional rendering
* Loading and skeleton states
* Empty and error states
* Authentication and protected routes
* Responsive UI development
* Accessibility
* Customer ordering workflows
* Admin management workflows

### Next work:
[] Sign-in/Sign-out feature for user
[] Deploy it
