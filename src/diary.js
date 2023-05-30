var masterPassword = '1'; // 관리자용 암호

// Firebase 설정
const config = {
  apiKey: 'AIzaSyBwzEE5THOJ6RdHkxu-82_8Eg4xqcZEYFE',
  authDomain: 'hyangham-portfolio.firebaseapp.com',
  databaseURL: 'https://hyangham-portfolio-default-rtdb.firebaseio.com',
  projectId: 'hyangham-portfolio',
  storageBucket: 'hyangham-portfolio.appspot.com',
  messagingSenderId: '810886149707',
  appId: '1:810886149707:web:ce1aad1dd89163bab17fce',
};
firebase.initializeApp(config);

// Firebase 초기화
var diaryTitleField = document.getElementById('diary-form-title');
var diaryContentsField = document.getElementById('diary-form-contents');
var diaryResult = document.getElementById('diary-result');
var diaryTitleResultField = document.getElementById('diary-result-title');
var diaryContentsResultField = document.getElementById('diary-result-contents');
var diaryTimestampResultField = document.getElementById('diary-result-timestamp');

// DB 가져오기
var database = firebase.database();

// 고유 아이디 만들기
function guid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// 방명록 읽기
var diaryRef = database.ref('diary');
diaryRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var diaryTitle = data.title;
  var diaryContents = data.contents;
  var diaryTimestamp = data.timestamp;
  var diaryKey = snapshot.key;
  var newDiaryResultTop = document.createElement('div');
  newDiaryResultTop.setAttribute('class', 'diary-result-top'); // 일지 글 제목 및 내용
  var newDiaryTitle = document.createElement('div');
  newDiaryTitle.setAttribute('class', 'diary-result-title');
  newDiaryTitle.setAttribute('id', diaryKey);
  newDiaryTitle.innerHTML = diaryTitle;
  newDiaryTitle.addEventListener('click', () => {
    var diaryResultContentOne = document.getElementById('contents-' + diaryKey);

    diaryResultContentOne.style.display = diaryResultContentOne.style.display == 'block' ? 'none' : 'block';
  });
  newDiaryResultTop.appendChild(newDiaryTitle);

  var newDiaryTimestamp = document.createElement('div');
  newDiaryTimestamp.setAttribute('class', 'diary-result-timestamp');
  newDiaryTimestamp.innerHTML = diaryTimestamp;
  newDiaryResultTop.appendChild(newDiaryTimestamp);

  var diaryDeleteButton = document.createElement('button');
  diaryDeleteButton.setAttribute('type', 'button');
  diaryDeleteButton.setAttribute('class', 'diary-delete-button');
  diaryDeleteButton.setAttribute('id', diaryKey);
  diaryDeleteButton.innerHTML = '삭제';

  diaryDeleteButton.addEventListener('click', deleteDiaryData);
  newDiaryResultTop.appendChild(diaryDeleteButton);

  diaryResult.appendChild(newDiaryResultTop);

  var newDiaryContents = document.createElement('div');
  newDiaryContents.setAttribute('class', 'diary-result-contents');
  newDiaryContents.setAttribute('id', 'contents-' + diaryKey);
  newDiaryContents.innerHTML = diaryContents;
  diaryResult.appendChild(newDiaryContents);
});

// 방명록 저장
function saveDiaryData() {
  var password = document.getElementById('diary-form-password');
  if (password.value == '') {
    alert('암호를 입력하세요');
  } else if (password.value == masterPassword) {
    var uuid = guid();
    var diaryTitle = diaryTitleField.value;
    var diaryContents = diaryContentsField.value;
    var diaryTimestamp = new Date();

    var year = diaryTimestamp.getFullYear();
    var month = ('0' + (diaryTimestamp.getMonth() + 1)).slice(-2);
    var day = ('0' + diaryTimestamp.getDate()).slice(-2);

    if (diaryTitle == '') {
      alert('제목을 입력하세요');
      return true;
    } else if (diaryContents == '') {
      alert('내용을 입력하세요');
      return true;
    }
    database.ref('diary/' + uuid).set({
      title: diaryTitle,
      contents: diaryContents,
      timestamp: year + '-' + month + '-' + day,
    });
    diaryTitleField.value = '';
    diaryContentsField.value = '';
    password.value = '';
    document.getElementById('diary-form-popup').style.display = 'none';
  } else {
    alert('암호를 틀렸습니다');
    password.value = '';
  }
}

// 방명록 삭제
function deleteDiaryData(e) {
  var dialog = document.getElementById('diary-delete-dialog');
  deleteId = e.target.id;
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    alert('삭제 기능을 사용할 수 없는 브라우저입니다');
  }
}

// 전부 삭제되면 결과창의 내용도 지움
diaryRef.on('child_removed', function (snapshot) {
  diaryTitleResultField.innerHTML = '';
  diaryContentsResultField.innerHTML = '';
  diaryTimestampResultField.innerHTML = '';
});

// 방명록 dialog 삭제 기능
function deleteDiaryAlert() {
  if (diaryDeletePasswrod.value == masterPassword) {
    console.log(deleteId);
    database.ref('diary').child(deleteId).remove();
  } else {
    alert('암호를 틀렸습니다');
  }
}

var diaryDeleteConfirm = document.getElementById('diary-delete-confirm');
var diaryDeletePasswrod = document.getElementById('diary-delete-password');
var deleteId = '';
diaryDeleteConfirm.addEventListener('click', deleteDiaryAlert);
