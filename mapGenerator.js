map 
  


  const _seekRoomNextCorridor = (map, rooms, corridor) => {   
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

  var _seekNextRoom = function(map, rooms, room) {
    //Obter possiveis corredores
    var corridors = getPossibleCorridors(room).filter(function(item){
      var neigh = item.neighbour;
      if ( typeof map[neigh.y] == 'undefined' || typeof map[neigh.y][neigh.x] == 'undefined') {
        return false;
      }
      return map[neigh.y][neigh.x] == MapConfig.tileTypes.wall;
    });    
    corridors = shuffleArray(corridors);
    //para cada corridor tenha incluir um quarto    
    for (var key in corridors) {
      _seekRoomNextCorridor(map, rooms, corridors[key]);
    };
  }
  
  var seekRooms = function(map, rooms) {
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
  var getFloorsPosition = function(map) {
    var positions = [];
    for ( var y in map ) {
      for ( var x = 0; x < map[y].length; x++ ) {
        if ( map[y][x] == MapConfig.tileTypes.floor || !isNaN(map[y][x]) ) {
          positions.push({y: y, x:x});          
        }
      }
    }
    return positions;
  }
  var placeItems = function(map, items) {
    var positions = shuffleArray(getFloorsPosition(map));   
    var orderedItems = shuffleArray(items);
    var position;
    for ( var key in orderedItems) {
      position = positions.shift();
      map[position.y][position.x] = orderedItems[key].type;
      orderedItems[key].position = position;
    }
  }
  this.build = function(items) {
    var map = newMap();    
    var rooms = [];
    seekRooms(map, rooms);
    placeItems(map, items);
    return {map: map, rooms: rooms};
  };
}




function RoguelikeGame() {
  var level = 1;
  var state = [];
  
  var buildItems = function(level) {
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
  var levelUp = function() {
    
  }
  
  var newGame = function() {
    var builder = new MapBuilder();
    var items = buildItems(1);
    var data = builder.build(items);
    return {
      map_board: data.map,
      rooms: data.rooms
    };
  }  
  
  return {
    newGame: newGame
  }
}
new RoguelikeGame();
var RoguelikeMap = React.createClass({
  getInitialState: function() {
    
    var game = new RoguelikeGame();
    return game.newGame();
  },
  render: function() {
    var rows = this.state.map_board.map(function(row) {
      var cells = row.map(function(cell) {        
        cell = cell + "";
        cell = cell.toLowerCase()
        var className = 'tile tile-' + cell;
        return <td className={className}>{cell}</td>;
      });
      return <tr>{cells}</tr>;
    })
    return (<div>
        <h1>Rooms {this.state.rooms.length}</h1>
          <table>{rows}</table>
        </div>);
  }
});

ReactDOM.render(<RoguelikeMap />, document.getElementById('roguemap'));