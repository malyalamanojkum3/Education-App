sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";
 
    return Controller.extend("loanapp.controller.LoanStatusPage", {
        onInit: function() {
        },
        onLoanStatusDetailsButton: function(oEvent){
            var oInput = this.byId("Id");
            var sCustomerId = oInput.getValue();
 
            if (sCustomerId) {
                this._isValidCustomerId(sCustomerId).then(function(isValid) {
                    if (isValid) {
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("LoanStatusDetails", {
                            customerId: sCustomerId
                        });
                    } else {
                        MessageToast.show("Please enter a valid Customer ID.");
                    }
                }.bind(this));
            } else {
                MessageToast.show("Please enter a valid Customer ID.");
            }
        },
        _isValidCustomerId: function(sCustomerId) {
            var oModel = this.getView().getModel("mainModel");
            return new Promise(function(resolve, reject) {
                var oBindingContext = oModel.bindContext("/customer('" + sCustomerId + "')");
                oBindingContext.requestObject().then(function(oData) {
                    resolve(!!oData);
                }).catch(function() {
                    resolve(false);
                });
            });
        },
        onLogout: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("dashboard");
            MessageToast.show("Logged out!");
        },
        onHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("dashboard");
            MessageToast.show("Returned Home");
        }
    });
});
 
 