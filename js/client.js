const {Process} = require("./process")

class Client {

    /**
     * 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} nickname
     */
    constructor(firstname , lastname, nickname = firstname + "." +lastname.charAt(0) ){
        this._firstname = firstname;
        this._lastname = lastname;
        this._nickname = nickname;

        /**@type {[Process]} */
        this._receivedList = [];

        /**@type {[Process]} */
        this._givenList = [];
    }

    /**
     * @returns {[Process]}
     */
    getReceivedList(){
        return this._receivedList;
    }

    /**
     * @returns {[Process]}
     */
    getGivenList(){
        return this._givenList;
    }

    /**
     * @returns {number}
     */
    get debt(){
        return this._receivedList.reduce( (total, current) => total + current.due, 0 );
    }

    /**
     * @returns {number}
     */
    get due(){  
        return this._givenList.reduce( (total, current) => total + current.due, 0 );
    }

    /**
     * @returns {number}
     */
    get balance(){
        return this.due - this.debt;
    }

    get nickname(){
        return this._nickname;
    }

    get firstname(){
        return this._firstname;
    }

    get lastname(){
        return this._lastname;
    }

    /**
     * @param {Process} process 
     */
    addGivenEntry(process){
        this._givenList.push(process);
    }

    /**
     * @param {Process} process 
     */
    addReceivedEntry(process){
        this._receivedList.push(process);
    }
}

module.exports = {Client};