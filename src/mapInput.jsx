import React from 'react';
import Input from './input.jsx';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import mapIcon from '../../asset/img/map.ico'

class MapInput extends Input {
    constructor(props){
        super(props);
        if(props.data.lat && props.data.long){
            this.state = {
                isValid: true,
                coords:{
                    lat: props.data.lat,
                    long: props.data.long
                }
            };
            this.initialCenter = [props.data.lat, props.data.long];
        }
        else {
            this.state = {
                isValid: true
            };
            this.initialCenter = ["40.9166014", "29.3024885"];
        }
    }

    getVal() {
        return this.state;
    }

    setVal(val) {
        this.setState(val);
    }

    onMouseDown(e) {
        this.initialCenter = e._sourceEvent.originalEvent.map.getCenter();
        this.setState({
            isValid: true,
            coords: {
                lat: e._sourceEvent.originalEvent.coords[0],
                long: e._sourceEvent.originalEvent.coords[1]
            }
        });
        e.preventDefault();
        this.props.onInputChange({ target:{
            name:"latitude",
            value: ""+this.state.coords.lat
        }});
        this.props.onInputChange({ target:{
            name:"longitude",
            value: ""+this.state.coords.long
        }})
    }

    createInputHtml() {
        const markerStyles = {
            width: '60px',
            height: '60px',
            overflow: 'hidden'
        };

        const loadOptions = {
            lang: 'tr-TR'
        };

        const icon = mapIcon;

        return (
            <Map width="100%"
                 ref="input"
                 height={this.props.data.height || "450px"}
                 loadOptions={loadOptions}
                 center={this.initialCenter}
                 zoom={12}
                 onDblclick={this.onMouseDown.bind(this)}>
                {
                    this.state.coords ?
                        <Marker key={'marker_'} lat={this.state.coords.lat} lon={this.state.coords.long} /> : ""
                }
            </Map>
        )
    }

}

export default MapInput;