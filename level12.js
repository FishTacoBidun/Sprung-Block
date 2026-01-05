//base canvas dimensions 8 + 14 + 40 + 10 + 8 + (10 give more time) + 23
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 3820, height: 1000, color: "green", type: "ground" },
  { x: 7100, y: groundY, width: 3800, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  //spike pillars
  { x: 300, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 375, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 450, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 525, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 600, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 675, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 750, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 825, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },
  { x: 900, y: groundY - 90, width: 30, height: 90, color: "gray", type: "solid" },

  //SPIKE MOUNTAIN
  { x: 1200, y: groundY - 125, width: 1670, height: 125, color: "gray", type: "solid" },
  { x: 1310, y: groundY - 250, width: 1450, height: 126, color: "gray", type: "solid" },
  { x: 1420, y: groundY - 375, width: 1230, height: 126, color: "gray", type: "solid" },
  { x: 1530, y: groundY - 500, width: 1010, height: 126, color: "gray", type: "solid" },
  { x: 1640, y: groundY - 625, width: 790, height: 126, color: "gray", type: "solid" },
  { x: 1750, y: groundY - 750, width: 570, height: 126, color: "gray", type: "solid" },
  { x: 1860, y: groundY - 875, width: 350, height: 126, color: "gray", type: "solid" },
  { x: 1970, y: groundY - 1000, width: 130, height: 126, color: "gray", type: "solid" },

  //timed jump base
  { x: 3500, y: groundY - 115, width: 200, height: 115, color: "gray", type: "solid" },

  //timed jump small caves
  { x: 3534, y: groundY - 300, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 195, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 300, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 300, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 485, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 380, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 485, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 485, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 670, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 565, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 670, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 670, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 855, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 750, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 855, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 855, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1040, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 935, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1040, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1040, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1225, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 1120, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1225, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1225, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1410, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 1305, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1410, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1410, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1595, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 1490, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1595, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1595, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1780, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 1675, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1780, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1780, width: 35, height: 120, color: "gray", type: "solid" },

  { x: 3534, y: groundY - 1965, width: 132, height: 20, color: "gray", type: "solid" },
  { x: 3585, y: groundY - 1860, width: 30, height: 15, color: "gray", type: "solid" },
  { x: 3500, y: groundY - 1965, width: 35, height: 120, color: "gray", type: "solid" },
  { x: 3665, y: groundY - 1965, width: 35, height: 120, color: "gray", type: "solid" },

  //timed jump left and right platforms
  { x: 3700, y: groundY - 245, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3400, y: groundY - 430, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3700, y: groundY - 615, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3400, y: groundY - 800, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3700, y: groundY - 985, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3400, y: groundY - 1170, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3700, y: groundY - 1355, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3400, y: groundY - 1540, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3700, y: groundY - 1725, width: 100, height: 15, color: "brown", type: "platform" },
  { x: 3400, y: groundY - 1910, width: 100, height: 15, color: "brown", type: "platform" },

  //random spike jumps
  { x: 3900, y: groundY - 1965, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 4100, y: groundY - 2095, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 4450, y: groundY - 2030, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 4750, y: groundY - 1830, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 5050, y: groundY - 1860, width: 90, height: 15, color: "brown", type: "platform" },
  { x: 5200, y: groundY - 1680, width: 90, height: 15, color: "brown", type: "platform" },

  //tiny platform long jumps
  { x: 7500, y: groundY - 100, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 7760, y: groundY - 150, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 8020, y: groundY - 200, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 8310, y: groundY - 200, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 8600, y: groundY - 200, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 8910, y: groundY - 150, width: 5, height: 15, color: "brown", type: "platform" },
  { x: 9170, y: groundY - 200, width: 100, height: 200, color: "gray", type: "solid" },

  //bottom of ghost expanding gap
  { x: 9600, y: groundY - 100, width: 600, height: 30, color: "gray", type: "solid" },
  { x: 10300, y: groundY - 100, width: 600, height: 30, color: "gray", type: "solid" },
  { x: 10199, y: groundY - 100, width: 31, height: 20, color: "gray", type: "solid" },
  { x: 10270, y: groundY - 100, width: 31, height: 20, color: "gray", type: "solid" },
  { x: 10230, y: groundY - 100, width: 40, height: 15, color: "brown", type: "platform" },
];

//make platforms for spike staircase (x: +140, y: -150)
for (let i = 0; i <= 11; i++) {
  //do math once
  let xIncrease = (i * 144);
  let yIncrease = (i * 150);
  
  //bottom platforms
  surfaces.push({
    x: 5447 + xIncrease,
    y: groundY - 1700 + yIncrease,
    width: 90,
    height: 15,
    color: "brown",
    type: "platform",
  });
  
  //top platforms
  surfaces.push({
    x: 5447 + xIncrease,
    y: groundY - 1810 + yIncrease,
    width: 90,
    height: 15,
    color: "brown",
    type: "platform",
  });
}

//goal object
var goal = {
  x: 10225,
  y: groundY - 4260,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  //timed jumps
  { x: 3660, y: groundY - 175, width: 40, height: 60, color: "orange" },
  { x: 3500, y: groundY - 360, width: 40, height: 60, color: "orange" },
  { x: 3660, y: groundY - 545, width: 40, height: 60, color: "orange" },
  { x: 3500, y: groundY - 730, width: 40, height: 60, color: "orange" },
  { x: 3660, y: groundY - 915, width: 40, height: 60, color: "orange" },
  { x: 3500, y: groundY - 1100, width: 40, height: 60, color: "orange" },
  { x: 3660, y: groundY - 1285, width: 40, height: 60, color: "orange" },
  { x: 3500, y: groundY - 1470, width: 40, height: 60, color: "orange" },
  { x: 3660, y: groundY - 1655, width: 40, height: 60, color: "orange" },
  { x: 3500, y: groundY - 1840, width: 40, height: 60, color: "orange" },
];

//make ghosts for staircase with spikes (x: +144, y: -150)
for (let i = 0; i <= 11; i++) {
  enemies.push({
    x: 5400 + (i * 144),
    y: groundY - 1680 + (i * 150),
    width: 40,
    height: 60,
    color: "orange",
  });
}

//make ghosts for expanding gap (gap (x) increase by 4 (2+2), y: +200 (100 between each ghost))
for (let i = 0; i <= 19; i++) {
  //do math once
  let xIncrease = (i * 2);
  let yIncrease = (i * 200);

  //left side
  enemies.push({
    x: 10160 - xIncrease,
    y: groundY - 200 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
  
  //right side
  enemies.push({
    x: 10300 + xIncrease,
    y: groundY - 300 - yIncrease,
    width: 40,
    height: 60,
    color: "orange",
  });
}

//spikes array (gray triangles)
var spikes = [
  //spawn spikes
  { x: -110, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: -80, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: -50, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: -20, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 10, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 40, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 70, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 132, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 162, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 192, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //pillar spikes
  { x: 300, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 375, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 450, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 525, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 600, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 675, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 750, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 825, y: groundY - 120, width: 30, height: 30, color: "gray" },
  { x: 900, y: groundY - 120, width: 30, height: 30, color: "gray" },

  //SPIKE MOUTAIN
  //left side
  { x: 1050, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1080, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1110, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1140, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1170, y: groundY - 30, width: 30, height: 30, color: "gray" },

  { x: 1225, y: groundY - 155, width: 30, height: 30, color: "gray" },
  { x: 1255, y: groundY - 155, width: 30, height: 30, color: "gray" },
  //{ x: 1280, y: groundY - 155, width: 30, height: 30, color: "gray" },

  { x: 1335, y: groundY - 280, width: 30, height: 30, color: "gray" },
  { x: 1365, y: groundY - 280, width: 30, height: 30, color: "gray" },
  //{ x: 1390, y: groundY - 280, width: 30, height: 30, color: "gray" },

  { x: 1445, y: groundY - 405, width: 30, height: 30, color: "gray" },
  { x: 1475, y: groundY - 405, width: 30, height: 30, color: "gray" },
  //{ x: 1500, y: groundY - 405, width: 30, height: 30, color: "gray" },

  { x: 1555, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 1585, y: groundY - 530, width: 30, height: 30, color: "gray" },
  //{ x: 1610, y: groundY - 530, width: 30, height: 30, color: "gray" },

  { x: 1665, y: groundY - 655, width: 30, height: 30, color: "gray" },
  { x: 1695, y: groundY - 655, width: 30, height: 30, color: "gray" },
  //{ x: 1720, y: groundY - 655, width: 30, height: 30, color: "gray" },

  { x: 1775, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 1805, y: groundY - 780, width: 30, height: 30, color: "gray" },
  //{ x: 1830, y: groundY - 780, width: 30, height: 30, color: "gray" },

  { x: 1885, y: groundY - 905, width: 30, height: 30, color: "gray" },
  { x: 1915, y: groundY - 905, width: 30, height: 30, color: "gray" },
  //{ x: 1940, y: groundY - 905, width: 30, height: 30, color: "gray" },

  //top
  { x: 1990, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2020, y: groundY - 1030, width: 30, height: 30, color: "gray" },
  { x: 2050, y: groundY - 1030, width: 30, height: 30, color: "gray" },

  //right side
  //{ x: 2100, y: groundY - 905, width: 30, height: 30, color: "gray" },
  { x: 2125, y: groundY - 905, width: 30, height: 30, color: "gray" },
  { x: 2155, y: groundY - 905, width: 30, height: 30, color: "gray" },

  //{ x: 2210, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 2235, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 2265, y: groundY - 780, width: 30, height: 30, color: "gray" },

  //{ x: 2320, y: groundY - 655, width: 30, height: 30, color: "gray" },
  { x: 2345, y: groundY - 655, width: 30, height: 30, color: "gray" },
  { x: 2375, y: groundY - 655, width: 30, height: 30, color: "gray" },

  //{ x: 2430, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2455, y: groundY - 530, width: 30, height: 30, color: "gray" },
  { x: 2485, y: groundY - 530, width: 30, height: 30, color: "gray" },

  //{ x: 2540, y: groundY - 405, width: 30, height: 30, color: "gray" },
  { x: 2565, y: groundY - 405, width: 30, height: 30, color: "gray" },
  { x: 2595, y: groundY - 405, width: 30, height: 30, color: "gray" },

  //{ x: 2650, y: groundY - 280, width: 30, height: 30, color: "gray" },
  { x: 2675, y: groundY - 280, width: 30, height: 30, color: "gray" },
  { x: 2705, y: groundY - 280, width: 30, height: 30, color: "gray" },

  //{ x: 2760, y: groundY - 155, width: 30, height: 30, color: "gray" },
  { x: 2785, y: groundY - 155, width: 30, height: 30, color: "gray" },
  { x: 2815, y: groundY - 155, width: 30, height: 30, color: "gray" },

  { x: 2870, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2900, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2930, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2960, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 2990, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3020, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3050, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3080, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 3110, y: groundY - 30, width: 30, height: 30, color: "gray" },

  //timed jumps spikes (bottom)
  { x: 3585, y: groundY - 145, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 330, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 515, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 700, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 885, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1070, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1255, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1440, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1625, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1810, width: 30, height: 30, color: "gray" },

  //top
  { x: 3585, y: groundY - 225, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 410, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 595, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 780, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 965, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1150, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1335, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1520, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1705, width: 30, height: 30, color: "gray" },
  { x: 3585, y: groundY - 1890, width: 30, height: 30, color: "gray" },

  //random spike jumps
  { x: 3930, y: groundY - 1995, width: 30, height: 30, color: "gray" },
  { x: 4130, y: groundY - 2125, width: 30, height: 30, color: "gray" },
  { x: 4480, y: groundY - 2060, width: 30, height: 30, color: "gray" },
  { x: 4780, y: groundY - 1860, width: 30, height: 30, color: "gray" },
  { x: 5080, y: groundY - 1890, width: 30, height: 30, color: "gray" },
  { x: 5230, y: groundY - 1710, width: 30, height: 30, color: "gray" },
];

//make spikes for staircase (x: +144, y: -150)
for (let i = 0; i <= 11; i++) {
  //do math once
  let xIncrease = (i * 144);
  let yIncrease = (i * 150);
  
  //bottom spikes
  spikes.push({
    x: 5447 + xIncrease,
    y: groundY - 1730 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5477 + xIncrease,
    y: groundY - 1730 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5507 + xIncrease,
    y: groundY - 1730 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  
  //top spikes
  spikes.push({
    x: 5447 + xIncrease,
    y: groundY - 1840 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5477 + xIncrease,
    y: groundY - 1840 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
  spikes.push({
    x: 5507 + xIncrease,
    y: groundY - 1840 + yIncrease,
    width: 30,
    height: 30,
    color: "gray",
  });
}

//ghost increasing gap floor
for (let i = 0; i <= 20; i++) {
  spikes.push({
    x: 9600 + (i * 30),
    y: groundY - 130,
    width: 30,
    height: 30,
    color: "gray",
  });

  spikes.push({
    x: 10270 + (i * 30),
    y: groundY - 130,
    width: 30,
    height: 30,
    color: "gray",
  });
}

//signs array (cosmetic objects)
var signs = [
  { x: 220, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: 3420, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
  { x: 7250, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 9190, y: groundY - 280, width: 60, height: 80, color: "brown", type: "right" },
  { x: 10220, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
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

var currentLevel = 12;