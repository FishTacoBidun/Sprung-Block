//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 600, height: 1000, color: "green", type: "ground" },
  { x: 2435, y: groundY, width: 400, height: 1000, color: "green", type: "ground" },
  { x: 12760, y: groundY, width: 100, height: 1000, color: "green", type: "ground" },
  { x: 18240, y: groundY, width: 100, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //spike blocks
  { x: 550, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 700, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 850, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1000, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1150, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1300, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1450, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1600, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1750, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 1900, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 2050, y: groundY - 143, width: 90, height: 15, color: "brown", type: "platform" },

  //SMALL GAP CAVE
  //left wall
  { x: 2435, y: groundY - 2000, width: 30, height: 1930, color: "gray", type: "solid" },

  //right wall
  { x: 2805, y: groundY - 2000, width: 30, height: 2000, color: "gray", type: "solid" },

  //floors (bottom to top)
  { x: 2464, y: groundY - 200, width: 246, height: 30, color: "gray", type: "solid" },
  { x: 2710, y: groundY - 200, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2750, y: groundY - 200, width: 56, height: 30, color: "gray", type: "solid" },
  
  { x: 2464, y: groundY - 400, width: 56, height: 30, color: "gray", type: "solid" },
  { x: 2520, y: groundY - 400, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 400, width: 246, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 600, width: 246, height: 30, color: "gray", type: "solid" },
  { x: 2710, y: groundY - 600, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2750, y: groundY - 600, width: 56, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 800, width: 56, height: 30, color: "gray", type: "solid" },
  { x: 2520, y: groundY - 800, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 800, width: 246, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 1000, width: 246, height: 30, color: "gray", type: "solid" },
  { x: 2710, y: groundY - 1000, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2750, y: groundY - 1000, width: 56, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 1200, width: 56, height: 30, color: "gray", type: "solid" },
  { x: 2520, y: groundY - 1200, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 1200, width: 246, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 1400, width: 246, height: 30, color: "gray", type: "solid" },
  { x: 2710, y: groundY - 1400, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2750, y: groundY - 1400, width: 56, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 1600, width: 56, height: 30, color: "gray", type: "solid" },
  { x: 2520, y: groundY - 1600, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 1600, width: 246, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 1800, width: 246, height: 30, color: "gray", type: "solid" },
  { x: 2710, y: groundY - 1800, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2750, y: groundY - 1800, width: 56, height: 30, color: "gray", type: "solid" },

  { x: 2464, y: groundY - 2000, width: 56, height: 30, color: "gray", type: "solid" },
  { x: 2520, y: groundY - 2000, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 2000, width: 246, height: 30, color: "gray", type: "solid" },

  //fall jump left wall and gap
  { x: 2834, y: groundY - 2000, width: 71, height: 710, color: "gray", type: "solid" },
  { x: 2875, y: groundY - 1250, width: 30, height: 165, color: "gray", type: "solid" },

  //fall jumps
  { x: 2905, y: groundY - 2000, width: 505, height: 15, color: "brown", type: "platform" },
  { x: 2905, y: groundY - 1850, width: 410, height: 15, color: "brown", type: "platform" },
  { x: 2905, y: groundY - 1700, width: 315, height: 15, color: "brown", type: "platform" },
  { x: 2905, y: groundY - 1550, width: 220, height: 15, color: "brown", type: "platform" },
  { x: 2905, y: groundY - 1400, width: 125, height: 15, color: "brown", type: "platform" },
  { x: 2905, y: groundY - 1250, width: 30, height: 15, color: "brown", type: "platform" },

  //fall jump spike pit
  { x: 2905, y: groundY - 1100, width: 3510, height: 15, color: "brown", type: "platform" },
  { x: 6415, y: groundY - 2320, width: 30, height: 1235, color: "gray", type: "solid" },

  //end of fall jumps
  { x: 2835, y: groundY - 880, width: 45, height: 15, color: "brown", type: "platform" },

  //end of long ghost row
  { x: 6380, y: groundY - 970, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 6445, y: groundY - 1020, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 6510, y: groundY - 1070, width: 40, height: 15, color: "brown", type: "platform" },

  //zipper jumps
  { x: 6444, y: groundY - 1200, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 1340, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 1480, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 1620, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 1760, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 1900, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 2040, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 2180, width: 41, height: 75, color: "gray", type: "solid" },
  { x: 6444, y: groundY - 2320, width: 41, height: 75, color: "gray", type: "solid" },

  //up and down jumps
  { x: 6700, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7000, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7300, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7600, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 7900, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 8200, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 8500, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 8800, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 9100, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 9400, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 9700, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 10000, y: groundY - 2240, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 10300, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },

  //end of up and down jumps
  { x: 10600, y: groundY - 2320, width: 100, height: 15, color: "brown", type: "platform" },

  //end of trust fall staircase
  { x: 12590, y: groundY - 920, width: 200, height: 30, color: "gray", type: "solid" },
  { x: 12830, y: groundY - 920, width: 200, height: 30, color: "gray", type: "solid" },
  { x: 12760, y: groundY - 891, width: 30, height: 101, color: "gray", type: "solid" },
  { x: 12830, y: groundY - 891, width: 30, height: 101, color: "gray", type: "solid" },

  //ghosts with decreasing size platforms
  { x: 13060, y: groundY, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 13600, y: groundY, width: 45, height: 15, color: "brown", type: "platform" },
  { x: 14135, y: groundY, width: 40, height: 15, color: "brown", type: "platform" },
  { x: 14670, y: groundY, width: 35, height: 15, color: "brown", type: "platform" },
  { x: 15195, y: groundY, width: 30, height: 15, color: "brown", type: "platform" },
  { x: 15715, y: groundY, width: 25, height: 15, color: "brown", type: "platform" },
  { x: 16230, y: groundY, width: 20, height: 15, color: "brown", type: "platform" },
  { x: 16740, y: groundY, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 17245, y: groundY, width: 10, height: 15, color: "brown", type: "platform" },
  { x: 17745, y: groundY, width: 5, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 18265,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //in between spike leaps
  { x: 500, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 650, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 800, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 950, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1100, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1250, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1400, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1550, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1700, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 1850, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 2000, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 2150, y: groundY - 70, width: 40, height: 60, color: "orange" },

  //enter cave
  { x: 2710, y: groundY - 70, width: 40, height: 60, color: "orange" },

  //cave floors (bottom to top)
  { x: 2520, y: groundY - 270, width: 40, height: 60, color: "orange" },
  { x: 2710, y: groundY - 470, width: 40, height: 60, color: "orange" },
  { x: 2520, y: groundY - 670, width: 40, height: 60, color: "orange" },
  { x: 2710, y: groundY - 870, width: 40, height: 60, color: "orange" },
  { x: 2520, y: groundY - 1070, width: 40, height: 60, color: "orange" },
  { x: 2710, y: groundY - 1270, width: 40, height: 60, color: "orange" },
  { x: 2520, y: groundY - 1470, width: 40, height: 60, color: "orange" },
  { x: 2710, y: groundY - 1670, width: 40, height: 60, color: "orange" },
  { x: 2520, y: groundY - 1870, width: 40, height: 60, color: "orange" },

  //long ghost row below spike pit
  { x: 3100, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 3305, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 3510, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 3715, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 3920, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 4125, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 4330, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 4535, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 4740, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 4945, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 5150, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 5355, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 5560, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 5765, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 5970, y: groundY - 970, width: 40, height: 60, color: "orange" },
  { x: 6175, y: groundY - 970, width: 40, height: 60, color: "orange" },

  //trust fall staircase
  { x: 10880, y: groundY - 2420, width: 40, height: 60, color: "orange" },
  { x: 11165, y: groundY - 2270, width: 40, height: 60, color: "orange" },
  { x: 11450, y: groundY - 2120, width: 40, height: 60, color: "orange" },
  { x: 11735, y: groundY - 1970, width: 40, height: 60, color: "orange" },
  { x: 12020, y: groundY - 1820, width: 40, height: 60, color: "orange" },
  { x: 12305, y: groundY - 1670, width: 40, height: 60, color: "orange" },

  //in between decreasing size platforms
  { x: 13335, y: groundY, width: 40, height: 60, color: "orange" }, //50
  { x: 13870, y: groundY, width: 40, height: 60, color: "orange" }, //45
  { x: 14405, y: groundY, width: 40, height: 60, color: "orange" }, //40
  { x: 14930, y: groundY, width: 40, height: 60, color: "orange" }, //35
  { x: 15450, y: groundY, width: 40, height: 60, color: "orange" }, //30
  { x: 15965, y: groundY, width: 40, height: 60, color: "orange" }, //25
  { x: 16475, y: groundY, width: 40, height: 60, color: "orange" }, //20
  { x: 16980, y: groundY, width: 40, height: 60, color: "orange" }, //15
  { x: 17480, y: groundY, width: 40, height: 60, color: "orange" }, //10
  { x: 17975, y: groundY, width: 40, height: 60, color: "orange" }, //5
];

//spikes array (gray triangles)
var spikes = [
  //spike leaps
  { x: 550, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 580, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 610, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 700, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 730, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 760, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 850, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 880, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 910, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1000, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1030, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1060, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1150, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1180, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1210, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1300, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1330, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1360, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1450, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1480, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1510, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1600, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1630, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1660, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1750, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1780, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1810, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 1900, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1930, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 1960, y: groundY - 173, width: 30, height: 30, color: "gray" },

  { x: 2050, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 2080, y: groundY - 173, width: 30, height: 30, color: "gray" },
  { x: 2110, y: groundY - 173, width: 30, height: 30, color: "gray" },

  //below cave
  { x: 2565, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2625, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2655, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //small gap cave floor spikes (bottom to top)
  { x: 2465, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2585, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2615, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2645, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 230, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 2565, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 2625, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 2655, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 430, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 2585, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 2615, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 2645, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 630, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2565, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2625, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2655, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 830, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2585, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2615, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2645, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 1030, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2565, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2625, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2655, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2585, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2615, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2645, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 1430, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 2565, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 2625, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 2655, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 1630, width: 30, height: 30, color: "gray" },

  { x: 2465, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 2585, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 2615, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 2645, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 2775, y: groundY - 1830, width: 30, height: 30, color: "gray" },

  //exit of small gap cave
  { x: 2490, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2560, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2590, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2620, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2650, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2680, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2710, y: groundY - 2030, width: 30, height: 30, color: "gray" },

  //up and down platforms
  { x: 6735, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 7035, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 7335, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 7635, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 7935, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 8235, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 8535, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 8835, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 9135, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 9435, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 9735, y: groundY - 2350, width: 30, height: 30, color: "gray" },
  { x: 10035, y: groundY - 2270, width: 30, height: 30, color: "gray" },
  { x: 10335, y: groundY - 2350, width: 30, height: 30, color: "gray" },

  //trust fall
  { x: 12760, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 12830, y: groundY - 30, width: 30, height: 30, color: "gray" },
];

//fall jump spike pit (loop since it's a ton of spikes in a row)
for (let i = 1; i <= 117; i++) {
  spikes.push({
    x: 2875 + i * 30,
    y: groundY - 1130,
    width: 30,
    height: 30,
    color: "gray",
  });
}

//signs array (cosmetic objects)
var signs = [
  { x: 250, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 2700, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: 2430, y: groundY - 2080, width: 60, height: 80, color: "brown", type: "right" },
  { x: 3105, y: groundY - 2080, width: 60, height: 80, color: "brown", type: "down" },
  { x: 6500, y: groundY - 1150, width: 60, height: 80, color: "brown", type: "up" },
  { x: 6420, y: groundY - 2400, width: 60, height: 80, color: "brown", type: "right" },
  { x: 10620, y: groundY - 2400, width: 60, height: 80, color: "brown", type: "right" },
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

var currentLevel = 10;