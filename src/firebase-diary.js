var masterPassword = '1';

// Initialize Firebase
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
var diaryTimestampResultField = document.getElementById(
  'diary-result-timestamp'
);

// DB 가져오기
var database = firebase.database();

// 고유 아이디 만들기
function guid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

// 개발 일지 읽기
var diaryRef = database.ref('diary');
diaryRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var diaryTitle = data.title;
  var diaryContents = data.contents;
  var diaryTimestamp = data.timestamp;
  var diaryKey = snapshot.key;
  var newDiaryResultTop = document.createElement('div');
  newDiaryResultTop.setAttribute('class', 'diary-result-top');
  var newDiaryTitle = document.createElement('div');
  newDiaryTitle.setAttribute('class', 'diary-result-title');
  newDiaryTitle.setAttribute('id', diaryKey);
  newDiaryTitle.innerHTML = diaryTitle;
  newDiaryTitle.addEventListener('click', () => {
    var diaryResultContentOne = document.getElementById('contents-' + diaryKey);

    diaryResultContentOne.style.display =
      diaryResultContentOne.style.display == 'none' ? 'block' : 'none';
  });
  newDiaryResultTop.appendChild(newDiaryTitle);

  var newDiaryTimestamp = document.createElement('div');
  newDiaryTimestamp.setAttribute('class', 'diary-result-timestamp');
  newDiaryTimestamp.innerHTML = diaryTimestamp;
  newDiaryResultTop.appendChild(newDiaryTimestamp);

  var diaryDeleteButton = document.createElement('button');
  diaryDeleteButton.setAttribute('type', 'button');
  diaryDeleteButton.setAttribute('class', 'diary-delete-button');
  diaryDeleteButton.innerHTML = '삭제';
  // todo: fix delete bug
  diaryDeleteButton.addEventListener('click', deleteDiaryData);
  newDiaryResultTop.appendChild(diaryDeleteButton);

  diaryResult.appendChild(newDiaryResultTop);

  var newDiaryContents = document.createElement('div');
  newDiaryContents.setAttribute('class', 'diary-result-contents');
  newDiaryContents.setAttribute('id', 'contents-' + diaryKey);
  newDiaryContents.innerHTML = diaryContents;
  diaryResult.appendChild(newDiaryContents);
});

// 메세지 저장
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

// 삭제
function deleteDiaryData() {
  var dialog = document.getElementById('diary-delete-dialog');

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    alert('삭제 기능을 사용할 수 없는 브라우저입니다');
  }
}

// 전부 삭제되면 결과창의 내용도 지워 준다.
diaryRef.on('child_removed', function (snapshot) {
  diaryTitleResultField.innerHTML = '';
  diaryContentsResultField.innerHTML = '';
  diaryTimestampResultField.innerHTML = '';
});

// 개발 일지 dialog 삭제 기능
function onClose() {
  if (diaryDeletePasswrod.value == masterPassword) {
    database.ref('diary').remove();
  } else {
    alert('암호를 틀렸습니다');
  }
}

var diaryDeleteConfirm = document.getElementById('diary-delete-confirm');
var diaryDeletePasswrod = document.getElementById('diary-delete-password');
diaryDeleteConfirm.addEventListener('click', onClose);

// 해리포터와 마법사의 돌  1, 2
// 덤블도어의 수련회 메타에 타락할 수 밖에 없었던 슬리데린..
