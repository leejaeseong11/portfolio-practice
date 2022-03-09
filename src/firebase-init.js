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

//DOM
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
