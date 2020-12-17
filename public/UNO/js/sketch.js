//https://console.firebase.google.com/project/realtime-chat-e8088/database/realtime-chat-e8088/data
let database;
let chat;

let username;
let message;
let send;

let deck = [];
let newDeck = [];
let shuffledDeck = [];
let hand1;
let hand2;
let hand3;
let hand4;
let hand5;
let hand6;
let hand7;
let hand8;
let hand9;
let hand10;

let red0, red1, red2, red3, red4, red5, red6, red7, red8, red9, redStop, redSwitch, redPlus;
let yellow0, yellow1, yellow2, yellow3, yellow4, yellow5, yellow6, yellow7, yellow8, yellow9, yellowStop, yellowSwitch, yellowPlus;
let green0, green1, green2, green3, green4, green5, green6, green7, green8, green9, greenStop, greenSwitch, greenPlus;
let blue0, blue1, blue2, blue3, blue4, blue5, blue6, blue7, blue8, blue9, blueStop, blueSwitch, bluePlus;
let wildColor, wildPlus, cardBack;

function preload() {
  red0 = loadImage('./Cards/Red 0.png');
  red1 = loadImage('./Cards/Red 1.png');
  red2 = loadImage('./Cards/Red 2.png');
  red3 = loadImage('./Cards/Red 3.png');
  red4 = loadImage('./Cards/Red 4.png');
  red5 = loadImage('./Cards/Red 5.png');
  red6 = loadImage('./Cards/Red 6.png');
  red7 = loadImage('./Cards/Red 7.png');
  red8 = loadImage('./Cards/Red 8.png');
  red9 = loadImage('./Cards/Red 9.png');
  redStop = loadImage('./Cards/Red Action Stop.png');
  redSwitch = loadImage('./Cards/Red Action Switch.png');
  redPlus = loadImage('./Cards/Red Action +2.png');
  yellow0 = loadImage('./Cards/Yellow 0.png');
  yellow1 = loadImage('./Cards/Yellow 1.png');
  yellow2 = loadImage('./Cards/Yellow 2.png');
  yellow3 = loadImage('./Cards/Yellow 3.png');
  yellow4 = loadImage('./Cards/Yellow 4.png');
  yellow5 = loadImage('./Cards/Yellow 5.png');
  yellow6 = loadImage('./Cards/Yellow 6.png');
  yellow7 = loadImage('./Cards/Yellow 7.png');
  yellow8 = loadImage('./Cards/Yellow 8.png');
  yellow9 = loadImage('./Cards/Yellow 9.png');
  yellowStop = loadImage('./Cards/Yellow Action Stop.png');
  yellowSwitch = loadImage('./Cards/Yellow Action Switch.png');
  yellowPlus = loadImage('./Cards/Yellow Action +2.png');
  green0 = loadImage('./Cards/Green 0.png');
  green1 = loadImage('./Cards/Green 1.png');
  green2 = loadImage('./Cards/Green 2.png');
  green3 = loadImage('./Cards/Green 3.png');
  green4 = loadImage('./Cards/Green 4.png');
  green5 = loadImage('./Cards/Green 5.png');
  green6 = loadImage('./Cards/Green 6.png');
  green7 = loadImage('./Cards/Green 7.png');
  green8 = loadImage('./Cards/Green 8.png');
  green9 = loadImage('./Cards/Green 9.png');
  greenStop = loadImage('./Cards/Green Action Stop.png');
  greenSwitch = loadImage('./Cards/Green Action Switch.png');
  greenPlus = loadImage('./Cards/Green Action +2.png');
  blue0 = loadImage('./Cards/Blue 0.png');
  blue1 = loadImage('./Cards/Blue 1.png');
  blue2 = loadImage('./Cards/Blue 2.png');
  blue3 = loadImage('./Cards/Blue 3.png');
  blue4 = loadImage('./Cards/Blue 4.png');
  blue5 = loadImage('./Cards/Blue 5.png');
  blue6 = loadImage('./Cards/Blue 6.png');
  blue7 = loadImage('./Cards/Blue 7.png');
  blue8 = loadImage('./Cards/Blue 8.png');
  blue9 = loadImage('./Cards/Blue 9.png');
  blueStop = loadImage('./Cards/Blue Action Stop.png');
  blueSwitch = loadImage('./Cards/Blue Action Switch.png');
  bluePlus = loadImage('./Cards/Blue Action +2.png');
  wildColor = loadImage('./Cards/Wild Action Color.png');
  wildPlus = loadImage('./Cards/Wild Action +4.png');
  cardBack = loadImage('./Cards/Wild Back.png');
}

function initializeCards() {
  deck.push(new Card(red0, "red", "0"));
  deck.push(new Card(red1, "red", "1"));
  deck.push(new Card(red1, "red", "1"));
  deck.push(new Card(red2, "red", "2"));
  deck.push(new Card(red2, "red", "2"));
  deck.push(new Card(red3, "red", "3"));
  deck.push(new Card(red3, "red", "3"));
  deck.push(new Card(red4, "red", "4"));
  deck.push(new Card(red4, "red", "4"));
  deck.push(new Card(red5, "red", "5"));
  deck.push(new Card(red5, "red", "5"));
  deck.push(new Card(red6, "red", "6"));
  deck.push(new Card(red6, "red", "6"));
  deck.push(new Card(red7, "red", "7"));
  deck.push(new Card(red7, "red", "7"));
  deck.push(new Card(red8, "red", "8"));
  deck.push(new Card(red8, "red", "8"));
  deck.push(new Card(red9, "red", "9"));
  deck.push(new Card(red9, "red", "9"));
  deck.push(new Card(redStop, "red", "stop"));
  deck.push(new Card(redStop, "red", "stop"));
  deck.push(new Card(redSwitch, "red", "switch"));
  deck.push(new Card(redSwitch, "red", "switch"));
  deck.push(new Card(redPlus, "red", "plus"));
  deck.push(new Card(redPlus, "red", "plus"));

  deck.push(new Card(yellow0, "yellow", "0"));
  deck.push(new Card(yellow1, "yellow", "1"));
  deck.push(new Card(yellow1, "yellow", "1"));
  deck.push(new Card(yellow2, "yellow", "2"));
  deck.push(new Card(yellow2, "yellow", "2"));
  deck.push(new Card(yellow3, "yellow", "3"));
  deck.push(new Card(yellow3, "yellow", "3"));
  deck.push(new Card(yellow4, "yellow", "4"));
  deck.push(new Card(yellow4, "yellow", "4"));
  deck.push(new Card(yellow5, "yellow", "5"));
  deck.push(new Card(yellow5, "yellow", "5"));
  deck.push(new Card(yellow6, "yellow", "6"));
  deck.push(new Card(yellow6, "yellow", "6"));
  deck.push(new Card(yellow7, "yellow", "7"));
  deck.push(new Card(yellow7, "yellow", "7"));
  deck.push(new Card(yellow8, "yellow", "8"));
  deck.push(new Card(yellow8, "yellow", "8"));
  deck.push(new Card(yellow9, "yellow", "9"));
  deck.push(new Card(yellow9, "yellow", "9"));
  deck.push(new Card(yellowStop, "yellow", "stop"));
  deck.push(new Card(yellowStop, "yellow", "stop"));
  deck.push(new Card(yellowSwitch, "yellow", "switch"));
  deck.push(new Card(yellowSwitch, "yellow", "switch"));
  deck.push(new Card(yellowPlus, "yellow", "plus"));
  deck.push(new Card(yellowPlus, "yellow", "plus"));

  deck.push(new Card(green0, "green", "0"));
  deck.push(new Card(green1, "green", "1"));
  deck.push(new Card(green1, "green", "1"));
  deck.push(new Card(green2, "green", "2"));
  deck.push(new Card(green2, "green", "2"));
  deck.push(new Card(green3, "green", "3"));
  deck.push(new Card(green3, "green", "3"));
  deck.push(new Card(green4, "green", "4"));
  deck.push(new Card(green4, "green", "4"));
  deck.push(new Card(green5, "green", "5"));
  deck.push(new Card(green5, "green", "5"));
  deck.push(new Card(green6, "green", "6"));
  deck.push(new Card(green6, "green", "6"));
  deck.push(new Card(green7, "green", "7"));
  deck.push(new Card(green7, "green", "7"));
  deck.push(new Card(green8, "green", "8"));
  deck.push(new Card(green8, "green", "8"));
  deck.push(new Card(green9, "green", "9"));
  deck.push(new Card(green9, "green", "9"));
  deck.push(new Card(greenStop, "green", "stop"));
  deck.push(new Card(greenStop, "green", "stop"));
  deck.push(new Card(greenSwitch, "green", "switch"));
  deck.push(new Card(greenSwitch, "green", "switch"));
  deck.push(new Card(greenPlus, "green", "plus"));
  deck.push(new Card(greenPlus, "green", "plus"));

  deck.push(new Card(blue0, "blue", "0"));
  deck.push(new Card(blue1, "blue", "1"));
  deck.push(new Card(blue1, "blue", "1"));
  deck.push(new Card(blue2, "blue", "2"));
  deck.push(new Card(blue2, "blue", "2"));
  deck.push(new Card(blue3, "blue", "3"));
  deck.push(new Card(blue3, "blue", "3"));
  deck.push(new Card(blue4, "blue", "4"));
  deck.push(new Card(blue4, "blue", "4"));
  deck.push(new Card(blue5, "blue", "5"));
  deck.push(new Card(blue5, "blue", "5"));
  deck.push(new Card(blue6, "blue", "6"));
  deck.push(new Card(blue6, "blue", "6"));
  deck.push(new Card(blue7, "blue", "7"));
  deck.push(new Card(blue7, "blue", "7"));
  deck.push(new Card(blue8, "blue", "8"));
  deck.push(new Card(blue8, "blue", "8"));
  deck.push(new Card(blue9, "blue", "9"));
  deck.push(new Card(blue9, "blue", "9"));
  deck.push(new Card(blueStop, "blue", "stop"));
  deck.push(new Card(blueStop, "blue", "stop"));
  deck.push(new Card(blueSwitch, "blue", "switch"));
  deck.push(new Card(blueSwitch, "blue", "switch"));
  deck.push(new Card(bluePlus, "blue", "plus"));
  deck.push(new Card(bluePlus, "blue", "plus"));

  deck.push(new Card(wildColor, "wild", "color"));
  deck.push(new Card(wildColor, "wild", "color"));
  deck.push(new Card(wildColor, "wild", "color"));
  deck.push(new Card(wildColor, "wild", "color"));
  deck.push(new Card(wildPlus, "wild", "plus"));
  deck.push(new Card(wildPlus, "wild", "plus"));
  deck.push(new Card(wildPlus, "wild", "plus"));
  deck.push(new Card(wildPlus, "wild", "plus"));

  backCard = new Card(cardBack, "wild", "back");
}

function setup() {
  Game = createCanvas(windowWidth - document.getElementById('chat').offsetWidth, windowHeight);
  Game.parent("game");

  // Initialize Firebase
  let firebaseConfig = {
    apiKey: "AIzaSyDsfbJuD-erwKU-4_4iUIsQo0thhNGY-u0",
    authDomain: "uno-game-9b4f4.firebaseapp.com",
    databaseURL: "https://uno-game-9b4f4.firebaseio.com",
    projectId: "uno-game-9b4f4",
    storageBucket: "uno-game-9b4f4.appspot.com",
    messagingSenderId: "10301819108",
    appId: "1:10301819108:web:56c13d8741b57ab8"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  // Chat
  username = document.getElementById('AdaptInput');
  message = document.getElementById('message');
  send = document.getElementById('send');
  send.addEventListener("click", sendMessage);

  chat = database.ref('chat');
  chat.on('value', gotDataChat, errDataChat);

  // Initialize Cards
  initializeCards();

  shuffledDeck = FYKshuffle(deck);

  hand1 = new Hand();
  console.log(hand1.cards)
}

function draw() {
  // frameRate(5)
  background(50);
  stroke(0);
  line(0, 0, Game.width, Game.height);
  hand1.show();
  backCard.show(200, 20);

  let dis = hand1.cards[1].x - hand1.cards[0].x;
  for (let i = 0; i < hand1.cards.length; i++) {
    const e = hand1.cards[i];
    if (i == hand1.cards.length - 1) {
      e.clicked(dis, true);
    } else {
      e.clicked(dis);
    }
  }
}

function mouseClicked() {

  console.log("-------------------------");
  let dis = hand1.cards[1].x - hand1.cards[0].x;
  for (let i = 0; i < hand1.cards.length; i++) {
     const e = hand1.cards[i];
    if (i == hand1.cards.length - 1) {
       e.clicked(dis, true);
     } else {
       e.clicked(dis);
     }
   }

   add card
   hand1.cards.push(shuffledDeck.pop());
}

function mouseMoved() {

}

class Hand {
  constructor() {
    this.cards = [];
    for (let i = 0; i < 7; i++) {
      this.cards[i] = shuffledDeck.pop();
    }
  }

  show() {
    for (let i = 0; i < this.cards.length; i++) {
      if (Game.height < Game.width) {
        this.cards[i].show(20 + i * Game.width / 20,
          Game.height - Game.height / 5 - 20);
      } else if (Game.height >= Game.width) {
        this.cards[i].show(20 + i * Game.width / 20,
          Game.height - (Game.width) / 5 - 20);
      }
    }
  }
}

class Card {
  constructor(img, col, attr) {
    this.img = img;
    this.col = col;
    this.attr = attr;
    this.x;
    this.y;
    this.w;
    this.h;
    this.offsetX = false;
  }

  clicked(dis, last = false) {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (mouseX - this.x > 0 && mouseY - this.y > 0 && mouseY - this.y < this.h + this.h / 2 + 20) {
      if (last && mouseX - this.x < this.w) {
        this.offsetX = true;
        // this.show(this.x, this.y - 20);
      } else if (mouseX - this.x < dis) {
        this.offsetX = true;
        // this.show(this.x, this.y - 20);
      }
    }
  }

  show(x, y) {
    this.x = x;
    this.y = y;
    if (this.offsetX) {
      this.y -= this.h / 2;
    }
    if (Game.height < Game.width) {
      this.w = Game.height / 5 * 0.67;
      this.h = Game.height / 5;
      image(this.img, this.x, this.y,
        Game.height / 5 * 0.67,
        Game.height / 5);
    } else if (Game.height >= Game.width) {
      this.w = Game.width / 5 * 0.67;
      this.h = Game.width / 5;
      image(this.img, this.x, this.y,
        Game.width / 5 * 0.67,
        Game.width / 5);
    }
    this.offsetX = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth - document.getElementById('chat').offsetWidth, windowHeight);
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
    let username = chatlog[e].username.replace(/<[^>]*>?/gm, '');
    let message = chatlog[e].message.replace(/<[^>]*>?/gm, '');
    let li = createElement('li', timestamp + " <b>" + username + "</b> : " + message);
    li.class('message')
    li.parent('chatroom');
  });

  scrollToBottom("chatroom");
}

function errDataChat(err) {
  console.log('Chat Error?!\n' + err);
}

function sendMessage() {
  let data = {
    timestamp: timestamp(),
    username: username.value.replace(/<[^>]*>?/gm, ''),
    message: message.value.replace(/<[^>]*>?/gm, ''),
  }
  if (username.value != "" && message.value != "") {
    chat.push(data);
  }

  document.getElementById('message').value = "";
}

function timestamp() {
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

// Scroll
function scrollToBottom(id) {
  let element = document.getElementById(id);
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function FYKshuffle(array) {
  return array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
}
