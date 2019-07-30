import React from 'react';
import './app/App.css';
import RouteDetails from './routedetails/RouteDetails';

class MapDetail extends React.Component {
    steps = []
    state = {
        status: "initial",
        msg: "Complete direction details shown here"
    }

    componentDidMount() {
        this.google = window.google
        this.directionsDisplay = new this.google.maps.DirectionsRenderer();
        this.map = new this.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 12.98, lng: 80.21 }
        });
        this.directionsDisplay.setMap(this.map);
        this.showInfo = this.showInfo.bind(this);
        this.infowindow2 = new this.google.maps.InfoWindow();
    }

    reset() {
        if (this.state.status === "ready") {
            this.directionsDisplay.setDirections({ routes: [] })
            this.setState({ status: "initial", msg: "Complete direction details shown here" })
        }
    }

    getDirections(origin, destination) {
        this.directionsDisplay.setMap(this.map);
        this.setState({ status: "loading" })
        let directionsService = new this.google.maps.DirectionsService();
        let request = {
            origin: origin,
            destination: destination,
            travelMode: this.google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, (response, status) => {
            if (status === this.google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
                this.refs.routeDetails.setDetails(response)
                this.steps = response.routes[0].legs[0].steps
                this.setState({ status: "ready" })
            } else {
                this.setState({ status: "NOT_FOUND", msg: "Place not found" })
            }
        });
    }

    showInfo(index) {
        let step = this.steps[index]
        this.infowindow2.close()
        this.infowindow2.setContent(step.instructions + "<br>" + step.distance.text + "--" + step.duration.text + " ");
        this.infowindow2.setPosition(step.end_location);
        this.infowindow2.open(this.map);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6 map-div card" id="map"></div>
                    <div className="col-6 map-div card route-details scrollbar">
                        <RouteDetails setPlaces={this.props.setPlaces} ref="routeDetails"
                            status={this.state.status} msg={this.state.msg} showInfo={this.showInfo} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MapDetail