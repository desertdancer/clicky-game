import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
// import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0
  };

  shuffleFriends = id => {
    // Go thru all our friends, for each friend does the id match the friend.id?
    let newData = this.state.friends.map(friend => { 
    if (friend.id === id){
      if(!friend.clicked){
        friend.clicked = true
        this.setState(previousState => (
          {score: previousState.score +1}
        )
          
        )
      } else {
        this.setState({
          score: 0
        })
      }
    }
    return friend;
    })
    // If it matches, you have found the friend you clicked
    if (this.state.score === 0) { 
     this.resetData(newData)
    } else {
      this.setState({friends: newData})
    }
    
    // Need to set the clicked property to true
    // Update the state with the friends
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.shuffle(this.state.friends);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  resetData = data => {
    const newData = this.state.friends.map(friend => { 
                friend.clicked = false
                return friend;
      })
    
      this.setState({friends: newData})
  }

  shuffle = (array) => {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div >
        <h1>Friends List</h1>
        <h2>score: {this.state.score}</h2>
        {this.state.friends.map(friend => (
          <FriendCard
            shuffleFriends={this.shuffleFriends}
            id={friend.id}
            key={friend.id}
            image={friend.image}
           
          />
        ))}
      </div>
    );
  }
}

export default App;
