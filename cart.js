```javascript
/* =====================================================
   FLOWER SHOP - CART.JS
   DÙNG CHO SHOP.HTML
===================================================== */

(function () {

    "use strict";


    /* =====================================================
       LẤY GIỎ HÀNG
    ===================================================== */

    function getCart() {

        try {

            const data =
                localStorage.getItem("flowerCart");

            if (!data) {
                return [];
            }

            const cart = JSON.parse(data);

            return Array.isArray(cart)
                ? cart
                : [];

        } catch (error) {

            console.error(
                "Lỗi đọc flowerCart:",
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
       CẬP NHẬT SỐ LƯỢNG TRÊN ICON
    ===================================================== */

    function updateCartCount() {

        const cart = getCart();

        let count = 0;


        cart.forEach(function (item) {

            count += Number(
                item.quantity || 0
            );

        });


        const cartCount =
            document.getElementById("cartCount");


        if (cartCount) {

            cartCount.textContent = count;

        }

    }


    /* =====================================================
       HIỂN THỊ THÔNG BÁO
    ===================================================== */

    function showToast(message) {

        const toast =
            document.getElementById("cartToast");

        const toastText =
            document.getElementById(
                "cartToastText"
            );


        if (!toast || !toastText) {
            return;
        }


        toastText.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.flowerCartToastTimer
        );


        window.flowerCartToastTimer =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 2500);

    }


    /* =====================================================
       THÊM SẢN PHẨM
    ===================================================== */

    function addProductToCart(button) {

        /* Lấy dữ liệu từ data-* */

        const id =
            button.getAttribute("data-id");

        const name =
            button.getAttribute("data-name");

        const price =
            Number(
                button.getAttribute("data-price")
            );

        const image =
            button.getAttribute("data-image");


        console.log(
            "Đang thêm sản phẩm:",
            {
                id,
                name,
                price,
                image
            }
        );


        /* Kiểm tra */

        if (!id || !name || !price || !image) {

            console.error(
                "Thiếu dữ liệu sản phẩm.",
                {
                    id,
                    name,
                    price,
                    image
                }
            );

            alert(
                "Sản phẩm đang thiếu dữ liệu. Vui lòng kiểm tra lại code sản phẩm."
            );

            return;

        }


        /* Lấy giỏ hiện tại */

        const cart = getCart();


        /* Tìm sản phẩm */

        const existingProduct =
            cart.find(function (item) {

                return String(item.id) ===
                    String(id);

            });


        /* Nếu đã có */

        if (existingProduct) {

            existingProduct.quantity =
                Number(
                    existingProduct.quantity || 0
                ) + 1;

        }


        /* Nếu chưa có */

        else {

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


        /* Cập nhật số lượng */

        updateCartCount();


        /* Thông báo */

        showToast(
            "Đã thêm \"" +
            name +
            "\" vào giỏ hàng!"
        );


        console.log(
            "Giỏ hàng hiện tại:",
            cart
        );

    }


    /* =====================================================
       GẮN SỰ KIỆN CHO NÚT THÊM GIỎ
    ===================================================== */

    function initCartButtons() {

        const buttons =
            document.querySelectorAll(
                ".shop-buy-button"
            );


        console.log(
            "Tìm thấy",
            buttons.length,
            "nút thêm giỏ hàng."
        );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    addProductToCart(
                        this
                    );

                }
            );

        });

    }


    /* =====================================================
       KHỞI ĐỘNG
    ===================================================== */

    function init() {

        updateCartCount();

        initCartButtons();

    }


    /* =====================================================
       CHẠY SAU KHI HTML ĐÃ TẢI
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


})();
```
