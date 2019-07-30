import React from "react";
import InputPlace from "../inputplace/InputPlace";
import MapDetail from '../MapDetail';
import './App.css'
import '../routedetails/RouteDetails.css'
import updown from '../assets/up&down.svg'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      source: "",
      destination: ""
    }
    this.setPlaces = this.setPlaces.bind(this)
    this.reversePlaces = this.reversePlaces.bind(this)
  }

  componentDidMount() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAZCBd9bf9b-1TNBg5YrJKMfUJnTodyCE&libraries=places";
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    s.addEventListener('load', e => {
      this.setState(({ showComponent: true }));
    })
  }

  setPlaces(from, address) {
    this.setState({ [from]: address }, () => {
      if (address === "")
        this.refs.mapDetail.reset()
      else
        this.getDirections()
    });
  }

  reversePlaces() {
    let source = this.state.source
    this.setState({ source: this.state.destination, destination: source }, () => {
      this.getDirections()
    });
    this.refs.sourceInput.setValue()
    this.refs.destinationInput.setValue()
  }

  getDirections() {
    if (this.state.source.length > 0 && this.state.destination.length > 0)
      this.refs.mapDetail.getDirections(this.state.source, this.state.destination)
  }

  render() {
    return (
      <div className="scrollbar">
        {this.state.showComponent ?
          (<div>
            <div className="row card search-bar">
              <div className="col-5 ">
                <InputPlace type='source' ref="sourceInput" source={this.state.destination} setPlaces={this.setPlaces} />
              </div>
              <div className="col-1 center-align">
                <img className="up-down" src={updown} alt="Reverse search" onClick={this.reversePlaces} />
              </div>
              <div className="col-5">
                <InputPlace type='destination' ref="destinationInput" destination={this.state.source} setPlaces={this.setPlaces} />
              </div>
            </div>
            <MapDetail ref="mapDetail" />
          </div>)
          : (<div className="loader"><div className="lds-dual-ring" /></div>)
        }
      </div>
    )
  }
}

export default App