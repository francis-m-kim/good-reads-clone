var React = require('react');
var ShelfItem = require('./shelf_item');

var SessionStore = require('../stores/session_store');
var BookApiUtil = require('../util/book_api_util');



var Shelf = React.createClass({
  

  render: function() {
    var readings = this.props.readings;
    if (readings) {
      return (
        <div className="shelf-info">
          <h1 className="shelf-header">{this.props.shelfName}</h1>
          <ul>
            {
              readings.map(function(reading, i) {
                return <ShelfItem key={i} reading={reading}/>
              })
            }
          </ul>
        </div>
      );
    } else {
      return <div/>
    }
  }

});

module.exports = Shelf;


// return <li key={i}>{reading.title}</li>
