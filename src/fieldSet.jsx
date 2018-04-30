import React from 'react';
import Input from './input.jsx';
import Container from './container.jsx';

class FieldSet extends Input {
    constructor(props){
        super(props);
    }
    createInputHtml(){
        return (
            <fieldset className="fieldset">
                <Container ref={(container) => {this.container = container; }} fields={this.props.data.fields} column={1}  onInputChange={this.props.onInputChange}   st={this.state}/>
            </fieldset>
        );
    }

}

export default FieldSet;