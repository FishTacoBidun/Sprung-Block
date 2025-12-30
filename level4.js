//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 5520, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //mountain
  { x: 500, y: groundY - 100, width: 4900, height: 100, color: "gray", type: "solid" },
  { x: 800, y: groundY - 300, width: 4600, height: 201, color: "gray", type: "solid" },
  { x: 1200, y: groundY - 500, width: 4200, height: 201, color: "gray", type: "solid" },
  { x: 2200, y: groundY - 800, width: 3200, height: 301, color: "gray", type: "solid" },
  { x: 2900, y: groundY - 1200, width: 2500, height: 401, color: "gray", type: "solid" },
  { x: 4100, y: groundY - 2200, width: 1300, height: 1001, color: "gray", type: "solid" },
  { x: 4400, y: groundY - 2300, width: 1000, height: 101, color: "gray", type: "solid" },
  { x: 4700, y: groundY - 2400, width: 700, height: 101, color: "gray", type: "solid" },
  { x: 5000, y: groundY - 2500, width: 400, height: 101, color: "gray", type: "solid" },

  //first height
  { x: 750, y: groundY - 230, width: 50, height: 15, color: "brown", type: "platform" },

  //second height
  { x: 1150, y: groundY - 350, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 950, y: groundY - 450, width: 90, height: 15, color: "brown", type: "platform" },

  //third height
  { x: 2100, y: groundY - 630, width: 100, height: 15, color: "brown", type: "platform" },

  //fourth height
  { x: 2800, y: groundY - 980, width: 100, height: 15, color: "brown", type: "platform" },

  //fifth height
  { x: 3930, y: groundY - 1400, width: 170, height: 15, color: "brown", type: "platform" },
  { x: 3930, y: groundY - 1500, width: 170, height: 15, color: "brown", type: "platform" },
  { x: 3930, y: groundY - 1600, width: 170, height: 15, color: "brown", type: "platform" },
  { x: 3930, y: groundY - 1700, width: 170, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 5200,
  y: groundY - 2560,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //third height
  { x: 2130, y: groundY - 735, width: 40, height: 60, color: "orange" },

  //fourth height
  { x: 2830, y: groundY - 920, width: 40, height: 60, color: "orange" },
  { x: 2830, y: groundY - 1105, width: 40, height: 60, color: "orange" },

  //fifth height (ground)
  { x: 4035, y: groundY - 1300, width: 40, height: 60, color: "orange" },

  //fifth height (platforms)
  { x: 4050, y: groundY - 1790, width: 40, height: 60, color: "orange" },
  { x: 3900, y: groundY - 1890, width: 40, height: 60, color: "orange" },
  { x: 4050, y: groundY - 1990, width: 40, height: 60, color: "orange" },
  { x: 3900, y: groundY - 2090, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //first height
  { x: 630, y: groundY - 130, width: 30, height: 30, color: "gray" },
  { x: 660, y: groundY - 130, width: 30, height: 30, color: "gray" },

  //second height
  { x: 950, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 980, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 1010, y: groundY - 330, width: 30, height: 30, color: "gray" },

  //third height
  { x: 1430, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1460, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1490, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1520, y: groundY - 530, width: 30, height: 30, color: "gray" },

  { x: 1720, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1750, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1780, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1810, y: groundY - 530, width: 30, height: 30, color: "gray" },

  //fourth height
  { x: 2500, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2530, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2560, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2590, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2620, y: groundY - 830, width: 30, height: 30, color: "gray" },

  //fifth height (ground)
  { x: 2945, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2975, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3005, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 3300, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3333, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3366, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3399, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3432, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 3700, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3733, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3766, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3799, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 3832, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 4010, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 4040, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 4070, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  //fifth height (platforms)
  { x: 3930, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 3965, y: groundY - 1430, width: 30, height: 30, color: "gray" },

  { x: 4035, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 4070, y: groundY - 1530, width: 30, height: 30, color: "gray" },

  { x: 3930, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 3965, y: groundY - 1630, width: 30, height: 30, color: "gray" },

  { x: 4035, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 4070, y: groundY - 1730, width: 30, height: 30, color: "gray" },

  //sixth height
  { x: 4160, y: groundY - 2230, width: 30, height: 30, color: "gray" },
  { x: 4190, y: groundY - 2230, width: 30, height: 30, color: "gray" },
  { x: 4220, y: groundY - 2230, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 400, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
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

var currentLevel = 4;