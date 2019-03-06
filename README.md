# Lightning-Testing-Services
<!-- wp:paragraph -->
<p> With the Time the complexity of your Lightning Components grows, so does the risk of defects when you write them, and of breaking changes when you refactor them. So to make sure that your lightning component is working properly like apex you can Automate the testing of your lightning component which allows you to mitigate those risks and verify that your components work as designed when you first write them and continue to work as expected when you make changes or when their dependencies (the framework, another component, or a JavaScript library they depend on) are updated. </p>
<!-- /wp:paragraph -->

![Content](https://github.com/amitastreait/Lightning-Testing-Services/blob/master/Lightning%20Testing%20Services.PNG)

<!-- wp:paragraph -->
<p><strong>Prequisite:-</strong> LTS needs Salesforce DX for installing the Lightning Testing Services Package.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Lightning Testing Services(LTS)</strong> uses <strong>Jasmine</strong> a JavaScript Testing Framework to test the Lightning Component. Below are the Key Concept of Jasmine </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>A test suite is a plain JavaScript file wherein related tests (specs) are organized within <strong>describe()</strong> functions.</li><li>A <strong>spec</strong> (or test) consists of one or more <strong>expectations</strong> invoked within <strong>it()</strong> function.</li><li>An <strong>expectation</strong> is an assertion that evaluates to either true or false.</li><li>A spec is <strong>passing</strong> when all its expectations evaluate to true. A spec is <strong>failing</strong> when at least one of its expectations evaluates to false. </li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Step 1 :-</strong> Install the Testing Framework using below commands</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center"} -->
<p style="text-align:center"><strong>sfdx force:lightning:test:install</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Step 2: -</strong> Create a Folder(<strong>staticresources</strong>) and then Add a JavaScript Static Resource inside that folder.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Create a Folder Name "<strong><g class="gr_ gr_10 gr-alert gr_spell gr_inline_cards gr_disable_anim_appear ContextualSpelling ins-del multiReplace" id="10" data-gr-id="10">staticresources</g></strong>" inside <strong>force-app/main/default/</strong></li><li>Create a <strong>.js</strong> file inside the Folder and name it What Ever you want for me I have named it as "<strong>myTestSuite</strong>". and below is the Complete Code for .js File</li><li></li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>/* it is a very simple test suite */
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
});</code></pre>
<!-- /wp:code -->

<!-- wp:list -->
<ul><li>Create "<strong>YourResource.resource-meta.xml</strong>" here replace  <br><strong>YourResource</strong> with the name of your static resource. As My resource is <strong>myTestSuite </strong>then complete file is <strong>myTestSuite.resource-meta.xml.﻿</strong></li></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><li>Find the code for <strong><g class="gr_ gr_116 gr-alert gr_gramm gr_hide gr_inline_cards gr_run_anim Grammar only-ins multiReplace replaceWithoutSep replaceWithoutSep" id="116" data-gr-id="116">myTestSuite.resource-meta.xml</g></strong> file just after the .js FILE </li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    &lt;cacheControl>Private&lt;/cacheControl>
    &lt;contentType>application/javascript&lt;/contentType>
&lt;/StaticResource></code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Step 3 :-</strong> Start testing the Lightning Components using Jasmine.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Here is the basic example of how we can use LTS. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>/* Simple Test Suite for Hello World! */
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
});</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Explanation: - </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li><strong>describe:</strong>- A JavaScript function where we can put all test and other desc as well.</li><li><strong>it:- </strong>consists of one or more expectations invoked within <strong>it()</strong> function.</li><li><strong>$T.createComponent(component, {objectAttribute}, true)</strong> :- createComponent takes 3 Parameters<ul><li><strong>Component:-</strong> the name of the Component including nameSpace. For Example, c:HelloWorld</li><li><strong>Object Attributes:-</strong> Attributes that we wanted to send to Component</li><li><strong>rendered:-</strong> True if we wanted to display the output in Application and false if not.</li></ul></li></ul>
<!-- /wp:list -->

![Content](https://github.com/amitastreait/Lightning-Testing-Services/blob/master/LTS%20OutPut.png)

<!-- wp:paragraph -->
<p>You can get the complete code of the Project that I have Used in my GitHub Repo</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://github.com/amitastreait/Lightning-Testing-Services" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">https://github.com/amitastreait/Lightning-Testing-Services</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>References:- </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://developer.salesforce.com/blogs/2018/04/getting-started-with-the-lightning-testing-service.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">https://developer.salesforce.com/blogs/2018/04/getting-started-with-the-lightning-testing-service.html</a></p>
<!-- /wp:paragraph -->

