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

const WeaponsInitialState = Immutable.fromJS({	
		
				
					Gun: {
						active:false
						},
					Knife: {
						active:false
						},
					Hammer: {
						active:false
						},
					Bow:  {
						active:false
						}, 
					Sword: {
						active:false
					} 
						
  
	});

//called ftom activeWeapons
//define if the weapon is active or no
const activeWeapon = (state,action) => {
	//console.log("dentro do activeWeapon");
	//console.log(JSON.stringify(state));
	//console.log(action.type);
				
	switch (action.type) {
		case 'ACTIVATE_WEAPON':
			return {
				...state,
				active:true
			}
		
		default:
			return state
		}	
	  
	
}
//reduder for activeWeapons 
//for each weapon call activeweapon
//if no state was passed that means initial state
const Weapons = (
	state = WeaponsInitialState, 
	action) => {
	//console.log("dentro do activeWeapons");
	//console.log(JSON.stringify(state));
	//retira cada uma das armas
	  return state.map(state =>	
            activeWeapon(state, action)
        );
};


const dcApp = combineReducers({
    Weapons
   
});

//End of REDUCERS
/*------------------------------------------------------------------------*/


const mapStateToActiveWeapons=(
	state
) => {
	//console.log("dentro do mapStateToActiveWeapons");
	//console.log(JSON.stringify(state));
	let Weapons = state.Weapons
	//console.log(JSON.stringify(Weapons));
	//let Weapon = Weapons.Weapon
	//console.log(JSON.stringify(Weapon));
		
	return {
		Gun: state.Weapons.Gun,
		Knife: state.Weapons.Knife,
		Hammer: state.Weapons.Hammer,
		Bow: state.Weapons.Bow,
		Sword: state.Weapons.Sword
		
	}
	
};


const ActiveWeapons = ({
		Gun,
		Knife,
		Hammer,
		Bow,
		Sword
}) => {
	console.log(Gun);
	return (
		<div>
			<Weapon 
				entity ="gun"
			<span className="entity entity--gun" 
				style = {{'visibility':'hidden'}}
			/> 
			<span className="entity entity--knife"  
				style = {{'visibility': Knife}}
			/> 
			<span className="entity entity--hammer"  
				style = {{'visibility': Hammer}}
			/> 
			<span className="entity entity--bow" 
				style = {{'visibility': Bow}}
			/> 
			<span className="entity entity--sword"  
				style = {{'visibility': Sword}}
			/> 
		</div>
	);
		
};
	

const ActiveWeaponsContainer = connect(
	mapStateToActiveWeapons
)(ActiveWeapons)


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
								<ActiveWeaponsContainer />
						</Col>

							<Col
							componentClass={ControlLabel} 
							sm={2}>
								Habilities


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
	}
	
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
}



ReactDOM.render(<Controler/>, document.getElementById('mountNode'));