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

  

  // Section4의 수상기구 소개 슬라이드
  $('#slide').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    slideToShow: 1,
    arrows: false,
    dots: true,
  });

  let footerOffset = $('.footer').offset().top - $(window).height();

  $('#faqList .activeBtn').on('click', function() {
    let active = $(this).hasClass('active');
    let answer = $(this).parent().next('.answer');

    if (!active) {
      $(this).addClass('active');
      answer.addClass('active');
      answer.slideDown(300);

      // .activeBtn을 클릭할 때 footerOffset 값을 다시 계산
      footerOffset = $('.footer').offset().top - $(window).height();
      console.log(footerOffset);

      // #purchase의 위치도 변경
      if ($(window).scrollTop() > footerOffset) {
        $('#purchase').removeClass('fixed');
      }
    } else {
      $(this).removeClass('active');
      answer.removeClass('active');
      answer.slideUp(300);

      // .activeBtn을 클릭할 때 footerOffset 값을 다시 계산
      footerOffset = $('.footer').offset().top - $(window).height();
      console.log(footerOffset);

      // #purchase의 위치도 변경
      if ($(window).scrollTop() <= footerOffset) {
        $('#purchase').addClass('fixed');
      }
    }
  });

  // 구매하기 버튼 효과

  $(window).scroll(function() {

    if ($(this).scrollTop() > 4000) {
      $('#purchase').fadeIn(); // #purchase 요소를 나타나게 함
    } else {
      $('#purchase').fadeOut(); // #purchase 요소를 사라지게 함
    }

    if ($(this).scrollTop() <= footerOffset) {
      if (!$('#purchase').hasClass('fixed')) {
        $('#purchase').addClass('fixed');
      }
    } else {
      if ($('#purchase').hasClass('fixed')) {
        $('#purchase').removeClass('fixed');
      }
    }
  });

  
  // AOS start
  AOS.init();

});