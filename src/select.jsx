import React, {Component} from 'react';
import Input from './input.jsx';
import axios from 'axios';

class Select extends Input{
    componentWillMount(){
        if(this.props.data.dataUrl){
            var newState = {...this.state},
                me = this;
            newState.selectData = [];
            this.setState(newState);
            axios({
                url: this.props.data.dataUrl,
                method:"GET"
            })
                .then(response => {
                    newState.selectData = response.data.data.content;
                    me.setState(newState);
                });
        }
    }

    createInputHtml(){
        let cls = this.props.data.noCls ? '' : (this.props.data.cls ? this.props.data.cls : "form-control border-input");
        return (
            this.props.data.cascadeWait ?
                <select className={cls}
                        name={this.props.data.name}
                        ref="input"
                        value={this.state.val}
                        onChange={this.changeVal}>
                    <option>{this.props.data.placeholder}</option>
                    {this.props.cascadeData.map((field,index) => <option value={field[this.props.data.valueLabel]} key={field[this.props.data.keyLabel]}>{field[this.props.data.keyLabel]}</option>)}
                </select>
                :
            (this.props.data.dataUrl ?
                    <select className={cls}
                            name={this.props.data.name}
                            ref="input"
                            value={this.state.val}
                            onChange={this.changeVal}>
                        <option>{this.props.data.placeholder}</option>
                        {this.state.selectData.map((field,index) => <option value={field[this.props.data.valueLabel]} key={field[this.props.data.keyLabel]}>{field[this.props.data.keyLabel]}</option>)}
                    </select>
                    :
                    <select className={cls}
                            name={this.props.data.name}
                            ref="input"
                            value={this.state.val}
                            onChange={this.changeVal}>
                        <option>{this.props.data.placeholder}</option>
                        {this.props.data.selectData.map((field,index) => <option value={field[this.props.data.valueLabel]} key={field[this.props.data.keyLabel]}>{field[this.props.data.keyLabel]}</option>)}
                    </select>
            )
        );
    }
}

export default Select;