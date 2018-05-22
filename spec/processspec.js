describe("Process Test", function(){

    const {Process} = require("./../js/process");

    it("Process can be created", function(){
        const process = new Process();

        expect(process.due).toEqual(0);
        expect(process.amount).toEqual(0);
        expect(process.paid).toEqual(0);
    });

    it("Process can calculate right", function(){
        const process = new Process(null, null, 400);
        
        expect(process.due).toEqual(400);
        expect(process.amount).toEqual(400);
        expect(process.paid).toEqual(0);

        process.pay(250);

        expect(process.due).toEqual(400 - 250);
        expect(process.amount).toEqual(400);
        expect(process.paid).toEqual(250);

    });
});