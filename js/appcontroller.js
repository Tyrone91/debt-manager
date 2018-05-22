const {UIController}  = require("./uicontroller.js")
const {Client}  = require("./client.js")

class AppController{
    constructor(){

        /**@type {[Client]} */
        this._clientList = [];
        this._uiController = new UIController(this);
    }

    getClients(){
        return this._clientList;
    }

    /**
     * 
     * @param {...Client} client 
     */
    addClient(...client){
        this._clientList.push(...client);
    }

    /**
     * @returns {UIController}
     */
    get ui(){
        return this._uiController;
    }

    get currency(){
        return "€";
    }
}

module.exports = {AppController}