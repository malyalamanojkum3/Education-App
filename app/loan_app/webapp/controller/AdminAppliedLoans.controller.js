sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v4/ODataModel",
    
], function (Controller, MessageToast, Filter,FilterOperator,ODataModel) {
    "use strict";

    return Controller.extend("loanapp.controller.AdminAppliedLoans", {
        onInit: function () {
            // Apply the filter when the view is initialized
            this._applyPendingLoansFilter();
        },
        
        _applyPendingLoansFilter: function () {
            // Get the table control
            // Create a filter for loanStatus = "Pending"
            var oFilter = new sap.ui.model.Filter("loanStatus", sap.ui.model.FilterOperator.EQ, "Pending");
        
            var oTable = this.byId("loanList");
            var oBinding = oTable.getBinding("items");
            console.log("oBinding",oBinding);
        
            // Apply the filter
           // oBinding.filter([oFilter]);
        },

        onViewDetails: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext("mainModel");
            var oDialog = this.byId("customerDetailsDialog");
            oDialog.setBindingContext(oItem,"mainModel");
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
                url: "/odata/v4/my/customer('" + oData.Id + "')",
                method: "PATCH",
                data: JSON.stringify(oData), // Send the entire object
                contentType: "application/json",
                success: function (response) {
                    // oModel.setProperty(sPath, oData); // Update the model with the entire object
                    // oModel.refresh(true);
                    oModel.refresh();
                    MessageToast.show("Loan Approved");
                },
                error: function (error) {
                    MessageToast.show("Error Approving loan");
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
                url: "/odata/v4/my/customer('" + oData.Id + "')",
                method: "PATCH",
                data: JSON.stringify(oData), // Send the entire object
                contentType: "application/json",
                success: function (response) {
                    // oModel.setProperty(sPath, oData); // Update the model with the entire object
                    // oModel.refresh(true);
                    oModel.refresh();
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
            new Filter("applicantEmail", FilterOperator.Contains, sQurey),
            new Filter("applicantPHno", FilterOperator.Contains, sQurey),
            new Filter("applicantAadhar", FilterOperator.Contains, sQurey),
            //new Filter("Id", FilterOperator.Contains, sQurey)

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
            
        },      
       
             onStatusChange: function (oEvent) {
                 var oComboBox = this.byId("statusComboBox");
                 var sSelectedKey = oComboBox.getSelectedKey();
                 var oTable = this.byId("loanList");
                 var oBinding = oTable.getBinding("items");
                 var aFilters = [];
            
             if (sSelectedKey !== "All") {
             aFilters.push(new Filter("loanStatus", FilterOperator.EQ, sSelectedKey));
             }
            
             oBinding.filter(aFilters);
             }  ,
             
isPending: function (status) {
         return status === "Pending";
    }
                        
    });
})