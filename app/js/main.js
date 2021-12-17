$(function () {
   $('.navbar__link').on('click', function () {
      $(this).closest('.navbar__list').toggleClass('active');
    });
    $('.navbar__btns').on('click', function () {
      $('.mobile-wrapper').slideToggle();
    });
})