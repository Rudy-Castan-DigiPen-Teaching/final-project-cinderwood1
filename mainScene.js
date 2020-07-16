//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class mainScene {
  constructor() {
    this.img = loadImage('IMG/HOME_Background.png');
    this.menu = loadImage('IMG/HOME_Menu.png');
    this.awards = loadImage('IMG/HOME_Awards.png');
    this.dotArray = [];
    for (let i = 0; i < 15; i++) {
      this.dotArray[i] = {
        x: floor(random(width)),
        y: floor(random(height)),
        b: 0,
        l: floor(random(300, 500)),
        c: 0
      }
    }

    this.newParticleTimer = 0;

    this.shArray = [];
    this.shArray[0] = new shape(color(255), color(0), 1, 200, createVector(width * -3 / 10, height * 2 / 10), 0.2, 0, 5);
    this.shArray[1] = new shape(color(255, 0, 0), color(0, 0, 255), 2, 200, createVector(width * 1 / 10, height * 3 / 10), 0.6, 1, 4);
    this.shArray[2] = new shape(color(34, 128, 197), color(81, 208, 237), 0, 200, createVector(width / 2, height * 4 / 10), 1, 2, 3);
    this.shArray[3] = new shape(color(255), color(0), 1, 200, createVector(width * 9 / 10, height * 3 / 10), 0.6, 3, 5);
    this.shArray[4] = new shape(color(255, 0, 0), color(0, 0, 255), 2, 200, createVector(width * 13 / 10, height * 2 / 10), 0.2, 4, 4);
    this.shArray[5] = new shape(color(34, 128, 197), color(81, 208, 237), 0, 200, createVector(width * 17 / 10, height * 1 / 10), 0.2, 5, 3);
    this.select = 2;
    this.leftBoolean = false;
    this.rightBoolean = false;
    this.downBoolean = false;
    this.upBoolean = false;

    this.mode = 0;

    this.arrowYPos = 100;
    this.playerLevel = 1;
    this.percent = 0;

    this.playBoolean = 0;
    this.playOpacity = 0;
    this.playAni = 0;

    this.transition=0;
    
    this.backButtonAni=0;
    
    this.map = new noteMap();
  }

  update() {
    //stop all music
    for(let i=0;i<musicArray.length;i++)
      musicArray[i].stop();
    //Update Particle
    for (let i = 0; i < this.dotArray.length; i++) {
      if (this.dotArray[i].c <= (this.dotArray[i].l / 2))
        this.dotArray[i].b += 1;
      else
        this.dotArray[i].b -= 1;
      this.dotArray[i].c++;
      //Remove Dead Particle
      if (this.dotArray[i].c == this.dotArray[i].l) {
        this.dotArray.splice(i, 1);
        i--;
      }
    }
    //Add New Particle
    if (this.newParticleTimer == 3) {
      this.newParticleTimer = 0;
      this.dotArray.push({
        x: floor(random(width)),
        y: floor(random(height)),
        b: 0,
        l: floor(random(300, 500)),
        c: 0
      });
    } else {
      this.newParticleTimer++;
    }

    //Key Checker
    if (keyIsDown(37) && this.leftBoolean == false && this.rightBoolean == false && this.shArray[0].animationFrame == 0&&this.playBoolean==0) {
      this.leftBoolean = true;
      // this.shArray.splice(4, 1);
      // if (this.shArray[this.select].imgNum == 0)
      //   this.shArray.splice(0, 0,new shape(color(255), color(0), 1, 200, createVector(width * -3 / 10, height * 3 / 10), 0.2, 0));
      // else if (this.shArray[this.select].imgNum == 1)
      //   this.shArray.splice(0, 0,new shape(color(255, 0, 0), color(0, 0, 255), 2, 200, createVector(width * -3 / 10, height * 3 / 10), 0.2, 0));
      // else if(this.shArray[this.select].imgNum == 2)
      //   this.shArray.splice(0, 0,new shape(color(34, 128, 197), color(81, 208, 237), 0, 200, createVector(width * -3 / 10, height * 3 / 10), 0.2, 0));

      this.select = (this.shArray.length + this.select - 1) % this.shArray.length;
    } else if (!keyIsDown(37))
      this.leftBoolean = false;

    if (keyIsDown(39) && this.leftBoolean == false && this.rightBoolean == false && this.shArray[0].animationFrame == 0&&this.playBoolean==0) {
      this.rightBoolean = true;

      this.select = (this.shArray.length + this.select + 1) % this.shArray.length;
    } else if (!keyIsDown(39))
      this.rightBoolean = false;

    this.shArray[(this.shArray.length + this.select - 2) % this.shArray.length].mover(0);
    this.shArray[(this.shArray.length + this.select - 1) % this.shArray.length].mover(1);
    this.shArray[this.select].mover(2);
    this.shArray[(this.shArray.length + this.select + 1) % this.shArray.length].mover(3);
    this.shArray[(this.shArray.length + this.select + 2) % this.shArray.length].mover(4);
    this.shArray[(this.shArray.length + this.select + 3) % this.shArray.length].mover(5);

    //key check for down Arrow
    if (keyIsDown(40) && this.downBoolean == false) {
      this.downBoolean = true;
      this.backButtonAni=8;
      if(this.playBoolean) {
        this.playBoolean=0;
      } else {
      this.mode = !this.mode;
      }
    } else if (!keyIsDown(40)) {
      this.downBoolean = false;
     this.backButtonAni=0; 
    }

    //key check for up Arrow
    if (keyIsDown(38) && this.upBoolean == false) {
      this.upBoolean = true;
      this.playBoolean++;
      this.playAni = 2;
    } else if (!keyIsDown(38)) {
      this.upBoolean = false;
      this.playAni = 0;
    }

    //Update Shape Array
    for (let i = 0; i < this.shArray.length; i++) {
      this.shArray[i].update();
      // print(this.shArray[i].cornerArray);
    }

    //playOpacity
    if (this.playBoolean && this.playOpacity < 180)
      this.playOpacity += 15;
    else if (!this.playBoolean && this.playOpacity > 0)
      this.playOpacity -= 15;
    
    if(this.playBoolean>=2)
      this.transition++;
    else
      this.transition=0;
    
    if(this.transition==10) {
      this.playBoolean=0;
      gs = new gameScene(this.shArray[this.select].corners,(3+this.select-2)%3);
      gs.shape = this.shArray[this.select];
      this.map.init((3+this.select-1)%3);
      SCENE=gs;
    }
  }

  display() {
    image(this.img, width / 2, height / 2);
    image(this.menu, width / 2, height / 2);
    image(this.awards, width / 2, height / 2);
    //display Particles
    noFill();
    strokeWeight(3.5);
    for (let i = 0; i < this.dotArray.length; i++) {
      stroke(255, this.dotArray[i].b);
      point(this.dotArray[i].x, this.dotArray[i].y);
    }

    //display shapes Array
    for (let i = 0; i < this.shArray.length; i++) {
      this.shArray[i].setCornerArray();
      this.shArray[i].display();
    }


    //display left Arrow
    fill(255, 150);
    noStroke();
    beginShape();
    vertex(width * 0.5 / 30, height / 2 + this.arrowYPos);
    vertex(width * 3 / 30, height * 12.2 / 30 + this.arrowYPos);
    vertex(width * 3 / 30, height * 13.2 / 30 + this.arrowYPos);
    vertex(width * 1.3 / 30, height / 2 + this.arrowYPos);
    vertex(width * 3 / 30, height * 16.8 / 30 + this.arrowYPos);
    vertex(width * 3 / 30, height * 17.8 / 30 + this.arrowYPos);
    endShape(CLOSE);
    push();
    translate(width * 3 / 30, height / 2 + this.arrowYPos);
    rotate(QUARTER_PI);
    square(0, 0, 20);
    pop();
    if (this.leftBoolean) {
      for (let i = 0; i < 20; i++) {
        stroke(40, 40, 255, 12);
        strokeWeight(i);
        beginShape();
        vertex(width * 0.5 / 30, height / 2 + this.arrowYPos);
        vertex(width * 3 / 30, height * 12.2 / 30 + this.arrowYPos);
        vertex(width * 3 / 30, height * 13.2 / 30 + this.arrowYPos);
        vertex(width * 1.3 / 30, height / 2 + this.arrowYPos);
        vertex(width * 3 / 30, height * 16.8 / 30 + this.arrowYPos);
        vertex(width * 3 / 30, height * 17.8 / 30 + this.arrowYPos);
        endShape(CLOSE);
        push();
        translate(width * 3 / 30, height / 2 + this.arrowYPos);
        rotate(QUARTER_PI);
        square(0, 0, 20);
        pop();
      }
    }
    //display right Arrow

    fill(255, 150);
    noStroke();
    strokeWeight(1);
    beginShape();
    vertex(width * 29.5 / 30, height / 2 + this.arrowYPos);
    vertex(width * 27 / 30, height * 12.2 / 30 + this.arrowYPos);
    vertex(width * 27 / 30, height * 13.2 / 30 + this.arrowYPos);
    vertex(width * 28.7 / 30, height / 2 + this.arrowYPos);
    vertex(width * 27 / 30, height * 16.8 / 30 + this.arrowYPos);
    vertex(width * 27 / 30, height * 17.8 / 30 + this.arrowYPos);
    endShape(CLOSE);
    push();
    translate(width * 27 / 30, height / 2 + this.arrowYPos);
    rotate(QUARTER_PI);
    square(0, 0, 20);
    pop();
    if (this.rightBoolean) {
      for (let i = 0; i < 20; i++) {
        stroke(40, 40, 255, 12);
        strokeWeight(i);
        beginShape();
        vertex(width * 29.5 / 30, height / 2 + this.arrowYPos);
        vertex(width * 27 / 30, height * 12.2 / 30 + this.arrowYPos);
        vertex(width * 27 / 30, height * 13.2 / 30 + this.arrowYPos);
        vertex(width * 28.7 / 30, height / 2 + this.arrowYPos);
        vertex(width * 27 / 30, height * 16.8 / 30 + this.arrowYPos);
        vertex(width * 27 / 30, height * 17.8 / 30 + this.arrowYPos);
        endShape(CLOSE);
        push();
        translate(width * 3 / 30, height / 2 + this.arrowYPos);
        rotate(QUARTER_PI);
        square(0, 0, 20);
        pop();
      }
    }

    //display difficulty

    strokeWeight(1)
    for (let i = 0; i < 50; i++) {
      stroke(0, 110 - i * 2);
      line(270 + i, 650 + i, 530 + i, 650 + i);
      line(530 + i, 627 + i, 530 + i, 648 + i);
    }
    stroke(255);
    strokeWeight(4);
    if (!this.mode)
      fill(124, 153, 212);
    else
      fill(35, 26, 50);
    beginShape();
    vertex(300, 620);
    vertex(385, 620);
    vertex(415, 660);
    vertex(300, 660);
    vertex(270, 650);
    vertex(270, 630);
    endShape(CLOSE);

    noStroke();
    if (!this.mode)
      fill(255);
    else
      fill(255, 80);
    push();
    translate(375, 640);
    beginShape();
    for (let i = 0; i < this.shArray[this.select].corners; i++) {
      let angle = TWO_PI / this.shArray[this.select].corners * i;
      let x = sin(angle) * 12;
      let y = cos(angle) * 12;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    textSize(25);
    text("EASY", 325, 640);

    stroke(255);
    if (this.mode)
      fill(188, 107, 96);
    else
      fill(35, 26, 50);
    beginShape();
    vertex(415, 660);
    vertex(500, 660);
    vertex(530, 650);
    vertex(530, 630);
    vertex(500, 620);
    vertex(385, 620);
    endShape(CLOSE);

    noStroke();
    if (this.mode)
      fill(255);
    else
      fill(255, 80);
    push();
    translate(425, 640);
    beginShape();
    for (let i = 0; i < this.shArray[this.select].corners + 2; i++) {
      let angle = TWO_PI / (this.shArray[this.select].corners + 2) * i;
      let x = sin(angle) * 12;
      let y = cos(angle) * 12;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    textSize(25);
    text("HARD", 475, 640);


    //display back button
    noFill();
    strokeWeight(8);
    stroke(255, 80);
    circle(width - 60, height - 60, 50+this.backButtonAni);
    noStroke();
    fill(255, 80);
    circle(width - 60, height - 60, 25+this.backButtonAni);

    //display player level
    noFill();
    stroke(255, 160);
    strokeWeight(2);
    quad(width - 145, 40, width - 165, 80, width + 2, 80, width + 2, 40);
    noStroke();
    fill(255, 50);
    quad(width - 165, 40, width - 145, 80, width + 2, 80, width + 2, 40);
    fill(255);
    text("Lv. " + this.playerLevel, width - 110, 60);

    //display music score
    push();
    translate(width / 2, 20);
    fill(255, 180);
    textSize(20);
    text(gs.st.bestAcc + "%", 0, 0);
    rotate(QUARTER_PI);
    noStroke();
    fill(255, 80);
    square(0, 0, 40);
    pop();
    push();
    translate(width / 2 - 32, 0);
    rotate(QUARTER_PI);
    noStroke();
    fill(255, 160);
    square(0, 0, 20);
    pop();
    push();
    translate(width / 2 + 32, 0);
    rotate(QUARTER_PI);
    noStroke();
    fill(255, 160);
    square(0, 0, 20);
    pop();

    if (this.playBoolean) {
      fill(0, 180);
      rect(width / 2, height / 2, width, height);
    }
    noFill();
    stroke(255, this.playOpacity);
    strokeWeight(2 + this.playAni);
    line(width / 2 - 100, height / 2 - 135, width / 2 - 20, height / 2 - 135);
    line(width / 2 + 100, height / 2 - 135, width / 2 + 20, height / 2 - 135);
    line(width / 2 - 20, height / 2 - 135, width / 2 - 5, height / 2 - 150);
    line(width / 2 + 8, height / 2 - 135, width / 2 - 5, height / 2 - 150);
    line(width / 2 + 20, height / 2 - 135, width / 2 + 5, height / 2 - 150);
    line(width / 2 - 8, height / 2 - 135, width / 2 + 5, height / 2 - 150);
    strokeWeight(1 + this.playAni);
    line(width / 2 - 120, height / 2 - 135, width / 2 + 120, height / 2 - 135);

    strokeWeight(2 + this.playAni);
    line(width / 2 - 100, height / 2 + 0, width / 2 - 20, height / 2 + 0);
    line(width / 2 + 100, height / 2 + 0, width / 2 + 20, height / 2 + 0);
    line(width / 2 - 20, height / 2 + 0, width / 2 - 5, height / 2 + 15);
    line(width / 2 + 8, height / 2 + 0, width / 2 - 5, height / 2 + 15);
    line(width / 2 + 20, height / 2 + 0, width / 2 + 5, height / 2 + 15);
    line(width / 2 - 8, height / 2 + 0, width / 2 + 5, height / 2 + 15);
    strokeWeight(1 + this.playAni);
    line(width / 2 - 120, height / 2 + 0, width / 2 + 120, height / 2 + 0);

    fill(255, this.playOpacity);
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

    textSize(70 + this.playAni * 3);
    text("PLAY", width / 2, height / 2 - 67.5);
  }
}