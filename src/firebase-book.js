// 책 데이터 읽기
var diaryRef = database.ref('book');
diaryRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var bookTitle = data.title;
  var bookImage = data.image;
  var bookReview = data.reveiw;
  var bookKey = snapshot.key;

  var newBookContents = document.createElement('div');
  newBookContents.setAttribute('class', 'book-contents');
  var newBookTitle = document.createElement('div');
  newBookTitle.setAttribute('class', 'book-contents-title');
  newBookTitle.setAttribute('id', bookKey);
  newBookTitle.innerHTML = bookTitle;

  newBookContents.appendChild(newBookTitle);
});
