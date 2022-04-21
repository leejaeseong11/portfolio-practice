// 이미지 슬라이드 기능
var slideWrapper = document.querySelector('.container');
var slides = document.querySelectorAll('.item');
var totalSlides = slides.length;

var sliderWidth = slideWrapper.clientWidth;
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

// 프로젝트 이미지에 mouseover 시 프로젝트 설명 나타남
var portfolioContentsImg = document.querySelectorAll('.portfolio-contents-img');

for (var i = 0; i < portfolioContentsImg.length; i++) {
  var portfolioContentsExplanation = document.querySelectorAll(
    '.portfolio-contents-explanation'
  )[i];
  portfolioContentsImg[i].addEventListener('mouseover', (e) => {
    e.target.nextSibling.nextSibling.style.display = 'block';
  });
  portfolioContentsImg[i].addEventListener('mouseout', (e) => {
    e.target.nextSibling.nextSibling.style.display = 'none';
  });
}

// 개발일지 작성 폼 open/close
function openDiaryForm() {
  document.getElementById('diary-form-popup').style.display = 'block';
}

function closeDiaryForm() {
  document.getElementById('diary-form-popup').style.display = 'none';
}

// 독서기록 작성 폼 open/close
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
