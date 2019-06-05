let database;
let chat;

//https://console.firebase.google.com/project/realtime-chat-e8088/database/realtime-chat-e8088/data

function setup() {
  canvas = createCanvas(0, 0);

  let username = document.getElementById('username');
  let message = document.getElementById('message');
  let button = document.getElementById('button');

  button.addEventListener("click", sendMessage);

  let firebaseConfig = {
    apiKey: "AIzaSyDtJg7TPp4mGuCz3jGNpmt1FRKdrC6X0WM",
    authDomain: "realtime-chat-e8088.firebaseapp.com",
    databaseURL: "https://realtime-chat-e8088.firebaseio.com",
    projectId: "realtime-chat-e8088",
    storageBucket: "realtime-chat-e8088.appspot.com",
    messagingSenderId: "922459422511",
    appId: "1:922459422511:web:26a9f03b1f78af1d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  chat = database.ref('chat');

  chat.on('value', gotData, errData);
}

function gotData(data) {
let messages = selectAll('.message');
messages.forEach(e => {
  e.remove();
});

  let chatlog = data.val();
  let keys = Object.keys(chatlog);
  keys.forEach(e => {
    let timestamp = chatlog[e].timestamp;
    let username = chatlog[e].username;
    let message = chatlog[e].message;
    // console.log(timestamp, username, message);
    let li = createElement('li', timestamp + " <b>" + username + "</b> : " + message);
    li.class('message')
    li.parent('chatroom');
  });
}

function errData(err) {
  console.log('Error!\n' + err);
}

function sendMessage() {
  let data = {
    timestamp: displayTime(),
    username: username.value,
    message: message.value,
  }
  chat.push(data);
}

function displayTime() {
  let str = "";

  let currentTime = new Date()
  let hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()
  let seconds = currentTime.getSeconds()

  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  str += hours + ":" + minutes + ":" + seconds;

  return str;
}