var React = require('react');
var ReadingsApiUtil = require('../util/readings_api_util');
var BookApiUtil = require('../util/book_api_util');
var CurrentUserState = require("../mixins/current_user_state");
var BookStore = require('../stores/book_store');


var ReadingStatusButton = React.createClass({

  mixins: [CurrentUserState],

  getInitialState: function() {
    return {readingStatus: "Want to Read"}
  },

  componentDidMount: function() {
    this.listener = BookStore.addListener(this.handleChange);
    BookApiUtil.getUserReadings(this.props.user.id);
  },

  handleChange: function() {
    var status = BookStore.find(this.props.book_id).status
    if (status) {
      this.setState( {readingStatus: status} )
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },




  haveRead: function(event) {
    event.preventDefault();
    var reading = {
      user_id: this.state.currentUser.id,
      book_id: this.props.book_id,
      status: "have-read"

    };
    ReadingsApiUtil.addReading(reading);
  },

  readingNow: function(event) {
    event.preventDefault();
    var reading = {
      user_id: this.state.currentUser.id,
      book_id: this.props.book_id,
      status: "reading-now"
    };
    ReadingsApiUtil.addReading(reading);
  },

  willRead: function(event) {
    event.preventDefault();
    var reading = {
      user_id: this.state.currentUser.id,
      book_id: this.props.book_id,
      status: "will-read"
    };
    ReadingsApiUtil.addReading(reading);
  },

  render: function() {
    var user = this.state.currentUser;
    if (this.state.currentUser) {
      var blah = this.state.currentUser.id
    } else {
      var blah = ""
    }
    return (

      <div>
        <button className="reading-status">{this.state.readingStatus}</button>
        {blah}
        <button onClick={this.haveRead}>HAVE READ</button>
        <button onClick={this.readingNow}>READING NOW</button>
        <button onClick={this.willRead}>WILL READ</button>
      </div>
    );
  }

});

module.exports = ReadingStatusButton;