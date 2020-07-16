//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class shape {
  constructor(c1, c2, imgNum, shapeSize, p, s, state, corners) {

    this.position = createVector(p.x, p.y);
    this.scale = s;
    this.targetPosition = createVector(p.x, p.y);
    this.targetScale = s;

    this.selectState = state;
    this.animationFrame = 0;
    this.animationDuration = 10;
    this.movement = createVector();
    this.scaleDif = 0;

    this.shapeSize = shapeSize;
    this.shapeLineWidth = 5;
    this.img = [];
    
    this.angle = 0;
    this.cornerArray = [];

    this.c1 = c1;
    this.c2 = c2;
    this.imgNum = imgNum;
    this.corners = corners;

    this.buffer = createVector();
    this.direction = createVector();
    this.mag;
    this.lineDir = createVector();

    this.orgin = createVector();
    this.towards = createVector();
  }

  update() {
    
    //Move to Target
    switch (this.selectState) {
      case 0:
        this.targetPosition.set(width * -3 / 10, height * 2 / 10);
        this.targetScale = 0.2;
        break;
      case 1:
        this.targetPosition.set(width * 1 / 10, height * 3 / 10);
        this.targetScale = 0.6
        break;
      case 2:
        this.targetPosition.set(width * 5 / 10, height * 4 / 10);
        this.targetScale = 1
        break;
      case 3:
        this.targetPosition.set(width * 9 / 10, height * 3 / 10);
        this.targetScale = 0.6
        break;
      case 4:
        this.targetPosition.set(width * 13 / 10, height * 2 / 10);
        this.targetScale = 0.2;
        break;
      case 5:
        this.targetPosition.set(width * 17 / 10, height * 1 / 10);
        this.targetScale = 0.2;
        break;
    }
    if (SCENE == gs) {
      this.targetPosition.set(width / 2, height / 2);
      this.targetScale = 1;
    }
    if(SCENE == ms) {
     gs.gameState.isFinished=false;
    }
    if(gs.gameState.isFinished) {
      this.targetPosition.set(width * 1 / 4, height / 2);
        this.targetScale = 0.9;
    }

    if ((this.position.x!=this.targetPosition.x||this.position.y != this.targetPosition.y) && this.animationFrame == 0) {
      this.animationFrame++;
      this.movement.set((this.targetPosition.x - this.position.x) / this.animationDuration, (this.targetPosition.y - this.position.y) / this.animationDuration);
      this.scaleDif = (this.targetScale - this.scale) / this.animationDuration;

      this.position.add(this.movement);
      this.scale += this.scaleDif;
    } else if ((this.position.x!=this.targetPosition.x||this.position.y != this.targetPosition.y) && this.animationFrame < this.animationDuration) {
      this.animationFrame++;
      this.position.add(this.movement);
      this.scale += this.scaleDif;
    } else if (this.animationFrame == this.animationDuration) {
      this.animationFrame = 0;
      this.position.set(this.targetPosition.x, this.targetPosition.y);
      this.scale = this.targetScale;
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    scale(this.scale);

    if (SCENE != gs) {
      imageMode(CENTER);
      AlbumImgArray[this.imgNum].resize(this.shapeSize * 1.8, 0);
      image(AlbumImgArray[this.imgNum], 0, 0);
    }

    //Shape Stroke
    for (let i = 0; i < this.corners; i++) {
      //Shine
      stroke(255, 3);
      for (let j = 0; j < 15; j++) {
        strokeWeight(10 + j * 2)
        // line(this.cornerArray[i].x, this.cornerArray[i].y, this.cornerArray[(i + 1) % this.corners].x, this.cornerArray[(i + 1) % this.corners].y);
        line(this.cornerArray[i].x, this.cornerArray[i].y, this.cornerArray[(i + 1) % this.corners].x, this.cornerArray[(i + 1) % this.corners].y);
      }
      //Stroke
      push();
      // rotate(TWO_PI/this.corners*i+QUARTER_PI);
      strokeWeight(2.5);
      noStroke();
      this.direction.set(this.cornerArray[(i + 1) % this.corners].x - this.cornerArray[i].x, this.cornerArray[(i + 1) % this.corners].y - this.cornerArray[i].y);
      this.lineDir.set(this.direction.x, this.direction.y);
      this.lineDir.setMag(2);
      this.lineDir.rotate(radians(-90));
      for (let j = 0; j < this.shapeSize; j++) {
        this.buffer.set(this.direction.x, this.direction.y);
        this.mag = map(j, 0, this.shapeSize, 0, this.cornerArray[i].dist(this.cornerArray[(i + 1) % this.corners]));
        this.buffer.setMag(this.mag);
        this.buffer.add(this.cornerArray[i].x, this.cornerArray[i].y);
        if (i % 2)
          stroke(lerpColor(this.c1, this.c2, map(j, 0, this.shapeSize, 0, 1)));
        else
          stroke(lerpColor(this.c2, this.c1, map(j, 0, this.shapeSize, 0, 1)));
        line(this.buffer.x - this.lineDir.x, this.buffer.y - this.lineDir.y, this.buffer.x + this.lineDir.x, this.buffer.y + this.lineDir.y);
      }
      //intercepters
      if (SCENE == gs) {
        if (gs.trajectoryArray[i].keyBoolean == true)
          fill(255, 180)
        else
          fill(255, 80);
      } else
        fill(255, 80);
      noStroke();

      this.orgin.set(this.cornerArray[i].x / 10, this.cornerArray[i].y / 10);
      this.towards.set(this.cornerArray[(i + 1) % this.corners].x / 10, this.cornerArray[(i + 1) % this.corners].y / 10);
      this.buffer.set(this.direction.x / 15, this.direction.y / 15);
      quad(this.orgin.x * 8.5 + this.buffer.x, this.orgin.y * 8.5 + this.buffer.y,
        this.towards.x * 8.5 - this.buffer.x, this.towards.y * 8.5 - this.buffer.y,
        this.towards.x * 7 - this.buffer.x, this.towards.y * 7 - this.buffer.y,
        this.orgin.x * 7 + this.buffer.x, this.orgin.y * 7 + this.buffer.y);
      pop();
    }

    //Cirle Shine Effect
    noFill();
    for (let i = 0; i < 15; i++) {
      stroke(255, 1);
      strokeWeight(5 + i);
      circle(0, 0, this.shapeSize * 1.5);
    }

    if (SCENE == ms) {
      noStroke();
      fill(255);
      if (this.imgNum == 0) {
        textSize(22);
        text("Owl City", 0, 240);
        textSize(30);
        text("Fire Flies", 0, 270);
      } else if (this.imgNum == 1) {
        textSize(22);
        text("Sub Urban", 0, 240);
        textSize(30);
        text("Cradles [NCS Release]", 0, 270);
      } else if (this.imgNum == 2) {
        textSize(22);
        text("Lo-fi Type Beat", 0, 240);
        textSize(30);
        text("Rain", 0, 270);
      }
    }
    pop();
  }

  mover(state) {
    this.selectState = state;
    // print(this.selectState);
  }
  
  setCornerArray() {
   if (this.corners % 2 == 1)
      this.angle = TWO_PI / this.corners / 2 - TWO_PI / this.corners;
    else
      this.angle = -TWO_PI / this.corners;
    for (let i = 0; i < this.corners; i++) {
      let x = sin(this.angle) * this.shapeSize;
      let y = cos(this.angle) * this.shapeSize;
      this.cornerArray[i] = createVector(x, y);
      this.angle += TWO_PI / this.corners;
    }
    // print(this.cornerArray); 
  }
}