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

const dcApp = combineReducers({
    WeaponsHabilities,
	gameStats
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
//map generator
const MapBuilder = () => {
	
  	

	var roomNumber = 0;

	const getPossibleCorridors = (
		room
	) =>{

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

	const checkRoomPosition = (
		room
	) =>{
		var maxX = MapConfig.width - 1;
		var maxY = MapConfig.height - 1;
		return room.x >= 1 && room.y >= 1 && room.y2 + 1 < maxY && room.x2 + 1 < maxX;
	  };

	const addRoom = (
		map, 
		room
	  ) =>{
		var right = room.x + room.width;
		var bottom = room.y + room.height;
		for (var y = room.y; y <= bottom; y++) {
		  for (var x = room.x; x <= right; x++) {
			map[y][x] = MapConfig.tileTypes.floor;
			map[y][x] = roomNumber;
		  }
		}
		roomNumber++;
	  };

	const addCorridor = (
		map,
		corridor,
		length,
		direction
	) => {
		var x = corridor.x;
		var y = corridor.y;
		while(length > 0 ) {
		  map[y][x] = MapConfig.tileTypes.floor;
		  y += direction.y;
		  x += direction.x;
		  length--;
		}
	  };
	
	const _seekRoomNextCorridor = (
		map,
		rooms,
		corridor
	) => {   
		if ( rooms.length >= MapConfig.max_rooms ) {
		  return;
		}
		var corridorDirection;   
		var newRoom = new RandomRoom();
		var  diffY = Math.floor(Math.random() * newRoom.height);
		var  diffX = Math.floor(Math.random() * newRoom.width);
		var corridorLength = Math.floor(Math.random() * 3)  + 2;
		
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

		  if (checkRoomPosition(newRoom) && !newRoom.intersectRoomList(rooms)) {
			rooms.push(newRoom);
			addRoom(map, newRoom);
			addCorridor(map, corridor, corridorLength, corridorDirection);
			_seekNextRoom(map, rooms, newRoom);
		  }
  };

	const seekRooms = (
		map,
		rooms
	) => {
		//Create a new room
		var room = new RandomRoom();

		addRoom(map, room);
		rooms.push(room);
		_seekNextRoom(map, rooms, room);
		var key = 0;
		while (rooms.length < MapConfig.min_rooms && key < rooms.length) {
		  _seekNextRoom(map, rooms, rooms[key]);
		  key++;
		}
	  };
	
	const getFloorsPosition = (map) => {
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
	
	const placeItems = (
		map,
		items
	) => {
		var positions = shuffleArray(getFloorsPosition(map));   
		var orderedItems = shuffleArray(items);
		var position;
		for ( var key in orderedItems) {
		  position = positions.shift();
		  map[position.y][position.x] = orderedItems[key].type;
		  orderedItems[key].position = position;
		}
  };
	
	this.build = (items) => {
		var map = newMap();    
		var rooms = [];
		seekRooms(map, rooms);
		placeItems(map, items);
		return {map: map, rooms: rooms};
	  };
			

};

const buildItems = (level) => {
    var items = [];
    var config = GameLevels[level];
    var qtyEnemies = RandomIntFromArray(config.enemies.qty_range);
    var qtyRecovery = RandomIntFromArray(config.recovery.qty_range);

    for ( var key = 0; key < qtyEnemies; key++ ) {
      items.push({
        type: 'EN',
        data: {          
          level: RandomIntFromArray(config.enemies.level_range)
        }
      });
    }
    for ( var key = 0; key < qtyRecovery; key++ ) {
      items.push({
        type: 'RE',
        data: {          
          value: RandomIntFromArray(config.recovery.value_range)
        }
      });
    }
    var weaponKey = Math.floor(Math.random() * config.weapons.length);
    items.push({
      type: "WP",
      data: {
        weapon: config.weapons[weaponKey]
      }
    });
    if ( typeof config.boss === 'undefined' ) {
      items.push({
        type:"LU"        
      });
    }
    items.push({
      type: "PL",//Player
      data: {
        level: 1,
        health: 100,
        weapon: 'PE'
      }
    });
    return items;
  }

//end of map generator
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/

const GameBoard = () =>{

		return (
			<Col 
				md={12} 			
				componentClass={Well} 
				bsSize="large"
				id="GameBoard">
				<div className ="game">					
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
	let items = buildItems(1);
	const mapBuilder = new MapBuilder(items);
	
	//console.log(map)
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