sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v4/ODataModel",
    
], function (Controller, MessageToast, Filter,FilterOperator,ODataModel) {
    "use strict";

    return Controller.extend("loanapp.controller.AdminAppliedLoans", {
        //  onInit: function () {
        //      // // Initialize the OData model
        //      var oModel = new ODataModel({
        //           serviceUrl: "/odata/v4/my/"
        //       });
        //       this.getView().setModel(oModel);
        //  },

        onViewDetails: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext();
            var oDialog = this.byId("customerDetailsDialog");
            oDialog.setBindingContext(oItem);
            oDialog.open();
        },


        onCloseDialog: function () {
            this.byId("customerDetailsDialog").close();
        },

        onApproveLoan: function (oEvent) {
            var oModel = this.getView().getModel();
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var oData = oContext.getObject();
            var sPath = oContext.getPath();
            
            var oUpdatedData = {
                loanStatus: "Approved"
            };
            oModel.update(sPath,oUpdatedData,{
                success: function(){
                    MessageToast.show("Loan Approved");
                },
                error: function(){
                    MessageToast.show("Error Approving Loan")
                }
            })
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

        },
       
        onSearch: function (oEvent) 
        {
          //var sQurey = oEvent.getParameter("query");
          var sQurey = oEvent.getSource().getValue();
          var filterConditions = [
            new Filter("applicantName", FilterOperator.Contains, sQurey),
            new Filter("applicantAddress", FilterOperator.Contains, sQurey),

        ];
        var combinedFilters=new Filter({
            filters: filterConditions,
            and: false
        })
          var oTable = this.byId("loanList");
          var oBinding = oTable.getBinding("items");
          oBinding.filter(combinedFilters);
        },
      
        onReset: function(){
        var oTable = this.byId("loanList");
          var oBinding = oTable.getBinding("items");
          oBinding.filter([]);
          this.getView().byId("querySearch").setValue("");
            
        }


    });
})