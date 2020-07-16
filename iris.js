//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class iris {
  constructor() {
    this.rotate1 = 0;
    this.radian1 = 75;
    this.rotate2 = 0;
    this.radian2 = 60;
    this.rotate3 = 0;
    this.radian3 = 45;
    this.black = color(55);
    this.grey = color(100);
    this.white = color(160);

    this.positionEnd = createVector(width / 2, height / 2);
    this.positionStart = createVector(400, 800);
    this.currentPosition = createVector(this.positionStart.x, this.positionStart.y);
    this.targetPosition = createVector();
    this.mag = 0;
    this.directionBuffer = createVector(this.positionEnd.x - this.positionStart.x, this.positionEnd.y - this.positionStart.y);

    this.anis = 0;
    this.sceneBoolean = false;

    this.loadCount = 0;

    this.shine = 0;
    this.shineBoolean = false;

    this.titleShine = 0;
  }
  update() {
    stroke(255);
    strokeWeight(3);
    strokeCap(SQUARE);
    this.rotate1 += radians(1);
    this.rotate2 -= radians(1);
    this.rotate3 += radians(1);
    if (this.sceneBoolean && this.anis < 1200)
      this.anis += 10;


    this.mag = map(this.loadCount, 0, musicArray.length+BGImgArray.length+AlbumImgArray.length, 0, this.positionEnd.dist(this.positionStart))
    this.directionBuffer.setMag(this.mag);
    this.targetPosition.set(this.positionStart.x, this.positionStart.y);
    this.targetPosition.add(this.directionBuffer);

    if (this.currentPosition.y > this.targetPosition.y)
      this.currentPosition.y -= 5;

    if (!this.shineBoolean) {
      this.shine += 4;
      if (this.shine >= 255)
        this.shineBoolean = true;
    } else if (this.shineBoolean) {
      this.shine -= 2;
      if (this.shine <= 0)
        this.shineBoolean = false;
    }
    if (this.currentPosition.y == this.positionEnd.y && (mouseIsPressed || keyIsPressed))
      this.sceneBoolean = true;
    // print(this.currentPosition.y,this.positionEnd);
    if (this.anis >= 1200)
      SCENE=ms;
  }

  display() {
    noStroke();
    for (let i = 0; i < 30; i++) {
      fill(50 - i);
      rect(width / 2, 550 - 10 * i, width, 10);
    }
    if (this.sceneBoolean)
      this.textCover();
    push();
    translate(this.currentPosition.x, this.currentPosition.y);
    for (let i = 25; i > 0; i--) {
      noStroke();
      fill(255, 20 - (i / 4));
      circle(0, 0, i * 4 + this.anis)
    }
    noFill();
    push(); //outer
    rotate(this.rotate1);
    stroke(this.black);
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(-30), radians(200));
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(260), radians(280));
    stroke(this.grey);
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(200), radians(210));
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(220), radians(260));
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(300), radians(310));
    stroke(this.white);
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(210), radians(220));
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(280), radians(300));
    arc(0, 0, this.radian1 + this.anis, this.radian1 + this.anis, radians(310), radians(330));
    pop();
    push(); //center
    rotate(this.rotate2);
    stroke(this.grey);
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(-70), radians(110));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(150), radians(160));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(170), radians(245));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(260), radians(275));
    stroke(this.white);
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(275), radians(290));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(110), radians(120));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(140), radians(150));
    arc(0, 0, this.radian2 + this.anis, this.radian2 + this.anis, radians(160), radians(170));
    pop();
    push();
    rotate(this.rotate3);
    stroke(this.grey);
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(20), radians(30));
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(45), radians(240));
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(265), radians(280));
    stroke(this.white);
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(30), radians(45));
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(240), radians(265));
    stroke(this.black);
    arc(0, 0, this.radian3 + this.anis, this.radian3 + this.anis, radians(305), radians(320));
    pop();
    fill(35);
    noStroke();
    circle(0, 0, 20 + this.anis);
    fill(255);
    circle(0, 0, 5 + this.anis);
    pop();

    if (this.currentPosition.y < this.positionEnd.y + 50) {
      if (this.titleShine < 150)
        this.titleShine += 0.5;
      noFill();
      textSize(30);
      for (let i = 0; i < 15; i++) {
        stroke(255, 1);
        strokeWeight(15 - i);
        push();
        textAlign(CENTER);
        scale(1.5,0.8);
        text("S  Y  -  A  H", (width / 2)/3*2, 550);
        pop();
        noStroke();
        fill(255, this.titleShine);
        text("p r e s s   t o   s t a r t", width / 2, 600);
      }
    }

    if (!this.sceneBoolean)
      this.textCover();
  }

  textCover() {
    noStroke();
    fill(30, 254);
    rect(width / 2, 625, width, 150);

    noStroke();
    for (let i = 0; i < 30; i++) {
      fill(255, 3)
      arc(width / 2, 550, i * 15 + 600, i * 6, 0, PI);

    }

    noFill();
    textSize(30);
    for (let i = 0; i < 15; i++) {
      stroke(255, map(this.shine, 0, 255, 0, 3));
      strokeWeight(15 - i);
      if (this.currentPosition.y == this.positionEnd.y)
        text("p r e s s   t o   s t a r t", width / 2, 600);
      else
        text(" L o a d i n g . . .", width / 2, 600);
    }
    noStroke();
    fill(255, map(this.shine, 0, 255, 0, 150));
    if (this.currentPosition.y == this.positionEnd.y)
      text("p r e s s   t o   s t a r t", width / 2, 600);
    else
      text(" L o a d i n g . . .", width / 2, 600);
  }
}