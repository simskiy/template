'use strict'
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со сткоростью ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} стоит.`);
  }
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  hide() {
    console.log(`${this.name} прячется`);
  }
  stop() {
    super.stop();
    this.hide();
  }
}

let rabbit = new Rabbit('Petya');

console.log(rabbit);

rabbit.run(10);
rabbit.stop();
rabbit.hide();
