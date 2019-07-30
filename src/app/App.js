import React from "react";
import InputPlace from "../inputplace/InputPlace";
import MapDetail from '../MapDetail';
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      source: "",
      destination: ""
    }
    this.setPlaces = this.setPlaces.bind(this)
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
    this.setState({ [from]: address });
    if (this.state.source.length > 0 && this.state.destination.length > 0)
      this.refs.mapDetail.getDirections(this.state.source, this.state.destination)
  }

  render() {
    return (
      <div className="scrollbar">
        {this.state.showComponent === true &&
          <div>
            <div className="row">
              <div className="col-6 card">
                <InputPlace type='source' setPlaces={this.setPlaces} />
              </div>
              <div className="col-6 route-details card">
                <InputPlace type='destination' setPlaces={this.setPlaces} />
              </div>
            </div>
            <MapDetail ref="mapDetail" />
          </div>
        }
      </div>
    )
  }
}

export default App