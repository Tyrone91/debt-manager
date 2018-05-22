const jasmine = require("jasmine")

describe("Client test", function(){
    
    const {Client} = require("./../js/client.js");
    const {Process} = require("./../js/process");

    it("Client can be created", function(){
        const client = new Client("Firstname", "Lastname");
        expect(client.nickname).toEqual("Firstname.L");
        expect(client.debt).toEqual(0);
        expect(client.due).toEqual(0);
        expect(client.balance).toEqual(0);
    });
    
    it("Client does calculate right", function(){
        const client = new Client("Test", "Toaster");
        const pro1 = new Process(null, null, 0);
        const pro2 = new Process(null, null, 0);
        const pro3 = new Process(null, null, 0);
        pro1._amount = 200;
        pro2._amount = 300;
        pro3._amount = 400;
        
        client.addGivenEntry(pro1);
        client.addReceivedEntry(pro2);
        client.addReceivedEntry(pro3);

        expect(client.due).toEqual(200);
        expect(client.debt).toEqual(300 + 400);
        expect(client.balance).toEqual( 200 - (300 + 400));

    });
});
