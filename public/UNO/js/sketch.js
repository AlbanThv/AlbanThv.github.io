//https://console.firebase.google.com/project/realtime-chat-e8088/database/realtime-chat-e8088/data
let database;
let chat;

let username;
let message;
let send;

function setup() {
  board = createCanvas(50, 50);
  board.parent("board");

  hand = createCanvas(50, 50);
  hand.parent("hand");

  // Initialize Firebase
  let firebaseConfig = {
    apiKey: "AIzaSyDtJg7TPp4mGuCz3jGNpmt1FRKdrC6X0WM",
    authDomain: "realtime-chat-e8088.firebaseapp.com",
    databaseURL: "https://realtime-chat-e8088.firebaseio.com",
    projectId: "realtime-chat-e8088",
    storageBucket: "realtime-chat-e8088.appspot.com",
    messagingSenderId: "922459422511",
    appId: "1:922459422511:web:26a9f03b1f78af1d"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  // Chat
  username = document.getElementById('username');
  message = document.getElementById('message');
  send = document.getElementById('send');
  send.addEventListener("click", sendMessage);

  chat = database.ref('chat');
  chat.on('value', gotDataChat, errDataChat);
}

function draw() {
  board.background(0);
  hand.background(50)
}

// Chat
function gotDataChat(data) {
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
    let li = createElement('li', timestamp + " <b>" + username + "</b> : " + message);
    li.class('message')
    li.parent('chatroom');
  });
}

function errDataChat(err) {
  console.log('Chat Error?!\n' + err);
}

function sendMessage() {
  let data = {
    timestamp: displayTime(),
    username: username.value,
    message: message.value,
  }
  if (username.value != "" && message.value != "") {
    chat.push(data);
  }
}

function displayTime() {
  let str = "";

  let currentTime = new Date()
  let month = currentTime.getMonth() + 1;
  let day = currentTime.getDate();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }

  str += day + "/" + month + " " + hours + ":" + minutes + ":" + seconds;
  return str;
}