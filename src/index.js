function openDiaryForm() {
  document.getElementById('diary-form-popup').style.display = 'block';
}

function closeDiaryForm() {
  document.getElementById('diary-form-popup').style.display = 'none';
}

function openBookForm() {
  document.getElementById('book-form-popup').style.display = 'block';
}

function closeBookForm() {
  document.getElementById('book-form-popup').style.display = 'none';
}

function uploadChange(file) {
  var el = file.parentNode.parentNode.getElementsByTagName('*');
  for (var i = 0; i < el.length; i++) {
    var node = el[i];
    if (node.className == 'file-text') {
      node.innerHTML = file.value;
      break;
    }
  }
}

function openProjectReview(count) {
  var review = document.getElementsByClassName('portfolio-contents-name')[
    count
  ];
}
var menuBar = document.getElementById('menu-bar');

function openMenu() {
  menuBar.style.display = 'block';
}

function closeMenu() {
  menuBar.style.display = 'none';
}

// 이미지 슬라이드 기능
var slideWrapper = document.querySelector('.container');
var slides = document.querySelectorAll('.item');
var totalSlides = slides.length; // item의 갯수

var sliderWidth = slideWrapper.clientWidth; // container의 width
var slideIndex = 0;
var slider = document.querySelector('.slider');

slider.style.width = sliderWidth * totalSlides + 'px';

showSlides();

function showSlides() {
  for (var i = 0; i < slides.length; i++) {
    slider.style.left = -(sliderWidth * slideIndex) + 'px';
  }
  slideIndex++;
  if (slideIndex === totalSlides) {
    slideIndex = 0;
  }
  setTimeout(showSlides, 3000);
}
