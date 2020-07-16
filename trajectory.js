//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class trajectory {
  constructor(head, tail, intercept, interceptColor, headAndTailColor, keyChar, keyCode) {
    this.head = head;
    this.tail = tail;
    this.intercept = intercept;
    this.noteArray = [];
    this.direction = createVector(tail.x - head.x, tail.y - head.y);
    this.mag;
    this.buffer = createVector();
    this.interceptColor = interceptColor;
    this.interceptColorSave = interceptColor;
    this.interceptSize = 30;
    this.interceptSizeSave = 30;
    this.headAndTailColor = headAndTailColor;
    this.noteColor = color(255);

    this.rotatation = this.direction.heading();
    this.noteArray = [];
    this.animationDuration = 50;

    this.keyChar = keyChar;
    this.keyCode = keyCode;
    this.keyBoolean = false;

    this.perfectArea = 15;
    this.goodArea = 30;

    this.rotation = this.direction.heading() + HALF_PI;

    this.searchDist = 1000;
    this.searchNoteInArray = 0;

    this.effectArray = [];

    this.startDelay = 10000;
  }

  update() {

    for (let i = 0; i < this.noteArray.length; i++) {
      this.mag = map(this.noteArray[i].v.z, 0, this.animationDuration, 0, this.head.dist(this.tail));
      this.buffer.set(this.direction.x, this.direction.y);
      this.buffer.setMag(this.mag);

      this.noteArray[i].v.set(this.head.x, this.head.y, this.noteArray[i].v.z + 1);
      this.noteArray[i].v.add(this.buffer.x, this.buffer.y);

      if (this.noteArray[i].v.dist(this.tail) < this.intercept.dist(this.tail)) {
        this.noteArray[i].p = true;
        this.noteArray[i].d -= 0.05;
      }

      if (this.noteArray[i].v.z == this.animationDuration) {
        this.noteArray.splice(i, 1);
        i--;
        gs.st.track(2);
      }
    }


    if (keyIsDown(this.keyCode) && !this.keyBoolean) {
      this.keyBoolean = true;
      this.interceptColor = color(150);
      this.interceptSize = 22;
      gs.eye.targetPosition.set(this.intercept.x+width/2,this.intercept.y+height/2);

      this.searchDist = 1000;
      for (let i = 0; i < this.noteArray.length; i++) {
        if (this.noteArray[i].v.dist(this.intercept) < this.searchDist) {
          this.searchDist = this.noteArray[i].v.dist(this.intercept);
          this.searchNoteInArray = i;
        }
      }

      if (this.searchDist < 80) {
        // print("Perfect");
        gs.st.track(0);
        this.noteArray.splice(this.searchNoteInArray, 1);
        for (let i = 0; i < 10; i++) {
          this.effectArray.push({
            pos: createVector(this.intercept.x + random(-50, 50), this.intercept.y + random(-10, 10)),
            spd: createVector(random(-2, 2), random(-2, 2)),
            r: 255,
            g: 100,
            b: 100,
            h: floor(random(100, 180)),
            s: random(5, 20)
          })
        }
      } else if (this.searchDist < 90) {
        // print("Good");
        gs.st.track(1);
        this.noteArray.splice(this.searchNoteInArray, 1);
        for (let i = 0; i < 10; i++) {
          this.effectArray.push({
            pos: createVector(this.intercept.x + random(-50, 50), this.intercept.y + random(-10, 10)),
            spd: createVector(random(-2, 2), random(-2, 2)),
            r: 100,
            g: 200,
            b: 200,
            h: floor(random(100, 180)),
            s: random(5, 20)
          })
        }
      }
    } else if (!keyIsDown(this.keyCode) && this.keyBoolean) {
      this.keyBoolean = false;
      this.interceptColor = this.interceptColorSave;
      this.interceptSize = this.interceptSizeSave;
    }

    //effects
    for (let i = 0; i < this.effectArray.length; i++) {
      this.effectArray[i].spd.y += 0.1;
      this.effectArray[i].pos.add(this.effectArray[i].spd);
      if (this.effectArray[i].s > 5)
        this.effectArray[i].s -= 0.2;
      this.effectArray[i].h -= 2;
      if (this.effectArray[i].h == 0)
        this.effectArray.splice(i, 1);
    }
  }

  display() {
    // noStroke();
    // fill(this.headAndTailColor);
    // circle(this.head.x, this.head.y, 30);
    // fill(this.headAndTailColor);
    // circle(this.tail.x, this.tail.y, 30);
    // fill(this.interceptColor);
    // circle(this.intercept.x, this.intercept.y, this.interceptSize);


    for (let i = 0; i < this.noteArray.length; i++) {
      push();
      translate(this.noteArray[i].v.x, this.noteArray[i].v.y);
      rotate(this.rotation);
      if (!this.noteArray[i].p) {
        for (let j = 0; j < 10; j++) {
          noStroke();
          fill(78, 169, 181, j);
          rect(0, 0, 120 + j * 3, 20 + j * 3, 25);
        }
        noStroke();
        fill(78, 169, 181, 140);
        rect(0, 0, 120, 20, 25);
      } else {
        for (let j = 0; j < 10; j++) {
          noStroke();
          fill(184, 88, 91, j * this.noteArray[i].d);
          rect(0, 0, 120 + j * 3, 20 + j * 3, 25);
        }
        noStroke();
        fill(184, 88, 91, 140 * this.noteArray[i].d);
        rect(0, 0, 120, 20, 25);

      }


      noFill();
      stroke(255, 255 * this.noteArray[i].d)
      strokeWeight(3);
      rect(0, 0, 120, 20, 10);
      fill(255, 180 * this.noteArray[i].d);
      noStroke();
      rect(0, 0, 50, 20);
      for (let j = 0; j < 15; j++) {
        fill(255, j * 4 * this.noteArray[i].d);
        noStroke();
        rect(0, 0, 50 + j * 2, 20, 10);
      }
      pop();
    }

    stroke(83, 107, 124, 180 - gs.gameState.ani);
    strokeWeight(3);
    noFill();
    line(this.head.x, this.head.y, this.tail.x, this.tail.y);

    //effect
    noStroke();
    for (let i = 0; i < this.effectArray.length; i++) {
      fill(this.effectArray[i].r, this.effectArray[i].g, this.effectArray[i].b, this.effectArray[i].h);
      circle(this.effectArray[i].pos.x, this.effectArray[i].pos.y, this.effectArray[i].s);
    }
  }

  addNote(time) {
    setTimeout(() => this.noteArray.push({
      v: createVector(),
      p: false,
      d: 1
    }), this.startDelay + time - /* deltaTime * this.animationDuration*/ 6600);
  }
}