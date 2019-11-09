class CalcController {
    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this._currentDate;
        this.initialize();
        this.initKeyboard()
        this.initButtonsEvents();
       
    }

pasteFromClipBoard(){
    document.addEventListener('paste', e=>{
      let text = e.clipboardData.getData('Text')
      this.displayCalc= parseFloat(text)
      //console.log(text)
    })
}

copyToclipboard(){
    let input = document.createElement('input');
    input.value = this.displayCalc;
    document.body.appendChild(input)
    input.select()
    document.execCommand("copy")
    input.remove()
}    

initialize(){
    this.setLastNumberToDisplay();
    this.pasteFromClipBoard()

    //this._displayCalcEl.innerHTML = "007";
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
    this._lastNumber ='';
    this._lastOperation ='';
    this.setLastNumberToDisplay();

}
clearEntry(){
    this._operation.pop();
    this.setLastNumberToDisplay();

}
getLastOperation(){
    return this._operation[this._operation.length - 1];
} 
isOperator(value){
    return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
}
setLastOperation(value){
    this._operation[this._operation.length - 1] = value; 
}

pushOperation(value){
    this._operation.push(value)

    if(this._operation.length > 3){
        this.calc();
        //console.log(this._operation)
    }
}

getResult(){
    //console.log('getResult', this._operation)
    return eval(this._operation.join(""));
}
calc(){

    let last = '';

    this._lastOperator = this.getLastItem()

    if(this._operation.length < 3){
        let firstItem = this._operation[0]
        this._operation = [firstItem, this._lastOperator, this._lastNumber]
    }

    if(this._operation.length > 3){
        last = this._operation.pop();
        this._lastNumber = this.getResult()
    }else if(this._operation.length == 3){
        this._lastNumber = this.getLastItem(false)
    }

    //console.log('_lastOperator', this._lastOperator);
    //console.log('_lastNumber', this._lastNumber);

    let result = this.getResult()

    if(last == '%'){
        result /= 100;
        this._operation= [result];

    }else{
        this._operation= [result];
        if (last) this._operation.push(last);
    }
    this.setLastNumberToDisplay();
}

getLastItem(isOperator=true){

    let lastItem;

    for(let i = this._operation.length -1; i>=0; i--){
        
        if(this.isOperator(this._operation[i]) ==isOperator){
            lastItem = this._operation[i];
            break;
           }
    }
    if(!lastItem){
        lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
    }
    return lastItem;
}

setLastNumberToDisplay(){
    let lastNumber = this.getLastItem(false);
    for(let i = this._operation.length -1; i>=0; i--){
    if(!this.isOperator(this._operation[i])){
        lastNumber = this._operation[i];
        break;
       }
    } 
    if(!lastNumber) lastNumber= 0;
    this.displayCalc = lastNumber
}

addOperation(value){

    //console.log('A', value, isNaN(this.getLastOperation()))
    if(isNaN(this.getLastOperation())){
        if(this.isOperator(value)){
            this.setLastOperation(value)
        }else{
            this.pushOperation(value)
            
        }
    }else{
            if(this.isOperator(value)){
                this.pushOperation(value)
                    
            } else{

                if(this.isOperator(value)){
                    this._operation.push(value)
                }else{
                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(parseFloat(newValue));
                    //atualizar display
                    this.setLastNumberToDisplay();
                }

               
            }
           // console.log(this._operation)              
    }       
                   
}
setError(){
    this.displayCalc = "ERROR";
}

addDot(){
    let lastOperation = this.getLastOperation()
    if(this.isOperator(lastOperation) || !lastOperation){
        this.pushOperation('0.')
    }else{
        this.setLastOperation(lastOperation.toString() + '.')
    }
    this.setLastNumberToDisplay();
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
            this.calc();
            break;
        case 'ponto':
            this.addDot();            
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

initKeyboard(){
    document.addEventListener('keyup', (e) =>{
      console.log(e.key)
      switch (e.key){
        case 'Escape':
            this.clearAll();
            break;
        case 'Backspace':
            this.clearEntry();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            this.addOperation(e.key);
            break;
        case 'Enter':
        case '=':
            this.calc();
            break;
        case '.':
        case ',':
            this.addDot();            
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
            this.addOperation(parseInt(e.key));
            break;

        case 'c':
            if(e.ctrlkey)
            break;
    }
    })
}

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
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }

}