import React, {Component} from 'react';
import LoadMask from 'react-load-mask';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from './container.jsx';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = this.setCascadingValues(props);
        this.values = this.setDefaultValue(props);
        this.updateField = this.updateField.bind(this);
        this.submitAction = this.submitAction.bind(this);
    }

    setDefaultValue(props){
        var defaultObj = {};
        for(var i = 0 ; i < props.fields.length; i++){
            var item = props.fields[i];
            if(item.fields){
                defaultObj = Object.assign(defaultObj,this.setDefaultValue(item));
            }
            if(item.val){
                defaultObj[item.name] = item.val;
            }
        }
        return defaultObj;
    }

    setCascadingValues(props){
        var defaultObj = {};
        for(var i = 0 ; i < props.fields.length; i++){
            var item = props.fields[i];
            if(item.fields){
                this.setCascadingValues(item);
            }
            if(item.cascadeFill){
                defaultObj[item.cascadeFill] = [];
            }
            if(item.cascadeFill && item.val){
                this.cascadeFill(item.cascadeUrl,item.cascadeFill,item.val);
            }
        }
        return defaultObj;
    }

    updateField(e){
        this.values[e.target.name] = e.target.value;
        var fieldConfiguration = this.getField(this.props.fields,e.target.name);
        if(fieldConfiguration && fieldConfiguration.cascadeFill){
            this.cascadeFill(fieldConfiguration.cascadeUrl,fieldConfiguration.cascadeFill,e.target.value);
        }
    }

    cascadeFill(cascadeUrl,name,value){
        var me = this;
        var splitedUrl = cascadeUrl.split("{param}"),
            url = splitedUrl[0] + value + splitedUrl[1];
        axios({
            url:url,
            method:"GET"
        })
            .then(response => {
                var obj = me.state;
                obj[name] = response.data.data.content;
                me.setState(obj);
            });
    }

    getField(fields,name){
        for(var i = 0 ; i < fields.length; i++){
            var item = fields[i];
            if(item.fields){
                var matchingItem =  this.getField(item.fields,name);
                if(matchingItem){
                    return matchingItem
                }
            }
            if(item.name == name){
                return item
            }
        }
    }

    submitAction(e){
        e.preventDefault();
        if(this.validateForm()) {
            this.props.submitAction(this.values);
        }
    }

    validateForm(){
        return this.validate(this.container.els);
    }

    validate(fields){
        var flag = true;
        for(var i = 0 ; i < fields.length; i++){
            var item = fields[i];
            if(item === null){
                continue
            }
            if(item.els){
                if(!this.validate(item.els)) {
                    flag = false
                }
            }
            if(item.validate && !item.validate()){
                flag = false;
            }
        }
        return flag;
    }

    render() {
        return (
            <form onSubmit={this.submitAction}>
                <LoadMask visible={this.props.loading} />
                <Container ref={(container) => {this.container = container; }} fields={this.props.fields} column={1} onInputChange={this.updateField} st={this.state}/>
                {this.props.button ?  <button className={this.props.button.className}>{this.props.button.text}</button> : (
                    !!this.props.children? this.props.children: <div style={{ clear:'both'}}></div>
                )}
            </form>
        );
    }
}

Form.defaultProps = {
    loading: false
};

Form.propTypes = {
    fields: PropTypes.array.isRequired,
    button: PropTypes.object,
    submitAction: PropTypes.func,
    loading: PropTypes.bool
};


export default Form;