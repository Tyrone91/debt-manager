const {Client} = require("./client")

class Process {

    /**
     * 
     * @param {Client} giver 
     * @param {Client} receiver 
     * @param {number} amount 
     */
    constructor(giver, receiver, amount = 0, alreadyPaid = 0){
        this._receiver = receiver;
        this._giver = giver;
        this._amount = amount;
        this._paid = alreadyPaid;
    }

    /**
     * @returns {number}
     */
    get amount(){
        return this._amount;
    }

    /**
     * @returns {Client}
     */
    get receiver(){
        return this._receiver;
    }

    /**
     * @returns {Client}
     */
    get giver(){
        return this._giver;
    }

    /**
     * @returns {number}
     */
    get paid(){
        return this._paid;
    }

    /**
     * 
     * @param {number} amount 
     */
    pay(amount){
        this._paid += amount;
    }

    /**
     * @returns {number}
     */
    get due(){
        return this._amount - this._paid;
    }
}

/**
 * 
 * @param {Client} giver 
 * @param {Client} receiver 
 * @param {number=} amount 
 * @param {number=} paid 
 */
Process.create = function(giver, receiver, amount = 0, paid = 0){
    const p = new Process(giver, receiver, amount, paid);
    giver.addGivenEntry(p);
    receiver.addReceivedEntry(p);
    return p;
}
module.exports = {Process} 