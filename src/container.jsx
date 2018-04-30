import React, {Component} from 'react';
import Input from './input.jsx';
import Select from './select.jsx';
import Checkbox from './checkbox.jsx';
import MapInput from './mapInput.jsx';
import Seperator from './seperator.jsx';
import MultiSelect from './multiSelect.jsx';
import FieldSet from './fieldSet.jsx';
import PropTypes from 'prop-types';

class Container extends Component {
    constructor(props){
        super(props);
        if(props.accordion){
            this.state = {
                accordion: !!props.defaultVisibility
            }
        }
        this.onClickAccordion = this.onClickAccordion.bind(this);
        this.els = [];
    }

    onClickAccordion(e){
        var newState = {...this.state};
        newState.accordion = e.currentTarget.value == "2";
        this.setState(newState);
    }

    render() {
        this.els = [];
        var clsName = "col-xs-" + 12/this.props.column;
        var accordionName = new Date().getMilliseconds() + "accordion";
        return (
            <div className="container-wrapper">
                {
                    (!!this.props.title && this.props.accordion) &&
                        <div className="accordion-title">{this.props.title}</div>
                }
                {
                    this.props.accordion && <div className="container-accordion">
                        <input id={"hide"+accordionName} type="radio" name={accordionName} checked={!this.state.accordion}
                               value={"1"} onClick={this.onClickAccordion}/>
                        <label className="accordion-input-label"  htmlFor={"hide"+accordionName}>{this.props.hideText}</label>
                        <input  id={"show"+accordionName}type="radio" name={accordionName}  checked={this.state.accordion}
                               value={"2"} onClick={this.onClickAccordion}/>
                        <label className="accordion-input-label" htmlFor={"show"+accordionName}>{this.props.showText}</label>
                    </div>
                }
                <div className={this.props.cls + ' ' + 'container-column-remove' +
                    (this.props.accordion ? (this.state.accordion? " column-content-show": " column-content-hide"):"" )}>
                    {this.props.fields.map((field, index) => {
                        if(!field){
                            return <div>Field cannot be created</div>
                        }
                        if (field.type) {
                            if(field.type == 'seperator'){
                                return <Seperator key={index}></Seperator>
                            }
                            else if (field.type == 'checkbox'){
                                return <Checkbox ref={(input)=>{this.els.push(input)}}  cls={clsName} type={field.type} key={index} data={field}
                                              onInputChange={this.props.onInputChange}/>
                            }
                            else if (field.type == 'select') {
                                if (field.cascadeWait) {
                                    return <Select ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange}
                                                   cascadeData={this.props.st[field.cascadeWait]}/>
                                }
                                else {
                                    return <Select ref={(input)=>{this.els.push(input)}} cls={clsName}  key={index} data={field} onInputChange={this.props.onInputChange}/>
                                }
                            }
                            else if (field.type == 'container') {
                                return <Container ref={(cont)=>{this.els.push(cont)}}
                                                  cls={clsName}
                                                  key={index}
                                                  fields={field.fields}
                                                  column={field.column}
                                                  onInputChange={this.props.onInputChange}
                                                  st={this.props.st}
                                                  {...field}/>
                            }
                            else if(field.type == 'map'){
                                return <MapInput ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange} />
                            }
                            else if(field.type == 'multiselect'){
                                return <MultiSelect  ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange} />
                            }
                            else if(field.type == 'fieldset'){
                                return <FieldSet  ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange} />
                            }
                            else {
                                return <Input ref={(input)=>{this.els.push(input)}}  cls={clsName} type={field.type} key={index} data={field}
                                              onInputChange={this.props.onInputChange}/>
                            }
                        }
                        else {
                            return <Input ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange}/>
                        }
                        return <Input ref={(input)=>{this.els.push(input)}} cls={clsName} key={index} data={field} onInputChange={this.props.onInputChange}/>
                    })}
                </div>
            </div>
        );
    }
}

Container.propTypes = {
    fields: PropTypes.array.isRequired,
    column: PropTypes.number,
    onInputChange: PropTypes.func.isRequired,
    st: PropTypes.object.isRequired
};

Container.defaultProps = {
    column: 1,
    cls: "col-sm-12"
};

export default Container;