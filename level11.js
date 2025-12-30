//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 975, height: 1000, color: "green", type: "ground" },
  { x: 2615, y: groundY, width: 760, height: 1000, color: "green", type: "ground" },
  { x: 4860, y: groundY, width: 2000, height: 1000, color: "green", type: "ground" },
  { x: 7160, y: groundY, width: 3055, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //head bump jump base platform
  { x: 1125, y: groundY, width: 80, height: 15, color: "brown", type: "platform" },

  //head bump jump solids and platforms
  { x: 1125, y: groundY - 150, width: 80, height: 80, color: "gray", type: "solid" },
  { x: 1205, y: groundY - 115, width: 80, height: 15, color: "brown", type: "platform" },
  { x: 1125, y: groundY - 300, width: 80, height: 80, color: "gray", type: "solid" },
  { x: 1045, y: groundY - 265, width: 80, height: 15, color: "brown", type: "platform" },
  { x: 1125, y: groundY - 450, width: 80, height: 80, color: "gray", type: "solid" },
  { x: 1205, y: groundY - 415, width: 80, height: 15, color: "brown", type: "platform" },

  //top of head bump jump
  { x: 1115, y: groundY - 640, width: 100, height: 15, color: "brown", type: "platform" },

  //leading to dropper jumps
  { x: 1415, y: groundY - 740, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 1715, y: groundY - 840, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2015, y: groundY - 940, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2315, y: groundY - 1040, width: 100, height: 15, color: "brown", type: "platform" },

  //dropper
  { x: 2615, y: groundY - 1140, width: 200, height: 1140, color: "gray", type: "solid" },
  { x: 2814, y: groundY - 1040, width: 61, height: 1040, color: "gray", type: "solid" },
  { x: 2874, y: groundY - 940, width: 61, height: 940, color: "gray", type: "solid" },
  { x: 2934, y: groundY - 840, width: 61, height: 840, color: "gray", type: "solid" },
  { x: 2994, y: groundY - 640, width: 61, height: 640, color: "gray", type: "solid" },
  { x: 3054, y: groundY - 490, width: 61, height: 490, color: "gray", type: "solid" },
  { x: 3114, y: groundY - 190, width: 61, height: 190, color: "gray", type: "solid" },

  //tiny platform jumps
  { x: 3505, y: groundY, width: 15, height: 15, color: "brown", type: "platform" },
  { x: 3655, y: groundY, width: 13, height: 15, color: "brown", type: "platform" },
  { x: 3805, y: groundY, width: 11, height: 15, color: "brown", type: "platform" },
  { x: 3955, y: groundY, width: 9, height: 15, color: "brown", type: "platform" },
  { x: 4105, y: groundY, width: 7, height: 15, color: "brown", type: "platform" },
  { x: 4255, y: groundY, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 4405, y: groundY, width: 3, height: 15, color: "brown", type: "platform" },
  { x: 4555, y: groundY, width: 1, height: 15, color: "brown", type: "platform" },

  //presicion enemy jump platforms
  { x: 4520, y: groundY - 230, width: 70, height: 15, color: "brown", type: "platform" },
  { x: 4520, y: groundY - 465, width: 70, height: 15, color: "brown", type: "platform" },
  { x: 4520, y: groundY - 700, width: 70, height: 15, color: "brown", type: "platform" },
  { x: 4520, y: groundY - 935, width: 70, height: 15, color: "brown", type: "platform" },

  //CAVE
  //floor
  { x: 4860, y: groundY - 935, width: 2000, height: 935, color: "gray", type: "solid" },

  //left wall
  { x: 4860, y: groundY - 2506, width: 501, height: 1501, color: "gray", type: "solid" },
  
  //roof
  { x: 4860, y: groundY - 2605, width: 2000, height: 100, color: "gray", type: "solid" },

  //left chamber wall
  { x: 5859, y: groundY - 2405, width: 101, height: 1471, color: "gray", type: "solid" },

  //right chamber wall
  { x: 6760, y: groundY - 2506, width: 100, height: 1501, color: "gray", type: "solid" },

  //chamber floors (top to bottom)
  { x: 6060, y: groundY - 2405, width: 700, height: 15, color: "brown", type: "platform" },
  { x: 5960, y: groundY - 2105, width: 700, height: 15, color: "brown", type: "platform" },
  { x: 6060, y: groundY - 1805, width: 700, height: 15, color: "brown", type: "platform" },
  { x: 5960, y: groundY - 1505, width: 700, height: 15, color: "brown", type: "platform" },
  { x: 6060, y: groundY - 1205, width: 701, height: 145, color: "gray", type: "solid" },
  //END OF CAVE

  //middle of cave platforms
  { x: 5560, y: groundY - 1065, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 5560, y: groundY - 1685, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 5560, y: groundY - 2305, width: 100, height: 15, color: "brown", type: "platform" },

  //right cave wall gaps
  { x: 5820, y: groundY - 1165, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5820, y: groundY - 1305, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5820, y: groundY - 1445, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5820, y: groundY - 1585, width: 40, height: 60, color: "gray", type: "solid" },

  //left cave wall gaps
  { x: 5360, y: groundY - 1785, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5360, y: groundY - 1925, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5360, y: groundY - 2065, width: 40, height: 60, color: "gray", type: "solid" },
  { x: 5360, y: groundY - 2205, width: 40, height: 60, color: "gray", type: "solid" },

  //end of cave platform
  { x: 6860, y: groundY - 935, width: 100, height: 15, color: "brown", type: "platform" },
  
  //nearly perfect jumps
  { x: 7309, y: groundY - 130, width: 100, height: 15, color: "brown", type: "platform" }, 
  { x: 7667, y: groundY - 180, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 8025, y: groundY - 230, width: 100, height: 15, color: "brown", type: "platform" },//+385
  { x: 8410, y: groundY - 230, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 8795, y: groundY - 230, width: 100, height: 15, color: "brown", type: "platform" },

  //wall after nearly perfect jumps
  { x: 9168, y: groundY - 230, width: 132, height: 230, color: "gray", type: "solid" },

  //spike jump before goal
  { x: 9575, y: groundY - 115, width: 50, height: 15, color: "brown", type: "platform" },

  //goal wall
  { x: 9900, y: groundY - 230, width: 300, height: 115, color: "gray", type: "solid" },
  { x: 9950, y: groundY - 330, width: 200, height: 101, color: "gray", type: "solid" },
  { x: 10000, y: groundY - 430, width: 100, height: 101, color: "gray", type: "solid" },

  //platform left of goal wall
  { x: 10200, y: groundY - 130, width: 100, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 10025,
  y: groundY - 490,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //low and long jump at start enemy
  { x: 865, y: groundY + 70, width: 40, height: 60, color: "orange" },

  //top of head bump jump pillar enemy
  { x: 1145, y: groundY - 535, width: 40, height: 60, color: "orange" },

  //end of tiny jumps enemy
  { x: 4705, y: groundY - 115, width: 40, height: 60, color: "orange" },

  //precision jump enemies
  { x: 4535, y: groundY - 355, width: 40, height: 60, color: "orange" },
  { x: 4535, y: groundY - 590, width: 40, height: 60, color: "orange" },
  { x: 4535, y: groundY - 825, width: 40, height: 60, color: "orange" },

  //cave chamber enemies (top to bottom)
  { x: 5990, y: groundY - 2255, width: 40, height: 60, color: "orange" },
  { x: 6215, y: groundY - 2255, width: 40, height: 60, color: "orange" },
  { x: 6440, y: groundY - 2255, width: 40, height: 60, color: "orange" },

  { x: 6690, y: groundY - 1955, width: 40, height: 60, color: "orange" },
  { x: 6465, y: groundY - 1955, width: 40, height: 60, color: "orange" },
  { x: 6240, y: groundY - 1955, width: 40, height: 60, color: "orange" },

  { x: 5990, y: groundY - 1655, width: 40, height: 60, color: "orange" },
  { x: 6215, y: groundY - 1655, width: 40, height: 60, color: "orange" },
  { x: 6440, y: groundY - 1655, width: 40, height: 60, color: "orange" },

  { x: 6690, y: groundY - 1355, width: 40, height: 60, color: "orange" },
  { x: 6465, y: groundY - 1355, width: 40, height: 60, color: "orange" },
  { x: 6240, y: groundY - 1355, width: 40, height: 60, color: "orange" },

  //end of cave chamber enemy
  { x: 5990, y: groundY - 1010, width: 40, height: 60, color: "orange" },

  //end of cave trust fall
  { x: 6960, y: groundY, width: 40, height: 60, color: "orange" },

  //before goal over spike enemies
  { x: 9905, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 10030, y: groundY - 70, width: 40, height: 60, color: "orange" },
  { x: 10155, y: groundY - 70, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //starting precision spike jumps
  { x: 165, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 195, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 225, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 315, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 345, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 375, y: groundY - 30, width: 30, height: 30, color: "gray" },
  
  { x: 465, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 495, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 525, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 615, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 645, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 675, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 765, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 795, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 825, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //top of head bump pillar spikes
  { x: 1135, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 1165, y: groundY - 480, width: 30, height: 30, color: "gray" },

  //leading to dropper spikes
  { x: 1150, y: groundY - 670, width: 30, height: 30, color: "gray" },
  { x: 1450, y: groundY - 770, width: 30, height: 30, color: "gray" },
  { x: 1750, y: groundY - 870, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 970, width: 30, height: 30, color: "gray" },
  { x: 2350, y: groundY - 1070, width: 30, height: 30, color: "gray" },

  //right side dropper spikes
  { x: 2755, y: groundY - 1170, width: 30, height: 30, color: "gray" },
  { x: 2785, y: groundY - 1170, width: 30, height: 30, color: "gray" },

  { x: 2815, y: groundY - 1070, width: 30, height: 30, color: "gray" },
  { x: 2845, y: groundY - 1070, width: 30, height: 30, color: "gray" },

  { x: 2875, y: groundY - 970, width: 30, height: 30, color: "gray" },
  { x: 2905, y: groundY - 970, width: 30, height: 30, color: "gray" },

  { x: 2935, y: groundY - 870, width: 30, height: 30, color: "gray" },
  { x: 2965, y: groundY - 870, width: 30, height: 30, color: "gray" },

  { x: 2995, y: groundY - 670, width: 30, height: 30, color: "gray" },
  { x: 3025, y: groundY - 670, width: 30, height: 30, color: "gray" },

  { x: 3055, y: groundY - 520, width: 30, height: 30, color: "gray" },
  { x: 3085, y: groundY - 520, width: 30, height: 30, color: "gray" },

  { x: 3115, y: groundY - 220, width: 30, height: 30, color: "gray" },
  { x: 3145, y: groundY - 220, width: 30, height: 30, color: "gray" },

  //bottom of dropper spikes
  { x: 3175, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3205, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 3345, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //start of cave spikes
  { x: 5460, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 5490, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 5520, y: groundY - 965, width: 30, height: 30, color: "gray" },

  { x: 5670, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 5700, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 5730, y: groundY - 965, width: 30, height: 30, color: "gray" },

  //cave chamber floor spikes (top to bottom levels)
  { x: 6060, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6090, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6120, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6150, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6180, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6210, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6240, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6270, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6300, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6330, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6360, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6390, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6420, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6450, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6480, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6510, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6540, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6570, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6600, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6630, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6660, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6690, y: groundY - 2435, width: 30, height: 30, color: "gray" },
  { x: 6720, y: groundY - 2435, width: 30, height: 30, color: "gray" },

  { x: 6630, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6600, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6570, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6540, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6510, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6480, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6450, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6420, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6390, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6360, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6330, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6300, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6270, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6240, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6210, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6180, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6150, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6120, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6090, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6060, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6030, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 6000, y: groundY - 2135, width: 30, height: 30, color: "gray" },
  { x: 5970, y: groundY - 2135, width: 30, height: 30, color: "gray" },

  { x: 6060, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6090, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6120, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6150, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6180, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6210, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6240, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6270, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6300, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6330, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6360, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6390, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6420, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6450, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6480, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6510, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6540, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6570, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6600, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6630, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6660, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6690, y: groundY - 1835, width: 30, height: 30, color: "gray" },
  { x: 6720, y: groundY - 1835, width: 30, height: 30, color: "gray" },

  { x: 6630, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6600, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6570, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6540, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6510, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6480, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6450, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6420, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6390, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6360, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6330, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6300, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6270, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6240, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6210, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6180, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6150, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6120, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6090, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6060, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6030, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 6000, y: groundY - 1535, width: 30, height: 30, color: "gray" },
  { x: 5970, y: groundY - 1535, width: 30, height: 30, color: "gray" },

  { x: 6060, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6090, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6120, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6150, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6180, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6210, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6240, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6270, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6300, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6330, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6360, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6390, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6420, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6450, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6480, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6510, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6540, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6570, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6600, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6630, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6660, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6690, y: groundY - 1235, width: 30, height: 30, color: "gray" },
  { x: 6720, y: groundY - 1235, width: 30, height: 30, color: "gray" },

  //end of cave chamber spikes
  { x: 5960, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 5990, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 6020, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 6050, y: groundY - 965, width: 30, height: 30, color: "gray" },

  //before trust fall
  { x: 6200, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 6350, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 6500, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 6650, y: groundY - 965, width: 30, height: 30, color: "gray" },

  //center of nearly perfect jumps
  { x: 7344, y: groundY - 160, width: 30, height: 30, color: "gray" },
  { x: 7702, y: groundY - 210, width: 30, height: 30, color: "gray" },
  { x: 8060, y: groundY - 260, width: 30, height: 30, color: "gray" },
  { x: 8445, y: groundY - 260, width: 30, height: 30, color: "gray" },
  { x: 8830, y: groundY - 260, width: 30, height: 30, color: "gray" },

  //before goal
  { x: 9300, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9330, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9360, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9390, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9420, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9450, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9480, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9510, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9540, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9570, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9600, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9630, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9660, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9690, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9720, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9750, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9780, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 9810, y: groundY - 30, width: 30, height: 30, color: "gray" },
];

var signs = [
  { x: 2650, y: groundY - 1220, width: 60, height: 80, color: "brown", type: "right" },
  { x: 6880, y: groundY - 1015, width: 60, height: 80, color: "brown", type: "down" },
  
];

var tutorialTexts = [
  { //clear text
    x: 0,
    y: 0,
    text: "",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "white",
    strokeWidth: 2
  }
];

var currentLevel = 11;