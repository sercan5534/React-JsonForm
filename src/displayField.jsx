import React,{Component} from 'react';
import PropTypes from 'prop-types';

class DisplayField extends Component{
    render(){
        return (
            <div className="row">
                <div className="col-sm-4"><label>{this.props.label}</label></div>
                <div className="col-sm-6">{this.props.value ? this.props.value : "" }</div>
            </div>
        );
    }
}

DisplayField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default DisplayField;