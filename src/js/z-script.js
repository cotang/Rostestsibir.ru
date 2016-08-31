
jQuery(document).ready(function($){  


  /* Hamburger */
  $('.hamburger').click(function(e){
    e.preventDefault();
    $('.nav__wrapper').toggle();
  });               

  /* City list */
  $('.city-choise__icon').click(function(e){
    e.preventDefault();
    $(this).addClass('city-choise__icon--open');
    $('.city-choise__dropdown').toggle(); 
  }); 
  /* изменение названия, телефона и почты при выборе города */
  $('.city-choise__item').on('click', function(){
    $('.city-choise__name').html($(this).html());     
    $('.city__name').html($(this).html()); 
    $('.city__email-wrapper').html('<a class="city__email" target="_blank" href="mailto:'+$(this).data("email")+'">'+$(this).data("email")+'</a>');

    var tel = $(this).data("tel");
    var hrefTel = tel.replace(/\D/g, "");
    $('.city__tel-wrapper').html('<a class="city__tel" target="_blank" href="tel:+'+hrefTel+'">'+tel+'</a>');
 
    $('.city-choise__dropdown').hide(); 
    $('.city-choise__icon').removeClass('city-choise__icon--open');
    return false;
  });

  /* Open the modal window */
  $('.slide__thumbnail').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"hidden"});   
    $('.overlay').show();
    $(this).closest('.slide').find('.slide__modal').clone().appendTo($('.overlay'))
    .show()
    .animate({opacity: 1}, 200); 
  });
  /* Close the modal window */
  $('.overlay').click( function(){ 
    $('body').css({"overflow":"auto"});
    $(this).find('.slide__modal')
      .animate({opacity: 0}, 200,  
        function(){
          $(this).remove();
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

