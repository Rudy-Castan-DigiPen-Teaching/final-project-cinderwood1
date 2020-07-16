//Sunwoo Won, Final Project, CS099, Spring 2020.7.16

let ms, gs, ss;
let SCENE;
let selectedShape;
let musicArray = [];
let BGImgArray = [];
let AlbumImgArray = [];

function setup() {
  createCanvas(800, 700);

  rectMode(CENTER);
  strokeCap(PROJECT);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  font = loadFont('font/Koruri-Light.ttf');
  textFont(font);

  ss = new iris();
  ms = new mainScene();
  gs = new gameScene(5, null);

  musicArray[0] = loadSound('Music/0Owl City - Fireflies (Said The Sky Remix) [NCS Fan-Made].mp3', cb());
  musicArray[1] = loadSound('Music/0Sub Urban - Cradles [NCS Release].mp3', cb());
  musicArray[2] = loadSound('Music/0Lo-fi Type Beat - Rain (Prod. Lee).mp3', cb());

  AlbumImgArray[0] = loadImage('IMG/fireflies-album.png', cb());
  AlbumImgArray[1] = loadImage('IMG/cradle_album.png', cb());
  AlbumImgArray[2] = loadImage('IMG/lofi-album.png', cb());

  BGImgArray[0] = loadImage('IMG/fireflies-background.jpg', cb());
  BGImgArray[1] = loadImage('IMG/cradle_background.png', cb());
  BGImgArray[2] = loadImage('IMG/lofi-background.jpg', cb());

  SCENE = ss;
}

function draw() {
  background(20);
  SCENE.update();
  SCENE.display();
}

function cb() {
  ss.loadCount++;
}