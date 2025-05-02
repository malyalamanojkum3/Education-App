sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("loanapp.controller.LoanStatusDetails", {
        onInit: function() {
            // Initialization code can be added here if needed
        },
        onBackButtonPress: function() {
            // Navigate back to the previous page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteLoanStatusPage");
        },
        // Additional methods can be added here
        
    });
});
