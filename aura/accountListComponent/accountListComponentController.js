({
	loadAccounts : function(component, event, helper) {
        var action = component.get("c.getAccountList");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());
            } else if (state === "INCOMPLETE") {
                $A.log("Action INCOMPLETE");
            } else if (state === "ERROR") {
                $A.log(response.getError());
            }
        });
        $A.enqueueAction(action);
	}
})