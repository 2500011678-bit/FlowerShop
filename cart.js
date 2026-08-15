/* =========================================================
   FLOWER SHOP - SHOPPING CART
   localStorage
========================================================= */


const CART_KEY = "flowerShopCart";



/* =========================================================
   LẤY GIỎ HÀNG
========================================================= */

function getCart() {

    try {

        const cart = localStorage.getItem(CART_KEY);

        return cart ? JSON.parse(cart) : [];

    } catch (error) {

        console.error("Không thể đọc giỏ hàng:", error);

        return [];

    }

}



/* =========================================================
   LƯU GIỎ HÀNG
========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}



/* =========================================================
   FORMAT TIỀN
========================================================= */

function formatPrice(price) {

    return Number(price).toLocaleString("vi-VN") + "đ";

}



/* =========================================================
   CẬP NHẬT SỐ LƯỢNG TRÊN ICON GIỎ HÀNG
========================================================= */

function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const cartCount = document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent = totalQuantity;

        if (totalQuantity === 0) {

            cartCount.style.display = "none";

        } else {

            cartCount.style.display = "flex";

        }

    }

}



/* =========================================================
   THÔNG BÁO
========================================================= */

function showCartToast(message) {

    const toast = document.getElementById("cartToast");

    const toastText =
        document.getElementById("cartToastText");


    if (!toast) return;


    if (toastText) {

        toastText.textContent = message;

    }


    toast.classList.add("show");


    clearTimeout(window.cartToastTimer);


    window.cartToastTimer = setTimeout(
        () => {

            toast.classList.remove("show");

        },
        2200
    );

}



/* =========================================================
   THÊM SẢN PHẨM
========================================================= */

function addToCart(product) {

    const cart = getCart();


    const existingProduct = cart.find(
        item => item.id === product.id
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();


    showCartToast(
        `${product.name} đã được thêm vào giỏ hàng!`
    );

}



/* =========================================================
   XÓA SẢN PHẨM
========================================================= */

function removeFromCart(productId) {

    let cart = getCart();


    cart = cart.filter(
        item => item.id !== productId
    );


    saveCart(cart);

    updateCartCount();


    if (
        typeof renderCart === "function"
    ) {

        renderCart();

    }

}



/* =========================================================
   TĂNG SỐ LƯỢNG
========================================================= */

function increaseQuantity(productId) {

    const cart = getCart();


    const product = cart.find(
        item => item.id === productId
    );


    if (!product) return;


    product.quantity += 1;


    saveCart(cart);

    updateCartCount();


    if (
        typeof renderCart === "function"
    ) {

        renderCart();

    }

}



/* =========================================================
   GIẢM SỐ LƯỢNG
========================================================= */

function decreaseQuantity(productId) {

    const cart = getCart();


    const product = cart.find(
        item => item.id === productId
    );


    if (!product) return;


    if (product.quantity > 1) {

        product.quantity -= 1;

    } else {

        removeFromCart(productId);

        return;

    }


    saveCart(cart);

    updateCartCount();


    if (
        typeof renderCart === "function"
    ) {

        renderCart();

    }

}



/* =========================================================
   XÓA TOÀN BỘ GIỎ
========================================================= */

function clearCart() {

    localStorage.removeItem(CART_KEY);

    updateCartCount();


    if (
        typeof renderCart === "function"
    ) {

        renderCart();

    }

}



/* =========================================================
   TỔNG SỐ LƯỢNG
========================================================= */

function getTotalQuantity() {

    const cart = getCart();


    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

}



/* =========================================================
   TỔNG TIỀN
========================================================= */

function getCartTotal() {

    const cart = getCart();


    return cart.reduce(
        (total, item) => {

            return total +
                (item.price * item.quantity);

        },
        0
    );

}



/* =========================================================
   BẮT SỰ KIỆN NÚT THÊM GIỎ
========================================================= */

function initAddToCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".shop-buy-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const product = {

                    id: this.dataset.id,

                    name: this.dataset.name,

                    price: Number(
                        this.dataset.price
                    ),

                    image: this.dataset.image

                };


                addToCart(product);

            }
        );

    });

}



/* =========================================================
   KHỞI TẠO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        initAddToCartButtons();

    }
);



/* =========================================================
   CẬP NHẬT KHI TAB KHÁC THAY ĐỔI LOCAL STORAGE
========================================================= */

window.addEventListener(
    "storage",
    function () {

        updateCartCount();


        if (
            typeof renderCart === "function"
        ) {

            renderCart();

        }

    }
);
