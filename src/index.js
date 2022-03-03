// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBwzEE5THOJ6RdHkxu-82_8Eg4xqcZEYFE',
  authDomain: 'hyangham-portfolio.firebaseapp.com',
  projectId: 'hyangham-portfolio',
  storageBucket: 'hyangham-portfolio.appspot.com',
  messagingSenderId: '810886149707',
  appId: '1:810886149707:web:ce1aad1dd89163bab17fce',
  measurementId: 'G-R6177BGGPB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var messageField = document.getElementById('message');
var result = document.getElementById('result');

// Get a reference to the database service
var database = firebase.database();

//고유 아이디 만들기
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

//메세지 읽기
var messageRef = database.ref('message');
messageRef.on('child_added', function (snapshot) {
  var data = snapshot.val();
  var message = data.text;
  if (message != undefined) {
    result.value += message + '\n';
  }
});

//전부 삭제되면 결과창의 내용도 지워 준다.
var messageRef = database.ref('message');
messageRef.on('child_removed', function (snapshot) {
  result.value = '';
  messageField.value = '';
});

//메세지 저장
// 해리포터와 마법사의 돌  1, 2
// 덤블도어의 수련회 메타에 타락할 수 밖에 없었던 슬리데린..
function savedata() {
  var uuid = guid();
  var message = messageField.value;
  if (message == '') {
    alert('메시지를 입력하세요');
    return true;
  }
  database.ref('message/' + uuid).set({
    text: message,
  });
  messageField.value = '';
}

//삭제
function deleteall() {
  database.ref('message').remove();
}
