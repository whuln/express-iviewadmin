(function() {
  var Animal, Horse, Snake, sam, tom;

  Animal = class Animal {
    constructor(name) {
      this.name = name;
    }

    move(meters) {
      return console.log(this.name + ` moved ${meters}m.`);
    }

  };

  Snake = class Snake extends Animal {
    move() {
      console.log("Slithering...");
      return super.move(5);
    }

  };

  Horse = class Horse extends Animal {
    move() {
      console.log("Galloping...");
      return super.move(45);
    }

  };

  sam = new Snake("Sammy the Python");

  tom = new Horse("Tommy the Palomino");

  sam.move();

  tom.move();

}).call(this);
