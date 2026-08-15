```javascript
/* =====================================================
   FLOWER SHOP - CART.JS
   DÙNG CHUNG CHO SHOP.HTML + GIOHANG.HTML
===================================================== */


/* =====================================================
   LẤY GIỎ HÀNG
===================================================== */

function getCart() {

    const savedCart =
        localStorage.getItem("flowerCart");

    if (!savedCart) {
        return [];
    }

    try {

        const cart = JSON.parse(savedCart);

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "Không thể đọc giỏ hàng:",
            error
        );

        return [];

    }

}


/* =====================================================
   LƯU GIỎ HÀNG
===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "flowerCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   CẬP NHẬT SỐ TRÊN ICON GIỎ HÀNG
===================================================== */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        function (total, item) {

            return total +
                Number(item.quantity || 0);

        },
        0
    );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent = count;

    }

}


/* =====================================================
   THÔNG BÁO TRÊN SHOP
===================================================== */

function showCartToast(message) {

    const toast =
        document.getElementById("cartToast");

    const toastText =
        document.getElementById("cartToastText");


    if (!toast || !toastText) {
        return;
    }


    toastText.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.cartToastTimer
    );


    window.cartToastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
   THÊM SẢN PHẨM VÀO GIỎ
===================================================== */

function addToCart(button) {

    const id =
        button.dataset.id;

    const name =
        button.dataset.name;

    const price =
        Number(button.dataset.price);

    const image =
        button.dataset.image;


    /* Kiểm tra dữ liệu */

    if (
        !id ||
        !name ||
        !price ||
        !image
    ) {

        console.error(
            "Sản phẩm thiếu dữ liệu:",
            {
                id,
                name,
                price,
                image
            }
        );

        return;

    }


    /* Lấy giỏ hàng hiện tại */

    const cart = getCart();


    /* Kiểm tra sản phẩm đã tồn tại */

    const existingProduct =
        cart.find(
            function (item) {

                return item.id === id;

            }
        );


    if (existingProduct) {

        /* Nếu đã có → tăng số lượng */

        existingProduct.quantity += 1;

    }
    else {

        /* Nếu chưa có → thêm mới */

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image,

            type: "HOA TƯƠI",

            quantity: 1

        });

    }


    /* Lưu */

    saveCart(cart);


    /* Cập nhật số */

    updateCartCount();


    /* Thông báo */

    showCartToast(
        `"${name}" đã được thêm vào giỏ hàng!`
    );

}


/* =====================================================
   GẮN SỰ KIỆN CHO CÁC NÚT THÊM GIỎ
===================================================== */

function setupCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".shop-buy-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    addToCart(this);

                }
            );

        }
    );

}


/* =====================================================
   KHỞI ĐỘNG
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        setupCartButtons();

    }
);
```
