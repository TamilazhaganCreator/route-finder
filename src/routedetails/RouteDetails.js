import React from 'react';
import end from '../assets/end.svg';
import start from '../assets/start.svg';
import './ManeuverIcons.css';
import StepDetailModel from './Model';
import './RouteDetails.css';

class RouteDetails extends React.Component {

    state = {
        startAddress: "",
        endAddress: "",
        totalDistance: "",
        totalDuration: "",
        steps: []
    }

    setDetails(response) {
        let legs = response.routes[0].legs[0]
        let { startAddress, endAddress } = this.setAddress(response, legs);
        this.setState({
            startAddress: startAddress,
            endAddress: endAddress,
            totalDistance: legs.distance.text,
            totalDuration: legs.duration.text,
            steps: legs.steps.map(s => this.getObject(s))
        })
        this.props.setPlaces("source", this.state.startAddress, "")
        this.props.setPlaces("destination", this.state.endAddress, "")
    }

    setAddress(response, legs) {
        let startAddress = response.request.origin.query;
        startAddress = startAddress.length < legs.start_address.length ? legs.start_address : startAddress;
        let endAddress = response.request.destination.query;
        endAddress = endAddress.length < legs.end_address.length ? legs.end_address : endAddress;
        return { startAddress, endAddress };
    }

    getObject(mapStep) {
        let step = new StepDetailModel()
        step.instructions = mapStep.instructions
        step.maneuver = mapStep.maneuver
        step.distance = mapStep.distance.text
        step.duration = mapStep.duration.text
        return step
    }

    render() {
        return (
            <div>
                <h3>Direction Details</h3>
                {this.props.status !== 'ready' ?
                    (<div className="initial-msg">
                        {this.props.status !== 'loading' ?
                            <div>{this.props.msg}</div> :
                            <div className="lds-dual-ring" />}
                    </div>) :
                    (<div>
                        <div className="header">
                            <img src={start} alt="source" className="location-icon" />
                            <span className="pad-left-1">{this.state.startAddress}</span>
                        </div>
                        <div className="total-details">
                            <span><strong>Total Distance</strong> : {this.state.totalDistance}</span>
                            <span className="pad-left-1">
                                <strong>Total Duration</strong> : {this.state.totalDuration}
                            </span>
                        </div>
                        <div className="instructions-table">
                            {this.state.steps.map((step, index) =>
                                <div key={index} className="box" onClick={(e) => this.props.showInfo(index)}>
                                    <div className="small-content adp-substep">
                                        <div className="adp-stepicon">
                                            <div className={step.maneuver ? "adp-maneuver adp-" + step.maneuver : 'adp-maneuver adp-straight'} />
                                        </div>
                                    </div>
                                    <div className="instructions" dangerouslySetInnerHTML={{ __html: step.instructions }} />
                                    <div className="distance-content">
                                        <div className="distance-box">
                                            <div>{step.distance}</div>
                                            <div className="margin-top-pt-5">{step.duration}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="header">
                            <img src={end} alt="destination" className="location-icon" />
                            <span className="pad-left-1">{this.state.endAddress}</span>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}

export default RouteDetails