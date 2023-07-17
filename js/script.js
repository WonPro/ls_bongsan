'use strict';

/*********************************************************
*                    Modal Popup Event                   *
*********************************************************/

  // Open Modal Event
  function openPopup(popupName) {
    let modalWrap = document.getElementById('pop');
    let popup = document.getElementById('popup' + popupName);

    modalWrap.classList.add('on');
    popup.classList.add('on');
    document.body.style.overflow = "hidden";
  }


  // Close Modal Event
  function closePopup(popupName) {
    let modalWrap = document.getElementById('pop');
    let popup = document.getElementById('popup' + popupName);

    popup.classList.remove('on');
    modalWrap.classList.remove('on');
    document.body.style.overflow = "unset";
  }



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

  let footerOffset = $('#footer').offset().top - $(window).height();

  $('#faqList .activeBtn').on('click', function() {
    let active = $(this).hasClass('active');
    let answer = $(this).parent().next('.answer');

    if (!active) {
      $(this).addClass('active');
      answer.addClass('active');
      answer.slideDown(300);

      // .activeBtn을 클릭할 때 footerOffset 값을 다시 계산
      footerOffset = $('#footer').offset().top - $(window).height();
      console.log(footerOffset);

      // #purchasePageBtn의 위치도 변경
      if ($(window).scrollTop() > footerOffset) {
        $('#purchasePageBtn').removeClass('fixed');
      }
    } else {
      $(this).removeClass('active');
      answer.removeClass('active');
      answer.slideUp(300);

      // .activeBtn을 클릭할 때 footerOffset 값을 다시 계산
      footerOffset = $('#footer').offset().top - $(window).height();
      console.log(footerOffset);

      // #purchasePageBtn의 위치도 변경
      if ($(window).scrollTop() <= footerOffset) {
        $('#purchasePageBtn').addClass('fixed');
      }
    }
  });

  // 구매페이지 열기버튼 효과

  $(window).scroll(function() {

    if ($(this).scrollTop() >= 4000) {
      $('#purchasePopupWrap').fadeIn(); // #purchasePageBtn 요소를 나타나게 함
    } else {
      $('#purchasePopupWrap').fadeOut(); // #purchasePageBtn 요소를 사라지게 함
    }

    if ($(this).scrollTop() <= footerOffset) {
      if (!$('#purchasePopupWrap').hasClass('fixed')) {
        $('#purchasePopupWrap').addClass('fixed');
      }
    } else {
      if ($('#purchasePopupWrap').hasClass('fixed')) {
        $('#purchasePopupWrap').removeClass('fixed');
      }
    }
  });


  // 구매페이지 셀렉트 및 상품 추가제거 기능
    // 임의의 상품 배열 생성
    let products = [
      { name: "유아", price: 10000 },
      { name: "어린이", price: 20000 },
      { name: "청소년", price: 30000 },
      { name: "성인", price: 40000 },
      { name: "노인", price: 50000 },
      { name: "장애인", price: 60000 }
    ];

    // 선택한 상품 정보를 담을 배열
    let selectedProducts = [];

    // 상품 선택 셀렉트 박스 업데이트
    let productSelect = $('#product');
    $.each(products, function(index, product) {
      let option = $('<option>').val(product.price).text(product.name);
      productSelect.append(option);
    });

    // 상품 선택 시 이벤트 처리
    $('#product').change(function() {
      let selectedOption = $(this).find('option:selected');
      let productName = selectedOption.text();
      let productPrice = parseFloat(selectedOption.val());

      // 동일한 상품을 이미 선택한 경우 수량 증가
      let existingProduct = selectedProducts.find(function(product) {
        return product.name === productName;
      });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        // 선택한 상품 정보를 배열에 추가
        selectedProducts.push({
          name: productName,
          price: productPrice,
          quantity: 1
        });
      }

      // 선택된 상품 목록 업데이트
      updateSelectedProductList();

      // 총 가격 업데이트
      updateTotalPrice();
    });

    // 선택된 상품 목록 업데이트 함수
function updateSelectedProductList() {
  let selectedProductList = $('#selected-product-list');
  selectedProductList.empty();

  let totalQuantity = 0; // 총 구매갯수를 계산하기 위한 변수 추가

  $.each(selectedProducts, function(index, product) {
    let listItem = $('<li>');

    // 순번, 상품명, 삭제 버튼
    let productInfo = $('<div>').addClass('product-info');
    let sequence = (index + 1).toString().padStart(2, '0');
    let sequenceSpan = $('<span>').addClass('product-sequence').text(sequence);
    let nameSpan = $('<span>').addClass('product-name').text(product.name);
    let deleteButton = $('<button>').addClass('delete-button').text('X');
    deleteButton.click(function() {
      // 선택된 상품 삭제
      selectedProducts.splice(index, 1);

      // 선택된 상품 목록 업데이트
      updateSelectedProductList();

      // 총 가격 업데이트
      updateTotalPrice();
    });
    productInfo.append(sequenceSpan, nameSpan, deleteButton);
    listItem.append(productInfo);

    // 수량 조절, 수량, 총 금액
    let quantityInfo = $('<div>').addClass('quantity-info');
    let quantityControls = $('<div>').addClass('quantity-controls');
    let decreaseButton = $('<button>').addClass('decrease-button').text('-');
    let increaseButton = $('<button>').addClass('increase-button').text('+');
    let quantityInput = $('<input>').attr('type', 'number').attr('value', product.quantity).attr('min', '1').addClass('quantity-input').prop('disabled', true);
    let totalPrice = $('<div>').addClass('total-price').text((product.price * product.quantity).toLocaleString() + '원');
    decreaseButton.click(function() {
      if (product.quantity > 1) {
        product.quantity--;
        quantityInput.val(product.quantity);
        totalPrice.text((product.price * product.quantity).toLocaleString() + '원');
        getTotalQuantity();
        updateTotalPrice();
      }
    });
    increaseButton.click(function() {
      product.quantity++;
      quantityInput.val(product.quantity);
      totalPrice.text((product.price * product.quantity).toLocaleString() + '원');
      getTotalQuantity();
      updateTotalPrice();
    });
    quantityControls.append(decreaseButton, quantityInput, increaseButton);
    quantityInfo.append(quantityControls, totalPrice);
    listItem.append(quantityInfo);
    totalQuantity += product.quantity;

    selectedProductList.append(listItem);
  });

  // 총 구매갯수 업데이트
  $('#totalQuantity').text('총 구매갯수: ' + totalQuantity + '개');
}

// 총 가격 업데이트 함수
function updateTotalPrice() {
  let totalPrice = selectedProducts.reduce(function(acc, product) {
    return acc + (product.price * product.quantity);
  }, 0);

  $('#totalPrice').text('총 가격: ' + totalPrice.toLocaleString() + '원');
}

// 선택된 상품의 총 구매갯수를 계산하는 함수
function getTotalQuantity() {
  let totalQuantity = 0;
  selectedProducts.forEach(function(product) {
    totalQuantity += product.quantity;
  });

  $('#totalQuantity').text('총 구매갯수: ' + totalQuantity + '개');
  return totalQuantity;
}

    // 팝업 닫기 버튼 클릭 시 처리
    $('.close-button').click(function() {
      $('.popup-container').fadeOut(200);
    });

    // 구매하기 버튼 클릭 시 팝업 보이기
    $('#purchasePageBtn').click(function() {
      $('.popup-container').fadeIn(100);
    });



  // AOS start
  AOS.init();

});