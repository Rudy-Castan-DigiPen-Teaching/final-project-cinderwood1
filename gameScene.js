//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class gameScene {
  constructor(corners, imgNum) {
    this.corners = corners;
    this.imgNum = imgNum;

    this.trajectoryArray = [];
    let chars = [{
      char: 'SPACE',
      num: 32
    }, {
      char: 'J',
      num: 74
    }, {
      char: 'H',
      num: 72
    }, {
      char: 'F',
      num: 70
    }, {
      char: 'D',
      num: 68
    }];
    this.angle = 0;
    this.trajectoryLength = 450;
    this.shape;

    for (let i = 0; i < this.corners; i++) {
      let x = sin(this.angle) * this.trajectoryLength;
      let y = cos(this.angle) * this.trajectoryLength;
      this.trajectoryArray[i] = new trajectory(createVector(x, y), createVector(0, 0), createVector(x * 2.8 / 10, y * 2.8 / 10), color(200), color(0, 255, 255), chars[i].char, chars[i].num);
      this.angle += TWO_PI / corners;
    }

    this.st = new scoreTracker();

    this.gameState = {
      isFinished: false,
      ani: 0,
      dur: 180
    }

    this.readyAni = 180;
    this.barWidth = 0;

    this.downBoolean = false;
    this.backButtonAni = 0;
    this.OptionBoolean = false;

    this.startDelay = 5000;

    if (this.imgNum != null) {
      musicArray[this.imgNum].play(this.startDelay / 1000);
      musicArray[this.imgNum].onended(() => this.gameState.isFinished = true);
    }

    this.eye = new eye();
  }

  update() {
    for (let i = 0; i < this.corners; i++)
      this.trajectoryArray[i].update();
    this.shape.update();
    this.eye.update();

    if (this.readyAni > 0)
      this.readyAni -= 2;
    if (this.barWidth < width)
      this.barWidth += 10;

    //key check for down Arrow
    if (keyIsDown(40) && this.downBoolean == false) {
      this.downBoolean = true;
      this.backButtonAni = 8;
      this.optionBoolean = !this.optionBoolean;
    } else if (!keyIsDown(40)) {
      this.downBoolean = false;
      this.backButtonAni = 0;
    }

    if (this.gameState.isFinished && this.gameState.ani < this.gameState.dur) {
      this.gameState.ani += 2;
    } else if (this.gameState.isFinished && this.gameState.ani >= this.gameState.dur) {
      if (mouseIsPressed || keyIsPressed) {
        this.gameState.ani = 0;
        this.gameState.isFinished = false;
        this.st.best();
        SCENE = ms;
      }
    }
  }

  display() {
    BGImgArray[0].resize(0, 700);
    BGImgArray[1].resize(800, 0);
    BGImgArray[2].resize(0, 700);
    image(BGImgArray[this.imgNum], width / 2, height / 2);
    push();
    translate(this.shape.position.x, this.shape.position.y);
    for (let i = 0; i < this.corners; i++)
      this.trajectoryArray[i].display();
    pop();
    this.shape.display();
    this.eye.display();

    if (this.imgNum == 0 || this.imgNum == 2) {
      fill(0, 180);
      noStroke();
      rect(width / 2, height / 2, width, height);
      fill(255);
      textSize(30);
      text("Note Map has not been made", width / 2, height / 2 - 50);
      text("Currently Available Map : Cradles [NCS Release]", width / 2, height / 2);
      text("Please try a different song", width / 2, height / 2 + 50);
      text("Press Any Key to Return...", width / 2, height / 2 + 100);
      if (mouseIsPressed || keyIsPressed)
        SCENE = ms;
    } else if (this.imgNum == 1) {
      //ready
      fill(0, this.readyAni);
      rect(width / 2, height / 2, width, height);
      noFill();
      stroke(255, this.readyAni);
      strokeWeight(2);
      line(width / 2 - 100, height / 2 - 135, width / 2 - 20, height / 2 - 135);
      line(width / 2 + 100, height / 2 - 135, width / 2 + 20, height / 2 - 135);
      line(width / 2 - 20, height / 2 - 135, width / 2 - 5, height / 2 - 150);
      line(width / 2 + 8, height / 2 - 135, width / 2 - 5, height / 2 - 150);
      line(width / 2 + 20, height / 2 - 135, width / 2 + 5, height / 2 - 150);
      line(width / 2 - 8, height / 2 - 135, width / 2 + 5, height / 2 - 150);
      strokeWeight(1);
      line(width / 2 - 120, height / 2 - 135, width / 2 + 120, height / 2 - 135);

      strokeWeight(2);
      line(width / 2 - 100, height / 2 + 0, width / 2 - 20, height / 2 + 0);
      line(width / 2 + 100, height / 2 + 0, width / 2 + 20, height / 2 + 0);
      line(width / 2 - 20, height / 2 + 0, width / 2 - 5, height / 2 + 15);
      line(width / 2 + 8, height / 2 + 0, width / 2 - 5, height / 2 + 15);
      line(width / 2 + 20, height / 2 + 0, width / 2 + 5, height / 2 + 15);
      line(width / 2 - 8, height / 2 + 0, width / 2 + 5, height / 2 + 15);
      strokeWeight(1);
      line(width / 2 - 120, height / 2 + 0, width / 2 + 120, height / 2 + 0);

      fill(255, this.readyAni);
      noStroke();
      push();
      translate(width / 2 - 110, height / 2 - 67.5);
      rotate(QUARTER_PI);
      square(0, 0, 15);
      pop();
      push();
      translate(width / 2 + 110, height / 2 - 67.5);
      rotate(QUARTER_PI);
      square(0, 0, 15);
      pop();

      textSize(70);
      text("READY", width / 2, height / 2 - 67.5);
    }
    //top bar
    stroke(255, 180 - this.gameState.ani);
    strokeWeight(2);
    noFill();
    line(0, 50, this.barWidth, 50);
    push();
    noStroke();
    fill(255, 180 - this.gameState.ani);
    textAlign(LEFT);
    if (this.imgNum == 0) {
      textSize(18);
      text("Owl City", 30, 37);
      textSize(24);
      text("Fire Flies", 30, 68);
    } else if (this.imgNum == 1) {
      textSize(18);
      text("Sub Urban", 30, 37);
      textSize(24);
      text("Cradles [NCS Release]", 30, 68);
    } else if (this.imgNum == 2) {
      textSize(18);
      text("Lo-fi Type Beat", 30, 37);
      textSize(24);
      text("Rain", 30, 68);
    }
    textAlign(RIGHT)
    textSize(24);
    text(this.st.accuarcy() + " %", width - 30, 37);
    pop();

    //back button
    noFill();
    strokeWeight(8);
    stroke(255, 80 - this.gameState.ani);
    circle(width - 50, 90, 50 + this.backButtonAni);
    noStroke();
    fill(255, 80 - this.gameState.ani);
    circle(width - 50, 90, 25 + this.backButtonAni);

    //game mode
    noStroke();
    textSize(26);
    if (ms.mode) {
      fill(200, 100, 100, 50 - this.gameState.ani);
      rect(width - 50, height - 30, 100, 30);
      fill(255, 180 - this.gameState.ani);
      text("HARD", width - 50, height - 30);
    } else {
      fill(100, 100, 200, 50 - this.gameState.ani);
      rect(width - 50, height - 30, 100, 30);
      fill(255, 180 - this.gameState.ani);
      text("EASY", width - 50, height - 30);
    }


    if (this.gameState.isFinished) {
      textSize(100);
      noStroke();
      fill(255, this.gameState.ani - 100);
      textAlign(LEFT, CENTER);
      text("RESULTS", 20, 80);
      for (let i = 0; i <= 500; i++) {
        stroke(200, i / 5 + this.gameState.ani - 180);
        line(width - 500 + i, 100, width - 500 + i, 200);
      }
      textAlign(RIGHT, CENTER);
      noStroke();
      fill(255, this.gameState.ani);
      textSize(30);
      text("Fireflies (Said The Sky Remix)", width - 10, 125);
      text("[NCS Fan-Mde]", width - 10, 170);

      textAlign(CENTER, CENTER);

      textSize(30);
      text("PERFECT", 520, 280);
      textSize(75);
      text(this.st.perfect, 520, 340);

      textSize(30);
      text("GOOD", 420, 450);
      textSize(75);
      text(this.st.good, 420, 510);

      textSize(30);
      text("MISS", 680, 435);
      textSize(75);
      text(this.st.miss, 680, 495);

      textAlign(RIGHT, CENTER);
      textSize(25);
      text("Max Combo : " + this.st.maxCombo, 530, 580);
      text("Accuray Percent : " + round(this.st.acc, 3), 530, 625);

      textAlign(CENTER, CENTER);
      textSize(100);
      if (this.st.acc > 90)
        text("A", 650, 610);
      else if (this.st.acc > 80)
        text("B", 650, 610);
      else if (this.st.acc > 70)
        text("C", 650, 610);
      else if (this.st.acc > 60)
        text("D", 650, 610);
      else if (this.st.acc > 50)
        text("E", 650, 610);
      else
        text("F", 650, 610);
    }
  }
}