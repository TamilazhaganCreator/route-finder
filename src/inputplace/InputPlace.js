import React from 'react';
import './InputPlace.css'

class InputPlace extends React.Component {

    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }
    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["geocode"] });
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.props.setPlaces(this.props.type, place.formatted_address)
    }

    render() {
        return (
            <div className="pad-pt-75">
                <input className="input-field" ref={this.autocompleteInput} id="autocomplete" placeholder="Enter your address"
                    type="text" />
            </div>
        );
    }
}

export default InputPlace