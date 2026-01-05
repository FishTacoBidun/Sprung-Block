//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 540, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //starting up platforms
  { x: 570, y: groundY - 100, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 770, y: groundY - 200, width: 40, height: 15, color: "brown", type: "platform" },

  //starting flat platforms
  { x: 970, y: groundY - 300, width: 35, height: 15, color: "brown", type: "platform" },
  { x: 1220, y: groundY - 300, width: 30, height: 15, color: "brown", type: "platform" },
  { x: 1470, y: groundY - 300, width: 25, height: 15, color: "brown", type: "platform" }, 
  { x: 1720, y: groundY - 300, width: 20, height: 15, color: "brown", type: "platform" },
  { x: 1970, y: groundY - 300, width: 15, height: 15, color: "brown", type: "platform" },

  //after three ghosts
  { x: 2830, y: groundY - 300, width: 10, height: 15, color: "brown", type: "platform" },
  { x: 3105, y: groundY - 300, width: 100, height: 15, color: "brown", type: "platform" },

  //left and rights
  { x: 3040, y: groundY - 510, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3255, y: groundY - 610, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3040, y: groundY - 710, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3255, y: groundY - 810, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3040, y: groundY - 910, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3255, y: groundY - 1010, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3040, y: groundY - 1110, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3255, y: groundY - 1210, width: 15, height: 15, color: "brown", type: "platform" },

  //middle of ghost staircase
  { x: 4205, y: groundY - 1560, width: 100, height: 15, color: "brown", type: "platform" },

  //head bump jumps
  { x: 3045, y: groundY - 2010, width: 100, height: 100, color: "gray", type: "solid" },
  { x: 3045, y: groundY - 2185, width: 100, height: 100, color: "gray", type: "solid" },
  { x: 3045, y: groundY - 2360, width: 100, height: 100, color: "gray", type: "solid" },
  { x: 3045, y: groundY - 2535, width: 100, height: 100, color: "gray", type: "solid" },
  { x: 3045, y: groundY - 2710, width: 100, height: 100, color: "gray", type: "solid" },

  { x: 2945, y: groundY - 1925, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3145, y: groundY - 1925, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2945, y: groundY - 2100, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3145, y: groundY - 2275, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2945, y: groundY - 2450, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3145, y: groundY - 2625, width: 100, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 3070,
  y: groundY - 2770,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //three in a row jumps
  { x: 2170, y: groundY - 360, width: 40, height: 60, color: "orange" },
  { x: 2395, y: groundY - 360, width: 40, height: 60, color: "orange" },
  { x: 2620, y: groundY - 360, width: 40, height: 60, color: "orange" },

  //at bottoms of left and rights
  { x: 3135, y: groundY - 410, width: 40, height: 60, color: "orange" },

  //staircase (right)
  { x: 3405, y: groundY - 1310, width: 40, height: 60, color: "orange" },
  { x: 3565, y: groundY - 1360, width: 40, height: 60, color: "orange" },
  { x: 3725, y: groundY - 1410, width: 40, height: 60, color: "orange" },
  { x: 3885, y: groundY - 1460, width: 40, height: 60, color: "orange" },
  { x: 4045, y: groundY - 1510, width: 40, height: 60, color: "orange" },

  //staircase (left)
  { x: 3405, y: groundY - 1875, width: 40, height: 60, color: "orange" },
  { x: 3565, y: groundY - 1825, width: 40, height: 60, color: "orange" },
  { x: 3725, y: groundY - 1775, width: 40, height: 60, color: "orange" },
  { x: 3885, y: groundY - 1725, width: 40, height: 60, color: "orange" },
  { x: 4045, y: groundY - 1675, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
];

//signs array (cosmetic objects)
var signs = [
  { x: 330, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 4225, y: groundY - 1640, width: 60, height: 80, color: "brown", type: "left" },
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

var currentLevel = 6;