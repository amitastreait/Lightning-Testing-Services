({
    increment : function(component, event, helper) {
        var value = component.get("v.counter");
        value = value + 1;
        component.set("v.counter", value);
    }
})