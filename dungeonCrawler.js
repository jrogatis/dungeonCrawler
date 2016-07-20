// JavaScript Document
/*jshint esversion: 6 */

//area to create store from redux


const returnTrue = () => true;
const not = _.negate;

const canBlock = returnTrue;
const canCollect = returnTrue;
const canDestroy = returnTrue;
const canKill = returnTrue;
//condcional for can win or not yet...
const canWin = (s) => s.get('numTapes') >= level.getNumTapesTotal(s);

const is = _.curry((prop, val, entity) => entity[prop] === val);

//if you dont have this ability you cant pass this tile...
const blocksUnless = (hasAbility) => ({
  canBlock: not(hasAbility),
  canDie: hasAbility
});

const hasPowerup = _.curry((powerup, state, entity) => {
  return state.get('powerups').includes(powerup);
});

//check the habilities 
 const hasBoots = hasPowerup('boots');
 const hasHammer = hasPowerup('hammer');
 const hasSilverware = hasPowerup('silverware');
 const hasSpeedboat = hasPowerup('speedboat');
 const hasSunglasses = hasPowerup('sunglasses');

const grounds = {
  GA: { type: 'grass' },
  GB: { type: 'path' },
  GC: { type: 'water' },
  GD: { type: 'sand' },
  GE: { type: 'forest' },
  GF: { type: 'road' },
  GG: { type: 'sidewalk' },
  GH: { type: 'sky' },
  GI: { type: 'roadline' },
  GJ: { type: 'doorway' },
  GK: { type: 'snow' },
};
const entities = {
  '00': { type: 'empty' },
  '01': { type: 'start' },
  // Special
  SA: { type: 'tape', canCollect },
  SB: { type: 'door', canWin, canDestroy: canWin, canBlock: not(canWin) },
  SC: { type: 'person' },
  SD: { type: 'invisible', canBlock },
  SE: { type: 'ghost' },
  // Powerups
  PA: { type: 'sunglasses', canCollect },
  PB: { type: 'silverware', canCollect },
  PC: { type: 'speedboat',  canCollect },
  PD: { type: 'boots',      canCollect },
  PE: { type: 'hammer',     canCollect },
  // Bounds
  BA: { type: 'treeA',    canBlock },
  BB: { type: 'treeB',    canBlock },
  BC: { type: 'building', canBlock },
  BD: { type: 'rabbit',   ...blocksUnless(hasHammer) },
  BE: { type: 'chicken',  ...blocksUnless(hasHammer) },
  BF: { type: 'fishA',    ...blocksUnless(hasSpeedboat) },
  BG: { type: 'fishB',    ...blocksUnless(hasSpeedboat) },
  BH: { type: 'turtle',   ...blocksUnless(hasBoots) },
  BI: { type: 'camel',    ...blocksUnless(hasHammer) },
  BJ: { type: 'cloud',    canBlock },
  BK: { type: 'creepsun', ...blocksUnless(hasHammer) },
  BL: { type: 'palm',     canBlock },
  BM: { type: 'flowerA',  ...blocksUnless(hasBoots) },
  BN: { type: 'flowerB',  ...blocksUnless(hasBoots) },
  BO: { type: 'flowerC',  ...blocksUnless(hasBoots) },
  BP: { type: 'treeC',    canBlock },
  BQ: { type: 'leavesA',  canBlock },
  BR: { type: 'leavesB',  canBlock },
  BS: { type: 'leavesC',  canBlock },
  BT: { type: 'willows',  canBlock },
  BU: { type: 'shell',    ...blocksUnless(hasBoots) },
  BV: { type: 'snowflake', canBlock },
  BW: { type: 'banana',    canDestroy: hasSilverware },
  BX: { type: 'monkey',    ...blocksUnless(hasHammer) },
  BY: { type: 'elephant',  ...blocksUnless(hasHammer) },
  BZ: { type: 'houseA',    canBlock },
  CA: { type: 'houseB',    canBlock },
  CB: { type: 'mart',      canBlock },
  CC: { type: 'musichall', canBlock },
  CD: { type: 'moai',      ...blocksUnless(hasHammer) },
  // The sign
  ZL: { type: 'storesign--v', canBlock },
  ZM: { type: 'storesign--i', canBlock },
  ZN: { type: 'storesign--d', canBlock },
  ZO: { type: 'storesign--e', canBlock },
  ZP: { type: 'storesign--o', canBlock },
  ZQ: { type: 'storesign--s', canBlock },
  ZR: { type: 'storesign--t', canBlock },
  ZS: { type: 'storesign--r', canBlock },
  // Killers without items
  DA: { type: 'sun',     canKill: not(hasSunglasses) },
  DB: { type: 'corn',    canBlock: not(hasSilverware), canDestroy: hasSilverware },
  DC: { type: 'wave',    canBlock: not(hasSpeedboat) },
  DD: { type: 'fire',    canKill: not(hasBoots), canDestroy: hasBoots },
  DE: { type: 'snowman', canKill: not(hasHammer), canDie: hasHammer },
  DF: { type: 'santa',   canKill: not(hasHammer), canDie: hasHammer },
  DG: { type: 'shit',    canKill: not(hasBoots),  canDie: hasBoots },
  // Killers always
  KA: { type: 'bee',       canKill },
  KB: { type: 'gator',     canKill },
  KC: { type: 'snake',     canKill },
  KD: { type: 'carA',      canKill },
  KE: { type: 'carB',      canKill },
  KF: { type: 'taxi',      canKill },
  KG: { type: 'firetruck', canKill },
  KH: { type: 'police',    canKill },
  KI: { type: 'ambulance', canKill },
  KJ: { type: 'cactus',    canKill },
  KK: { type: 'tornado',   canKill },
	
};
const powerupTypes = [
  entities.PA.type,
  entities.PB.type,
  entities.PC.type,
  entities.PD.type,
  entities.PE.type
];

 const PX_PER_COL = 25;
 const PX_PER_ROW = 25;
 const CAM_COLS   = 800 / PX_PER_COL;
 const CAM_ROWS   = 600 / PX_PER_ROW;

//inicial state 
const initialState = Immutable.fromJS({
  editor: {
    activeEntity: null,
    activeGround: null,
  },
  router: null,
  // level: null,
  numTapes: 0,
  deaths: 0,
  time: 5 * 60,
  powerups: [],
  health: 4,
  hasWon: false,
  player: {
    // row: null,
    // col: null,
    direction: 'left'
  }
});
//arrays with the maps for ground and entities 
const GROUNDS = [
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GJ GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH GH",
  "GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG",
  "GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF GF",
  "GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI GI",
  "GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG GG",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GK GA GA GA GA GA GA GA GA GA GA GB GB GA GA GA GA GA GA GA GA GA GA GA GA GE GE GE GA",
  "GA GA GA GA GK GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GK GK GK GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GE GE GE GE GE GE",
  "GA GA GA GK GK GK GK GK GA GA GA GA GA GA GA GK GA GA GK GK GA GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GE GE GE GE GE GE GE GE",
  "GA GA GA GK GK GK GK GA GA GA GA GA GA GA GA GK GK GA GK GK GK GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GE GE GE GE GE GE GE GE GE",
  "GA GA GA GA GK GK GA GA GA GA GA GK GK GA GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GA GA GA GD GA GA GA GA GA GE GE GC GE GE GE GE GE GE GE",
  "GA GA GA GA GA GA GA GA GA GA GK GK GK GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GA GA GA GD GD GD GE GA GA GE GE GC GC GC GE GE GE GE GE GE",
  "GA GA GA GA GA GA GA GA GA GK GK GK GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GA GA GA GD GD GD GE GE GE GE GE GE GC GE GC GE GE GE GE GE GE",
  "GA GA GA GA GA GA GK GK GA GK GK GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GA GA GA GE GE GE GE GE GE GE GE GE GE GE GC GC GE GE GE GE GA GE",
  "GA GA GA GA GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GD GE GE GC GE GC GE GE GE GE GE GE GE GC GE GE GE GA GA GA GA",
  "GA GA GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GD GD GD GC GC GC GC GC GE GE GE GE GE GC GC GE GE GA GA GA GA GA",
  "GA GK GK GK GK GK GK GK GK GK GK GE GK GE GK GK GK GK GK GK GK GK GA GA GA GA GA GA GD GD GE GC GC GC GC GC GE GE GE GE GE GC GC GE GA GA GA GA GA GA",
  "GA GK GK GK GK GK GK GE GK GK GK GE GE GE GK GK GK GK GK GK GK GA GA GA GA GA GA GA GA GD GE GC GC GC GE GE GE GE GE GE GC GC GE GE GA GA GA GA GA GA",
  "GA GK GK GK GK GK GK GE GE GK GK GK GE GE GK GK GK GK GK GK GK GK GA GA GA GA GA GA GA GE GE GE GC GE GE GE GE GE GC GC GC GE GE GA GA GA GA GA GA GA",
  "GA GA GK GK GK GE GE GE GE GK GK GK GK GE GA GK GK GK GK GK GK GA GA GA GA GA GA GA GE GE GE GE GC GC GC GC GE GC GC GC GE GE GA GA GA GA GA GA GA GA",
  "GA GA GA GK GK GK GE GE GK GK GK GK GK GK GA GA GK GK GK GK GK GK GA GA GA GA GA GA GA GE GE GE GE GE GC GC GC GC GE GE GE GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GK GK GK GK GK GK GK GK GA GA GA GK GK GK GA GK GA GA GA GA GA GA GA GA GA GA GE GE GE GC GC GC GE GE GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GE GE GE GK GK GK GK GK GA GA GA GA GA GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GE GE GE GE GE GE GA GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GE GE GE GE GE GE GE GA GA GA GB GA GA GA GA GA GA GA GK GK GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GE GE GE GE GA GA GA GA GB GB GB GB GB GA GA GA GA GA GA GK GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA",
  "GA GA GE GE GA GA GA GA GA GA GA GB GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GB GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GA GA GA GA",
  "GA GA GA GA GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA",
  "GA GA GA GA GE GE GA GE GA GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GA GA GA GA GA GA GA GA",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GA GA GD GD GA GA GA",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GB GB GB GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GA GA GD GA GA GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GA GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GB GB GB GB GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GB GB GB GB GB GB GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GC GD GD GD GD GD GD GD GD GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GB GB GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GB GB GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GE GE GE GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GB GB GB GB GA GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GA GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD",
  "GA GA GE GE GE GE GE GE GE GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GB GB GB GB GB GD GD GD GD GD GD GD GD GD GD GD GD GD GD GD GA",
  "GA GA GA GA GA GE GE GA GE GE GE GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GD GD GD GD GD GD GD GD GD GD GD GD GD GD GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GD GA GA GD GD GD GD GD GD GD GD GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GD GD GD GA GD GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GC GC GC GC GC GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC",
  "GA GA GA GA GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GC",
  "GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GA GA GA GA GA GA GA GA GA GC GC GC GC GC GC GA GA GA GA GC GC GC GC GC GC GC",
  "GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GA GA GA GA GA GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC",
  "GC GC GC GC GC GC GC GC GC GA GA GA GA GA GC GC GC GC GC GC GC GC GC GC GC GC GA GA GA GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC",
  "GC GC GC GC GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GC GC GC GA GA GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GC GC GC GC GC GC GC GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GC GC GC GC GA GA GA GA GA GA GA GB GB GB GB GB GB GB GB GB GB GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GC GC GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GC GC GC GC GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GB GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GB GB GB GB GB GB GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GB GB GB GB GB GB GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GB GB GB GB GB GB GB GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GB GB GB GB GB GB GB GB GB GB GB GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GB GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA",
  "GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GB GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA GA"
];
const ENTITIES = [
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 BJ 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BJ BJ BJ 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 BJ BJ BJ 00 00 00 00 SA BJ BJ BJ 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BJ BJ BJ BJ BJ BJ 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 BJ BJ BJ BJ BJ BJ 00 00 00 00 00 00 00 ZL ZM ZN ZO ZP ZQ ZR ZP ZS ZO 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BK 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BC BC BC BC BC BC BC BC BC BC 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 CB 00 00 00 00 00 CA 00 CA 00 CA 00 00 00 00 00 BC BC BC BC BC BC SB BC BC BC 00 00 00 CB 00 00 CC CC 00 00 00 00 BM CA BP CA BP CA BP 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 SA 00 00 00 00 00 00 00 00 00",
  "00 00 KD 00 00 00 00 00 00 00 00 00 00 00 00 KI 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 SA KF 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 KH 00 00 00 00 00 SA 00 00 00 00 00 00 00 00 KG 00 00 00 00 KE 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 SA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP BP BP BO 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 BO BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BM BM 00 00 00 00 00 00 BO BP BP BP BP 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 BO BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BM BM SA BM BM 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 BV 00 00 00 BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BM BM BM BM BM 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 DE BV BV 00 00 00 00 BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BM BM 00 00 00 00 00 00 00 00 00 00 00 BL BL BL 00 00",
  "00 00 00 00 SA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BV 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BL BL BL 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BW 00 00 00 00 00 00 00 BL BL BL 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BX BX 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BX DG 00 00 00 00 00 BL 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 BV BV 00 00 00 DE 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BW 00 00 00 00 BL 00 SA 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 BV 00 00 00 BV DE SA DE 00 00 00 00 00 00 00 00 00 00 00 00 00 BW BL 00 00 00 00 00 00 00 00 00 00 BT 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 DE BV DE 00 00 00 00 00 00 00 00 00 00 00 00 BO 00 BX 00 BY 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 BD 00 00 DE 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 KJ 00 00 BX 00 00 00 00 00 00 BY DG 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 SA 00 00 00 00 00 DE 00 00 BV 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 SA 00 00 00 BY 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BV 00 00 00 BB 00 00 DE BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BM 00 00 00 BX 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 BB 00 00 DE 00 BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BO 00 BL 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BD 00 00 00 00 00 00 00 00 00 00 00 00 BF 00 00 00 BM 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 DG 00 00 00 00 00 00 00 00 00 00 00 00 SA 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 BV 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BR 00 00 00 00 00",
  "00 00 00 00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BV 00 00 00 00 00 00 00 BD DG 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP BP 00 BQ 00 00 00 00 00 00",
  "00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BR 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BO BO BO BO 00 00 00 00 00 00 BQ 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BO BO BO BO BO BO BO BO 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BS 00 BS 00 00 00 00 00 00 00 00 00 00 00 00 BN BO BO SA BO BO BO BO 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BT BS BS 00 BS 00 00 00 00 00 00 00 00 00 00 00 00 BN BO BO BO BO BO BN 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BT BS BS BS BP 00 BP 00 00 00 00 00 00 00 00 00 00 00 BN BN BO BO BO BO BN 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BT BP BS BP BS 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BO BO 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 BR 00 00 00 00 00 00 00 00 BS BS BS 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BS BS BS 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 BA 00 00 BB BB BB BB BB BB 00 00 00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BR 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BB BB BB BO BO BO BB BB 00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 BQ 00 BB BB BO DE SA DE BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BT BP BP BP BT 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BB BB DE DE DE DE BB BB 00 00 00 00 00 00 00 00 00 BR 00 00 00 00 00 00 BS BP BP BP 00 00 00 00 00 00 00 KJ 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BO BB DE DE DE DE BB BB 00 00 00 00 00 00 00 00 BQ 00 00 00 00 00 00 00 BS BP BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 BR 00 BO BB BB 00 BB BB BB BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP BP SA BQ 00 00 00 00 00 00 00 00 KJ KJ 00 00 00 00 KC 00 00",
  "00 00 00 00 BB BB 00 BB BB BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP BP BP BT 00 00 00 00 00 00 00 00 BO 00 00 00 00 00 00 00 00 00 00",
  "00 00 BA 00 BB BB 00 BB BB BB 00 00 BQ 00 BA 00 00 BS 00 00 BP 00 00 00 00 00 00 BP BP BP BD BP 00 00 00 00 00 00 00 00 00 00 00 00 00 KC 00 00 00 00",
  "00 BA BA 00 BB BB 00 00 00 00 00 00 00 00 00 00 00 BP BP BS BP 00 00 00 00 00 00 00 BP 00 00 BD 00 00 00 00 00 KJ 00 00 00 DD DD DD DD 00 00 00 00 00",
  "00 00 00 00 BB BB BB BB BB BB 00 00 00 00 00 00 00 BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 DD DD DD DD DD DD 00 00 00 00",
  "00 00 00 00 00 BB BB BB BB 00 00 00 00 00 00 00 00 00 BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BI 00 00 00 00 DD DD DD PE DD DD 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BI 00 00 DD DD DD DD DD DD 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BH 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 DD DD DD DD 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 BS BS 00 00 00 00 00 00 BH BH BH 00 00 00 00 00 00 BP BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BH SA BH BH 00 00 00 00 00 00 00 BP BP 00 00 00 00 00 00 00 00 00 KJ 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 BT 00 DC DC DC DC DC 00 00 00 BU 00 00 00 00 BH BH BH 00 00 00 00 00 00 00 BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 DC",
  "00 00 00 00 DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC 00 00 00 00 00 BH 00 00 00 00 00 00 00 00 00 00 00 00 BT 00 00 00 00 00 00 00 DC DC DC DC DC",
  "DC DC DC PD KB KB DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC 00 00 00 00 00 00 BT 00 00 DC DC DC DC DC DC 00 BU BU 00 DC DC DC DC DC DC DC",
  "DC DC KB KB KB KB DC DC DC DC DC BF DC DC DC DC DC DC DC DC DC DC DC DC DC 00 00 00 00 00 DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC",
  "DC DC DC DC DC DC DC DC DC 00 00 BT BT 00 BF DC DC DC DC DC DC DC DC DC DC DC 00 00 BT DC DC BG BG DC DC DC DC DC KB DC DC DC DC DC DC DC DC DC DC DC",
  "DC DC DC DC 00 00 BU BU 00 00 00 00 00 00 00 00 00 00 00 DC DC KB KB DC DC DC 00 00 DC DC BG BG BG DC DC DC DC DC DC DC DC DC DC DC DC DC DC DC BA BA",
  "00 00 00 00 00 00 00 00 00 00 BP 00 00 00 00 00 00 00 00 00 00 DC DC DC DC DC DC DC DC DC DC DC 00 00 BA BA BA BA BA BA BA BA BA BA BA BA BA PC BA BA",
  "00 00 00 00 00 00 00 00 00 BP BP BQ 00 00 00 BA BA 00 00 00 00 00 00 DC DC DC DC DC DC DC DC 00 00 00 00 00 BA BA DB DB DB DB DB DB DB DB DB DB BA BA",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA 00 BA 00 00 00 00 00 DC DC DC DC DC DC 00 00 00 00 00 00 00 BA BA DB BA BA BA BA BA BA BA BA BA BA",
  "00 SA 00 00 00 00 00 00 00 00 00 00 00 00 BA SA 00 00 BA 00 00 00 00 00 00 DC DC DC DC 00 00 00 00 00 00 00 00 BA BA 00 BA BA BA BA BA BA BA BA BA BA",
  "00 00 00 00 00 00 00 00 BE 00 00 00 00 BA BA BA BA BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA SA BA",
  "00 00 00 00 BA BA 00 00 00 00 00 00 00 00 BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA",
  "00 00 BE BA BA BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP 00 00 00 BA BA BA",
  "00 BA BA BA BA PB BA 00 BD DG 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA BA BA BA BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 BE BA BA DA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 BA BA 00 00 00 00 00 00 00 00 00 BA BA BA 00 00 00 00 00 00 BA BA BA BA BA BA BA PA 00 00 00 00 00 00 BA 00 00 CD CD CD CD 00 00 00 00 00 00",
  "00 00 00 00 00 00 BD 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA BA BA BA BA BA BA BA BA 00 00 CD BN BN CD 00 00 BO BO 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BA BA BA BA 00 00 00 00 00 00 CD BN SA CD 00 BO BO 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 KA 00 00 00 00 00 SA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 CD BN BN CD 00 BO BO BO 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 KA 00 00 KA 00 00 00 00 00 00 00 00 00 00 00 00 BP 00 00 00 00 00 00 00 00 CD CD CD CD 00 00 BO 00 00 00",
  "00 00 00 BP 00 BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 BP 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
  "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
];

const groundToType = Object.freeze({
  doorway: 'dancer',
  road: 'bike',
  roadline: 'bike',
  sidewalk: 'personWalk',
  sky: 'chopper',
  water: 'speedboat',
});


const {

  Modal,
  Button,
  Grid,
  Col,
  Row,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  ButtonGroup,
  Table,
  thead,
  tbody,
  tr,
  td,
  Well,
  Glyphicon
	
} = ReactBootstrap;

class FontAwesome extends React.Component{
	constructor(props) {
		super(props);
	}
	

  render () {
    let {
      border,
      fixedWidth,
      flip,
      inverse,
      name,
      pulse,
      rotate,
      size,
      spin,
      stack,
      ...props,
    } = this.props;

    let className = 'fa fa-' + name;

    if (size) {
      className += ' fa-' + size;
    }

    if (spin) {
      className += ' fa-spin';
    }

    if (pulse) {
      className += ' fa-pulse';
    }

    if (border) {
      className += ' fa-border';
    }

    if (fixedWidth) {
      className += ' fa-fw';
    }

    if (inverse) {
      className += ' fa-inverse';
    }

    if (flip) {
      className += ' fa-flip-' + flip;
    }

    if (rotate) {
      className += ' fa-rotate-' + rotate;
    }

    if (stack) {
      className += ' fa-stack-' + stack;
    }

    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return (
      <span
        {...props}
        className={className}
      />
    )
  }
  }

FontAwesome.propTypes = {
	  
    border: React.PropTypes.bool,
	className: React.PropTypes.string,
    fixedWidth: React.PropTypes.bool,
    flip: React.PropTypes.oneOf([ 'horizontal', 'vertical' ]),
    inverse: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    pulse: React.PropTypes.bool,
    rotate: React.PropTypes.oneOf([ 90, 180, 270 ]),
    size: React.PropTypes.oneOf([ 'lg', '2x', '3x', '4x', '5x' ]),
    spin: React.PropTypes.bool,
    stack: React.PropTypes.oneOf([ '1x', '2x' ]),
  }

class Tiles extends React.Component{
 

  render() {
    const { tiles,block } = this.props;
	var arrTiles = [];
	 
	  tiles.map(function(row,i){
		  row = row.split(' ')
		  var temp =  <TilesRow
		  				key={i}
						row={i}
						block={block}
        				tiles={row}
						/>
		 arrTiles.push(temp) 
					
	  })
	  
	  
    return (
      <div className="tiles">
        {arrTiles}
      </div>
    );
  }
}

class TilesRow extends React.Component {


  render() {
	 const { block,row } = this.props;
	  var arrTiles = []
	  var typeTemp;
	  
	  this.props.tiles.map(function(tile,i){
		  
		  var key = tile + "-"+ row +"-" +i;
		
		 if (block === "ground")	{
			  typeTemp = grounds[tile].type;
		  } else {
			   typeTemp = entities[tile].type;
		  }
		  
		  var temp = <Tile
						key={key}
						block={block}
						col={i}
						row={row}
						type={typeTemp}
					  />;
					  
		arrTiles.push(temp);			  
		  
		  
	  })
	  
	  
	  
   return (
      <div className="tiles__row">
        {arrTiles}
      </div>
    );
  }

}

TilesRow.propTypes = {
    tiles: React.PropTypes.array.isRequired
  }

//Create the tile object
class Tile extends React.Component {

	componentDidMount() {
	  
    	const { type } = this.props;
  }
	
  	render() {
		//pega as propriedades deste tile da que foi passado pelas 
		//tiles
		//@block se e growd ou entitiy
		const { block, col, row, type, className } = this.props;
	  
		var topRow = (PX_PER_ROW * row) + "px";
		var leftCol =  (PX_PER_COL * col) + "px";
		var clsName = className +" tile " + block + " " + block + "--" + type;
    	const attrs = {
			...this.props,
			style: {
				top: topRow,
				left: leftCol
			},		
			className: clsName

    	};
	
	var temp=<div {...attrs} />;
    return (temp);
  }}	

 Tile.propTypes = {
    block: React.PropTypes.string.isRequired,
    col: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired
}

class Camera extends React.Component {
	 
   
  render() {
   const { numCols, numRows } = this.props;
	  //aqui calcula o tamanho do div "camera em funcão das colunas"
	var widthTemp = (PX_PER_COL * numCols) +"px";  
	var heightTemp= (PX_PER_ROW * numRows)+ "px";						 	
    const style = {
		height: heightTemp,
		width: widthTemp,
		backgroundColor: "blue"
	
		} ;
	  
	  return (
      <div className="camera" style={style}>
   				 {this.props.children}
      </div>
    ); 
   
  }
}
	  
Camera.propTypes = {
    numCols: React.PropTypes.number.isRequired,
    numRows: React.PropTypes.number.isRequired
   // onWillMount: PropTypes.func.isRequired,
  }

class WorldContainer extends React.Component {
		
		
		render() {
			var _this = this;
			
			 const worldWidth = 50 //level.width(state);
			 const worldHeight = 80//level.height(state);

			 const playerCol = 30//player.getCol(state);
			 const playerRow = 30//player.getRow(state);

			 _this.col = calcCoord(worldWidth, CAM_COLS, playerCol);
			 _this.row = calcCoord(worldHeight, CAM_ROWS, playerRow);
			
			function calcCoord(worldDim, camDim, playerCoord) {
				  // Number of units that are offscreen for this x or y dimension.
				  const unitsOutsideCamera = worldDim - camDim;
				  // Ideal number of units around the player. This puts the player
				  // in the center of the camera.
				  const unitsAroundPlayer = camDim / 2;
				  // The world is being translated via `top` and `left`, so we never
				  // want it to be greater than 0 or else there'd be empty space shown
				  // in the top or left corner.
				  const maxCoord = 0;
				  // The world gets translated in the opposite direction that the
				  // player is moving, so the furthest it can go in the opposite
				  // direction without showing beyond the world's bounds is the
				  // number of units outside of the camera, but in the negative.
				  const minCoord = -unitsOutsideCamera;
				  // This is the ideal number of units to move the world; it tries
				  // to center the player within the camera by offsetting how many
				  // camera units are on either side of the player. Again, it's the
				  // negative value since the world translates in the opposite direction
				  // of the player.
				  const coord = -(playerCoord - unitsAroundPlayer);
				  // Finally, to ensure that we don't show any gaps between the world's
				  // bounds and the camera, we `clamp` `coord` within those bounds.

					//pelo que entendi aqui ele junta as codernadas do mapa achando o 
					// restringindo pelas bordas do mapa
				 /* var curried =  _.curry((minCoord, maxCoord, coord) => {
					return ;
					});	*/
					var ret = Math.max(Math.min(minCoord, maxCoord), minCoord) ;
					
				  return ret;	 
			   
	 			}
			
				 
			 
			
			return (
			<World 
				col = {_this.col} 
				row = {_this.row}
				/>
			)
			
		}
		
	
}

class World extends React.Component {
	
	 render() {
		 
			const { col, row, children } = this.props;
		 	//calc the inicial offset values 
		 	//positioning the map on center of the camera
			const leftTemp = (PX_PER_COL * col) +"px";  
			const topTemp = (PX_PER_ROW * row)+ "px";	

			const style = {
				top: topTemp,
				left: leftTemp
			
				
				} ;
		 	console.log(style);
			const className = 'world !hasEmoji';
			return (
			  <div className={className} style={style}>
					<EntitiesContainer/>
					<GroundsContainer/>					
					{children}
			  </div>
			);
  }
	
}

World.propTypes = {
    col: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,

}

class GroundsContainer extends React.Component {
	
	render() {
		
		
		return (
			
			<Tiles 
				tiles={GROUNDS} 
				block="ground"/>
			
		)
		
	}
	
}

class EntitiesContainer extends React.Component {
	
	render(){
		
		
		 return (
			 <Tiles 
			 	tiles={ENTITIES}
			 	block= 'entity'/>
    		
  		);
	}
	
}

class PlayerContainer  extends React.Component {
	
	
}
 						   							   
class Header  extends React.Component {
		
	render () {
		return (
			<Col 
				md={12}
				componentClass={Well} 
				bsSize="large"
				id="Header"> 
					<h1> React Roguelike </h1>
					<h3> Kill the KING!!! </h3>
				<Col md={9}>
					<form> 
						<FormGroup 
							controlid="gameStatus" 
							bsSize="small">
							<Col 
								componentClass={ControlLabel} 
								sm={2}>
									Health
								
								<FormControl
									id="Health"
									type="text"
									placeholder="Large text"
								/>
					
							</Col>
						
							<Col
								componentClass={ControlLabel} 
								sm={2}>
									Weapon
						
									<div>
										<span className="entity entity--gun"/> 
										<span className="entity entity--knife"/> 
										<span className="entity entity--hammer"/> 
										<span className="entity entity--bow"/> 
										<span className="entity entity--sword"/> 
									</div>
							</Col>
							
								<Col
								componentClass={ControlLabel} 
								sm={2}>
									Habilities
						
									<div>
										<span className="entity entity--boots"/> 
										<span className="entity entity--sunglasses"/> 
										<span className="entity entity--speedboat"/> 
										<span className="entity entity--silverware"/> 
										
									</div>
							</Col>
					
							<Col 
								componentClass={ControlLabel} 
								sm={2}>
									Attack
									<FormControl
									id="Attack"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							
							<Col 
								componentClass={ControlLabel} 
								sm={2}>
									Level
								<FormControl
									id="Level"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							
							<Col 
								componentClass={ControlLabel} 
								sm={2}>
									Next Level
								<FormControl
									id="NextLevel"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							
							
								
						</FormGroup>
					</form>
				</Col>
				<Col sm={1}>
						<button> teste </button>
				</Col>
			</Col>
		 
		)
	}
	
}

class Footer  extends React.Component {
	
	render () {
		return (
			<Col 
				md={12}
				componentClass={Well} 
				bsSize="large"
				id="Footer"> 
				<Col	
					mdOffset={4}
					md={4}>
						<p>Site develop for me using a lot of <FontAwesome name="fa fa-coffee"/> and <FontAwesome name="fa fa-music"/></p>	
						<p><FontAwesome name="fa fa-copyright"/>2016 <a href="http://www.metaconexao.com.br"> Jean Philip de Rogatis</a></p>
				</Col>
			</Col>
		 
		)
	}
	
}

class GameBoard extends React.Component {
	
	render () {
		
		return (
			<Col 
				md={12} 			
				componentClass={Well} 
				bsSize="large"
				id="GameBoard">
				<div className ="game">
					<Camera numCols={30} numRows={20}>	
					<WorldContainer>
						
					</WorldContainer>
					</Camera>
				</div>
 			</Col>
		 
		)
	}
	
}

class Controler extends React.Component {
	constructor() {
		super();
		this.state = {
			
		};		
		
	};
	
	render () {
		return (
			<Grid fluid>
			<Header/>
		 	<GameBoard/>
			<Footer/>
			</Grid>
		)
	}
	
}

ReactDOM.render(<Controler/>, document.getElementById('mountNode'));