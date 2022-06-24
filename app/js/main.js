$(function () {
	$('.js-select').select2({
		width: '100%',
		minimumResultsForSearch: -1
	 });
  $('.gallery .group').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true,
    },
  })
   $('.navbar__link').on('click', function () {
      $(this).closest('.navbar__list').toggleClass('active');
    });
    $('.navbar__btns').on('click', function () {
      $('.mobile-wrapper').slideToggle();
    });
    $('.nav-slide').slick({
      infinite: true,
      autoplay: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll:1
    });
    var mixer = mixitup('.products');
})
let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.mix');
if(cartSumPrice){
	const countTheSumPrice = function () { // 4
		let sum = 0;
		productsInCart.forEach(item => {
			sum += item.price;
		});
		return sum;
	}
	const updateShoppingCartHTML = function () {  // 3
		localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
		if (productsInCart.length > 0) {
			let result = productsInCart.map(product => {
				return `
					<div class="buyItem">
						<h5>${product.name}</h5>
						<label for="" class="select-product">
							Velikost
							<select name="" id="">
								<option value="">S</option>
								<option value="">M</option>
								<option value="">L</option>
								<option value="">XL</option>
								<option value="">XXL</option>
							</select>
						</label>
						<div class="product__right">
						
							<h6>${product.price} Kč</h6>
							<div class="product__count">
								<button class="button-minus" data-id=${product.id}>-</button>
								<input class="countOfProduct" name="id:${product.id}" value="${product.count}">
								<button class="button-plus" data-id=${product.id}>+</button>
							</div>
						</div>
					</div>`
			});
			parentElement.innerHTML = result.join('');
			cartSumPrice.innerHTML =  countTheSumPrice() + ' Kč'; 
		}
		else {
			parentElement.innerHTML = ' ';
		}
	}
	function updateProductsInCart(product) { // 2
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == product.id) {
				productsInCart[i].count += 1;
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
				return;
			}
		}
		productsInCart.push(product);
	}
	products.forEach(item => {   // 1
		item.addEventListener('click', (e) => {
			if (e.target.classList.contains('addToCart')) {
				const productID = e.target.dataset.productId;
				const productName = item.querySelector('h3').innerHTML;
				const productPrice = item.querySelector('.priceValue').innerHTML;
				const productImage = item.querySelector('img').src;
				let product = {
					name: productName,
					image: productImage,
					id: productID,
					count: 1,  
					price: +productPrice,
					basePrice: +productPrice,
				}
				updateProductsInCart(product);
				updateShoppingCartHTML();
			}
		});
	});
	parentElement.addEventListener('click', (e) => { // Last
		const isPlusButton = e.target.classList.contains('button-plus');
		const isMinusButton = e.target.classList.contains('button-minus');
		if (isPlusButton || isMinusButton) {
			for (let i = 0; i < productsInCart.length; i++) {
				if (productsInCart[i].id == e.target.dataset.id) {
					if (isPlusButton) {
						productsInCart[i].count += 1
					}
					else if (isMinusButton) { 
						productsInCart[i].count -= 1
					}
					productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
				}
				if (productsInCart[i].count <= 0) {
					productsInCart.splice(i, 1);
				}
			}
			updateShoppingCartHTML();
		}
	});
	updateShoppingCartHTML();
}



function tablesWrap() {
	var contentTables = document.querySelectorAll(".typo table"),
      i;

	for (i = 0; i < contentTables.length; ++i) {
		contentTables[i].classList.add("table");

    var contentTableWrap = document.createElement("div");

    contentTableWrap.classList.add("table-responsive");

		contentTables[i].parentNode.insertBefore(contentTableWrap, contentTables[i]);

		contentTableWrap.appendChild(contentTables[i]);
	}
}
tablesWrap();
