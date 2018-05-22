const {AppController} = require("./appcontroller")

class UIController {

    /**
     * @param {AppController} controller 
     */
    constructor(controller){
        this._viewStack = [];
        this._rootCallback = (() =>{});
    }

    _render(callback){
        const anchor  = document.getElementById("render-anchor");
        
        while(anchor.lastChild){
            anchor.removeChild(anchor.lastChild);
        }
        
        const domElement = callback();
        anchor.appendChild(domElement);
    }

    _renderTop(){
        this._render(this._viewStack[this._viewStack.length-1]);
    }

    show(renderCallback){
        this._viewStack = [];
        this.stackup(renderCallback);
    }

    /**
     * 
     * @param {function} renderCallback 
     * @param {boolean} insertBackBttn 
     */
    stackup(renderCallback, insertBackBttn = false){
        if(!insertBackBttn){
            this._viewStack.push(renderCallback);
        }else{
            const f = () => {
                const wrapper = new DocumentFragment();
                wrapper.appendChild(this.createBackButton());
                wrapper.appendChild(renderCallback());
                return wrapper;
            };
            this._viewStack.push(f);
        }
        this._renderTop();
    }

    stackdown(){
        if(this._viewStack.length === 0){
            this._render(this._rootCallback);
        }else{
            this._viewStack.splice( this._viewStack.length-1,1);
            this._renderTop();
        }
    }

    /**
     * @returns {HTMLButtonElement}
     */
    createBackButton(){
        const bttn = document.createElement("button");
        bttn.textContent = "Back";
        bttn.addEventListener("click",event => {
            this.stackdown();
        });
        return bttn;
    }

    /**
     * 
     * @param {string} templateid 
     * @returns {HTMLElement}
     */
    createTemplate(templateid){
        const element = document.getElementById("template-" + templateid);
        return element.content.cloneNode(true);
        console.log("changed something");
        //return document.importNode(element.content,true);
    }
}

module.exports = {UIController}