//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class eye {
  constructor() {
    this.position = createVector();
    this.targetPosition = createVector(width/2,height/2);
    this.direction = createVector();
    this.magnitude = 0;
    this.speed=10;
    this.buffer=createVector();
    
    this.rotate1 = 0;
    this.radian1 = 75;
    this.rotate2 = 0;
    this.radian2 = 60;
    this.rotate3 = 0;
    this.radian3 = 45;
    this.black = color(55);
    this.grey = color(100);
    this.white = color(160);
  }

  update() {
    this.direction.set(this.targetPosition.x-this.position.x,this.targetPosition.y-this.position.y);
    this.magnitude = this.position.dist(this.targetPosition)/this.speed;
    
    this.buffer.set(this.direction.x,this.direction.y);
    this.buffer.setMag(this.magnitude);
    
    this.position.add(this.buffer);
    
    this.rotate1 += radians(1);
    this.rotate2 -= radians(1);
    this.rotate3 += radians(1);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    for (let i = 25; i > 0; i--) {
      noStroke();
      fill(255, 20 - (i / 4));
      circle(0, 0, i * 4)
    }
    noFill();
    push(); //outer
    rotate(this.rotate1);
    stroke(this.black);
    arc(0, 0, this.radian1, this.radian1, radians(-30), radians(200));
    arc(0, 0, this.radian1, this.radian1, radians(260), radians(280));
    stroke(this.grey);
    arc(0, 0, this.radian1, this.radian1, radians(200), radians(210));
    arc(0, 0, this.radian1, this.radian1, radians(220), radians(260));
    arc(0, 0, this.radian1, this.radian1, radians(300), radians(310));
    stroke(this.white);
    arc(0, 0, this.radian1, this.radian1, radians(210), radians(220));
    arc(0, 0, this.radian1, this.radian1, radians(280), radians(300));
    arc(0, 0, this.radian1, this.radian1, radians(310), radians(330));
    pop();
    push(); //center
    rotate(this.rotate2);
    stroke(this.grey);
    arc(0, 0, this.radian2, this.radian2, radians(-70), radians(110));
    arc(0, 0, this.radian2, this.radian2, radians(150), radians(160));
    arc(0, 0, this.radian2, this.radian2, radians(170), radians(245));
    arc(0, 0, this.radian2, this.radian2, radians(260), radians(275));
    stroke(this.white);
    arc(0, 0, this.radian2, this.radian2, radians(275), radians(290));
    arc(0, 0, this.radian2, this.radian2, radians(110), radians(120));
    arc(0, 0, this.radian2, this.radian2, radians(140), radians(150));
    arc(0, 0, this.radian2, this.radian2, radians(160), radians(170));
    pop();
    push();
    rotate(this.rotate3);
    stroke(this.grey);
    arc(0, 0, this.radian3, this.radian3, radians(20), radians(30));
    arc(0, 0, this.radian3, this.radian3, radians(45), radians(240));
    arc(0, 0, this.radian3, this.radian3, radians(265), radians(280));
    stroke(this.white);
    arc(0, 0, this.radian3, this.radian3, radians(30), radians(45));
    arc(0, 0, this.radian3, this.radian3, radians(240), radians(265));
    stroke(this.black);
    arc(0, 0, this.radian3, this.radian3, radians(305), radians(320));
    pop();
    fill(35);
    noStroke();
    circle(0, 0, 20);
    fill(255);
    circle(0, 0, 5);
    pop();
  }
}