// JavaScript Document
/*jshint esversion: 6 */

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
 
 //redux initializer 
 
const routerStateSelector = (state) => state.get('router');
 
 const reducer = (state = initialState, action) => {
  return (
    appReducer.supports(action.type) ?
    appReducer.reduce(state, action) :
    // Assume any non-supported actions deal with routing for now.
    state.set('router', routerStateReducer(routerStateSelector(state), action))
  );
};
 
function createStore() {
  return compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory: createHistoryWithBasename, routerStateSelector })
  )(createReduxStore)(reducer);
};

const store = createStore();

 const grounds = [
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

class Tiles extends React.Component{
 
  renderTilesRow(row, i) {
    const { block } = this.props;// o block e pra falar se ground ou entities
    return (
      <TilesRow
        key={i}
        block={block}
        tiles={row}
      />
    );
  }

  render() {
    const { tiles } = this.props;
    return (
      <div className="tiles">
        {tiles.map(this.renderTilesRow)}
      </div>
    );
  }
}

class TilesRow extends React.Component {

  renderTile(tile) {
	var key = type-row-col;
    const { block } = this.props;
    const { type, row, col } = tile;
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

  render() {
    return (
      <div className="tiles__row">
        {this.props.tiles.map(this.renderTile)}
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
			
			 const worldWidth = -20 //level.width(state);
			 const worldHeight = -20//level.height(state);

			 const playerCol = 10//player.getCol(state);
			 const playerRow = 10//player.getRow(state);

			
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
					console.log(ret)
				  return ret;	 
			   
	 			}
			
				 
			 _this.col = calcCoord(worldWidth, CAM_COLS, playerCol);
			 _this.row = calcCoord(worldHeight, CAM_ROWS, playerRow);
			
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
				 const widthTemp = (PX_PER_COL * col) +"px";  
				 const heightTemp = (PX_PER_ROW * row)+ "px";	

			const style = {
				height: heightTemp,
				width: widthTemp,
				backgroundColor: "red"
				
				} ;

			const className = 'world !hasEmoji';
			return (
			  <div className={className} style={style}>

				
			  </div>
			);
  }
	
}

World.propTypes = {
    col: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,

}

class GroundContainer extends React.Component {
	
	
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
				<Col md={11}>
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
							
							<Col 
								componentClass={ControlLabel} 
								sm={2}>
									Dungeon
								<FormControl
									id="Dungeon"
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
					<Camera numCols={30} numRows={20}/>	
					<WorldContainer >
					</WorldContainer>
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