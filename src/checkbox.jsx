import React from 'react';
import Input from './input.jsx';

class Checkbox extends Input{
    createInputHtml(){
        const id = this.props.data.name + new Date().getMilliseconds();
        return (<div>
            <input type={this.props.type}
                ref="input"
                className={this.props.data.noCls ? '' : (this.props.data.cls ? this.props.data.cls + " form-control border-input checkbox-input" : " checkbox-input form-control border-input")}
                name={this.props.data.name}
                id={id}
                placeholder={this.props.data.placeholder}
                disabled={this.props.data.isDisabled ? true : false}
                value={this.state.val}
                onChange={this.changeVal}
                defaultChecked={this.props.data.checked}

            /><label className="checkbox-input-label" htmlFor={id}>{this.props.data.checkboxLabel}</label>
            <div className="cB"></div>
        </div>);
    }
}

export default Checkbox;