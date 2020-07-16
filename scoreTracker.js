//Sunwoo Won, Final Project, CS099, Spring 2020.7.15
class scoreTracker {
  constructor() {
    this.perfect = 0;
    this.good = 0;
    this.miss = 0;
    this.combo = 0;
    this.maxCombo=0;
    this.acc = 0;
    this.bestAcc=50;
  }
  
  update() {
    
  }
  
  display() {
    
  }

  track(i) {
    switch (i) {
      case 0:
        this.perfect++;
        this.combo++;
        if(this.combo>this.maxCombo)
          this.maxCombo = this.combo;
        break;
      case 1:
        this.good++;
        this.combo++;
        if(this.combo>this.maxCombo)
          this.maxCombo = this.combo;
        break;
      case 2:
        this.miss++;
        this.combo = 0;
        break;
    }
  }

  accuarcy() {
    this.acc = (this.perfect * 2 + this.good) / ((this.perfect + this.good + this.miss) * 2)*100;
    // print(this.acc,this.perfect,this.good,this.miss);
    if (isNaN(this.acc))
      return 0;
    else
      return round(this.acc);
  }
  
  best() {
   if(this.acc>this.bestAcc)
     this.bestAcc=this.acc;
  }
}