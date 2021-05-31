'use strict';

$('#bannerCarousel').owlCarousel({
    loop: true,
    nav: false,
    items: 1,
});

$('#itemsCarousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    slideBy: 4,
    items: 4,
});

$('#productsCarousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsive: {
        0:{
            items:1
        },
        440:{
            items: 2
        },
        700:{
            items: 3
        },
        1100:{
            items: 4,
        }
    }
});

$('#pdpCarousel').owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    margin: 12,
    slideBy: 1,
    items: 3,
});

$('#fullImgCarousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    margin: 0,
    slideBy: 1,
    items: 1,
});

// Toggle modal form
function toggleModal() {
    const loginModal = document.querySelector('#loginModal');
    const loginBtn = document.querySelector('#loginBtn');
    // Open the modal 
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    // Close the modal
    document.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
toggleModal();
// Show password
function showPass() {
    const passBtn = document.querySelector('#passBtn'),
    passField = document.querySelector('#passField');
    function isPassField() {
        if (passField.type === "password") {
            passField.type = "text";
        } else {
            passField.type = "password";
        }
    }; 
    passBtn.addEventListener('click', isPassField);
}
showPass();

// Add goods to cart
function addToCart() {
    const cartCounts = document.querySelector('#cartCounts'),
    addToCartBtn = document.querySelector('#addToCartBtn'),
    productsItems = document.querySelector('#productsItems');
    let clicksCount = 0;
    function initiateClicks() {
        let clickNum = localStorage.getItem('items');
        if(clickNum == undefined){
            localStorage.setItem('items', 0);
            clicksCount = 0;
        }else{
            clicksCount = parseInt(clickNum);   
        }
        cartCounts.innerHTML = clicksCount;
    }
    if (productsItems !== null) {
        productsItems.addEventListener('click', (e) => {
            if (e.target.className === 'plus-button' || e.target.parentElement.className === 'plus-button') {
                clicksCount += 1;
                localStorage.setItem('items', clicksCount);
                cartCounts.innerHTML = clicksCount;
            }
        });
    }
    initiateClicks();
    let nums = 0;
    if (addToCartBtn !== null) {
        addToCartBtn.addEventListener('click', (e) => {
            if (e.target.className === 'add-to-cart-btn') {
                nums = numField.value;
                let numsCount = parseInt(nums);
                let sum = numsCount + clicksCount;
                localStorage.setItem('items', sum);
                cartCounts.innerHTML = sum;
            }
        });
    }
}
addToCart();
// Add goods to wish-list
function addToWish() {
    const wishCounts = document.querySelector('#wishCounts'),
    productsItems = document.querySelector('#productsItems');
    let hearts = 0;
    function initiateHearts() {
        let heartNum = localStorage.getItem('hearts');
        if(heartNum == undefined){
            localStorage.setItem('hearts', 0);
            hearts = 0;
        }else{
            hearts = parseInt(heartNum);   
        }
        wishCounts.innerHTML = hearts;
    }
    if (productsItems !== null) {
        productsItems.addEventListener('click', (e) => {
            if (e.target.className === 'heart-button' || e.target.parentElement.className === 'heart-button') {
                hearts += 1;
                localStorage.setItem('hearts', hearts);
                wishCounts.innerHTML = hearts;
            }
        });
    }
    initiateHearts();
}
addToWish();
// Get year
function getYear() {
    const year = document.querySelector('#year');
    let today = new Date();
    let yearAct= today.getFullYear();
    year.innerHTML = yearAct;
}
getYear();
// Hide filter
function hideFilter() {
    const toggleFilter = document.querySelector('.toggle-filter'),
    formBlock = document.querySelector('.filter-form-block');
    if (toggleFilter !== null) {
        toggleFilter.addEventListener('click', () => {
            formBlock.classList.toggle('hidden');
        });
    }
}
hideFilter();

// Load more button
function loadMoreBtn() {
    const loadItems = document.querySelector('#loadItems'),
    productsItems = document.querySelector('#productsItems');
    let num = 0;
    function addProducts(arg) {
        let block = '';
        let start = num > 0 ? 4 * num : num;
        let end = start + 4;
        for (let i = start; i < end; i++) {
            block += '<div class="product-item hover">' +
            '<div class="buttons-block">' +
                '<button class="plus-button"><i class="fas fa-plus"></i></button>' +
                '<button class="heart-button"><i class="fas fa-heart"></i></button>' +
            '</div>' +
            '<div class="img-block">' +
                '<img src="'+arg[i].image+'" alt="item">' +
            '</div>' +
            '<div class="text-block">' +
                '<span class="text">' + arg[i].text + '</span>' +
                '<span class="price">' + arg[i].price + '</span>' +
            '</div>' +
            '</div>';
        }
        num++;
        if (start >= arg.length - 4) {
            loadItems.classList.add('hidden')
        }
        productsItems.insertAdjacentHTML('beforeend', block);
    }
    function loadProducts() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://pamila10.github.io/osf-academy-frontend-liudmyla-p/dist/json/items.json', true);
        xhr.onload = function() {
            if ((this.status == 200) && (this.readyState == 4)) {
              let products = JSON.parse(this.responseText);
              addProducts(products);
            }
        }
        xhr.send(); 
    }
    
    if (loadItems !== null) {
        loadItems.addEventListener('click', loadProducts);
    }    
}
loadMoreBtn();
// Check cookies
function checkCookies() {
    const cookies = document.querySelector('#cookies'),
    closeCookiesBtn = document.querySelector('.close-cookies'),
    acceptCookiesBtn = cookies.querySelector('.accept-cookies');
    let cookieDate = localStorage.getItem('cookieDate');
  
    if (!cookieDate || (+cookieDate + 31536000000) < Date.now()){
        cookies.classList.add('show');
    }
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieDate', Date.now());
        cookies.classList.remove('show');
    });
    closeCookiesBtn.addEventListener('click', () => {
        cookies.classList.remove('show');
    });
}
let delay = setTimeout(checkCookies, 10000);
// Read more
function addReadMoreBtn() {
    const readMoreBtn = document.querySelector('.read-more-btn'),
    readMore = document.querySelector('.read-more');
    if (readMoreBtn !== null) {
        readMoreBtn.addEventListener('click', () => {
            if (readMore.style.display === 'inline') {
                readMoreBtn.innerHTML = 'Read more';
                readMore.style.display = 'none';
            } else {
                readMoreBtn.innerHTML = 'Read less';
                readMore.style.display = 'inline';
            }
        });
    }
}
addReadMoreBtn();
//  Thumbnails
function addTumbs() {
    const bigImg = document.querySelector('#bigImg'),
    smallImages = document.querySelector('#smallImages'),
    images = document.querySelectorAll('.small-image');
    for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('click', function () {
            let current = document.querySelectorAll('.isActive');
            current[0].className = current[0].className.replace('isActive', '');
            this.className += ' isActive';
        });
    }
    if (smallImages !== null) {
        smallImages.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                bigImg.src = e.target.dataset.img;
                e.target.classList.add('isActive');
            }
        });
    }
}
addTumbs();
// Pdp carousel
function addCarouselTumbs() {
    const bigImg = document.querySelector('#bigImg'),
    pdpCarousel = document.querySelector('#pdpCarousel'),
    carouselImgs = document.querySelectorAll('.small-carousel-images');
    for (let i = 0; i < carouselImgs.length; i++) {
        carouselImgs[i].addEventListener('click', function () {
            let current = pdpCarousel.querySelectorAll('.is-active');
            current[0].className = current[0].className.replace('is-active', '');
            this.className += ' is-active';
        });
    }
    if (pdpCarousel !== null) {
        pdpCarousel.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                bigImg.src = e.target.dataset.img;
                e.target.classList.add('is-active');
            }
        });
    }
}
addCarouselTumbs();
// Toggle full image
function toggleFullImg() {
    const bigImg = document.querySelector('#bigImg'),
    fullImgBtn = document.querySelector('#fullImgBtn'),
    closeCarousel = document.querySelector('#closeCarousel'),
    fullImg = document.querySelector('#fullImg');
    // Open full image
    if (fullImgBtn !== null) {
        fullImgBtn.addEventListener('click', () => {
            let bigImgSrc = bigImg.src;
            let img = fullImg.querySelector('img');
            fullImg.style.display = 'block';
            img.setAttribute('src', bigImgSrc);
            document.body.style.overflow = 'hidden';
        });
    }
    // Close full image
    if (closeCarousel !== null) {
        closeCarousel.addEventListener('click', () => {
            fullImg.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            fullImg.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
toggleFullImg();
// Add numeric field
function countNumbers() {
    const plusNum = document.querySelector('#plusNum'),
    minusNum = document.querySelector('#minusNum'),
    numField = document.querySelector('#numField');
    function addPlus() {
        numField.value = +numField.value + 1;
        if (numField.value.length > numField.max) {
            numField.value = numField.value.slice(0, numField.max);
        }  
    }
    function addMinus() {
        if (numField.value > 1) {
            numField.value = +numField.value - 1;
        }

    }
    if (numField !== null) {
        numField.addEventListener('input', () => {
            if (numField.value.length > numField.max) {
                numField.value = numField.value.slice(0, numField.max);
            }
        });
    }
    if (plusNum !== null) {
        plusNum.addEventListener('click', addPlus);
    }
    if (minusNum !== null) {
        minusNum.addEventListener('click', addMinus);
    }
}
countNumbers();
// Tabs
function addTabs() {
    const tabContent = document.querySelectorAll('.tab'),
    tabNav = document.querySelectorAll('.tabs-nav-item');
    let tabName;
    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav);
    });
    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }
    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            if (item.classList.contains(tabName)) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
    }
};
addTabs();
// Sroll button
function scrollTop() { 
    const scrollBtn = document.querySelector('#scrollBtn');
    const plusNum = document.querySelector('#plusNum');
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    if (plusNum !== null) {
        scrollBtn.addEventListener('click', topFunction);
    }
}
scrollTop();
// Toggle contact info
function toggleContacts() {
    const dropdown = document.querySelectorAll('.dropdown');
    dropdown.forEach(item => {
        item.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('active');
            let faDown = item.querySelector('.fa-caret-down');
            let faUp = item.querySelector('.fa-caret-up');
            if (item.nextElementSibling.classList.contains('active')) {
                faDown.style.display = 'none';
                faUp.style.display = 'block';
            } else {
                faDown.style.display = 'block';
                faUp.style.display = 'none';
            }
        });
    });
}
toggleContacts();
