// Firebase 설정을 위한 import
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js';

// Firebase app 설정
const firebaseConfig = {
  apiKey: 'AIzaSyBwzEE5THOJ6RdHkxu-82_8Eg4xqcZEYFE',
  authDomain: 'hyangham-portfolio.firebaseapp.com',
  projectId: 'hyangham-portfolio',
  storageBucket: 'hyangham-portfolio.appspot.com',
  messagingSenderId: '810886149707',
  appId: '1:810886149707:web:ce1aad1dd89163bab17fce',
  measurementId: 'G-R6177BGGPB',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var diaryTitleField = document.getElementById('diary-form-title');
var diaryTitleResult = document.getElementById('diary-title-result');

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
var diaryTitleRef = database.ref('diary_title');
var diaryContentsRef = database.ref('diary_contents');
diaryTitleRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var diaryTitle = data.text;
  if (diaryTitle != undefined) {
    diaryTitleResult.value += diaryTitle + '\n';
  }
});
diaryContentsRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var diaryTitle = data.text;
  if (diaryTitle != undefined) {
    diaryTitleResult.value += diaryTitle + '\n';
  }
});

// 전부 삭제되면 결과창의 내용도 지워 준다.
var diaryTitleRef = database.ref('diary_title');
diaryTitleRef.on('child_removed', function (snapshot) {
  diaryTitleResult.value = '';
  diaryTitleField.value = '';
});

// 메세지 저장
function savedata() {
  var uuid = guid();
  var diaryTitle = diaryTitleField.value;
  if (diaryTitle == '') {
    alert('제목을 입력하세요');
    return true;
  }
  database.ref('title/' + uuid).set({
    text: diaryTitle,
  });
  diaryTitleField.value = '';
}

// 삭제
function deleteall() {
  database.ref('title').remove();
}

// 해리포터와 마법사의 돌  1, 2
// 덤블도어의 수련회 메타에 타락할 수 밖에 없었던 슬리데린..
