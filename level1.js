//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 1000, height: 1000, color: "green", type: "ground" },
  { x: 1960, y: groundY, width: 700, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //clear gap
  { x: 1000, y: groundY - 50, width: 150, height: 15, color: "brown", type: "platform" },
  { x: 1270, y: groundY - 100, width: 300, height: 15, color: "brown", type: "platform" },
  { x: 1690, y: groundY - 50, width: 150, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 2500,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //middle of gap
  { x: 1400, y: groundY - 170, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //before gap
  { x: 480, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 510, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 540, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //after gap
  { x: 2190, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2220, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2250, y: groundY - 30, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 200, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
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

var currentLevel = 1;