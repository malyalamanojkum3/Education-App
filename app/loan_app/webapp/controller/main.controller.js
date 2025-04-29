sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("loanapp.controller.main", {
<<<<<<< HEAD
        onInit: function() {
            // Initialization code can be added here if needed
    
        },
        onLoginPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoanStatusPage");
        },

=======
        onInit() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Dashboard");
        }
>>>>>>> ef39fcf415debaf8e44b2bfc6bc3b7ac7b9830d6
    });
});

