//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 600, height: 1000, color: "green", type: "ground" },
  { x: 1645, y: groundY, width: 1800, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //starting jumps
  { x: 345, y: groundY - 200, width: 250, height: 15, color: "brown", type: "platform" },
  { x: 695, y: groundY - 300, width: 250, height: 15, color: "brown", type: "platform" },
  { x: 1045, y: groundY - 400, width: 250, height: 15, color: "brown", type: "platform" },
  { x: 1395, y: groundY - 500, width: 250, height: 15, color: "brown", type: "platform" },

  //cave
  { x: 1645, y: groundY - 650, width: 1800, height: 650, color: "gray", type: "solid" },
  { x: 1645, y: groundY - 890, width: 1800, height: 102, color: "gray", type: "solid" },
  { x: 3245, y: groundY - 791, width: 200, height: 152, color: "gray", type: "solid" },
];

//goal object
var goal = {
  x: 3160,
  y: groundY - 710,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //get to starting platform
  { x: 400, y: groundY - 70, width: 40, height: 60, color: "orange" },

  //right before cave
  { x: 1595, y: groundY - 570, width: 40, height: 60, color: "orange" },

  //end of cave
  { x: 2975, y: groundY - 720, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //end of starting platforms
  { x: 565, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 915, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 1265, y: groundY - 430, width: 30, height: 30, color: "gray" },

  //in cave expanding gap
  { x: 1775, y: groundY - 680, width: 30, height: 30, color: "gray" },
  { x: 1805, y: groundY - 680, width: 30, height: 30, color: "gray" },

  { x: 2005, y: groundY - 680, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 680, width: 30, height: 30, color: "gray" },

  { x: 2240, y: groundY - 680, width: 30, height: 30, color: "gray" },
  { x: 2280, y: groundY - 680, width: 30, height: 30, color: "gray" },

  { x: 2480, y: groundY - 680, width: 30, height: 30, color: "gray" },
  { x: 2525, y: groundY - 680, width: 30, height: 30, color: "gray" },

  { x: 2725, y: groundY - 680, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 680, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 200, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
];

var tutorialTexts = [
  { //controls
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

var currentLevel = 3;