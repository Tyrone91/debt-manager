const $ = require("jquery");
const {AppController} = require("./appcontroller");
const {UiController} = require("./uicontroller");
const {Process} = require("./process.js");
const {Client} = require("./client");




/**
 * 
 * @param {AppController} controller 
 */
function htmlBuildClientList(controller){
    
    const container = controller.ui.createTemplate("client-container");
    //$("#render-anchor").append(container);
    controller.getClients().forEach( client => {
        const element = controller.ui.createTemplate("client-list-element");
        $(element).find(".displayed-client-name").text(client._nickname);
        $(element).find(".client-due").text(`Due: ${client.due} ${controller.currency}`);
        $(element).find(".client-debt").text(`Debt: ${client.debt} ${controller.currency}`);
        $(element).find(".bttn-client-list-show").on("click", event => {
            controller.ui.stackup( () => htmlBuildClientView(controller, client ), true );
        });
        $(container).find(".client-list").append(element);
    });
    return container;
}

/**
 * 
 * @param {AppController} controller 
 * @param {[Process]} list 
 */
function htmlBuildProcessList(controller, list){
    const container = controller.ui.createTemplate("process-container");
    for(const process of list){
        const element = controller.ui.createTemplate("process-list-element");
        $(element).find(".process-giver").text(process.giver.nickname);
        $(element).find(".process-receiver").text(process.receiver.nickname);
        $(element).find(".process-amount").text(`${process.amount} ${controller.currency}`);
        $(container).find(".process-list").append(element);
    }
    return container;
}

/**
 * 
 * @param {AppController} controller 
 * @param {Client} client 
 */
function htmlBuildClientView(controller, client){
    const container = controller.ui.createTemplate("client-view");
    $(container).find(".client-due-list").append( htmlBuildProcessList(controller, client.getGivenList() ));
    $(container).find(".client-debt-list").append(htmlBuildProcessList(controller, client.getReceivedList() ));
    return container;
}


/**
 * @param {AppController} controller 
 */
function initevents(controller){
    $("#bttn-menu-home").on("click", event => {

    });

    $("#bttn-menu-overview").on("click", event => {
        controller.ui.stackup( () => htmlBuildClientList(controller));
    });

    $("#bttn-menu-new").on("click", event => {

    });
}

/**
 * 
 * @param {AppController} controller 
 */
function devClients(controller){
    const debugClient1 = new Client("Eric", "Papendick");
    const debugClient2 = new Client("Dev", "Braveheart");

    Process.create(debugClient1, debugClient2, 500);
    Process.create(debugClient1, debugClient2, 70);
    Process.create(debugClient2, debugClient1, 34);

    controller.addClient(debugClient1, debugClient2);
}

$(document).ready( event  => {
    const controller = new AppController();
    devClients(controller);
    initevents(controller);
});
