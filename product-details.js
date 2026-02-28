const PRODUCT_DATA = {
	"item-1": {
		id: "item-1",
		name: "Iced Favorites Coffee",
		price: 150,
		description: "Description: Enter into the world of caffeine and taste the magic",
		image: "image copy 7.png"
	},
	"item-2": {
		id: "item-2",
		name: "Velvet Drip Coffee",
		price: 180,
		description: "Description: Rich aroma brewed to perfection",
		image: "image copy 8.png"
	},
	"item-3": {
		id: "item-3",
		name: "Morning Haze Coffee",
		price: 220,
		description: "Description: Start your day with smooth bold flavor",
		image: "image copy 9.png"
	},
	"item-4": {
		id: "item-4",
		name: "Caramel Breeze Coffee",
		price: 260,
		description: "Description: Smooth caramel notes with a rich café finish",
		image: "image copy 10.png"
	},
	"item-5": {
		id: "item-5",
		name: "Classic Roast Coffee",
		price: 300,
		description: "Description: Signature roast with bold aroma and deep flavor",
		image: "image copy 6.png"
	}
};

const CART_STORAGE_KEY = "awebzoneCart";
let selectedItemId = "item-1";

function getStoredCart() {
	try {
		const raw = localStorage.getItem(CART_STORAGE_KEY);
		if (!raw) {
			return [];
		}
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		return [];
	}
}

function saveCart(cartItems) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

function addSelectedItemToCart() {
	const selectedProduct = PRODUCT_DATA[selectedItemId];
	if (!selectedProduct) {
		return;
	}

	const cartItems = getStoredCart();
	const existingItem = cartItems.find((item) => item.id === selectedProduct.id);

	if (existingItem) {
		existingItem.qty += 1;
	} else {
		cartItems.push({
			id: selectedProduct.id,
			name: selectedProduct.name,
			description: selectedProduct.description,
			price: selectedProduct.price,
			image: selectedProduct.image,
			qty: 1
		});
	}

	saveCart(cartItems);
	window.location.href = "cart.html";
}

function updateProductInfo(itemId) {
	const product = PRODUCT_DATA[itemId];
	if (!product) {
		return;
	}

	selectedItemId = itemId;

	const nameEl = document.getElementById("productName");
	const priceEl = document.getElementById("productPrice");
	const descEl = document.getElementById("productDesc");

	if (nameEl) {
		nameEl.textContent = product.name;
	}
	if (priceEl) {
		priceEl.textContent = `Price: ${product.price}₹`;
	}
	if (descEl) {
		descEl.textContent = product.description;
	}
}

function syncCarouselCards() {
	Object.keys(PRODUCT_DATA).forEach((itemId, index) => {
		const cardImage = document.querySelector(`#img-${index + 1} img`);
		const product = PRODUCT_DATA[itemId];
		if (!cardImage || !product) {
			return;
		}

		cardImage.src = product.image;
		cardImage.alt = product.name;
	});
}

document.addEventListener("DOMContentLoaded", () => {
	syncCarouselCards();

	const sliderItems = document.querySelectorAll('input[name="slider"]');

	sliderItems.forEach((item) => {
		item.addEventListener("change", () => {
			if (item.checked) {
				updateProductInfo(item.id);
			}
		});
	});

	const defaultItem = document.querySelector('input[name="slider"]:checked');
	if (defaultItem) {
		updateProductInfo(defaultItem.id);
	}

	const addToCartBtn = document.getElementById("addToCartBtn");
	if (addToCartBtn) {
		addToCartBtn.addEventListener("click", addSelectedItemToCart);
	}
});

