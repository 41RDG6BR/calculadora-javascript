class CalcController {
    constructor(){
        this._operation = [];
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

initialize(){
    
    this._displayCalcEl.innerHTML = "007";
    //dateEl.innerHTML = "01/09/1987";
    //timeEl.innerHTML = "00:07";
}
/*
addEventListenerAll(element, events, fn){
    events.split(' ').forEach(event =>{
    element.addEventListener(event, fn, false)           
    })
}
*/

clearAll(){
    this._operation = [];
}
clearEntry(){
    this._operation.pop();
}
getLastOperation(value){
    return this._operation[this._operation.length - 1];
} 
isOperator(value){
    if(['+', '-', '*', '%', '/'].indexOf(value) > -1);
}
setLastOperation(value){
    this._operation[this._operation.length - 1] = value; 
}
addOperation(value){

    if(isNaN(this.getLastOperation())){
        if(this.isOperator(value)){
            this.setLastOperation(value);
        }else if(isNaN(value)){
            console.log(value);
        }else{
            this._operation.push(value);
        }
    }else{

        if(this.isOperator(value)){
            this._operation.push(value);
        }else{
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));        
            console.log(newValue)
        }

       
    }

            
}
setError(){
    this.displayCalc = "ERROR";
}
execBtn(value){
    switch (value){
        case 'ac':
            this.clearAll();
            break;
        case 'ce':
            this.clearEntry();
            break;
        case 'soma':
            this.addOperation('+');
            break;
        case 'subtracao':
            this.addOperation('-');
            break;
        case 'divisao':
            this.addOperation('/');
            break;
        case 'multiplicacao':
            this.addOperation('*');
            break;
        case 'porcento':
            this.addOperation('%');
            break;
        case 'igual':
            this.addOperation('=');
            break;
        case 'ponto':
            this.addOperation('.');            
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            this.addOperation(parseInt(value));
            break;
        default:
            this.setError();
            break;
    }
};
initButtonsEvents(){
    let buttons = document.querySelectorAll("#buttons > g, #parts > g")

    buttons.forEach((btn, index)=>{
    btn.addEventListener('click', e=>{        
        let textBtn =btn.className.baseVal.replace("btn-", "");
        this.execBtn(textBtn)
        })
    })

}
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(valor){
        this._currentDate = valor;
    }

}