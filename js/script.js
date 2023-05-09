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

  /*
  $('#slide').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    slideToShow: 1,
    arrows: false,
    dots: true,
  });
  */


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

  let sunrise = gsap.timeline({
    scrollTrigger: {
      trigger: "#section2",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true
    }
  })
  .from("#info",  { 
    y: 3590,
  });


  let horizontalSlide = gsap.timeline({
    scrollTrigger: {
      trigger: "#section4",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true
    }
  })
  .to("#slide",  {x: "-25%"})
  .to("#slide",  {x: "-50%"})
  .to("#slide",  {x: "-75%"})
  .to("purchase", {opacity: 0});

  
  // AOS start
  // AOS.init();

});