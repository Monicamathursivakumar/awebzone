# aWebZone Cafe ☕

A frontend coffee shop website built with **HTML, CSS, and JavaScript**.

This project includes a complete user journey:
- Landing page
- Login / signup
- Product discovery
- Product details + add to cart
- Cart management with quantity controls
- Payment method selection
- Method-specific checkout pages
- About / contact / feedback section

---

## ✨ Features

- Responsive UI across major pages
- Animated interactions powered by GSAP (loaded dynamically)
- Product carousel with live product detail updates
- Cart persistence using browser `localStorage`
- Shipping address persistence across checkout pages
- Multiple payment options:
  - GPay
  - PhonePe
  - Card
  - Internet Banking
- Star-based feedback interaction on About page

---

## 🧱 Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts
- GSAP (CDN-loaded at runtime)

---

## 📂 Project Structure

```text
webzone/
├── index.html                 # Landing page
├── auth.html                  # Login / signup page
├── success.html               # Signup success page
├── products.html              # Product listing and latest arrivals
├── product-details.html       # Product carousel + buy/add-to-cart
├── product-details.js         # Product data + cart add logic
├── product-details.css        # Styling for product details page
├── cart.html                  # Cart page with quantity + total + shipping
├── payment.html               # Payment method chooser
├── gpay.html                  # GPay payment view
├── phonepe.html               # PhonePe payment view
├── card-payment.html          # Card payment view
├── internet-banking.html      # Internet banking payment view
├── about.html                 # About + contact + rating + feedback
├── style.css                  # Shared styles (landing/auth and common)
├── products.css               # Additional products styles (if used)
└── script.js                  # Shared animation and interaction logic
```

> Note: The pages reference multiple image files (e.g., `image copy 7.png`, `image copy 11.png`, QR image, etc.). Keep all referenced images in the same directory or update paths.

---

## 🚀 How to Run

Because this is a static frontend project, no build step is required.

### Option 1: Open directly
1. Open `index.html` in your browser.

### Option 2: Run a local server (recommended)
Using VS Code Live Server or any static server gives better consistency.

Example with Python:
```bash
python -m http.server 5500
```
Then open:
```text
http://localhost:5500/index.html
```

---

## 🔁 User Flow

1. **Home** (`index.html`) → click start/login
2. **Auth** (`auth.html`) → Sign up
3. **Success** (`success.html`) → Continue
4. **Products** (`products.html`) → open best collections
5. **Product Details** (`product-details.html`) → add item to cart
6. **Cart** (`cart.html`) → adjust quantity + add shipping address
7. **Payment Selection** (`payment.html`) → choose method
8. **Payment Method Page** (`gpay.html`, `phonepe.html`, `card-payment.html`, `internet-banking.html`)
9. Continue shopping, logout, or share feedback

---

## 💾 Local Storage Keys Used

The application stores state in the browser using:

- `awebzoneCart`
  - Array of cart items with:
    - `id`
    - `name`
    - `description`
    - `price`
    - `image`
    - `qty`

- `awebzoneShippingAddress`
  - String shipping address entered on cart page

To reset app state, clear these keys from browser storage.

---

## 📄 Page Details

### `index.html`
- Brand hero section and entry point to login/signup.

### `auth.html`
- Login/signup UI (demo flow) with redirect to success page.

### `success.html`
- Visual success confirmation and route into products.

### `products.html`
- Hero with product cards and latest arrivals section.

### `product-details.html` + `product-details.js`
- Radio-based product carousel.
- Product name/price/description update based on selected item.
- Add-to-cart logic with quantity merge if same product exists.

### `cart.html`
- Renders cart from storage.
- Quantity increment/decrement.
- Remove item.
- Live total calculation.
- Shipping address auto-save and reuse.

### `payment.html`
- Payment method chooser page with navigation to specific method pages.

### Payment method pages
- `gpay.html`
- `phonepe.html`
- `card-payment.html`
- `internet-banking.html`

All these pages:
- Display stored shipping address.
- Offer continue shopping, logout, and feedback actions.

### `about.html`
- About section content.
- Contact fields.
- Clickable star rating.
- Feedback textarea and submit alert.

---

## ⚠️ Current Limitations

- Authentication is UI-only (no backend validation).
- Payments are simulation pages (no real payment gateway integration).
- Total amount shown on method pages is currently static text (`1234`) and not synced from cart total.
- Form submissions (contact/feedback) are not persisted to backend.

---

## ✅ Suggested Improvements

- Integrate backend for auth and session handling.
- Persist orders and payment status.
- Pass dynamic cart total to all payment method pages.
- Add form validation for contact and signup fields.
- Add toast notifications instead of `alert` for better UX.
- Add tests for core cart and product logic.

---

## 👩‍💻 Authoring Notes

- Designed as a beginner-friendly static ecommerce-style demo.
- Easy to customize colors, content, and product data.
- Best suited for portfolio/demo usage and frontend learning.

---

## 📜 License

No explicit license file is currently included.
If you plan to share or publish this project, add a `LICENSE` file (for example MIT).
