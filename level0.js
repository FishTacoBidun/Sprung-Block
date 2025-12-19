//base canvas dimensions
var BASE_WIDTH = 800;
var BASE_HEIGHT = 500;
var groundY = BASE_HEIGHT - 50;

//surfaces array
var surfaces = [
  //GROUND
  { x: -120, y: groundY, width: 2200, height: 1000, color: "green", type: "ground" },
  { x: 2500, y: groundY, width: 500, height: 1000, color: "green", type: "ground" },

  //PLATFORMS
  { x: 550, y: 320, width: 120, height: 15, color: "brown", type: "platform" },
  { x: 770, y: 300, width: 120, height: 150, color: "gray", type: "solid" },
  { x: 2200, y: 400, width: 185, height: 15, color: "brown", type: "platform" },
];

//goal object
var goal = {
  x: 2725,
  y: groundY - 60,
  width: 50,
  height: 50,
  color: "yellow"
};

//enemies array (orange cubes)
var enemies = [
  { x: 1700, y: groundY - 70, width: 40, height: 60, color: "orange" },
];

//spikes array (gray triangles)
var spikes = [
  { x: 1300, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1330, y: groundY - 30, width: 30, height: 30, color: "gray" },
  { x: 1360, y: groundY - 30, width: 30, height: 30, color: "gray" },
];

//signs array (cosmetic objects)
var signs = [
  { x: 330, y: groundY - 80, width: 60, height: 80, color: "brown", type: "right" },
  { x: 2000, y: groundY - 80, width: 60, height: 80, color: "brown", type: "up" },
];

var tutorialTexts = [
  { //controls
    x: 120,
    y: 380,
    text: "Use A, D, and W or SPACE to move and jump",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "orange",
    strokeWidth: 1
  },
  { //pass through platforms
    x: 610,
    y: 280,
    text: "You can jump through wooden platforms",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "brown",
    strokeWidth: 1
  },
  {
    x: 610,
    y: 300,
    text: "Use this one to get over the wall",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "brown",
    strokeWidth: 1
  },
  { //solid platforms
    x: 830,
    y: 260,
    text: "Stone walls can't",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "gray",
    strokeWidth: 1
  },
  { //solid platforms
    x: 830,
    y: 280,
    text: "be passed through",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "gray",
    strokeWidth: 1
  },
  { //spikes
    x: 1345,
    y: groundY - 80,
    text: "Avoid spikes, they deal 1 damage to you",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "red",
    strokeWidth: 1
  },
  { //health (below spikes)
    x: 1345,
    y: groundY - 60,
    text: "If your health reaches 0, the level will restart",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "red",
    strokeWidth: 1
  },
  { //enemies
    x: 1720,
    y: groundY - 160,
    text: "Running into enemies deals 1 damage to you",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "black",
    strokeWidth: 1
  },
  { 
    x: 1720,
    y: groundY - 140,
    text: "Jumping on top of an enemy will defeat it, and make you bounce",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "black",
    strokeWidth: 1
  },
  {
    x: 1720,
    y: groundY - 120,
    text: "Holding SPACE while jumping on an enemy will make you bounce higher",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "black",
    strokeWidth: 1
  },
  {
    x: 1720,
    y: groundY - 100,
    text: "Enemies respawn after 6 seconds",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "black",
    strokeWidth: 1
  },
  { //the void
    x: 2295,
    y: groundY + 30,
    text: "Avoid falling into the void,",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "tan",
    strokeWidth: 1
  },
  {
    x: 2295,
    y: groundY + 50,
    text: "as it will make you lose all of your health",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "tan",
    strokeWidth: 1
  },
  { //goal
    x: 2750,
    y: groundY - 80,
    text: "Reach the goal to complete the level and unlock the next one",
    fontSize: "14px Arial",
    color: "white",
    align: "center",
    strokeColor: "blue",
    strokeWidth: 1
  }
];

var currentLevel = 0; //tutorial