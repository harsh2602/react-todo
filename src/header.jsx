var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text:''
    }
  },
  render: function() {
    //input group in bootstrap tells that all the elements inside of me are going to function together
    return <div className="input-group">
        <input
           value={this.state.text}
           onChange = {this.handleInputChange}
           type="text"
           className="form-control" />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-primary"
            type="button">
            Add
          </button>
        </span>
    </div>
  },
  handleClick: function() {
    //Send value of text input to firebase
    this.props.itemsStore.push({
      text:this.state.text,//key:value pair
      done: false
    });
    this.setState({text:""});
  },
  handleInputChange: function(event) { //argument event is an object that describes that an action that was taken
    this.setState({text:event.target.value});//event occured on target which is the DOM element
  }
});
