sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
], function(Controller, ODataModel) {
    "use strict";
 
    return Controller.extend("loanapp.controller.LoanStatusDetails", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("LoanStatusDetails").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function(oEvent) {
            var sCustomerId = oEvent.getParameter("arguments").customerId;
            this._loadCustomerDetails(sCustomerId);
        },
        _loadCustomerDetails: function(sCustomerId) {
            var oModel = this.getView().getModel("mainModel");
            var sPath = "/customer('" + sCustomerId + "')";
            this.getView().bindElement({
                path: sPath,
                model: "mainModel",
                parameters: {
                    expand: "LoanDetails"
                }
            });
        },
        onNavBack: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("dashboard");
        },
       
    });
});
 
 