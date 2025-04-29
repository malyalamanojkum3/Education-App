sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("loanapp.controller.LoanStatusPage", {
        onInit: function() {
        },
        onLoanStatusDetailsButton: function(oEvent){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoanStatusDetails");
                error:(oError)=>{
                    console.log("Failed", oError);
                }
        }
        
    });
});