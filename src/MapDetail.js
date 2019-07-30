import React from 'react';
import './app/App.css';
import RouteDetails from './routedetails/RouteDetails';

class MapDetail extends React.Component {

    state = {
        status: "initial"
    }

    componentDidMount() {
        this.google = window.google
        this.directionsDisplay = new this.google.maps.DirectionsRenderer();
        this.map = new this.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 12.98, lng: 80.21 }
        });
        this.directionsDisplay.setMap(this.map);
    }

    reset() {
        this.directionsDisplay.setDirections({routes: []})
        this.setState({ status: "initial" })
    }

    getDirections(origin, destination) {
        this.directionsDisplay.setMap(this.map);
        this.setState({ status: "loading" })
        var directionsService = new this.google.maps.DirectionsService();
        var request = {
            origin: origin,
            destination: destination,
            travelMode: this.google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, (response, status) => {
            if (status === this.google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
                this.refs.routeDetails.setDetails(response)
                this.setState({ status: "ready" })
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6 map-div card" id="map"></div>
                    <div className="col-6 map-div card route-details scrollbar">
                        <RouteDetails ref="routeDetails" status={this.state.status} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MapDetail