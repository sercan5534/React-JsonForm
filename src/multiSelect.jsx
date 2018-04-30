import React from 'react';
import Input from './input.jsx';

class MultiSelect extends Input {
    constructor(props){
        super(props);
        this.state = {
            isValid: true,
            val: props.data.val ? props.data.val : []
        };
        this.changeVal = this.changeVal.bind(this);
    }

    changeVal(e){
        var newState = {...this.state};
        if(e.target.checked){
            newState.val.push(e.target.value);
        }
        else{
            newState.val = newState.val.filter(i => i != e.target.value);
        }
        this.setState(newState);
        this.props.onInputChange({ target:{ value: newState.val, name: this.props.data.name}});
    }

    createInputHtml(){
        var colWidth = this.props.data.colWidth || 4;
        const customId = this.props.data.name + new Date().getMilliseconds();
        return (
            <div className="">
                {
                    this.props.data && this.props.data.items && this.props.data.items.map((item,index)=> {
                        return <div className={"col-xs-" + colWidth} key={"index_" + item.id}>
                            <input type="checkbox"
                                   ref="input"
                                   name={this.props.data.name}
                                   value={item.id}
                                   className={this.props.data.noCls ? '' : (this.props.data.cls ? this.props.data.cls + " form-control border-input checkbox-input" : " checkbox-input form-control border-input")}
                                   id={customId + "-" + index}
                                //value={this.state.val}
                                   onChange={this.changeVal}
                                //defaultChecked={this.props.data.checked}

                            /><label className="checkbox-input-label"
                                     htmlFor={customId + "-" + index}>{item.name}</label>
                        </div>
                    })
                }
            </div>
        );
    }

}

export default MultiSelect;