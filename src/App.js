import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactCountdownClock from  'react-countdown-clock';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      activePage: 1,
      noOfEx: 0,
      ExSeconds: 0
    }
    this.url = "https://www.soundjay.com/clock/sounds/clock-ticking-1.mp3";
    this.audio = new Audio(this.url);
  }
  myCallback(){
    this.setState({ activePage: 5 });
    this.audio.play();
    const self = this;
    setTimeout(()=>{
      if(self.state.noOfEx - 1 > 0){
        self.setState({activePage:4,noOfEx:self.state.noOfEx-1});
        self.audio.pause();
        self.audio.load();
      }
    },2000)
  }
  GoToStopWatch() {
    this.setState({ activePage: 4 })
  }
  render() {
    const { classes } = this.props;
    const { name, activePage, noOfEx, ExSeconds } = this.state;
    let field;
    switch (activePage) {
      case 1:
        field = (<TextField
          label="Name"
          className="text"
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />);
        break;
      case 2:
        field = (<TextField
          label="Number Of Excersice"
          className="text"
          value={noOfEx}
          onChange={(e) => this.setState({ noOfEx: e.target.value })}
        />);
        break;
      case 3:
        field = (<TextField
          label="Seconds"
          className="text"
          type="number"
          min={0}
          value={ExSeconds}
          onChange={(e) => this.setState({ ExSeconds: e.target.value })}
        />);
        break;
      case 4: 
      field = (<div className="timmer">
        <ReactCountdownClock
          seconds={ ExSeconds }
          color = "#1a237e"
          alpha = {0.9}
          type="number"
          min={0}
          size = {300}
          onComplete = {() =>this.myCallback()} 
          />
        </div>)
      break;
      case 5: 
      field = (<div className="timmer">
          Next REP
        </div>)
      break;
      default:
        field = (<div></div>)
    }
    return (
      <div className="app-container">
        <form className={classes.container} noValidate autoComplete="off">
          {field}
        </form>
        <footer>
          <Button color="secondary"
            onClick={() => this.setState({ activePage: activePage - 1 })}
            disabled={activePage === 1}
            className={classes.button}>
            Previous
          </Button>
          <Button
            color="primary"
            onClick={() => activePage === 3 ? this.GoToStopWatch() : this.setState({ activePage: activePage + 1 })}
            disabled={activePage === 4}
            className={classes.button}>
            {activePage >= 3 ? "Finished" : "Next"}
          </Button>
        </footer>
      </div>
    );
  }
}
const myCallback = () =>{
  console.log("oopopop")
}
export default withStyles(styles)(App);

