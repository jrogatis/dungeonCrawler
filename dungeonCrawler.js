// JavaScript Document
/*jshint esversion: 6 */

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
const { Component} = React;
const { Provider, connect } = ReactRedux;
const {combineReducers} = Redux;


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
	  width: 60,
	  height: 40,
	  min_rooms: 20,
	  max_rooms: 48,
	  room: {
		height: {min: 4, max: 14}, 
		width: {min: 8, max: 18}
	  },
	  tileTypes: {
		wall: 'GG',
		floor: 'GK'
	  }
	};
	
const GameLevels = {
	  1: {
		enemies: {
		  qty_range: [10, 12],
		  level_range: [1, 2]
		},
		weapons: ['SR'], 
		recovery: {
		  qty_range: [10, 13],
		  value_range: [15, 20]
		}
	  },
	  2: {
		enemies: {
		  qty_range: [11, 13],
		  level_range: [1, 2],
		},
		weapons: ['KN', 'HA'],
		recovery: {
		  qty_range: [10, 12],
		  value_range: [15, 21]
		}
	  },
	  3: {
		enemies: {
		  qty_range: [11, 13],
		  level_range: [1, 2, 3],
		},
		weapons: ['AX', 'PI'],
		recovery: {
		  qty_range: [10, 11],
		  value_range: [17, 22]
		}
	  },
	  4: {
		enemies: {
		  qty_range: [17, 20],
		  level_range: [2, 3]
		},    
		weapons: ['KA'],
		boss: {
		  level_range: [3, 5]
		}
	  }
}
	
//defintions of size of col and row	
 const PX_PER_COL = 25;
 const PX_PER_ROW = 25;	
 const CAM_COLS   = 800 / PX_PER_COL;
 const CAM_ROWS   = 600 / PX_PER_ROW;

 

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


/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//utils
// set the 
const clamp =(min,max,num) =>{
	const temp = (min,max,num) => {
		return  Math.max(Math.min(num, max), min)
	} 
	let curryed = _.curry(temp);
	
	console.log(curryed(min,max,min))

	return curryed(min,max,min);
}

const  gridColsToPx = (cols) =>{
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

/*------------------------------------------------------------------------*/
//tale utilities 

const splitter = /\s+\|?\s*/;

const createTile = _.curry((defs, row, col, shortType) => {
  return (
    (shortType in defs) ?
    { ...defs[shortType], row, col, shortType } :
    null
  );
});

const parseLevelGrid = _.curry((defs, data) => {	
  return data
    .map((row) => row.split(splitter))
    .map((row, rowIdx) => {
      const createItem = _.rearg(createTile(defs, rowIdx), 1, 0);
      return row.map(createItem);
    });
});

const parseGrounds = parseLevelGrid(grounds);
//const parseEntities = parseLevelGrid(entities);

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//habilities 
const returnTrue = () => true;
 const not = _.negate;

//aqui ele pega o state mas não sei da onde....
const buildAbility = (prop) => (state, entity) => {
  const fn = entity.get(prop);
  return _.isFunction(fn) ? fn(state, entity) : false;
};

const canBlock = buildAbility('canBlock');
const canCollect = buildAbility('canCollect');
const canDie = buildAbility('canDie');
const canDestroy = buildAbility('canDestroy');
const canKill = buildAbility('canKill');
const canWin = buildAbility('canWin');


const hasPowerup = _.curry((powerup, state, entity) => {
  return state.get('powerups').includes(powerup);
});

const hasBoots = hasPowerup('boots');
const hasHammer = hasPowerup('hammer');
const hasSilverware = hasPowerup('silverware');
const hasSpeedboat = hasPowerup('speedboat');
const hasSunglasses = hasPowerup('sunglasses');

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//entities
/*const canBlock = returnTrue;
const canCollect = returnTrue;
const canDestroy = returnTrue;
const canKill = returnTrue;*/
//const canWin = (s) => s.get('numTapes') >= level.getNumTapesTotal(s);

const blocksUnless = (hasAbility) => ({
  canBlock: not(hasAbility),
  canDie: hasAbility
});

const is = _.curry((prop, val, entity) => entity[prop] === val);

const typeIs = is('type');


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
		  map[y][x] = MapConfig.tileTypes.floor;
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
	
	 getFloorsPosition  (map)  {
		var positions = [];
		for ( var y in map ) {
		  for ( var x = 0; x < map[y].length; x++ ) {
			if ( map[y][x] == MapConfig.tileTypes.floor || !isNaN(map[y][x]) ) {
			  positions.push({y: y, x:x});          
			}
		  }
		}
    	return positions;
  	};
	
	 placeItems  (
		map,
		items
	)  {
		var positions = shuffleArray(this.getFloorsPosition(map));   
		var orderedItems = shuffleArray(items);
		var position;
		for ( var key in orderedItems) {
		  position = positions.shift();
		  map[position.y][position.x] = orderedItems[key].type;
		  orderedItems[key].position = position;
		}
  };
	
	
	//build  (items) {
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
    var qtyRecovery = RandomIntFromArray(config.recovery.qty_range);

    for ( var key = 0; key < qtyEnemies; key++ ) {
      items.push({
		  //snake
		  //aqui randomiza os inimigos
        type: 'KC',
        data: {          
          level: RandomIntFromArray(config.enemies.level_range)
        }
      });
    }
	//aqui randomiza o recovery
    for ( var key = 0; key < qtyRecovery; key++ ) {
      items.push({
		  //anbulance
        type: 'KI',
        data: {          
          value: RandomIntFromArray(config.recovery.value_range)
        }
      });
    }
	//aqui as armas... 
    var weaponKey = Math.floor(Math.random() * config.weapons.length);
    items.push({
		//
      type: "PE",
      data: {
        weapon: config.weapons[weaponKey]
      }
    });
    if ( typeof config.boss === 'undefined' ) {
      items.push({
        type:"DF"        
      });
    }
    items.push({
      type: "SC",//Player
      data: {
        level: 1,
        health: 100,
        weapon: 'PE'
      }
    });
    return items;
  };

const  getFloorsPosition = (map) => {
		var positions = [];
		for ( var y in map ) {
		  for ( var x = 0; x < map[y].length; x++ ) {
			if ( map[y][x] == MapConfig.tileTypes.floor || !isNaN(map[y][x]) ) {
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
		//console.log(items);
		let positions = shuffleArray(getFloorsPosition(Map));   
		let orderedItems = shuffleArray(items);
		console.log(JSON.stringify(Map));
		
		//let position;
		//let Items = [];
		//let item = [];
	
		/*for ( let key in orderedItems) {
		  position = positions.shift();
			item[position.y] = [];
			item[position.y][position.x] = orderedItems[key].type;
		  //map[position.y][position.x] = orderedItems[key].type;
		  orderedItems[key].position = position;
			items.push(item)
		}*/
		let entities = [];
		Map.map((row, yIndex)=>{
			let entitiesRow = []
			row.map((cell, xIndex)=>{
				if (Map[yIndex][xIndex] === MapConfig.tileTypes.floor) {
					entitiesRow.push('BL');
				}  else {
					entitiesRow.push('');
				};
				
			});
			entities.push(entitiesRow);
		});
		
		return entities
  };


const newBoard = () => {
    var builder = new MapBuilder();
   // var data = builder.build(items);
    var data = builder.build();
	 let items = placeItems(data.map, buildItems(1));
	console.log(JSON.stringify(items));	
    return {
      map_board: data.map,
      rooms: data.rooms,
	  entities: items 	
    };
  };  


//end of map generator
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
//REDUCERS area
//active weapon reducer
const WeaponsHabilitiesInitialState = Immutable.fromJS({	
				
					gun: {
						active:true
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
					sword: {
						active:false
					},
					boots: {
						active:false
						},
					sunglasses: {
						active:false
						},
					speedboat: {
						active:true
						},
					silverware:  {
						active:false
						}				
						
  
	});

const GameInitialState = Immutable.fromJS({					
	  deaths: 0,
	  health: 4,
	  attack: 0,
	  level: 1,
	  nextLevel: 45,
	  player: {
		 row: 30,
		 col: 30,
		direction: 'left' 
	  }
					
});


const game = (state,action) => {
					
	switch (action.type) {
		case 'DEATH':
			
			return {
				...state,
				deaths:true
			}
		
		default:
			return state
		}		
};
//called from Weapons
//define if the weapon is active or no
const activeWeaponHabilities = (state,action) => {
					
	switch (action.type) {
		case 'ACTIVATE_WEAPON':
			return {
				...state,
				active:true
			}
		
		default:
			return state
		}		
};

const Map = (
	state= newBoard(),
	action
) => {
	
	let Map = state.map_board;
	let newMap = []
		Map.map((row,rIndex)  => {		
			let newRow = []
			row.map((tile, coll)=>{
				newRow.push(createTile(grounds,rIndex, coll, tile));
			});
			newMap.push(newRow);
		})
	
		state.map_board = newMap;
	return state
	
};
		
//reduder for activeWeapons 
//for each weapon call activeweapon
//if no state was passed that means initial state
const WeaponsHabilities = (
	state = WeaponsHabilitiesInitialState, 
	action
) => {
	  return state.map(state =>	
            activeWeaponHabilities(state, action)
        );
};

const gameStats = (
	state = GameInitialState, 
	action
) => {
	 return state.map(state =>	
            game(state, action)
        );
	
};


const mapConfiguration = (
	state = Immutable.fromJS(MapConfig),
	action) => {
		return state
	
};

const dcApp = combineReducers({
    WeaponsHabilities,
	gameStats,
	mapConfiguration,
	Map
	
});

//End of REDUCERS
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//Weapons Habilities
const mapStateToWeaponsHabilitiesProps=(
	state,
	ownProps
) => {
		//take care !!! im using immutableJS!!!
		var WeaponsState = state.WeaponsHabilities.get(ownProps.entity);
		var WeaponState = WeaponsState.get('active')
				
		
	return {
		entity: ownProps.entity,
		active: WeaponState
	}
	
};

const WeaponHabilities = (
	props
) => {
	var cName = "entity entity--" + props.entity;
	var display = (props.active===false)?'hidden':'visible';
	display = {visibility:display}
	
	return (
		<span className={cName}
				style = {display}
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
				<WeaponHabilitesContainer 
					entity ="sword"
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
		//take care !!! im using immutableJS!!!	
		var gameStats = state.gameStats;
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
	return (
		<Col 
			componentClass={ControlLabel} 
			sm={2}>
				Health
			<FormControl
				readOnly
				id="Health"
				type="text"	
				value={props.currentHealth}
			/>
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
				Attack
			<FormControl
				readOnly
				id="Attack"
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
				Next Level
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
// word area


const Tile = (
	props
) => {

	const { block, col, row, type } = props;
	let blockType =  `${block}--${type}`;
	let classNames = 'tile ' + block + " " +  blockType
    const attrs = {
      ...props,
      style: gridCoordsToOffsetStyle(row, col),
      className: classNames
    };
    return (
		<div {...attrs} />
	);
  }

const TilesRow = (
	props
) => {
	const { tiles } = props
	
	const renderTile = (
		tile
	) => {
		const { block } = props;
    	const { type, row, col } = tile;
		let key = type + '-' + row + '-' + col;	
		return !tile ? null : (
		  <Tile
			key={key}
			block={block}
			col={col}
			row={row}
			type={type}
		  />
		);

	}
	
	return (
      <div className="tiles__row">
        {tiles.map(renderTile)}
      </div>
    );
};


const Tiles = (
	props
) => {	
	
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
	let MapBoard = state.Map.map_itens;
	
  return {
    block: 'entity',
    tiles: MapBoard
  };
};

const mapStateToGroundProps = (
	state
) => {
	
	let MapBoard = state.Map.map_board;
	
  return {
    block: 'ground',
    tiles: MapBoard
  };
};

//render the ground tiles first
const GroundContainer = connect(
  mapStateToGroundProps
)(Tiles);


const Word = (
	props	
) => {
	
	const className = 'world ';
	
    //calc the inicial offset values 
	//positioning the map on center of the camera
	
	const style  = gridCoordsToOffsetStyle(props.MapCoordToOffSetRow,props.MapCoordToOffSetCol)	;	
	

	return (
		<div className={className} style={style}>
			<GroundContainer /> 
		</div>	
	);
};


const mapStateToWordProps =(
	state
)=>{
	let mapConfig = state.mapConfiguration;
	let gameStats = state.gameStats;
	let map = state.map;
	
	let worldWidth = mapConfig.get('width');
	let worldHeight = mapConfig.get('height');
	
	let player = gameStats.get('player');
	let playerCol = player.get('col');
	let playerRow = player.get('row');
	
	
	
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
		map: map
		
	}
	
}

//need to calculate the of set disposition of
// the map... in relation of the camera
const WordContainer = connect(
	mapStateToWordProps
)(Word);


const GameBoard = () => {
	
		return (
			<Col 
				md={12} 			
				componentClass={Well} 
				bsSize="large"
				id="GameBoard">
				<div className ="game">
				<WordContainer />
				</div>
 			</Col>
		 
		)
}
	

/*------------------------------------------------------------------------*/

const Header = () => {

	return (
		<Col 
			md={12}
			componentClass={Well} 
			bsSize="large"
			id="Header"> 
				<h1> React Roguelike </h1>
				<h3> Kill the KING!!! </h3>
			<Col md={12}>
				<form> 
					<FormGroup 
						controlid="gameStatus" 
						bsSize="small">
							<CurrentHealthConainer />
							<ActiveWeapons />
							<ActiveHabilities />
							<CurrentAttackContainer />
							<CurrentLevelContainer />
							<CurrentNextLevelContainer />
					</FormGroup>
				</form>
			</Col>
			
		</Col>

	);
};
const Footer = () =>  {
	
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
		 
		);
};	
const Controler = () => {
	const { createStore } = Redux;
	
		return (
			<Provider store = {createStore(dcApp)}>
				<Grid fluid>
					<Header/>
					<GameBoard/>
					<Footer/>				
				</Grid>	
			</Provider>	
			
		);
};



ReactDOM.render(<Controler/>, 
				document.getElementById('mountNode'));