// JavaScript Document
/*jshint esversion: 6 */


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


class EnhanceGridCoordsToStyle  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gridColsToPx: null,
			gridRowsToPx: null,
			gridCoordsToOffsetStyle: {},
			gridCoordsToDimStyle: {}
		}
	
		
	} 
	
	gridColsToPx(cols) { 		
			this.setState({
					gridColsToPx: `${PX_PER_COL * cols}px`				   
				   });
	}
	
	gridRowsToPx(rows) {
			this.setState({				
				gridRowsToPx:`${PX_PER_ROW * rows}px`				
			});		
		
	}
	
	gridCoordsToOffsetStyle ()  {
			this.setState({
				
					top: this.gridRowsToPx(row),
					left: this.gridColsToPx(col)				
			});
				
	}

	gridCoordsToDimStyle() {
		
			this.setState({				
				top: this.gridRowsToPx(row),
					left: this.gridColsToPx(col),
			});
				
		}
			
		
	
	render(){
		
		return <EnhanceGridCoordsToStyle {...this.props} {...this.state} />
	}
	
	
}

class Camera extends React.Component {
	
 componentWillMount() { 
   // this.props.onWillMount();
  }

  render() {
    const { numCols, numRows } = this.props;
    const corngrats = hasWon && (<Corngratulations />);
    const style = { maxWidth: gridColsToPx(numCols) }

    return (
      <div className="game" style={style}>
        <Camera numCols={numCols} numRows={numRows}>
          
        </Camera>
       
      </div>
    );
  }
	
	
}

Camera.propTypes = {
    numCols: React.PropTypes.number.isRequired,
    numRows: React.PropTypes.number.isRequired
   // onWillMount: PropTypes.func.isRequired,
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
					<h3> Kill the KING at Dungeon 4 </h3>
					<form> 
						<FormGroup 
							controlid="gameStatus" 
							bsSize="small">
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Health
							</Col>
							<Col sm={1}>
								<FormControl
									id="Health"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Weapon
							</Col>
							<Col sm={1}>
								<FormControl
									id="Weapon"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Attack
							</Col>
							<Col sm={1}>
								<FormControl
									id="Attack"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Level
							</Col>
							<Col sm={1}>
								<FormControl
									id="Level"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Next Level
							</Col>
							<Col sm={1}>
								<FormControl
									id="NextLevel"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col 
								componentClass={ControlLabel} 
								sm={1}>
									Dungeon
							</Col>
							<Col sm={1}>
								<FormControl
									id="Dungeon"
									type="text"
									placeholder="Large text"
								/>
							</Col>
							<Col sm={1}>
								<button> teste </button>
							</Col>
			
			
						</FormGroup>
					</form>
			
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
		//var can1 = new Camera({numCols:40 , numRows:20});
		var can1 = <Camera numCols={40} , numRows={20} />;
		var CanEnhanced = <EnhanceGridCoordsToStyle can1/>;
		return (
			<Col 
				md={12} 			
				componentClass={Well} 
				bsSize="large"
				id="GameBoard">
					{CanEnhanced}
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