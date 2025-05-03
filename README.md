# 🏍️ Bike Shop Application

A full-featured, responsive Bike Shop application with secure user authentication, product management, order tracking, and a clean UI/UX experience. Built with a role-based access system for Customers and Admins.

## 🚀 Project Overview & Objective

This application is designed to offer:
- Seamless user registration and authentication
- Public access to bike listings and details
- Private checkout and dashboard access
- Full admin management functionality
- A clean, responsive UI/UX with loading states and toast notifications

---



### 1. 🔐 User Registration & Authentication (Role-Based)

- **Registration Fields**: name, email, password
- Default role: `customer` (manually upgradeable to `admin`)
- Passwords securely hashed before storage
- **Login** with email and password
- **JWT Token**:
  - Generated on successful login
  - Stored in local storage to maintain sessions
- **Logout**:
  - Clears JWT from local storage
  - Redirects to the login page

---

### 2. 🌐 Public Routes

#### 🏠 Home Page

- **Navbar**: Logo, favicon, navigation links, login/signup buttons
- **Banner**: Hero section with carousel (optional)
- **Featured Products**: Display up to 6 products with "View All" option
- **Extra Section**: Testimonials, blog snippets, etc.
- **Footer**: Links, social media icons, contact details

#### 🛍️ All Products Page

- **Search**: Filter by brand, name, or category
- **Filters**: Price range, model, brand, category, availability
- **Dynamic Results**: Realtime updates as filters/search are used
- **Product Cards**: Display name, brand, model, price, category
- **View Details**: Button to navigate to product detail page

#### 📦 Product Details Page

- Detailed info with large image
- **Buy Now** button → Redirects to checkout

#### ℹ️ About Page

- Info about the shop, team, and mission

---

### 3. 🔒 Private Routes

#### 🧾 Checkout Page

- Place orders securely
- Stock validation before placing order
- **Order Form**: User info, product summary, total, payment method
- **Payment Integration**: SurjoPay
- **Order Now** button finalizes purchase

#### 🛠️ Dashboard (Role-Based)

- **Admin Dashboard**:
  - Manage users (e.g., deactivate accounts)
  - Manage products (Create, Read, Update, Delete)
  - Manage orders (CRUD)
- **User Dashboard**:
  - View past orders
  - Update profile
  - Change password (requires current password)

---

## 🎨 UI/UX Design (15 Marks)

### ✅ Responsive Design

- Works on all screen sizes
- Clean layouts, consistent typography, intuitive navigation

### ⚠️ Error Handling

- Friendly messages for:
  - Invalid login
  - Duplicate registration
  - Failed operations (e.g., out-of-stock)

### 🔄 Loading States

- Show loaders/spinners during data fetching and login

### 🔔 Toast Notifications

- Examples:
  - "Login Successful"
  - "Order Placed"
  - "Product Updated"

---

## 💡 Optional: Order Tracking System

### 👤 User Side

- **Track Order Status**: Pending → Processing → Shipped → Delivered
- **Progress Bar or Step Indicator**
- **Order Tracking Page**:
  - Order ID
  - Product name, quantity, price
  - Estimated delivery date
  - Current status

### 👨‍💼 Admin Side

- **Update Order Status**:
  - Dropdown menu to set status
  - Field for estimated delivery date
- Changes instantly reflect for users

---

## 📁 Project Setup (Optional Section)

```bash
# Clone the repository
git clone https://github.com/shahid66/bike-frontend.git
cd bike-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
