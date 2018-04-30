import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasicRule from './formRules/basicRule';

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            isValid: true,
            val: props.data.val ? props.data.val : ""
        };
        this.changeVal = this.changeVal.bind(this);
    }

    changeVal(e){
        var newState = {...this.state};
        newState.val = e.target.value;
        this.setState(newState);
        this.props.onInputChange(e,newState.val);
    }

    createInputHtml(){
        return (
            <input type={this.props.type}
                   ref="input"
                   className={this.props.data.noCls ? '' : (this.props.data.cls ? this.props.data.cls : "form-control border-input")}
                   name={this.props.data.name}
                   placeholder={this.props.data.placeholder}
                   disabled={this.props.data.isDisabled ? true : false}
                   value={this.state.val}
                   onChange={this.changeVal}

            />

        );
    }

    validate(){
        if(!!this.props.data.required){
            var val = this.refs.input.value,
                rule = this.props.data.validationRule ? this.props.data.validationRule : function (){ return new BasicRule() },
                result = rule().check(val);
            this.setState({
                isValid: result
            });
            return result;
        }
        return true;
    }

    render() {
        return (
            <div className={"form-group" + " " + this.props.cls}>
                <label style={this.props.data.label == '' || this.props.data.label == null ?{ height:'15px'}:{}}>
                    {this.props.data.label}
                </label>
                {
                    this.createInputHtml()
                }
                {
                    !this.state.isValid ? <div className="text-danger">{this.props.validationText? this.props.validationText :"Please enter a valid value!"}</div> : ""
                }
            </div>
        );
    }
}

Input.defaultProps = {
    type:'text',
    selectData:[],
    cascadeData:[],
    selectedValue: "",
    keyLabel: "key",
    valueLabel: "value",
    cls: "col-sm-12"
};

Input.propTypes={
    onInputChange: PropTypes.func,
    data: PropTypes.object.isRequired
};

export default Input;