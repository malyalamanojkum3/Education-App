sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("loanapp.controller.AdminAppliedLoans", {
        onInit: function () {
            // Initialize the OData model
            var oModel = new ODataModel({
                serviceUrl: "/odata/v4/my/"
            });
            this.getView().setModel(oModel, "mainModel");
        },

        onAppliedLoansPress: function (oEvent) {
            var oTitle = oEvent.getSource();
            var oScrollContainer = this.byId("scrollContainer");

            if (oTitle.hasStyleClass("enlargedTitle")) {
                oTitle.removeStyleClass("enlargedTitle");
                oScrollContainer.setVisible(false);
            } else {
                oTitle.addStyleClass("enlargedTitle");
                oScrollContainer.setVisible(true);

                // Fetch and display loan details
                var oModel = this.getView().getModel("mainModel");
                var sPath = "/customerSet"; // Adjust the path as needed
                oModel.read(sPath, {
                    success: function (oData) {
                        console.log("Loan details fetched successfully", oData);
                        var oList = this.byId("loanList");
                        oList.setModel(new sap.ui.model.json.JSONModel(oData), "loanDetails");
                    }.bind(this),
                    error: function (oError) {
                        console.error("Error fetching loan details", oError);
                    }
                });
            }
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
            var sPath = oEvent.getSource().getBindingContext("mainModel").getPath();
            sap.m.MessageToast.show("Loan Approved!");
            this.getView().getModel("mainModel").setProperty(sPath + "/status", "Approved");
        },

        onRejectLoan: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("mainModel").getPath();
            sap.m.MessageToast.show("Loan Rejected!");
            this.getView().getModel("mainModel").setProperty(sPath + "/status", "Rejected");
        }
    });
});
