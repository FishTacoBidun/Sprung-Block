//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 2200, height: 1000, color: "green", type: "ground" },
  { x: 2500, y: groundY, width: 500, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  { x: 550, y: 320, width: 120, height: 15, color: "brown", type: "platform" },
  { x: 770, y: 300, width: 120, height: 150, color: "gray", type: "solid" },
  { x: 2200, y: 400, width: 185, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 2725,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  { x: 1700, y: groundY - 70, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  { x: 1300, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1330, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1360, y: groundY - 30, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 330, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 2000, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
];

var tutorialTexts = [
  { //controls
    x: 120,
    y: 380,
    text: "This Level Is Under Construction",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "red",
    strokeWidth: 2
  },
];

var currentLevel = 12;