//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -850, y: groundY, width: 980, height: 1000, color: "green", type: "ground" },
  { x: 2645, y: groundY, width: 80, height: 1000, color: "green", type: "ground" },
  { x: 8040, y: groundY, width: 460, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //bottom of expanding ghost jumps
  { x: 2820, y: groundY - 125, width: 50, height: 15, color: "brown", type: "platform" },

  //center spike jumps
  { x: 2683, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 2983, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3283, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3583, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3883, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 4183, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 4483, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 4783, y: groundY - 2250, width: 100, height: 15, color: "brown", type: "platform" },

  //end of center spike jumps
  { x: 5083, y: groundY - 2250, width: 275, height: 15, color: "brown", type: "platform" },

  //end of chomp jumps
  { x: 7900, y: groundY - 2250, width: 140, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 2250, width: 240, height: 15, color: "brown", type: "platform" },

  //drop downs with spikes (right spikes)
  { x: 8190, y: groundY - 2100, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 1800, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 1500, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 1200, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 900, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 600, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8190, y: groundY - 300, width: 240, height: 15, color: "brown", type: "platform" },

  //(left spikes)
  { x: 8070, y: groundY - 1950, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 1650, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 1350, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 1050, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 750, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 450, width: 240, height: 15, color: "brown", type: "platform" },
  { x: 8070, y: groundY - 150, width: 240, height: 15, color: "brown", type: "platform" },

  //drop downs walls
  { x: 8040, y: groundY - 2250, width: 30, height: 2250, color: "gray", type: "solid" },
  { x: 8430, y: groundY - 2250, width: 30, height: 2115, color: "gray", type: "solid" },

  //spike pit ground
  { x: 8460, y: groundY - 150, width: 1000, height: 15, color: "brown", type: "platform" },
];

//make platforms for chomp jump (x: +140)
for (let i = 0; i <= 16; i++) {
  //do math once
  let xIncrease = (i * 144);
  
  //bottom platforms
  surfaces.push({
    x: 5447 + xIncrease,
    y: groundY - 2300,
    width: 90,
    height: 15,
    color: "brown",
    type: "platform",
  });
  
  //top platforms
  surfaces.push({
    x: 5447 + xIncrease,
    y: groundY - 2410,
    width: 90,
    height: 15,
    color: "brown",
    type: "platform",
  });
}

//goal object
var goal = {
  x: 10000,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //varying jump type
  { x: 340, y: groundY - 35, width: 40, height: 60, color: "orange" }, //down
  { x: 555, y: groundY - 35, width: 40, height: 60, color: "orange" }, //down
  { x: 820, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 1005, y: groundY, width: 40, height: 60, color: "orange" }, //up
  { x: 1250, y: groundY, width: 40, height: 60, color: "orange" }, //down
  { x: 1465, y: groundY, width: 40, height: 60, color: "orange" }, //up
  { x: 1660, y: groundY - 100, width: 40, height: 60, color: "orange" }, //down
  { x: 1845, y: groundY - 140, width: 40, height: 60, color: "orange" }, //up
  { x: 2200, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 2390, y: groundY, width: 40, height: 60, color: "orange" }, //up
];

//make ghosts for expanding gap (x: gap increase by 6 (3+3), y: +200 (100 between each ghost))
for (let i = 0; i <= 9; i++) {
  //do math once
  let xIncrease = (i * 3);
  let yIncrease = (i * 200);

  //left side
  enemies.push({
    x: 2740 - xIncrease,
    y: groundY - 325 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
  
  //right side
  enemies.push({
    x: 2920 + xIncrease,
    y: groundY - 225 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
}

//make ghost for chomp jumps (x: +144)
for (let i = 0; i <= 16; i++) {
  enemies.push({
    x: 5400 + (i * 144),
    y: groundY - 2285,
    width: 40,
    height: 60,
    color: "orange",
  });
}

//spikes array (gray triangles)
var spikes = [
  //after varying jump type jumps
  { x: 2695, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //center spike jumps
  { x: 2718, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 3018, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 3318, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 3618, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 3918, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 4218, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 4518, y: groundY - 2280, width: 30, height: 30, color: "gray" },
  { x: 4818, y: groundY - 2280, width: 30, height: 30, color: "gray" },

  //drop downs (right side)
  { x: 8250, y: groundY - 2130, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 2130, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 2130, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 2130, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 2130, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 2130, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 1830, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 1830, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 1530, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 1530, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 1230, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 1230, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 930, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 930, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 930, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 930, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 930, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 930, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 630, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 630, width: 30, height: 30, color: "gray" },

  { x: 8250, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 8280, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 8310, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 8340, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 8370, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 8400, y: groundY - 330, width: 30, height: 30, color: "gray" },

  //(left side)
  { x: 8070, y: groundY - 1980, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 1980, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 1980, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 1980, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 1980, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 1980, width: 30, height: 30, color: "gray" },

  { x: 8070, y: groundY - 1680, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 1680, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 1680, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 1680, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 1680, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 1680, width: 30, height: 30, color: "gray" },

  { x: 8070, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 1380, width: 30, height: 30, color: "gray" },
  
  { x: 8070, y: groundY - 1080, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 1080, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 1080, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 1080, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 1080, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 1080, width: 30, height: 30, color: "gray" },

  { x: 8070, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 780, width: 30, height: 30, color: "gray" },

  { x: 8070, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 480, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 480, width: 30, height: 30, color: "gray" },

  { x: 8070, y: groundY - 180, width: 30, height: 30, color: "gray" },
  { x: 8100, y: groundY - 180, width: 30, height: 30, color: "gray" },
  { x: 8130, y: groundY - 180, width: 30, height: 30, color: "gray" },
  { x: 8160, y: groundY - 180, width: 30, height: 30, color: "gray" },
  { x: 8190, y: groundY - 180, width: 30, height: 30, color: "gray" },
  { x: 8220, y: groundY - 180, width: 30, height: 30, color: "gray" },
];

//make spikes for chomp jumps (x: +144)
for (let i = 0; i <= 16; i++) {
  //do math once
  let xIncrease = (i * 144);
  
  //bottom spikes
  spikes.push({
    x: 5447 + xIncrease,
    y: groundY - 2330,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5477 + xIncrease,
    y: groundY - 2330,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5507 + xIncrease,
    y: groundY - 2330,
    width: 30,
    height: 30,
    color: "gray",
  });
  
  //top spikes
  spikes.push({
    x: 5447 + xIncrease,
    y: groundY - 2440,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5477 + xIncrease,
    y: groundY - 2440,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5507 + xIncrease,
    y: groundY - 2440,
    width: 30,
    height: 30,
    color: "gray",
  });
}

//signs array (cosmetic objects)
var signs = [
  //starting secret signs
  { x: -800, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -735, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -670, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -605, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -540, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -475, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -410, y: groundY - 80, width: 60, height: 80, color: "brown", type: "down" },
  { x: -345, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -280, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: -215, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },

  //starting directional sign
  { x: 0, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },

  //second directional sign
  { x: 2635, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },

  //third directional sign
  { x: 2703, y: groundY - 2330, width: 60, height: 80, color: "brown", type: "right" },

  //fourth directional sign
  { x: 8220, y: groundY - 2330, width: 60, height: 80, color: "brown", type: "down" },
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

var currentLevel = 13;