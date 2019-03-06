/* it is a very simple test suite */
describe("Lightning Component Testing Examples", function () {
    afterEach( ()=> {
        $T.clearRenderedTestComponents();
    });
    
    describe("A suite that tests the obvious", () => {
        it("spec that verifies that true is true", ()=> {
            expect(true).toBe(true);
        });
    });
});

/* Simple Test Suite for Hello World! */
describe('c:MyLightningComponent', ()=> {
    it('verify component rendering',  (done) => {
        $T.createComponent('c:MyLightningComponent', {}, true)
            .then((cmp) => {
                expect(cmp.find("message").getElement().innerHTML).toBe('Hello World!');
                done();
            }).catch( (e) =>{
                done.fail(e);
            });
    });
});

/* Check the data Binding */
describe('c:componentWithDataBinding', () => {
    it('verify data binding',  (done) => {
       $T.createComponent('c:componentWithDataBinding', {message: 'Hello World!'}, true)
          .then( (component) => {
             expect(component.find("message").getElement().innerHTML).toBe('Hello World!');
             expect(component.find("messageInput").get("v.value")).toBe('Hello World!');
             done();
       }).catch( (e) => {
             done.fail(e);
       });
    });
 });

 /* Check the Method click in Lightning Component */
 describe("c:componentWithMethod", ()=> {
    it('verify method invocation', (done)=> {
        $T.createComponent("c:componentWithMethod", {}, false)
            .then(function (component) {
                expect(component.get("v.counter")).toBe(0);
                component.increment();
                expect(component.get("v.counter")).toBe(1);
                done();
            }).catch(function (e) {
                done.fail(e);
            });
    });
});

/* Test the Application Event */
describe('c:componentListeningToAppEvent',  ()=> {
    it('verify application event',  (done) => {
        $T.createComponent("c:componentListeningToAppEvent",{},false)
            .then(function (component) {
                $T.fireApplicationEvent("c:myAppEvent", {"message": "event fired"});
                expect(component.get("v.message")).toBe("event fired");
                done();
            }).catch(function (e) {
                done.fail(e);
            });
    });
});

/* Test the Server Call from Component */
describe('c:accountListComponent',  ()=> {
    it('verify mocked server method invocation', function (done) {
        $T.createComponent("c:accountListComponent", {}, false)
            .then(function (component) {
                var mockResponse = { 
                    getState: function () { 
                        return "SUCCESS";
                    }, 
                    getReturnValue: function () { 
                        return [{"Name": "Account 1"}, {"Name": "Account 2"}]; 
                    } 
                };
                spyOn($A, "enqueueAction").and.callFake( (action) => {
                    var cb = action.getCallback("SUCCESS");
                    cb.fn.apply(cb.s, [mockResponse]);
                });
                component.loadAccounts();
                expect(component.get("v.accounts").length).toBe(2);
                expect(component.get("v.accounts")[0]['Name']).toContain("Account 1");
                done();
            }).catch( (e)=> {
                done.fail(e);
            });
    });
});