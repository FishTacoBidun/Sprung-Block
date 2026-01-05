//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 3300, height: 1000, color: "green", type: "ground" },

  //ghost low jumps
  { x: 3620, y: groundY, width: 50, height: 1000, color: "green", type: "ground" },
  { x: 4110, y: groundY, width: 50, height: 1000, color: "green", type: "ground" },
  { x: 4600, y: groundY, width: 50, height: 1000, color: "green", type: "ground" },
  { x: 5090, y: groundY, width: 50, height: 1000, color: "green", type: "ground" },
  { x: 5580, y: groundY, width: 50, height: 1000, color: "green", type: "ground" },

  { x: 6070, y: groundY, width: 1510, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //starting precision platforms 1-3
  { x: 650, y: groundY - 100, width: 158, height: 15, color: "brown", type: "platform" },
  { x: 1520, y: groundY - 100, width: 158, height: 15, color: "brown", type: "platform" },
  { x: 2390, y: groundY - 100, width: 158, height: 15, color: "brown", type: "platform" },

  //spike roof
  { x: 6070, y: groundY - 175, width: 1390, height: 15, color: "brown", type: "platform" },

  //right of spike roof wall
  { x: 7390, y: groundY - 1320, width: 90, height: 1215, color: "gray", type: "solid" },
  
  //left of spike roof wall
  { x: 6070, y: groundY - 1320, width: 90, height: 1215, color: "gray", type: "solid" },

  //right ladder with ghosts
  { x: 7480, y: groundY - 120, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 520, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 720, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 920, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 1120, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7480, y: groundY - 1320, width: 100, height: 15, color: "brown", type: "platform" },

  //above spike roof
  { x: 6890, y: groundY - 1220, width: 210, height: 15, color: "brown", type: "platform" },
  { x: 6390, y: groundY - 1120, width: 210, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 6090,
  y: groundY - 1380,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //low jumps
  { x: 3380, y: groundY + 60, width: 40, height: 60, color: "orange" },
  { x: 3870, y: groundY + 60, width: 40, height: 60, color: "orange" },
  { x: 4360, y: groundY + 60, width: 40, height: 60, color: "orange" },
  { x: 4850, y: groundY + 60, width: 40, height: 60, color: "orange" },
  { x: 5340, y: groundY + 60, width: 40, height: 60, color: "orange" },
  { x: 5830, y: groundY + 60, width: 40, height: 60, color: "orange" },

  //avoid touching
  { x: 6270, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 6510, y: groundY - 80, width: 40, height: 60, color: "orange" },
  { x: 6750, y: groundY - 90, width: 40, height: 60, color: "orange" },
  { x: 6990, y: groundY - 100, width: 40, height: 60, color: "orange" },
  { x: 7230, y: groundY - 110, width: 40, height: 60, color: "orange" },

  //right of ladder
  { x: 7680, y: groundY - 240, width: 40, height: 60, color: "orange" },
  { x: 7680, y: groundY - 440, width: 40, height: 60, color: "orange" },
  { x: 7680, y: groundY - 640, width: 40, height: 60, color: "orange" },
  { x: 7680, y: groundY - 840, width: 40, height: 60, color: "orange" },
  { x: 7680, y: groundY - 1040, width: 40, height: 60, color: "orange" },
  { x: 7680, y: groundY - 1240, width: 40, height: 60, color: "orange" },

  //before goal
  { x: 6170, y: groundY - 1200, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //under starting precision platforms 1-3
  { x: 500, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 530, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 560, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 590, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 620, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 650, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 680, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 710, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 740, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 770, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 800, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 830, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 860, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 890, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 920, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 950, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 980, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1010, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1040, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 1370, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1400, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1430, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1460, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1490, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1520, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1550, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1580, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1610, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1640, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1670, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1700, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1730, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1760, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1790, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1820, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1850, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1880, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1910, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 2240, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2270, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2300, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2330, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2360, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2390, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2420, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2450, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2480, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2510, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2540, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2570, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2600, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2630, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2660, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2690, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2720, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2750, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2780, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //avoid ghost jump roof
  { x: 6160, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6190, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6220, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6250, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6280, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6310, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6340, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6370, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6400, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6430, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6460, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6490, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6520, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6550, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6580, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6610, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6640, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6670, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6700, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6730, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6760, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6790, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6820, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6850, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6880, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6910, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6940, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 6970, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7000, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7030, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7060, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7090, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7120, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7150, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7180, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7210, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7240, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7270, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7300, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7330, y: groundY - 205, width: 30, height: 30, color: "gray" },
  { x: 7360, y: groundY - 205, width: 30, height: 30, color: "gray" },

  //below tall ghosts
  { x: 6995, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 7235, y: groundY - 30, width: 30, height: 30, color: "gray" },
  
  //above spike roof on platforms
  { x: 6965, y: groundY - 1250, width: 30, height: 30, color: "gray" },
  { x: 6995, y: groundY - 1250, width: 30, height: 30, color: "gray" },

  { x: 6465, y: groundY - 1150, width: 30, height: 30, color: "gray" },
  { x: 6495, y: groundY - 1150, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 250, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 7405, y: groundY - 1400, width: 60, height: 80, color: "brown", type: "left" },
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

var currentLevel = 5;