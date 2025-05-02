sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("loanapp.controller.AdminAppliedLoans", {
        onInit: function () {
            // Initialize the OData model
            var oModel = new ODataModel({
                serviceUrl: "/odata/v4/my/"
            });
            this.getView().setModel(oModel, "mainModel");
        },

        onViewDetails: function (oEvent) {
             // Get the selected item context
             var oItem = oEvent.getSource().getParent().getParent();
             var oContext = oItem.getBindingContext("mainModel");
            
            // Get the data from the context
            var oData = oContext.getObject();
            
             var oDialog = this.byId("customerDetailsDialog");
             oDialog.setBindingContext(oContext, "mainModel");

            oDialog.open();
         },
                    
        
onCloseDialog: function () {
     this.byId("customerDetailsDialog").close();
        }, 
    
        onApproveLoan: function (oEvent) {
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext("mainModel");
            var oModel = this.getView().getModel("mainModel");
            var sPath = oContext.getPath();
            var oData = oContext.getObject();
        
            // Update the loanStatus in the local object
            oData.loanStatus = "Approved";
        
            jQuery.ajax({
                url: "/odata/v4/my/customerSet('" + oData.Id + "')",
                method: "PUT",
                data: JSON.stringify(oData), // Send the entire object
                contentType: "application/json",
                success: function (response) {
                    oModel.setProperty(sPath, oData); // Update the model with the entire object
                    oModel.refresh(true);
                    MessageToast.show("Loan Approved");
                },
                error: function (error) {
                    MessageToast.show("Error approving loan");
                }
            });
        },
        
        onRejectLoan: function (oEvent) {
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext("mainModel");
            var oModel = this.getView().getModel("mainModel");
            var sPath = oContext.getPath();
            var oData = oContext.getObject();
        
            // Update the loanStatus in the local object
            oData.loanStatus = "Rejected";
        
            jQuery.ajax({
                url: "/odata/v4/my/customerSet('" + oData.Id + "')",
                method: "PUT",
                data: JSON.stringify(oData), // Send the entire object
                contentType: "application/json",
                success: function (response) {
                    oModel.setProperty(sPath, oData); // Update the model with the entire object
                    oModel.refresh(true);
                    MessageToast.show("Loan Rejected");
                },
                error: function (error) {
                    MessageToast.show("Error rejecting loan");
                }
            });
        }
        
    });
})