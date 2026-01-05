//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 500, height: 1000, color: "green", type: "ground" },
  { x: 1600, y: groundY, width: 1850, height: 1000, color: "green", type: "ground" },
  { x: 3840, y: groundY, width: 2750, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //spike ground roof
  { x: 1800, y: groundY - 240, width: 1650, height: 100, color: "gray", type: "solid" },

  //spike ground roof shorter and shorter
  { x: 2190, y: groundY - 141, width: 1260, height: 6, color: "gray", type: "solid" },
  { x: 2480, y: groundY - 136, width: 970, height: 6, color: "gray", type: "solid" },
  { x: 2770, y: groundY - 131, width: 680, height: 6, color: "gray", type: "solid" },
  { x: 3060, y: groundY - 126, width: 390, height: 6, color: "gray", type: "solid" },

  //spike ground gaps
  { x: 1800, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },
  { x: 2090, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },
  { x: 2380, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },
  { x: 2670, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },
  { x: 2960, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },
  { x: 3250, y: groundY - 25, width: 200, height: 25, color: "gray", type: "solid" },

  //get ontop of spike roof
  { x: 3450, y: groundY - 140, width: 50, height: 15, color: "brown", type: "platform" },

  //spikes on sides of platforms
  { x: 3150, y: groundY - 470, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 2855, y: groundY - 470, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 2560, y: groundY - 470, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 2265, y: groundY - 470, width: 160, height: 15, color: "brown", type: "platform" },
  { x: 1970, y: groundY - 470, width: 160, height: 15, color: "brown", type: "platform" },

  //end of spikes on sides of platform
  { x: 1600, y: groundY - 470, width: 200, height: 15, color: "brown", type: "platform" },

  //spike pillar in betweens
  { x: 1760, y: groundY - 1880, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 1940, y: groundY - 1878, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 2120, y: groundY - 1876, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 2300, y: groundY - 1874, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 2480, y: groundY - 1872, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 2660, y: groundY - 1870, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 2840, y: groundY - 1868, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 3020, y: groundY - 1866, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 3200, y: groundY - 1864, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 3380, y: groundY - 1862, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 3560, y: groundY - 1860, width: 50, height: 15, color: "brown", type: "platform" },
  { x: 3740, y: groundY - 1858, width: 50, height: 15, color: "brown", type: "platform" },

  //spike pillars
  { x: 1860, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2040, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2220, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2400, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2580, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2760, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 2940, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 3120, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 3300, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 3480, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 3660, y: groundY - 1960, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 3840, y: groundY - 1960, width: 30, height: 1960, color: "gray", type: "solid" },

  //floating sign
  { x: 3940, y: groundY - 2040, width: 80, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 6400,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //long initial jumps
  { x: 580, y: groundY, width: 40, height: 60, color: "orange" },
  { x: 860, y: groundY, width: 40, height: 60, color: "orange" },
  { x: 1140, y: groundY, width: 40, height: 60, color: "orange" },
  { x: 1420, y: groundY, width: 40, height: 60, color: "orange" },

  //get on side spike starting platform
  { x: 3210, y: groundY - 340, width: 40, height: 60, color: "orange" },

  //tall back and forths (left)
  { x: 1600, y: groundY - 580, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 780, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 980, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 1180, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 1380, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 1580, width: 40, height: 60, color: "orange" },
  { x: 1600, y: groundY - 1780, width: 40, height: 60, color: "orange" },

  //(right)
  { x: 1760, y: groundY - 680, width: 40, height: 60, color: "orange" },
  { x: 1760, y: groundY - 880, width: 40, height: 60, color: "orange" },
  { x: 1760, y: groundY - 1080, width: 40, height: 60, color: "orange" },
  { x: 1760, y: groundY - 1280, width: 40, height: 60, color: "orange" },
  { x: 1760, y: groundY - 1480, width: 40, height: 60, color: "orange" },
  { x: 1760, y: groundY - 1680, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  //end of initial long jumps
  { x: 1600, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //spike ground
  { x: 2000, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2030, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2060, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 2290, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2320, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2350, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 2580, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2610, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2640, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 2870, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2900, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2930, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 3160, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3190, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3220, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //sides of platforms
  { x: 3150, y: groundY - 500, width: 30, height: 30, color: "gray" },
  { x: 3280, y: groundY - 500, width: 30, height: 30, color: "gray" },
  
  { x: 2855, y: groundY - 500, width: 30, height: 30, color: "gray" },
  { x: 2985, y: groundY - 500, width: 30, height: 30, color: "gray" },

  { x: 2560, y: groundY - 500, width: 30, height: 30, color: "gray" },
  { x: 2690, y: groundY - 500, width: 30, height: 30, color: "gray" },

  { x: 2265, y: groundY - 500, width: 30, height: 30, color: "gray" },
  { x: 2395, y: groundY - 500, width: 30, height: 30, color: "gray" },

  { x: 1970, y: groundY - 500, width: 30, height: 30, color: "gray" },
  { x: 2100, y: groundY - 500, width: 30, height: 30, color: "gray" },

  //below side spike platforms
  { x: 3120, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 3090, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 3060, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 3030, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 3000, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2970, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2940, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2910, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2880, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2850, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2820, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2790, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2760, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2730, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2700, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2670, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2640, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2610, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2580, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2550, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2520, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2490, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2460, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2430, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2400, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2370, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2340, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2310, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2280, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2250, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2220, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2190, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2160, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2130, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2100, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2070, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 2010, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1980, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1950, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1920, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1890, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1860, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1830, y: groundY - 270, width: 30, height: 30, color: "gray" },
  { x: 1800, y: groundY - 270, width: 30, height: 30, color: "gray" },

  //spike pillars
  { x: 1860, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2040, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2220, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2400, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2580, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2760, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 2940, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 3120, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 3300, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 3480, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 3660, y: groundY - 1990, width: 30, height: 30, color: "gray" },
  { x: 3840, y: groundY - 1990, width: 30, height: 30, color: "gray" },

  //expadning spikes
  { x: 4400, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4430, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4460, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4490, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4520, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4550, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 4800, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4831, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4862, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4893, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4924, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 4955, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 5200, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5232, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5264, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5296, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5328, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5360, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 5610, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5643, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5676, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5709, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5742, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 5775, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 6025, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 6059, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 6093, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 6127, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 6161, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 6195, y: groundY - 30, width: 30, height: 30, color: "gray" },
];


//signs array (cosmetic objects)
var signs = [
  { x: 300, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 3360, y: groundY - 320, width: 60, height: 80, color: "brown", type: "left" },
  { x: 3950, y: groundY - 2120, width: 60, height: 80, color: "brown", type: "down" },
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

var currentLevel = 7;