import React from "react";
import InputPlace from "../inputplace/InputPlace";
import MapDetail from '../MapDetail';
import './App.css'
import '../routedetails/RouteDetails.css'
import updown from '../assets/up&down.svg'
import route from '../assets/route.svg'

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
    this.updown = React.createRef()
  }

  componentDidMount() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places";
    let scriptElement = document.getElementsByTagName('script')[0];
    scriptElement.parentNode.insertBefore(script, scriptElement);
    script.addEventListener('load', e => {
      this.setState(({ showComponent: true }));
    })
  }

  setPlaces(from, address, findDirection) {
    this.setState({ [from]: address }, () => {
      if (findDirection === "typing")
        this.refs.mapDetail.reset()
      else if (findDirection === "selected")
        this.getDirections()
      else
        this.changeInputValue()
    });
  }

  reversePlaces() {
    this.updown.current.className = "up-down down"
    setTimeout(() => {
      this.updown.current.className = "up-down"
    }, 300);
    let source = this.state.source
    this.setState({ source: this.state.destination, destination: source }, () => {
      this.getDirections()
    });
  }

  changeInputValue() {
    this.refs.sourceInput.setValue(this.state.source)
    this.refs.destinationInput.setValue(this.state.destination)
  }

  getDirections() {
    if (this.state.source.length > 0 && this.state.destination.length > 0)
      this.refs.mapDetail.getDirections(this.state.source, this.state.destination)
  }

  render() {
    return (
      <div className="scrollbar full-page">
        <div className="title-bar"><img src={route} alt="route" className="icon" />
          <h2 >Route Finder</h2>
        </div>
        {this.state.showComponent ?
          (<div>
            <div className="row card search-bar">
              <div className="col-5 ">
                <InputPlace type='source' ref="sourceInput" setPlaces={this.setPlaces} />
              </div>
              <div className="col-1 center-align">
                <img ref={this.updown} className="up-down" src={updown} alt="Reverse search" onClick={this.reversePlaces} />
              </div>
              <div className="col-5">
                <InputPlace type='destination' ref="destinationInput" setPlaces={this.setPlaces} />
              </div>
            </div>
            <MapDetail ref="mapDetail" setPlaces={this.setPlaces} />
          </div>)
          : (<div className="loader"><div className="lds-dual-ring" /></div>)
        }
      </div>
    )
  }
}

export default App