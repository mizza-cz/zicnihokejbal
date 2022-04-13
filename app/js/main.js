$(function () {
 
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


const counter = function () {
  const btns = document.querySelectorAll('.counter__btn');


  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__value');
      const currentValue = +inp.value;
      let newValue;

      if (direction === 'plus') {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
      }

      inp.value = newValue;
    })
  })

}

counter();