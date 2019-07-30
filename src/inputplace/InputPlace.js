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
        this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["geocode"] });
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.props.setPlaces(this.props.type, place.formatted_address)
        this.changeFocus()
    }

    setValue() {
        this.autocompleteInput.current.value = this.props[this.props.type]
    }

    keyHandling(event) {
        if ((event.keyCode === 8 || event.keyCode === 46) && this.autocompleteInput.current.value === "") {
            this.props.setPlaces(this.props.type, "")

        }
    }

    changeFocus() {
        if (this.props.type === "source" && this.props.source.length === 0)
            document.getElementById("autocomplete_destination").focus()
        else if (this.props.type === "destination" && this.props.destination.length === 0)
            document.getElementById("autocomplete_source").focus()
        else {
            document.getElementById("autocomplete_source").blur()
            document.getElementById("autocomplete_destination").blur()
        }
    }

    render() {
        return (
            <div className="pad-pt-75">
                <input className="input-field" onKeyUp={this.keyHandling} ref={this.autocompleteInput}
                    id={"autocomplete_" + this.props.type} placeholder={"Enter your " + this.props.type + " address"} />
            </div>
        );
    }
}

export default InputPlace