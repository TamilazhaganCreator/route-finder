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
        this.setState({
            startAddress: response.routes[0].legs[0].start_address,
            endAddress: response.routes[0].legs[0].end_address,
            totalDistance: response.routes[0].legs[0].distance.text,
            totalDuration: response.routes[0].legs[0].duration.text,
            steps: response.routes[0].legs[0].steps.map(s => this.getObject(s))
        })
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
                        {this.props.status === 'initial' ?
                            <div>Complete direction guide shown here</div> :
                            <div className="lds-dual-ring" />}
                    </div>) :
                    (
                        <div>
                            <div className="header">
                                <img src={start} alt="source" />
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
                                    <div key={index} className="box">
                                        <div className="small-content adp-substep">
                                            <div className="adp-stepicon">
                                                <div className={step.maneuver ? "adp-maneuver adp-" + step.maneuver : 'adp-maneuver adp-straight'} />
                                            </div>
                                        </div>
                                        <div className="instructions" dangerouslySetInnerHTML={{ __html: step.instructions }} />
                                        <div className="distance-content">
                                            <div>{step.distance}</div>
                                            <div className="margin-top-pt-5">{step.duration}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="header">
                                <img src={end} alt="destination" />
                                <span className="pad-left-1">{this.state.endAddress}</span>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}

export default RouteDetails