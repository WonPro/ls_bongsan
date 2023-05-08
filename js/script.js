'use strict';

/*********************************************************
*                    Modal Popup Event                   *
*********************************************************/

  // Open Modal Event
  // function openPopup(popupName) {
  //   let modalWrap = document.getElementById('popupWrap');
  //   let popup = document.getElementById('popup' + popupName);

  //   modalWrap.classList.add('on');
  //   popup.classList.add('on');
  // }


  // Close Modal Event
  // function closePopup(popupName) {
  //   let modalWrap = document.getElementById('popupWrap');
  //   let popup = document.getElementById('popup' + popupName);

  //   popup.classList.remove('on');
  //   modalWrap.classList.remove('on');
  // }



/*********************************************************
*                    Document Loaded                     *
*********************************************************/

$(document).ready(function(){

  $('#slide').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    slideToShow: 1,
    arrows: false,
    dots: true,
  });

  $('#faqList .activeBtn').on('click', function(){
    let active = $(this).hasClass('active');
    let answer = $(this).parent().next('.answer');

    if(!active){
      $(this).addClass('active');
      answer.addClass('active');
      answer.slideDown(300);
    } else {
      $(this).removeClass('active');
      answer.removeClass('active');
      answer.slideUp(300);
    }
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: "#instragram",
      start: "center center",
      end: "bottom top",
      scrub: true,
      pin: true
    }
  })
    .from("#info",  { y: 5 });

  
  // AOS start
  // AOS.init();

});