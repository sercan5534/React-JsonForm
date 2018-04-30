class BasicRule {
    constructor(){
        this.rule = /\S+/;
    }

    check(val){
        return this.rule.test(val);
    }
}

export default BasicRule;