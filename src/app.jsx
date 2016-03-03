var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); //bgives bindAsObject
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list')
var rootUrl = 'https://glowing-heat-8458.firebaseio.com/';

var Hello = React.createClass({
  mixins: [ReactFire], // Group of methods that sit on one object and copies over to other objects -- helps in reusability
  getInitialState:function(){
    return{
      items: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    this.firebase = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.firebase, 'items') // transforms to this.state.items => {object}
    this.firebase.on('value',this.handleDataLoaded);//firebase emits value once data is loaded
  },
  render: function() {
    return  <div>
              <div className="row panel panel-info">
                <div className="text-center panel-heading">
                  <h2>To-Do List</h2>
                  <Header itemsStore={this.firebaseRefs.items} />
                </div>
              </div>
              <hr />
              <div className={"content " + (this.state.loaded? 'loaded':'')}>
                <List items={this.state.items}/>
                {this.deleteButton()}
              </div>
            </div>
  },
  handleDataLoaded:function(){
    this.setState({loaded:true});
  },
  deleteButton: function(){
    if(!this.state.loaded) {
      return
    }
      else{
        return <div className="text-center clear-complete">
          <hr />
          <button
            type= "button"
            onClick= {this.onDeleteDoneClick}
            className="btn btn-primary">
            Clear Completed
          </button>
        </div>
      }
    },
    onDeleteDoneClick: function(){
      for (var key in this.state.items){
        if (this.state.items[key].done === true){
          this.firebase.child(key).remove();
        }
      }
    }
});


var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
