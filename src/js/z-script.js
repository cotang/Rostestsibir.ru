
jQuery(document).ready(function($){  


  /* Hamburger */
  $('.hamburger').click(function(e){
    e.preventDefault();
    // $(this).toggleClass('hamburger--close');
    $('.nav__wrapper').toggle();
  });               

  /* header - контакты */
  $('.header__gallery').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 4000
  });

  /* галерея "с нами уже работают" */
  $('.reviews__gallery').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',      
    variableWidth: true
  });

  /* Open the modal window */
  $('.reviews__link').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"hidden"});   
    $('.overlay').show();
    $(this).closest('.reviews__slide').find('.reviews__modal').clone().appendTo($('.overlay'))
    .show()
    .animate({opacity: 1}, 200); 
  });
  /* Close the modal window */
  $('.overlay').click( function(){ 
    $('body').css({"overflow":"auto"});
    $('.reviews__modal')
      .animate({opacity: 0}, 200,  
        function(){
          $(this).hide();
          $('.overlay').fadeOut(400);
        }
      );
  }); 


    /* списки в формах */
  var regionInput = $('.form__region input');
  var regionList = $('.form__region-list');    
    $(regionInput).click(function() { 
      $(this).closest('.form__region').find(regionList).show();   
    });  
    $(regionList).mouseleave(function(){
      $(this).fadeOut('normal');
    }).find('li').click(function(){
      var regionText = $(this).text();
      $(this).closest('.form__region').find(regionInput).val(regionText);
      $(this).closest(regionList).mouseleave();
    }); 

  /* открывание ответа по ссылке "читать далее" */
  // $('.question__details').click(function(e) {
  //     e.preventDefault();
  //     $(this).closest('.question').find('.question__answer').toggle();      
  // });



  /* кнопка "наверх" */
  $('.up').click(function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0},1000);
      return false;
  });


});

