//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 650, height: 1000, color: "green", type: "ground" }, //-120 to 1100
  { x: 1770, y: groundY, width: 350, height: 1000, color: "green", type: "ground" },
  { x: 2380, y: groundY, width: 2380, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //back and forth small jumps (large then small)
  { x: 340, y: groundY - 200, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 605, y: groundY - 280, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 415, y: groundY - 400, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 360, y: groundY - 480, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 340, y: groundY - 600, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 605, y: groundY - 680, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 415, y: groundY - 800, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 360, y: groundY - 880, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 340, y: groundY - 1000, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 605, y: groundY - 1080, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 415, y: groundY - 1200, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 360, y: groundY - 1280, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 340, y: groundY - 1400, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 605, y: groundY - 1480, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 415, y: groundY - 1600, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 360, y: groundY - 1680, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 340, y: groundY - 1800, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 605, y: groundY - 1880, width: 15, height: 15, color: "brown", type: "platform" },

  { x: 415, y: groundY - 2000, width: 225, height: 15, color: "brown", type: "platform" },
  { x: 360, y: groundY - 2080, width: 15, height: 15, color: "brown", type: "platform" },

  //after left staircase
  { x: -720, y: groundY - 2600, width: 40, height: 15, color: "brown", type: "platform" },

  //two spike jumps
  { x: -480, y: groundY - 2600, width: 210, height: 15, color: "brown", type: "platform" },
  { x: -480, y: groundY - 2750, width: 210, height: 30, color: "gray", type: "solid" },

  { x: -30, y: groundY - 2600, width: 210, height: 15, color: "brown", type: "platform" },
  { x: -30, y: groundY - 2750, width: 210, height: 30, color: "gray", type: "solid" },

  { x: 420, y: groundY - 2600, width: 210, height: 15, color: "brown", type: "platform" },
  { x: 420, y: groundY - 2750, width: 210, height: 30, color: "gray", type: "solid" },

  { x: 870, y: groundY - 2600, width: 210, height: 15, color: "brown", type: "platform" },
  { x: 870, y: groundY - 2750, width: 210, height: 30, color: "gray", type: "solid" },

  { x: 1320, y: groundY - 2600, width: 210, height: 15, color: "brown", type: "platform" },
  { x: 1320, y: groundY - 2750, width: 210, height: 30, color: "gray", type: "solid" },

  //TALL CAVE
  //roof
  { x: 1770, y: groundY - 2800, width: 400, height: 80, color: "gray", type: "solid" },

  //left wall
  { x: 1770, y: groundY - 2600, width: 30, height: 2600, color: "gray", type: "solid" },
  
  //right wall
  { x: 2140, y: groundY - 2721, width: 30, height: 2421, color: "gray", type: "solid" },

  //floors (top to bottom)
  { x: 1799, y: groundY - 2600, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1840, y: groundY - 2300, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1799, y: groundY - 2000, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1840, y: groundY - 1700, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1799, y: groundY - 1400, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1840, y: groundY - 1100, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1799, y: groundY - 800, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1840, y: groundY - 500, width: 301, height: 30, color: "gray", type: "solid" },
  { x: 1799, y: groundY - 200, width: 301, height: 200, color: "gray", type: "solid" },
  //END OF TALL CAVE

  //to get to bonk head jumps
  { x: 2700, y: groundY - 125, width: 100, height: 15, color: "brown", type: "platform" },
  
  //bonk head jumps
  { x: 2700, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2698, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  { x: 3000, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2998, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  { x: 3300, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3298, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  { x: 3600, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3598, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  { x: 3900, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3898, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  { x: 4200, y: groundY - 250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 4198, y: groundY - 400, width: 105, height: 100, color: "gray", type: "solid" },

  //end of bonk head jumps
  { x: 4500, y: groundY - 250, width: 260, height: 250, color: "gray", type: "solid" },

  //middle to side spike jumps
  { x: 4550, y: groundY - 375, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 500, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 625, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 750, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 875, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1000, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1125, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1250, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1375, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1500, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1625, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 4550, y: groundY - 1750, width: 160, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 4605,
  y: groundY - 1810,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //starting jump
  { x: 350, y: groundY - 70, width: 40, height: 60, color: "orange" },

  //left staircase
  { x: 160, y: groundY - 2190, width: 40, height: 60, color: "orange" },
  { x: -60, y: groundY - 2260, width: 40, height: 60, color: "orange" },
  { x: -280, y: groundY - 2330, width: 40, height: 60, color: "orange" },
  { x: -500, y: groundY - 2400, width: 40, height: 60, color: "orange" },
  { x: -720, y: groundY - 2470, width: 40, height: 60, color: "orange" },

  //tall cave
  { x: 2090, y: groundY - 2370, width: 40, height: 60, color: "orange" },
  { x: 1810, y: groundY - 2070, width: 40, height: 60, color: "orange" },
  { x: 2090, y: groundY - 1770, width: 40, height: 60, color: "orange" },
  { x: 1810, y: groundY - 1470, width: 40, height: 60, color: "orange" },
  { x: 2090, y: groundY - 1170, width: 40, height: 60, color: "orange" },
  { x: 1810, y: groundY - 870, width: 40, height: 60, color: "orange" },
  { x: 2090, y: groundY - 570, width: 40, height: 60, color: "orange" },
  { x: 1810, y: groundY - 270, width: 40, height: 60, color: "orange" },

];

//spikes array (gray triangles)
var spikes = [
  //starting back and forth small jumps
  { x: 415, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 230, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 430, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 430, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 630, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 830, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 1030, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 1430, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 1630, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 1630, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 1830, width: 30, height: 30, color: "gray" },

  { x: 415, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 445, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 475, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 505, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 535, y: groundY - 2030, width: 30, height: 30, color: "gray" },

  //two spike jumps
  { x: -430, y: groundY - 2630, width: 30, height: 30, color: "gray" },
  { x: -350, y: groundY - 2630, width: 30, height: 30, color: "gray" },

  { x: 20, y: groundY - 2630, width: 30, height: 30, color: "gray" },
  { x: 100, y: groundY - 2630, width: 30, height: 30, color: "gray" },

  { x: 470, y: groundY - 2630, width: 30, height: 30, color: "gray" },
  { x: 550, y: groundY - 2630, width: 30, height: 30, color: "gray" },

  { x: 920, y: groundY - 2630, width: 30, height: 30, color: "gray" },
  { x: 1000, y: groundY - 2630, width: 30, height: 30, color: "gray" },

  { x: 1370, y: groundY - 2630, width: 30, height: 30, color: "gray" },
  { x: 1450, y: groundY - 2630, width: 30, height: 30, color: "gray" },

  //tall cave
  { x: 1840, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 1870, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 1900, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 1930, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 1960, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 1990, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 2020, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 2080, y: groundY - 2330, width: 30, height: 30, color: "gray" },
  { x: 2110, y: groundY - 2330, width: 30, height: 30, color: "gray" },

  { x: 1800, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1830, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1860, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1890, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1920, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1950, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 1980, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2010, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 2030, width: 30, height: 30, color: "gray" },
  { x: 2070, y: groundY - 2030, width: 30, height: 30, color: "gray" },

  { x: 1840, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 1870, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 1900, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 1930, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 1960, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 1990, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 2020, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 2080, y: groundY - 1730, width: 30, height: 30, color: "gray" },
  { x: 2110, y: groundY - 1730, width: 30, height: 30, color: "gray" },

  { x: 1800, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1830, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1860, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1890, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1920, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1950, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 1980, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2010, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 1430, width: 30, height: 30, color: "gray" },
  { x: 2070, y: groundY - 1430, width: 30, height: 30, color: "gray" },

  { x: 1840, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 1870, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 1900, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 1930, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 1960, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 1990, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 2020, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 2080, y: groundY - 1130, width: 30, height: 30, color: "gray" },
  { x: 2110, y: groundY - 1130, width: 30, height: 30, color: "gray" },

  { x: 1800, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1830, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1860, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1890, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1920, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1950, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 1980, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2010, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 830, width: 30, height: 30, color: "gray" },
  { x: 2070, y: groundY - 830, width: 30, height: 30, color: "gray" },

  { x: 1840, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1870, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1900, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1930, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1960, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1990, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2020, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2080, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2110, y: groundY - 530, width: 30, height: 30, color: "gray" },

  { x: 1800, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1830, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1860, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1890, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1920, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1950, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 1980, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2010, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 230, width: 30, height: 30, color: "gray" },
  { x: 2070, y: groundY - 230, width: 30, height: 30, color: "gray" },

  //middle to side jumps
  { x: 4550, y: groundY - 405, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 405, width: 30, height: 30, color: "gray" },

  { x: 4600, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 4630, y: groundY - 530, width: 30, height: 30, color: "gray" },

  { x: 4550, y: groundY - 655, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 655, width: 30, height: 30, color: "gray" },

  { x: 4600, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 4630, y: groundY - 780, width: 30, height: 30, color: "gray" },

  { x: 4550, y: groundY - 905, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 905, width: 30, height: 30, color: "gray" },

  { x: 4600, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 4630, y: groundY - 1030, width: 30, height: 30, color: "gray" },

  { x: 4550, y: groundY - 1155, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 1155, width: 30, height: 30, color: "gray" },

  { x: 4600, y: groundY - 1280, width: 30, height: 30, color: "gray" },
  { x: 4630, y: groundY - 1280, width: 30, height: 30, color: "gray" },

  { x: 4550, y: groundY - 1405, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 1405, width: 30, height: 30, color: "gray" },

  { x: 4600, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 4630, y: groundY - 1530, width: 30, height: 30, color: "gray" },

  { x: 4550, y: groundY - 1655, width: 30, height: 30, color: "gray" },
  { x: 4680, y: groundY - 1655, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 460, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
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

var currentLevel = 9;