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
  { x: 11740, y: groundY, width: 410, height: 1000, color: "green", type: "ground" },
  { x: 15850, y: groundY, width: 750, height: 1000, color: "green", type: "ground" },

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

  //spike pit ground and right wall
  { x: 8460, y: groundY - 150, width: 3000, height: 15, color: "brown", type: "platform" },
  { x: 11460, y: groundY - 2250, width: 30, height: 2115, color: "gray", type: "solid" },

  //end of under spike pit platforms
  { x: 12090, y: groundY - 100, width: 60, height: 15, color: "brown", type: "platform" },
  { x: 12090, y: groundY - 200, width: 60, height: 15, color: "brown", type: "platform" },
  { x: 12090, y: groundY - 300, width: 60, height: 15, color: "brown", type: "platform" },

  //ghost blocking answer platforms (wrong and corrects)
  { x: 12089, y: groundY - 900, width: 62, height: 30, color: "gray", type: "solid" },
  { x: 12630, y: groundY - 900, width: 60, height: 15, color: "brown", type: "platform" }, //right

  { x: 12090, y: groundY - 1400, width: 60, height: 15, color: "brown", type: "platform" }, //left
  { x: 12629, y: groundY - 1400, width: 62, height: 30, color: "gray", type: "solid" },

  { x: 12089, y: groundY - 1900, width: 62, height: 30, color: "gray", type: "solid" },
  { x: 12630, y: groundY - 1900, width: 60, height: 15, color: "brown", type: "platform" }, //right

  { x: 12089, y: groundY - 2400, width: 62, height: 30, color: "gray", type: "solid" },
  { x: 12630, y: groundY - 2400, width: 60, height: 15, color: "brown", type: "platform" }, //right

  { x: 12090, y: groundY - 2900, width: 60, height: 15, color: "brown", type: "platform" }, //left
  { x: 12629, y: groundY - 2900, width: 62, height: 30, color: "gray", type: "solid" },

  { x: 12089, y: groundY - 3400, width: 62, height: 30, color: "gray", type: "solid" },
  { x: 12630, y: groundY - 3400, width: 60, height: 15, color: "brown", type: "platform" }, //right

  { x: 12090, y: groundY - 3900, width: 60, height: 15, color: "brown", type: "platform" }, //left
  { x: 12629, y: groundY - 3900, width: 62, height: 30, color: "gray", type: "solid" },

  { x: 12089, y: groundY - 4400, width: 62, height: 30, color: "gray", type: "solid" },
  { x: 12630, y: groundY - 4400, width: 60, height: 15, color: "brown", type: "platform" }, //right

  { x: 12090, y: groundY - 4900, width: 60, height: 15, color: "brown", type: "platform" }, //left
  { x: 12629, y: groundY - 4900, width: 62, height: 30, color: "gray", type: "solid" },

  { x: 12090, y: groundY - 5400, width: 60, height: 15, color: "brown", type: "platform" }, //left
  { x: 12629, y: groundY - 5400, width: 62, height: 30, color: "gray", type: "solid" },

  //(fill in starting gap)
  { x: 12090, y: groundY - 400, width: 91, height: 15, color: "brown", type: "platform" },
  { x: 12599, y: groundY - 400, width: 91, height: 15, color: "brown", type: "platform" },

  //(outer walls)
  { x: 12060, y: groundY - 5400, width: 30, height: 5015, color: "gray", type: "solid" },
  { x: 12690, y: groundY - 5400, width: 30, height: 5015, color: "gray", type: "solid" },

  //(top)
  { x: 12179, y: groundY - 5400, width: 422, height: 30, color: "gray", type: "solid" },

  //secret signs 3 platform
  { x: 11245, y: groundY - 5400, width: 665, height: 15, color: "brown", type: "platform" },

  //goal podium
  { x: 16150, y: groundY - 50, width: 450, height: 50, color: "gray", type: "solid" },
  { x: 16200, y: groundY - 100, width: 350, height: 51, color: "gray", type: "solid" },
  { x: 16250, y: groundY - 150, width: 250, height: 51, color: "gray", type: "solid" },
  { x: 16300, y: groundY - 200, width: 150, height: 51, color: "gray", type: "solid" },
  { x: 16350, y: groundY - 250, width: 50, height: 51, color: "gray", type: "solid" },
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

//make rooms for ghost blocking answers (y: +500)
for (let i = 0; i <= 9; i++) {
  //do math once
  let yIncrease = (i * 500);

  //spike pillars
  surfaces.push({
    x: 12249,
    y: groundY - 480 - yIncrease,
    width: 30,
    height: 80,
    color: "gray",
    type: "solid",
  });
  surfaces.push({
    x: 12333,
    y: groundY - 480 - yIncrease,
    width: 30,
    height: 80,
    color: "gray",
    type: "solid",
  });
  surfaces.push({
    x: 12417,
    y: groundY - 480 - yIncrease,
    width: 30,
    height: 80,
    color: "gray",
    type: "solid",
  });
  surfaces.push({
    x: 12501,
    y: groundY - 480 - yIncrease,
    width: 30,
    height: 80,
    color: "gray",
    type: "solid",
  });

  //inner walls
  surfaces.push({
    x: 12150,
    y: groundY - 900 - yIncrease,
    width: 30,
    height: 415,
    color: "gray",
    type: "solid",
  });
  surfaces.push({
    x: 12600,
    y: groundY - 900 - yIncrease,
    width: 30,
    height: 415,
    color: "gray",
    type: "solid",
  });

  //middle platforms
  surfaces.push({
    x: 12180,
    y: groundY - 400 - yIncrease,
    width: 420,
    height: 15,
    color: "brown",
    type: "platform",
  });
  
  //make ladders (y: +100 (makes 4 in every room))
  for (let j = 0; j <= 3; j++) {
  //do math once
  let ladderIncrease = (yIncrease + (j * 100));

    //right
    surfaces.push({
      x: 12090,
      y: groundY - 500 - ladderIncrease,
      width: 60,
      height: 15,
      color: "brown",
      type: "platform",
    });
    
    //left
    surfaces.push({
      x: 12630,
      y: groundY - 500 - ladderIncrease,
      width: 60,
      height: 15,
      color: "brown",
      type: "platform",
    });
  }
}

//goal object
var goal = {
  x: 16350,
  y: groundY - 310,
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

  //below spike pit varying jump types 2
  { x: 8600, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 8800, y: groundY, width: 40, height: 60, color: "orange" }, //down
  { x: 9000, y: groundY, width: 40, height: 60, color: "orange" }, //down
  { x: 9250, y: groundY + 100, width: 40, height: 60, color: "orange" }, //down
  { x: 9450, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 9700, y: groundY + 50, width: 40, height: 60, color: "orange" }, //down
  { x: 9900, y: groundY + 50, width: 40, height: 60, color: "orange" }, //down
  { x: 10100, y: groundY + 50, width: 40, height: 60, color: "orange" }, //down
  { x: 10300, y: groundY + 50, width: 40, height: 60, color: "orange" }, //up
  { x: 10550, y: groundY, width: 40, height: 60, color: "orange" }, //down
  { x: 10800, y: groundY + 100, width: 40, height: 60, color: "orange" }, //up
  { x: 11050, y: groundY + 50, width: 40, height: 60, color: "orange" }, //down
  { x: 11235, y: groundY + 50, width: 40, height: 60, color: "orange" }, //up
  { x: 11460, y: groundY, width: 40, height: 60, color: "orange" }, //up

  //varying jump types 3
  { x: 12800, y: groundY - 5300, width: 40, height: 60, color: "orange" }, //down
  { x: 13030, y: groundY - 5300, width: 40, height: 60, color: "orange" }, //up
  { x: 13210, y: groundY - 5400, width: 40, height: 60, color: "orange" }, //up
  { x: 13610, y: groundY - 5000, width: 40, height: 60, color: "orange" }, //down
  { x: 13770, y: groundY - 5050, width: 40, height: 60, color: "orange" }, //up
  { x: 13970, y: groundY - 5150, width: 40, height: 60, color: "orange" }, //down
  { x: 14130, y: groundY - 5200, width: 40, height: 60, color: "orange" }, //down
  { x: 14340, y: groundY - 5200, width: 40, height: 60, color: "orange" }, //up
  { x: 14610, y: groundY - 5200, width: 40, height: 60, color: "orange" }, //down
  { x: 14820, y: groundY - 5200, width: 40, height: 60, color: "orange" }, //up

  //before goal
  { x: 15760, y: groundY, width: 40, height: 60, color: "orange" }, //up
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

//make ghosts for blocking answers (y: +500)
for (let i = 0; i <= 9; i++) {
  enemies.push({
    x: 12370,
    y: groundY - 470 - (i * 500),
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

  //ghost blocking answer (top of wrong answers)
  { x: 12090, y: groundY - 830, width: 30, height: 30, color: "gray" }, //left
  { x: 12120, y: groundY - 830, width: 30, height: 30, color: "gray" },

  { x: 12630, y: groundY - 1330, width: 30, height: 30, color: "gray" }, //right
  { x: 12660, y: groundY - 1330, width: 30, height: 30, color: "gray" },

  { x: 12090, y: groundY - 1830, width: 30, height: 30, color: "gray" }, //left
  { x: 12120, y: groundY - 1830, width: 30, height: 30, color: "gray" },

  { x: 12090, y: groundY - 2330, width: 30, height: 30, color: "gray" }, //left
  { x: 12120, y: groundY - 2330, width: 30, height: 30, color: "gray" },

  { x: 12630, y: groundY - 2830, width: 30, height: 30, color: "gray" }, //right
  { x: 12660, y: groundY - 2830, width: 30, height: 30, color: "gray" },

  { x: 12090, y: groundY - 3330, width: 30, height: 30, color: "gray" }, //left
  { x: 12120, y: groundY - 3330, width: 30, height: 30, color: "gray" },

  { x: 12630, y: groundY - 3830, width: 30, height: 30, color: "gray" }, //right
  { x: 12660, y: groundY - 3830, width: 30, height: 30, color: "gray" },

  { x: 12090, y: groundY - 4330, width: 30, height: 30, color: "gray" }, //left
  { x: 12120, y: groundY - 4330, width: 30, height: 30, color: "gray" },

  { x: 12630, y: groundY - 4830, width: 30, height: 30, color: "gray" }, //right
  { x: 12660, y: groundY - 4830, width: 30, height: 30, color: "gray" },

  { x: 12630, y: groundY - 5330, width: 30, height: 30, color: "gray" }, //right
  { x: 12660, y: groundY - 5330, width: 30, height: 30, color: "gray" },
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

//make spikes for spike pit (x: +30)
for (let i = 0; i <= 99; i++) {
  spikes.push({
    x: 8460 + (i * 30),
    y: groundY - 180,
    width: 30,
    height: 30,
    color: "gray",
  });
}

//make spikes for ghost blocking answer spike pillars (y: +500)
for (let i = 0; i <= 9; i++) {
  //do math once
  let yIncrease = (i * 500);
  
  spikes.push({
    x: 12249,
    y: groundY - 510 - yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 12333,
    y: groundY - 510 - yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 12417,
    y: groundY - 510 - yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 12501,
    y: groundY - 510 - yIncrease,
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

  //second set of secret signs
  { x: 8190, y: groundY - 2180, width: 60, height: 80, color: "brown", type: "up" },
  { x: 8250, y: groundY - 2030, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 1880, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8250, y: groundY - 1730, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 1580, width: 60, height: 80, color: "brown", type: "up" },
  { x: 8250, y: groundY - 1430, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 1280, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8250, y: groundY - 1130, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 980, width: 60, height: 80, color: "brown", type: "up" },
  { x: 8250, y: groundY - 830, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 680, width: 60, height: 80, color: "brown", type: "up" },
  { x: 8250, y: groundY - 530, width: 60, height: 80, color: "brown", type: "down" },
  { x: 8190, y: groundY - 380, width: 60, height: 80, color: "brown", type: "up" },
  { x: 8250, y: groundY - 230, width: 60, height: 80, color: "brown", type: "up" },

  //fourth directional sign
  { x: 8430, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },

  //ghost blocking answer signs
  { x: 12360, y: groundY - 480, width: 60, height: 80, color: "brown", type: "right" },
  { x: 12360, y: groundY - 980, width: 60, height: 80, color: "brown", type: "left" },
  { x: 12360, y: groundY - 1480, width: 60, height: 80, color: "brown", type: "right" },
  { x: 12360, y: groundY - 1980, width: 60, height: 80, color: "brown", type: "right" },
  { x: 12360, y: groundY - 2480, width: 60, height: 80, color: "brown", type: "left" },
  { x: 12360, y: groundY - 2980, width: 60, height: 80, color: "brown", type: "right" },
  { x: 12360, y: groundY - 3480, width: 60, height: 80, color: "brown", type: "left" },
  { x: 12360, y: groundY - 3980, width: 60, height: 80, color: "brown", type: "right" },
  { x: 12360, y: groundY - 4480, width: 60, height: 80, color: "brown", type: "left" },
  { x: 12360, y: groundY - 4980, width: 60, height: 80, color: "brown", type: "left" },

  //third secret signs
  { x: 11255, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "down" },
  { x: 11320, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "up" },
  { x: 11385, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "up" },
  { x: 11450, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "down" },
  { x: 11515, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "up" },
  { x: 11580, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "down" },
  { x: 11645, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "down" },
  { x: 11710, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "up" },
  { x: 11775, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "down" },
  { x: 11840, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "up" },

  //fifth directional sign
  { x: 12630, y: groundY - 5480, width: 60, height: 80, color: "brown", type: "right" },
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