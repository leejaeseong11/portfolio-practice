function openForm() {
  document.getElementById('diary-form-popup').style.display = 'block';
}

function closeForm() {
  document.getElementById('diary-form-popup').style.display = 'none';
}

// 개발 일지 제목 클릭 시 상세 내용 출력
var diaryResultTitle = document.getElementById('diary-result-title');
diaryResultTitle.addEventListener('click', () => {
  var diaryResultContents = document.getElementById('diary-result-contents');

  diaryResultContents.style.display = 'none';
});
