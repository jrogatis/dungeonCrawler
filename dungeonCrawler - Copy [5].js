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
)(CurrentHealth)

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
)(CurrentLevel)

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
)(CurrentAttack)

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
)(nextLevel)


//end game stats
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
}
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
					<Footer/>
				</Grid>	
			</Provider>	
			
		);
};



ReactDOM.render(<Controler/>, 
				document.getElementById('mountNode'));