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


