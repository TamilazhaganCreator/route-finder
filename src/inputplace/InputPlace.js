import React from 'react';
import './InputPlace.css'

class InputPlace extends React.Component {

    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.keyHandling = this.keyHandling.bind(this)
    }
    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current);
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        if (place.formatted_address) {
            let name = place.formatted_address.includes(place.name) ? "" : place.name + ", "
            this.props.setPlaces(this.props.type, name + place.formatted_address, "selected")
            this.changeFocus()
        }
    }

    setValue(value) {
        this.autocompleteInput.current.value = value
    }

    keyHandling(event) {
        this.props.setPlaces(this.props.type, event.target.value, "typing")
    }

    changeFocus() {
        let destElement = document.getElementById("autocomplete_destination")
        let srcElement = document.getElementById("autocomplete_source")
        if (this.props.type === "source" && destElement.value.length === 0)
            destElement.focus()
        else if (this.props.type === "destination" && srcElement.value.length === 0)
            srcElement.focus()
        else {
            srcElement.blur()
            destElement.blur()
        }
    }

    render() {
        return (
            <div className="pad-pt-75">
                <input className="input-field" onInput={this.keyHandling} ref={this.autocompleteInput}
                    id={"autocomplete_" + this.props.type} placeholder={"Enter your " + this.props.type + " address"} />
            </div>
        );
    }
}

export default InputPlace