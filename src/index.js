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
