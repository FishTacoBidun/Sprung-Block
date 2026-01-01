//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -850, y: groundY, width: 980, height: 1000, color: "green", type: "ground" },
  { x: 2645, y: groundY, width: 80, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //bottom of expanding ghost jumps
  { x: 2820, y: groundY - 125, width: 50, height: 15, color: "brown", type: "platform" },

  //center spike jumps
  { x: 2683, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 10000,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //varying jump type
  { x: 340, y: groundY - 35, width: 40, height: 60, color: "orange" }, //down
  { x: 555, y: groundY - 35, width: 40, height: 60, color: "orange" }, //down
  { x: 820, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 1005, y: groundY, width: 40, height: 60, color: "orange" }, //up
  { x: 1250, y: groundY, width: 40, height: 60, color: "orange" }, //down
  { x: 1465, y: groundY, width: 40, height: 60, color: "orange" }, //up
  { x: 1660, y: groundY - 100, width: 40, height: 60, color: "orange" }, //down
  { x: 1845, y: groundY - 140, width: 40, height: 60, color: "orange" }, //up
  { x: 2200, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 2390, y: groundY, width: 40, height: 60, color: "orange" }, //up
];

//make ghosts for expanding gap (gap (x) increase by 6 (3+3), y: +200 (100 between each ghost))
for (let i = 0; i <= 9; i++) {
  //do math once
  let xIncrease = (i * 3);
  let yIncrease = (i * 200);

  //left side
  enemies.push({
    x: 2740 - xIncrease,
    y: groundY - 325 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
  
  //right side
  enemies.push({
    x: 2920 + xIncrease,
    y: groundY - 225 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
}

//spikes array (gray triangles)
var spikes = [
  //after varying jump type jumps
  { x: 2695, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //center spike jumps
  { x: 2718, y: groundY - 2280, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  //starting secret signs
  { x: -800, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -735, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -670, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -605, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -540, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -475, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -410, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -345, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -280, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -215, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },

  //starting directional sign
  { x: 0, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },

  //second directional sign
  { x: 2635, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
];

var tutorialTexts = [
  { //clear text
    x: 120,
    y: 380,
    text: "",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "red",
    strokeWidth: 2
  },
];

var currentLevel = 13;