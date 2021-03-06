// JavaScript Document
/*jshint esversion: 6 */
/* @flow */

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
const { Component, PropTypes} = React;
const { Provider, connect } = ReactRedux;
const {combineReducers} = Redux;

const returnTrue = () => true;
const not = _.negate;

class FontAwesome extends Component{
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

const MapConfig = {
	  width: 80,
	  height: 60,
	  min_rooms: 20,
	  max_rooms: 48,
	  room: {
		height: {min: 4, max: 14}, 
		width: {min: 8, max: 18}
	  },
	  tileTypes: {
		wall: 'GG',
		floor: 'GK',
		corridor: 'GF'
	  }
	};
	
const GameLevels = {
	1: {
		enemies: {
			//shit
			type: ['DG'],
			name: ['shit'],
			qty_range: [10, 12],
			level_range: [1, 2]
		},
		  //weapons...
		weapons: {
			type: ['GU'],
			name: ['gun']
		}, 
		//boots
		abilities: {
			type: ['PD'],
			name: ['boots']
		},
		//anbulance
		health: {
			type: ['EB'],	
			qty_range: [1, 3],
			value_range: [15, 20]
		},
		 //santa claus 
		boss: {
			type:['DF'],
			name: ['Santa Klaus'],
			power: [45]
		}
		  
	  },
	2: {
		enemies: {
			//bananas
			type: ['BW'],
			name: ['bananas'],
			qty_range: [10, 12],
			level_range: [1, 2]
		},
		  //weapons...
		weapons: {
			type: ['EC'],
			name: ['knife']
		}, 
		//sumglasses
		abilities: {
			type: ['PA'],
			name: ['sumglasses'],
		},
		//anbulance
		health: {
			type: ['EB'],	
			qty_range: [1, 3],
			value_range: [15, 20]
		},
		 //monkey 
		boss: {
			type:['BX'],
			name: ['Monkey'],
			power: [90]
		}
		  
	  },
	3: {
		enemies: {
			//gator
			type: ['KB'],
			name: ['gator'],
			qty_range: [10, 12],
			level_range: [1, 2]
		},
		  //weapons...
		weapons: {
			type: ['PE'],
			name: ['hammer']
		}, 
		//speedboot
		abilities: {
			type: ['PC'],
			name: ['speedboot'],
		},
		//anbulance
		health: {
			type: ['EB'],	
			qty_range: [1, 3],
			value_range: [15, 20]
		},
		 //monkey 
		boss: {
			type:['DE'],
			name: ['Snow Man'],
			power: [135]
		}
		  
	  },
	4: {
		enemies: {
			//rabbit
			type: ['BD'],
			name: ['rabit'],
			qty_range: [10, 12],
			level_range: [1, 2]
		},
		  //weapons...
		weapons: {
			type: ['EF'],
			name: ['bow']
		}, 
		//silver
		abilities: {
			type: ['PB'],
			name: ['Silver Ware'],
		},
		//anbulance
		health: {
			type: ['EB'],	
			qty_range: [1, 3],
			value_range: [15, 20]
		},
		 //monkey 
		boss: {
			type:['BY'],
			name: ['Elephant'],
			power: [135]
		}
		  
	  },
	  
};

const grounds = {
//  GA: { type: 'grass' },
//  GB: { type: 'path' },
//  GC: { type: 'water' },
//  GD: { type: 'sand' },
//  GE: { type: 'forest' },
  GF: { type: 'floor' },
  GG: { type: 'wall' },
//  GH: { type: 'sky' },
//  GI: { type: 'roadline' },
//  GJ: { type: 'doorway' },
 GK: { type: 'floor' },
};

const WeaponsHabilitiesInitialState = Immutable.fromJS({	
				
					gun: {
						active:false
						},
					knife: {
						active:false
						},
					hammer: {
						active:false
						},
					bow:  {
						active:false
						}, 
					boots: {
						active:false
						},
					sunglasses: {
						active:false
						},
					speedboat: {
						active:false
						},
					silverware:  {
						active:false
						}				
						
  
	});

const GameInitialState = Immutable.fromJS({		
	ShowWinModal:false,	
	showDieModal: false,
	ShowNextLevelModal: true,	
	hasWon:false,
	started: false,	
	deaths: 0,
	health: 4,
	attack: 0,
	level: 1,
	nextLevel: 45,
	player: {
		 row: 0,
		 col: 0,
		 direction: 'left', 
		 type: 'personWalk'
	}
					
});

	
//defintions of size of col and row	
 const PX_PER_COL = 25;
 const PX_PER_ROW = 25;	
 const CAM_COLS   = 1120 / PX_PER_COL;
 const CAM_ROWS   = 600 / PX_PER_ROW;

const xOffsets = Object.freeze({
  				left:  -1,
  				right:  1,
				});

const yOffsets = Object.freeze({
  				up:   -1,
  				down:  1,
				});

/*------------------------------------------------------------------------*/


/*------------------------------------------------------------------------*/
//utils

const clamp = _.curry((min, max, num) => {
  return Math.max(Math.min(num, max), min);
});

const gridColsToPx = (cols) =>{
  return `${PX_PER_COL * cols}px`;
};

const gridRowsToPx = (rows) => {
  return `${PX_PER_ROW * rows}px`
};

const gridCoordsToOffsetStyle = (row, col) => {
  return {
    top: gridRowsToPx(row),
    left: gridColsToPx(col),
  };
};

const gridCoordsToDimStyle = (numCols, numRows) => {
  return {
    height: gridRowsToPx(numRows),
    width: gridColsToPx(numCols),
  };
};

const hasEmoji = () =>{
	
	return navigator.platform === 'MacIntel';
};

const ensureArray = (value) => {
  return Array.isArray(value) ? value : [value];
	
};

const getFloorsMapPosition = (Map) => {
		//console.log(Map);
		let positions = [];
		Map.map((row, y ) => {
			row.map((tile,x) => {
					//console.log(tile.shortType)
				if (tile.get('shortType') ===  MapConfig.tileTypes.floor) {
					positions.push({y: y, x:x});    
					}
				}
			)

		})
		//console.log(positions);
		return positions;
};

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//tile utilities 

const createTile = _.curry((defs, row, col, shortType) => {
	
  return (
	    
    (shortType in defs) ?
    { ...defs[shortType], row, col, shortType } :
    null
  );
});

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//habilities 

const buildAbility = (prop) => (state,entity)  => {
	const fn = entity.get(prop);			
	return _.isFunction(fn) ? fn(state, entity)  : false;
};

const hasPowerup = _.curry((powerup, state, entity) => {	
	
	return state.getIn(['WeaponsHabilities',powerup, 'active']);
});

const hasBoots = hasPowerup('boots');
const hasSilverware = hasPowerup('silverware');
const hasSpeedboat = hasPowerup('speedboat');
const hasSunglasses = hasPowerup('sunglasses');

const hasHammer = hasPowerup('hammer');
const hasGun = hasPowerup('gun');
const hasBow = hasPowerup('bow');
const hasKnife = hasPowerup('knife');

const hasTheWeaponForThatBoss = (s) => {
		let weapon = GameLevels[s.getIn(['gameStats','level'])].weapons.name[0];
		//console.log('hasTheWeaponForThatBoss', weapon,  s.getIn(['WeaponsHabilities',weapon, 'active']));
		return s.getIn(['WeaponsHabilities',weapon, 'active']) ;
	}

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//entities
const canBlock = returnTrue;
const canCollect = returnTrue;
const canDestroy = returnTrue;
const canKill = returnTrue;
const canPowerUp = returnTrue;
const canAddAbilities = returnTrue;
const canWin = (s) => {
	
	let curAttackPower = s.getIn(['gameStats','attack']) 
	let bossAtackPower =  GameLevels[s.getIn(['gameStats','level'])].boss.power[0] 
	
	//console.log('canWin', curAttackPower, bossAtackPower, hasTheWeaponForThatBoss(s))
	let ret = (curAttackPower >= bossAtackPower) && hasTheWeaponForThatBoss(s) 
	return ret ;
};

const blocksUnless = (hasAbility) => ({
  canBlock: not(hasAbility),
  canDie: hasAbility
});

const entities = {
	'00': { type: 'empty' },
	'01': { type: 'start' },
	// Special
	SA: { type: 'tape', canCollect },
	//SB: { type: 'door', canWin, canDestroy: canWin, canBlock: not(canWin) },
	SC: { type: 'person' },
	SD: { type: 'invisible', canBlock },
	SE: { type: 'ghost' },
	// Powerups
	PA: { type: 'sunglasses', canAddAbilities },
	PB: { type: 'silverware', canAddAbilities },
	PC: { type: 'speedboat',  canAddAbilities },
	PD: { type: 'boots',      canAddAbilities },
	
	//wheapons
	GU:{ type:	'gun',		canAddAbilities },
	EC:{ type:	'knife',	canAddAbilities },
	PE: { type: 'hammer',    canAddAbilities },
	EF:{ type:	'bow',		canAddAbilities },
	
	//boss
	DF: { type: 'santa',  	canWin, canDestroy: canWin, canKill: not(canWin), ...blocksUnless(canWin) },
	BX: { type: 'monkey', 	canWin, canDestroy: canWin, canKill: not(canWin), ...blocksUnless(canWin) },
	DE: { type: 'snowman', canWin, canDestroy: canWin, canKill: not(canWin), ...blocksUnless(canWin) },
	BY: { type: 'elephant', canWin, canDestroy: canWin, canKill: not(canWin), ...blocksUnless(canWin) },
	
	//enimies
	DG: { type: 'shit',    	canKill: not(hasBoots),  canDestroy: hasBoots, canPowerUp: hasBoots, ...blocksUnless(hasBoots) },
	BW: { type: 'banana',  	canKill: not(hasSunglasses),  canDestroy: hasSunglasses, canPowerUp: hasSunglasses, ...blocksUnless(hasSunglasses) },
	KB: { type: 'gator',     canKill: not(hasSpeedboat),  canDestroy: hasSpeedboat, canPowerUp: hasSpeedboat, ...blocksUnless(hasSpeedboat) },
	BD: { type: 'rabbit',  canKill: not(hasSilverware),  canDestroy: hasSilverware, canPowerUp: hasSilverware, ...blocksUnless(hasSilverware) },
	
	EB: { type: 'ambulance', canCollect },
	EA: { type: 'highVoltage', canCollect },
	
	/* Bounds
	
	BA: { type: 'treeA',    canBlock },
	BB: { type: 'treeB',    canBlock },
	BC: { type: 'building', canBlock },
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
	
	BZ: { type: 'houseA',    canBlock },
	CA: { type: 'houseB',    canBlock },
	CB: { type: 'mart',      canBlock },
	CC: { type: 'musichall', canBlock },
	CD: { type: 'moai',      ...blocksUnless(hasHammer) },
	// The sign
	/* ZL: { type: 'storesign--v', canBlock },
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
	
	
	// Killers always
	KA: { type: 'bee',       canKill },
	
	KC: { type: 'snake',     canKill },
	KD: { type: 'carA',      canKill },
	KE: { type: 'carB',      canKill },
	KF: { type: 'taxi',      canKill },
	KG: { type: 'firetruck', canKill },
	KH: { type: 'police',    canKill },
	KJ: { type: 'cactus',    canKill },
	KK: { type: 'tornado',   canKill },*/
};


/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//map generator

const shuffleArray = (
		array,
		limit
) => {
	  for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	  }
	  return array;
	};

const RandomInt = (
	min,
	max
) => {
  var rdm = Math.random() * (max - min + 1);
  return Math.floor(rdm) + min;
}

const RandomIntFromArray = (
	arr
) => {
  return RandomInt(arr[0], arr[1]);
}
		
//this class detects if a room intersec another room 
class Room {
	constructor (width, height, x, y) {
		this.width = width;
  		this.height = height;
  		this.x = x;
  		this.y = y;
  		this.x2 = x + width;
  		this.y2 = y + height;
		
	}
	
  intersectRoom (otherRoom) {    
    if (otherRoom.x2 + 1 < this.x || otherRoom.x > this.x2 + 1) {
      return false;
    } 

    if (otherRoom.y2 + 1 < this.y || otherRoom.y > this.y2 + 1) {
      return false;
    }
    return true;
  }
  intersectRoomList (rooms) {
    for (var key in rooms) {
      if (this.intersectRoom(rooms[key])) {
        return true;
      }
    }
    return false;
  }
};

class RandomRoom {
	constructor () {
		this.maxHeight = MapConfig.room.height.max;
		this.width = this.minMax(MapConfig.room.width.max, MapConfig.room.width.min);
		this.x = this.minMax(MapConfig.width - this.width, 0); 
		this.height = this.minMax(this.maxHeight, MapConfig.room.height.min);
		this.y = this.minMax(MapConfig.height - this.height, 0);
 
  	};
 	
   	minMax(min, max) {
    var rdm = Math.random() * (max - min + 1);
	var temp =   Math.floor(rdm) + min; 
    return temp;
  }
	
   	build() {  
	   return new Room(this.width, this.height, this.x, this.y);
   }
};

class MapBuilder  {
	constructor() {
			this.roomNumber = 0;
		}
	
	newMap () {
			let map = [];
			for (var y = 0; y < MapConfig.height; y++) {
			  map.push([]);
			  for (var x = 0; x < MapConfig.width; x++) {
				map[y][x] = MapConfig.tileTypes.wall;
			  }
			}
			return map;
		  };
	
	 getPossibleCorridors(
		room
	) {

		let possibles = [];
		let newY2 = room.y2 + 1;
		let type;
		let neighbourY;

		for (var y = room.y - 1; y <= newY2; y++) {

		  if (y >= room.y && y <= room.y2) {
			possibles.push({
			  x: room.x - 1,
			  y: y,
			  type: 'left',
			  neighbour: {
				x: room.x - 2,
				y: y,
			  }
			});
			possibles.push({
			  x: room.x2 + 1,
			  y: y,
			  type: 'right',
			  neighbour: {
				x: room.x2 + 2,
				y: y,
			  }
			});
			continue;
		  }
		  type = 'top';
		  neighbourY = y - 1;
		  if (y === newY2) {
			type = 'bottom';
			neighbourY = y + 1;
		  }
		  for (var x = room.x; x <= room.x2; x++) {
			possibles.push({
			  x: x,
			  y: y,
			  type: type,
			  neighbour: {
				x: x,
				y: neighbourY
			  }
			});
		  }
		}
		return possibles;
	  };

	checkRoomPosition (
		room
	) {
		var maxX = MapConfig.width - 1;
		var maxY = MapConfig.height - 1;
		//se a posicao do novo quarto não ulrapassar os limites do mapa
		//retorna true ...	
		return room.x >= 1 && room.y >= 1 && room.y2 + 1 < maxY && room.x2 + 1 < maxX;
	  };

	 addRoom  (
		map, 
		room
	  ) {
		let right = room.x + room.width;
		let bottom = room.y + room.height;
		for (var y = room.y; y <= bottom; y++) {
		  for (var x = room.x; x <= right; x++) {
			map[y][x] = MapConfig.tileTypes.floor;
			//map[y][x] = this.roomNumber;
		  }
		}
		this.roomNumber++;
	  };

	 addCorridor  (
		map,
		corridor,
		length,
		direction
	)  {
		var x = corridor.x;
		var y = corridor.y;
		while(length > 0 ) {
		  map[y][x] = MapConfig.tileTypes.corridor;
		  y += direction.y;
		  x += direction.x;
		  length--;
		}
	  };
	
	 _seekRoomNextCorridor  (
		map,
		rooms,
		corridor
	) {   
		//if max of rooms ends...	
		if ( rooms.length >= MapConfig.max_rooms ) {
		  return;
		}
			
		let corridorDirection;   
		let newRoom = new RandomRoom();
		newRoom = newRoom.build()			
		let  diffY = Math.floor(Math.random() * newRoom.height);
		let  diffX = Math.floor(Math.random() * newRoom.width);
		let corridorLength = Math.floor(Math.random() * 3)  + 2;
		
		  switch (corridor.type) {
			case 'left':
			  newRoom.x = corridor.x - newRoom.width - corridorLength;
			  newRoom.x2 = corridor.x - corridorLength;
			  newRoom.y = corridor.y - diffY;
			  newRoom.y2 = newRoom.y + newRoom.height;
			  corridorDirection = {x: -1, y: 0};
			  break;
			case 'right':
			  newRoom.x = corridor.x + corridorLength;
			  newRoom.x2 = newRoom.x + newRoom.width;
			  newRoom.y = corridor.y - diffY;
			  newRoom.y2 = newRoom.y + newRoom.height;
			  corridorDirection = {x: +1, y: 0};
			  break;
			case 'top':
			  newRoom.x = corridor.x - diffX;
			  newRoom.x2 = newRoom.x + newRoom.width;
			  newRoom.y = corridor.y - newRoom.height - corridorLength;
			  newRoom.y2 = corridor.y - corridorLength;
			  corridorDirection = {x: 0, y: -1};
			  break;
			case 'bottom':
			  newRoom.x = corridor.x - diffX;
			  newRoom.x2 = newRoom.x + newRoom.width;
			  newRoom.y = corridor.y + corridorLength;
			  newRoom.y2 = newRoom.y + newRoom.height;
			  corridorDirection = {x: 0, y: +1};
			  break;
		  }
			
		  if (this.checkRoomPosition(newRoom) && !newRoom.intersectRoomList(rooms)) {
			rooms.push(newRoom);
			this.addRoom(map, newRoom);
			this.addCorridor(map, corridor, corridorLength, corridorDirection);
			this._seekNextRoom(map, rooms, newRoom);
		  }
  };
	
	  _seekNextRoom  (
			map,
			rooms,
			room
	) {
    //Obter possiveis corredores 
		let corridors = this.getPossibleCorridors(room).filter(function(item){
			//para cada item ou seja possivel localização de um corredor
			// pega o neighbour dele e checa se é valido... se não esta fora do mapa...
		  let neigh = item.neighbour;
			// se for pula este corredor
		  if ( typeof map[neigh.y] === 'undefined' || typeof map[neigh.y][neigh.x] === 'undefined') {
			return false;
		  }
			// se o corredor for possivel então coloca no map como um wall.... extranho...
		  return map[neigh.y][neigh.x] == MapConfig.tileTypes.wall;
		}); 
		//console.log("coridores no _seekNextRoom" + JSON.stringify(corridors));  
		corridors = shuffleArray(corridors);
		//console.log("corredores no _seekNextRoom depois do suffle" + JSON.stringify(corridors));  		
		//para cada corredor tenha incluir um quarto    
		for (var key in corridors) {
			//console.log(key);
		  this._seekRoomNextCorridor(map, rooms, corridors[key]);
		}
	 };

	 seekRooms  (
		map,
		rooms
	)  {
		//Create a new room
		let room = new RandomRoom();
		room = room.build();
		this.addRoom(map, room);
		rooms.push(room);
		//console.log("rooms no seekRooms" + JSON.stringify(rooms));		
		this._seekNextRoom(map, rooms, room);
		let key = 0;
		while (rooms.length < MapConfig.min_rooms && key < rooms.length) {
		  this._seekNextRoom(map, rooms, rooms[key]);
		  key++;
		}
	  };
	
	build  () {
		
		let map = this.newMap();  	
		let rooms = [];
		this.seekRooms(map, rooms);
		//this.placeItems(map, items);
		
		return {map: map, rooms: rooms};
	  }
};//end of MAP

const buildItems = (level) => {
	
    var items = [];
    var config = GameLevels[level];
    var qtyEnemies = RandomIntFromArray(config.enemies.qty_range);
    var qtyhealth = RandomIntFromArray(config.health.qty_range);
	//quant enimies
    for ( var key = 0; key < qtyEnemies; key++ ) {
      items.push({
		  
        type: config.enemies.type[0],
       
      });
    }
	//place the boss
	items.push({
		type: config.boss.type[0]
	})
	//place abilitiy
	items.push({
		type: config.abilities.type[0]
	})
	
	//aqui randomiza o health
    for ( var key = 0; key < qtyhealth; key++ ) {
      items.push({
		  //anbulance 
        type: config.health.type[0]
      
      });
    }
	//aqui as armas... 
   
    items.push({

      type:config.weapons.type[0]
      
    });
    
    return items;
  };

//need to check if the item is not close to a GF type corridor... because 
//can block a corridor	  

const checkTilesNearCorridor = (map, x,y) => {
	//console.log(map)
	for (let i = -1; i < 2; i++) {
		for  (let z = -1; z < 2; z++) {
			let row = (x+i < 0)? x+i: 0;
			let col = (y+z < 0)? y+z: 0;
			row = (row < map.length)? row: row-1;
			col = (col < map[row].length)? col: col-1;
			
			if( map[row][col] === 'GF') {
				return true;
			}
			
		} 
		
	}
	return false;
} 

const  getFloorsPosition = (map) => {
		var positions = [];
		for ( var y in map ) {
		  for ( var x = 0; x < map[y].length; x++ ) {
			if ( map[y][x] === MapConfig.tileTypes.floor && !checkTilesNearCorridor(map,x,y) ) {
				
			  positions.push({y: y, x:x});          
			}
		  }
		}
    	return positions;
 };
	
const	placeItems = (
		Map,
		items
	)  => {
		
		
		let orderedItems = shuffleArray(items);
		let possiblePositions = getFloorsPosition(Map);
		possiblePositions = shuffleArray(possiblePositions)
		//aqui para cada possibilidade sorteio uma para colocar um item... 
		let entities = [];
		//first bild the possible possible map...		
					Map.map((row, yIndex)=>{
						let entitiesRow = [];
						row.map((cell, xIndex)=>{
								entitiesRow.push('');
						});
						entities.push(entitiesRow);
					});
	
				//now put  each item on the map using the possiblePositions  suffled...
				orderedItems.map((item, i) =>{
					entities[possiblePositions[i].y][possiblePositions[i].x] = item.type;			
				})
		
		return entities
  };


const newBoard = (level) => {
    var builder = new MapBuilder();
   // var data = builder.build(items);
    var data = builder.build();
	 let items = placeItems(data.map, buildItems(level));
	//console.log(JSON.stringify(items));	
    return {
      ground: data.map,
	  entities: items 	
    };
  };  


//end of map generator
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
//REDUCERS area

const activeWeaponHabilities = (state,action) => {
					
	switch (action.type) {
		case 'ACTIVATE_WEAPON':
			return Immutable.fromJS({
				...state,
				active:true
			})
		
		default:
			return state
		};		
};

const MapInicializer = (level) => {
	
	let Map = Immutable.fromJS(newBoard(level))
	let newGround = []
	//console.log('Map',JSON.stringify(Map));
		Map.get('ground').map((row,rIndex)  => {		
			let newRow = []
			row.map((tile, coll)=>{
				let newTile = Immutable.fromJS(createTile(grounds,rIndex, coll, tile));
				newRow.push(newTile);					
			});
			newGround.push(Immutable.fromJS(newRow));	
		
		});
		
		newGround = Immutable.fromJS(newGround);
	
		let newEntities = []
		Map.get('entities').map((row,rIndex)  => {		
			let newRow = []
			row.map((tile, coll)=>{				
				let newTile = Immutable.fromJS(createTile(entities,rIndex, coll, tile));
				newRow.push(newTile);															
				});
	
			newEntities.push(newRow);
		});
		
		newEntities = Immutable.fromJS(newEntities);
 
		let  ret = Immutable.fromJS  ({
								ground: newGround,
								entities: newEntities
							});
	
		//console.log('Map Final',JSON.stringify(ret));
		return ret;
			
		// end of map inicializer	
	
	
}

const MegaInitialComposer = (level) => {
		let newMap = MapInicializer(level);
		let newPos = shuffleArray(getFloorsMapPosition(newMap.get('ground')));	
		let newGameStats = GameInitialState.setIn(['player','col'], newPos[0].x)
					 	   				   .setIn(['player','row'], newPos[0].y);
		
	
	return  Immutable.fromJS ({ WeaponsHabilities: WeaponsHabilitiesInitialState,
			mapConfiguration: Immutable.fromJS(MapConfig),
			Map: newMap,
			gameStats:newGameStats });
}

const PlayerInitialPos = (s) => {
		let newPos = shuffleArray(getFloorsMapPosition(s.getIn(['Map','ground'])));	
			return  s.setIn(['gameStats','player','col'], newPos[0].x)
					 .setIn(['gameStats','player','row'], newPos[0].y);
		
};

const minCol = (s) => 0;
const maxCol = (s) => s.getIn(['mapConfiguration','width']) -1;
const minRow = (s) => 0;
const maxRow = (s) => s.getIn(['mapConfiguration','height']) -1;

const clampToWorld = _.curry((state, col, row) => {
				//console.log( col, row,clamp(minCol(state), maxCol(state), col),clamp(minRow(state), maxRow(state), row))
				return [
						clamp(minCol(state), maxCol(state), col),
						clamp(minRow(state), maxRow(state), row)
				];
			});

const MegaReducer = (
	state = MegaInitialComposer(1),
	action
) => {
	
	//console.log(action.type);
	switch (action.type) {
			
		case 'DIE':
			
				return MegaInitialComposer(1);
			
		case 'NEXT_LEVEL_MODAL':
			
			return  state.setIn(['gameStats','ShowNextLevelModal'], action.text)
			
		case 'TO_END_MOVE':
			//console.log(JSON.stringify(state));
		
				const colPlayer = state.getIn(['gameStats','player','col']);
				const rowPlayer = state.getIn(['gameStats','player','row']);
				return state.setIn(['gameStats','player','type'], 'personWalk');
						
			
		case 'MOVE':

			//console.log(state.toJS());
			const col = state.getIn(['gameStats','player','col']);
			const row = state.getIn(['gameStats','player','row']);
			const playerDir = state.getIn(['gameStats','player','direction']);
			
			const dir = action.direction;
			//define a direction for the player avatar
			const newDir = (dir in xOffsets) ? dir : playerDir ;
			
			const xOffset = xOffsets[dir] || 0;
			const yOffset = yOffsets[dir] || 0;
			
			const [nextCol, nextRow] = clampToWorld(
    					state,
						col + xOffset,
						row + yOffset
					);
			//console.log(nextCol,nextRow);
			//check is not a wall...
			
			let toGround = state.getIn(['Map','ground',nextRow, nextCol])
				
			if (toGround.get('type') === 'wall') {return  state;;} 
			
			const toGroundEntity = state.getIn(['Map','entities',nextRow, nextCol])

			const esOccupado = !!toGroundEntity;
			const type = esOccupado && toGroundEntity.get('type');
			
			const move = (s) => s.setIn(['gameStats','player','col'],nextCol)
								 .setIn(['gameStats','player','row'],nextRow)
								 .setIn(['gameStats','player','type'],'person');
			
			const moveBack = (s) => s.setIn(['gameStats','player','col'], col)
								 .setIn(['gameStats','player','row'], row);	
			
			const orient = (s) => s.setIn(['gameStats','player','direction'],newDir);	
			const attackUp = (s) => s.setIn(['gameStats','attack'],s.getIn(['gameStats','attack']) + 10);
			const addAbilities = (s) => s.setIn(['WeaponsHabilities',type,'active'], true);
			const collect = (s) => s.setIn(['gameStats','health'], s.getIn(['gameStats','health'])  +1 );		
		    const removeEntity = (s) => s.setIn(['Map','entities',nextRow,nextCol], null);
			const hurt = (s) => s.setIn(['gameStats','health'], s.getIn(['gameStats','health'])  -1 );
			const dieIfUnhealthy = (s) => (s.getIn(['gameStats','health']) <= 0) ? die(s) : s;						   
			const die = (s) => s.setIn(['gameStats','ShowDieModal'], true); 		 		
			
			const goToNextLevel = (s) => { 
				
				if (s.getIn(['gameStats','level']) === 4 ) {
					
					return s.setIn(['gameStats','ShowWinModal'], true);
				} else {
				
					let newMap = MapInicializer(s.getIn(['gameStats','level']) +1)
					let newPos = shuffleArray(getFloorsMapPosition(newMap.get('ground')));	

					return s.setIn(['gameStats','level'], s.getIn(['gameStats','level'])+1)
							.setIn(['gameStats','nextLevel'],s.getIn(['gameStats','nextLevel']) + 45)
							.set('Map', newMap)
							.setIn(['gameStats','player','col'], newPos[0].x)
							.setIn(['gameStats','player','row'], newPos[0].y)
							.setIn(['gameStats','ShowNextLevelModal'], true);
				};
				
			};
					
			const whenEntity = _.curry((condition, update, s) => {	
				//console.log('condition no whenEntity',  condition(s,toGroundEntity))
				return (esOccupado &&  condition(s,toGroundEntity))? update(s) : s;
				});
				
						
			if (esOccupado) {
				//console.log('esOccupado', state);
				const canBlock = buildAbility('canBlock');
				const canCollect = buildAbility('canCollect');
				const canDie = buildAbility('canDie');
				const canDestroy = buildAbility('canDestroy');
				const canKill = buildAbility('canKill');
				const canPowerUp = buildAbility('canPowerUp');
				const canAddAbilities = buildAbility('canAddAbilities');
				const canWin = buildAbility('canWin');
				
				//console.log()
			
				return  _.flow(
						move,
						orient,
						whenEntity(canKill, hurt),
						whenEntity(canBlock, moveBack),
						whenEntity(canDestroy, removeEntity),
						whenEntity(canPowerUp, attackUp),
						whenEntity(canAddAbilities, _.flow(addAbilities, removeEntity)),
						whenEntity(canCollect, _.flow(collect, removeEntity)),
						whenEntity(canWin, goToNextLevel),
						dieIfUnhealthy
						)(state);
				
			
				
			}
		
			//console.log(' on MegaReducer NewState no MOVE', NewState);
			
			return  _.flow(
						move,
						orient
						)(state);
		
		default: 
			return state;
	}	
	
} 


//End of REDUCERS
/*------------------------------------------------------------------------*/
//Actions

const toMove=(direction) => {
	//console.log('no to move', direction)
	return {
		type: 'MOVE',
		direction
	}
};
const toEndMove = () => {
	//console.log('toEndMove')
	return {
	type: 'TO_END_MOVE'
	}
	
};
const nextLevelModalShow =(show) => {
	
	return {
		type: 'NEXT_LEVEL_MODAL',
		text: show	
	}
};
const die = ()=> { return {type: 'DIE'};}

/*------------------------------------------------------------------------*/

//Weapons Habilities
const mapStateToWeaponsHabilitiesProps=(
	state,
	ownProps
) => {
		let WeaponsHabilities = state.get('WeaponsHabilities');
		let WeaponsState = WeaponsHabilities.get(ownProps.entity);
		let WeaponState = WeaponsState.get('active')
				
	return {
		entity: ownProps.entity,
		active: WeaponState
	}
	
};

const WeaponHabilities = (
	props
) => {
	let cName = "entity entity--" + props.entity;
	let opacity = (props.active===false)?0.2 :1 ;
	opacity = {opacity:opacity}
	
	return (
		<span className={cName}
				style = {opacity}
		/> 
	)
};

const WeaponHabilitesContainer = connect(
	mapStateToWeaponsHabilitiesProps
)(WeaponHabilities);

const ActiveWeapons = () => {
	
	return (
		<Col
			componentClass={ControlLabel} 
			sm={2}>
				Weapon
			<div>
				<WeaponHabilitesContainer 
					entity ="gun"
				/>
				<WeaponHabilitesContainer 
					entity ="knife"
				/>
				<WeaponHabilitesContainer 
					entity ="hammer"
				/>
				<WeaponHabilitesContainer 
					entity ="bow"
				/>
			</div>
		</Col>
	
	);
		
};
	
const ActiveHabilities = () => {
	
	return (
		<Col
			componentClass={ControlLabel} 
			sm={2}>
				Habilities
			<div>
				<WeaponHabilitesContainer 
					entity ="boots"
				/>
				<WeaponHabilitesContainer 
					entity ="sunglasses"
				/>
				<WeaponHabilitesContainer 
					entity ="speedboat"
				/>
				<WeaponHabilitesContainer 
					entity ="silverware"
				/>
			</div>
		</Col>	
	);
		
};

// END of Weapons Habilities 
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//Game stats 

const mapStateToCurrentGameStatsProps=(
	state
) => {
	//console.log(state)
		//take care !!! im using immutableJS!!!	
		var gameStats = state.get('gameStats');
		var currentHealth = gameStats.get('health');		
		var currentLevel = gameStats.get('level');
		var currentNextLevel = gameStats.get('nextLevel');
		var currentAttack = gameStats.get('attack');
	
		//console.log(JSON.stringify(gameStats));	
		//console.log(currentLevel);	
		
	return {

		currentHealth: currentHealth,
		currentLevel: currentLevel,
		currentAttack: currentAttack,
		currentNextLevel: currentNextLevel
	};
	
};

const CurrentHealth = (
	props
) =>{
	const health = []
	let cName = "entity entity--heart";
	//let display = (props.active===false)?'hidden':'visible';

	let opacity = {opacity:1}
	let opacityDeath  = {opacity:0.2}
	//display = {visibility:display}
	
	
	for(let i = 0; i < props.currentHealth; i++){
		let line = (
				<span className={cName}
					style = {opacity}
					key = {i}
				/> 
			)
			
			health.push(line)
		}
	
	for(let i = 0; i <  (4 - props.currentHealth) ; i++){
		let line = (
				<span className={cName}
					style = {opacityDeath}
					key = { (4 - i)}
				/> 
			)
			
			health.push(line)
		}
		
	return (
		<Col
			componentClass={ControlLabel} 
			sm={2}>
				Health		
				<div>
					{health}
				</div>
		</Col>
	);
};

const CurrentHealthConainer = connect(
	mapStateToCurrentGameStatsProps
)(CurrentHealth);

const CurrentLevel = (
	props
) =>{
	//console.log(JSON.stringify(props));
	return (
		<Col 
			componentClass={ControlLabel} 
			sm={2}>
				Level
			<FormControl
				readOnly
				id="Level"
				type="text"	
				value={props.currentLevel}
			/>
		</Col>
	);
};

const CurrentLevelContainer = connect(
	mapStateToCurrentGameStatsProps
)(CurrentLevel);

const CurrentAttack = (
	props
) =>{
	return (
		<Col 
			componentClass={ControlLabel} 
			sm={2}>
				Player Attack Level
			<FormControl
				readOnly
				id="Player Attack Level"
				type="text"	
				value={props.currentAttack}
			/>
		</Col>
	);
};

const CurrentAttackContainer = connect(
	mapStateToCurrentGameStatsProps
)(CurrentAttack);

const nextLevel = (
	props
) =>{

	return (
		<Col 
			componentClass={ControlLabel} 
			sm={2}>
				Boss Attack Level
			<FormControl
				readOnly
				id="NextLevel"
				type="text"	
				value={props.currentNextLevel}
			/>
		</Col>
	);
};

const CurrentNextLevelContainer = connect(
	mapStateToCurrentGameStatsProps
)(nextLevel);


//end game stats
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//player area


const keyCodes =Object.freeze({
  37: 'left',
  38: "up",
  39: "right",
  40: "down"
});

const Player = (
	props
) => {
	
	const arrowKeys = new Set(_.values(keyCodes));
	
	const { col, row, direction, type, Ground } = props;
	//console.log('personDirection', direction);
  	const isMoveKey= (key) => {
	 
		return arrowKeys.has(key);
  	};

  	const onArrowKeyDown = (key, e) => {
	 	e.preventDefault();
		props.onMove(key);
  	};
	
	const onArrowKeyUp = (key, e) => {
		//console.log('onArrowKeyUp');
	 	e.preventDefault();
		props.OnEndMove();
  	};
  
	const personDirection = classNames({
        'flipped--x': direction === 'right'
      });
    const attrs = {
      row,
      col,
      type,
      block: 'entity',
      className: personDirection 
	}


    return (
				
		<KeyboardContainer
	  		keyFilter={isMoveKey}
			onKeyDown={onArrowKeyDown}
			onKeyUp={onArrowKeyUp}>
        	<Tile {...attrs} />
		</KeyboardContainer>
		
    );
  };

const  mapStateToPlayerProps  =(
	state
) => {
		const  Map  = state.get('Map');
		const Ground = Map.get('ground');
		//console.log(state);
		const gameStats = state.get('gameStats');
		const player = gameStats.get('player');
		//console.log('player no Map', player)
		const col = player.get('col');
		const row = player.get('row');
		const direction = player.get('direction');
		const groundAt = Ground.getIn([row, col, 'type']);

		const type = player.get('type');
	
		return {
			col,
			row,
			direction,
			type,
			Ground
		};
};

const mapDispatchToPlayerProps = (
	dispatch
) =>{
	  
  return {
			onMove: (direction) => {			
						dispatch(toMove(direction)) 
			},
			OnEndMove: () => {
					dispatch(toEndMove())
			}	  
		}		  	
};

const PlayerContainer = connect(
  mapStateToPlayerProps,
  mapDispatchToPlayerProps
)(Player);

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
//keyboard 

const eventToProp = Object.freeze({
			  					keydown: 'onKeyDown',
			  					keyup: 'onKeyUp',
			  					keypress: 'onKeyPress'
							});

class Keyboard extends Component  {
		
	constructor(props) {
		super(props);	
		//console.log(props);
		//const { onKeyDown } = props;
		//console.log('onKeyDown', onKeyDown);
		this.onKeyEvent = this.onKeyEvent.bind(this)
	}
		
	//console.log('noKeyboard', props);
	getEventKey(e) {
		const key = e.keyCode;
		return keyCodes[key] || String.fromCharCode(key);
  }
	
 matchesKey(key)  {
		const { keyFilter } = this.props;
		//console.log('keyFilter', keyFilter(key), 'key do matchesKey ', key)
		return (
		  _.isFunction(keyFilter) ?
		  keyFilter(key) :
		  key.toLowerCase() === keyFilter.toLowerCase()
		);
  }

  matchesActiveElement (target)  {
		const { activeElement, body } = document;
		const { activeElementFilter } = this.props;
		return (
		  (activeElement === body) ||
		  activeElementFilter(activeElement, target)
		);
  }

  matchesFilter(key, modifiers, e) {
	  return this.props.filter(key, modifiers, e);
  }
	
	
	
	 matchesAllFilters(e) {
		const key = this.getEventKey(e);
			//console.log('matchesAllFilters',key)
		return (
		  this.matchesKey(key) &&
		  this.matchesActiveElement(e.target) &&
		  this.matchesFilter(key, e)
		);
  }
	
	
	 onKeyEvent(e)  {	
		 const handler = this.props[eventToProp[e.type]];  	
    	if (this.matchesAllFilters(e)) {
			 //console.log('handler no onKeyEvent com e.type ',e.type,  handler);
      		handler(this.getEventKey(e), e);
			
    	}
	}
	
	//how to avoid multiple listeners....
	//because
	componentWillMount() {
		Object.keys(eventToProp).forEach((event) => {		
      		window.addEventListener(event, this.onKeyEvent);
    	});
	}
	
	componentWillUnmount() {
			Object.keys(this.eventToProp).forEach((event) => {
      			window.removeEventListener(event, this.onKeyEvent);
    	});
	}
		
	render(){
    return this.props.children;
	}


};

const mapStateToKeyboardProps = (
	state,
	ownProps
) =>{
	const returnTrue = () => true;
	return {
		...state,
		keyFilter: ownProps.keyFilter,
		activeElementFilter: returnTrue,
		filter: returnTrue,
		onKeyDown: ownProps.onKeyDown,
		onKeyUp:  ownProps.onKeyUp
	};		

};

const KeyboardContainer = connect(mapStateToKeyboardProps)(Keyboard);

/*-----------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
// word area

const Tile = (
	props
) => {
	//console.log(props);
	const { block, col, row, type, className } = props;
	let blockType =  `${block}--${type}`;
	let cName =  classNames(className,
							'tile',
							block,
							`${block}--${type}`
							);
	
    const attrs = {
      ...props,
      style: gridCoordsToOffsetStyle(row, col),
	  className: cName
    };
    return (
		<div {...attrs} />
	);
  };

const TilesRow = (
	props
) => {
	const { tiles } = props
	
	
	
	const renderTile = (
		tile
	) => {
		if ( tile != null ) {
			//console.log('renderTile',tile);
			const { block } = props;
			const type = tile.get('type');
			const row = tile.get('row');
			const col = tile.get('col');
			
			//const { type, row, col } = tile;
			let key = type + '-' + row + '-' + col;	
			return (
				  <Tile
					key={key}
					block={block}
					col={col}
					row={row}
					type={type}
				  />
				);
			} 
			return tile;
		
		};
	
	return (
      <div className="tiles__row">
        {tiles.map(renderTile)}
      </div>
    );
};

const Tiles = (
	props
	
) => {	
	//console.log('props no Tiles', props);
	const renderTilesRow = (row, i) =>{
			
		 const { block } = props;
    		return (
				<TilesRow
        			key={i}
        			block={block}
        			tiles={row}
      				/>
			);
	}
			 
		    
	const { tiles } = props;
	
	return (
	  <div className="tiles">
			{tiles.map(renderTilesRow)}
	  </div>
	);
	
};

const mapStateToEntitiesProps = (
	state
) =>{
	let Map = state.get('Map');
	let Entities = Map.get('entities');
	
  return {
    block: 'entity',
    tiles: Entities
  };
};

const mapStateToGroundProps = (
	state
) => {
	let Map = state.get('Map');
	let Ground = Map.get('ground');
	
  return {
    block: 'ground',
    tiles: Ground
  };
};

//render the ground tiles first
const GroundContainer = connect(
  mapStateToGroundProps
)(Tiles);

const EntitiesContainer = connect(
  mapStateToEntitiesProps
)(Tiles);

const Word = (
	props	
) => {
	
	//const className = 'world ';
	const className = classNames('world', { twemoji: !hasEmoji });
	
    //calc the inicial offset values 
	//positioning the map on center of the camera
	
	const style  = gridCoordsToOffsetStyle(props.MapCoordToOffSetRow,props.MapCoordToOffSetCol)	;	
	

	return (
		<div className={className} style={style}>
			<GroundContainer /> 
			<EntitiesContainer />
			<PlayerContainer />
		</div>	
	);
};

const mapStateToWordProps =(
	state
)=>{
	//console.log('mapStateToWordProps state', state );
	let mapConfig = state.get('mapConfiguration');
	let mapConfiguration = state.get('mapConfiguration');
	let Map = state.get('Map');
	let gameStats = state.get('gameStats');
	let player = gameStats.get('player');
	//console.log('player no maptoWordState', player);
	
	let worldWidth = mapConfiguration.get('width');
	let worldHeight = mapConfiguration.get('height');
	
	//console.log('mapStateToWordProps player', player);
	let playerCol = player.get('col');
	let playerRow = player.get('row');
	
	//console.log('no maptoWordState col', playerCol,'row', playerRow);

	
	const  CoordToOffSet = (worldDim, camDim, playerCoord) => {
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
					
				   return clamp(minCoord, maxCoord, coord);
			   
	 			};
			
	
	return {

		MapCoordToOffSetCol: CoordToOffSet(worldWidth,CAM_COLS,playerCol),
		MapCoordToOffSetRow: CoordToOffSet(worldHeight,CAM_ROWS,playerRow),
		map: Map
		
	}
	
}

//need to calculate the of set disposition of
// the map... in relation of the camera
const WordContainer = connect(
	mapStateToWordProps
)(Word);


const Camera =(
	props
) => {
	//console.log(props);
	const {numCols, numRows} = props;
	const style = gridCoordsToDimStyle(numCols, numRows);
    return (
      <Col  componentClass={Well}  
			mdOffset={2} 
			className="camera"
			style={style}>
				{props.children}
      </Col>
		);
};
	
/*------------------------------------------------------------------------*/
const NextLevelModal = (
	props
) => {

	
	const CloseHandler = () => {
		
		return props.onClickHandler(false)
	
	};
	
	return (

		<Modal show={props.showModal} onHide={CloseHandler}>
			<Modal.Header>
				<Modal.Title>Welcome to level <strong> {props.level} </strong> !!!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p> Ok, on this level you need to find the <strong> {props.ability} </strong> to 
				collect the <strong>{props.enemies}</strong> and use the <strong>{props.weapon}</strong>  to kill the evil <strong>{props.boss}</strong>!!! </p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={CloseHandler}>Start</Button>
			</Modal.Footer>
		</Modal>		
	)
};

const MapDispatchToNextLevelModal = (
			dispatch
			) => {	 
			return {	
					onClickHandler: (show) => { 
						dispatch(nextLevelModalShow(show))
					}
			}

};	
			
			
const MapStateToNextLevelModal = (
			state
			) => {
			//console.log(state)
			let level = state.getIn(['gameStats','level']);
			//console.log(level)
			//console.log(GameLevels[level]);
			return {
				level: level,
				weapon: GameLevels[level].weapons.name,
				ability: GameLevels[level].abilities.name,
				boss: GameLevels[level].boss.name,
				enemies:GameLevels[level].enemies.name,
				showModal: state.getIn(['gameStats','ShowNextLevelModal'])
			};	
};


const NextLevelModalContainer = connect(
	MapStateToNextLevelModal,
	MapDispatchToNextLevelModal)
(NextLevelModal);


const DieModal = (
	props	
) => {

	
	const CloseHandler = () => {
		
		return props.onClickHandler(false)
	
	};
	
	return (

		<Modal show={props.showModal} onHide={CloseHandler}>
			<Modal.Header>
				<Modal.Title> ALERT !!!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p> Sory... But you die.... Try Again !</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={CloseHandler}>Restart</Button>
			</Modal.Footer>
		</Modal>		
	)
};

const MapDispachToDieModal = (
	dispatch
) => {
	return {	
		onClickHandler: () => { 
			dispatch(die())
		}
	};
};

const MapStateToDieModal = (
	state
)=> {
	return {
			showModal: state.getIn(['gameStats','ShowDieModal'])
	}
};	
	
const DieModalContainer = connect(
	MapStateToDieModal,
	MapDispachToDieModal)
(DieModal);


const WinModal = (props) => {
	const CloseHandler = () => {
		
		return props.onClickHandler(false)
	
	};
	
	return (

		<Modal show={props.showModal} onHide={CloseHandler}>
			<Modal.Header>
				<Modal.Title> CONGRATULATIONS !!!!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>YOU WIN !!! You finaly kill the Snow Man!!!</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={CloseHandler}>Restart</Button>
			</Modal.Footer>
		</Modal>		
	)
};

const MapStateToWinModal = (
	state
)=> {
	return {
			showModal: state.getIn(['gameStats','ShowWinModal'])
	}
};	

const WinModalContainer = connect(
	MapStateToWinModal,
	MapDispachToDieModal)
(WinModal);

			
const Header = () => {

	return (
		<Col 
			md={8}
			 mdOffset={2}
			componentClass={Well} 
			bsSize="large"
			id="Header"> 
				<h1> React Roguelike </h1>
				<h3> Kill the Snow Man!!! </h3>
			<Col md={12}>
				<form> 
					<FormGroup 
						controlid="gameStatus" 
						bsSize="small">
							<CurrentHealthConainer />
							<ActiveWeapons />
							<ActiveHabilities />
							<CurrentAttackContainer />	
							<CurrentNextLevelContainer />
							<CurrentLevelContainer />
					</FormGroup>
				</form>
			</Col>
			
		</Col>

	);
};
const Footer = () =>  {
	
		return (
			<Col 
				md={8}
			 mdOffset={2}
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
		 
		);
};	
const Controler = () => {
	const { createStore } = Redux;
	
		return (
			<Provider store = {createStore(MegaReducer)}>
				<Grid fluid>
					<Header/>
					<Camera numCols={CAM_COLS} numRows={CAM_ROWS}>
					<WordContainer/>
					</Camera >	
					<Footer/>
					<NextLevelModalContainer/>	
					<DieModalContainer/>
					<WinModalContainer/>	
				</Grid>	
				
			</Provider>	
			
		);
};



ReactDOM.render(<Controler/>, 
				document.getElementById('mountNode'));