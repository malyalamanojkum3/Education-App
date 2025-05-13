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

        onApproveLoan: function () {
            var oDialog = this.byId("customerDetailsDialog");
            var oContext = oDialog.getBindingContext("mainModel");
            var oModel = this.getView().getModel("mainModel");
            var oData = oContext.getObject();
        
            oData.loanStatus = "Approved";
        
            jQuery.ajax({
                url: "/odata/v4/my/customer('" + oData.Id + "')",
                method: "PATCH",
                data: JSON.stringify(oData),
                contentType: "application/json",
                success: () => {
                    oModel.refresh();
                    MessageToast.show("Loan Approved");
                    oDialog.close();
                },
                error: () => {
                    MessageToast.show("Error Approving Loan");
                }
            });
        },        

        onRejectLoan: function () {
            var oDialog = this.byId("customerDetailsDialog");
            var oContext = oDialog.getBindingContext("mainModel");
            var oModel = this.getView().getModel("mainModel");
            var oData = oContext.getObject();
        
            oData.loanStatus = "Rejected";
        
            jQuery.ajax({
                url: "/odata/v4/my/customer('" + oData.Id + "')",
                method: "PATCH",
                data: JSON.stringify(oData),
                contentType: "application/json",
                success: () => {
                    oModel.refresh();
                    MessageToast.show("Loan Rejected");
                    oDialog.close();
                },
                error: () => {
                    MessageToast.show("Error Rejecting Loan");
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
       
        onStatusChange: function () {
            var sSelectedKey = this.byId("statusComboBox").getSelectedKey();
            var oTable = this.byId("loanList");
            var oBinding = oTable.getBinding("items");
        
            var aFilters = [];
            if (sSelectedKey && sSelectedKey !== "All") {
                aFilters.push(new Filter("loanStatus", FilterOperator.EQ, sSelectedKey));
            }
        
            oBinding.filter(aFilters);
        
            // Update column visibility and no data text
            var oStatusColumn = this.byId("statusColumn");
            if (oStatusColumn) {
                oStatusColumn.setVisible(sSelectedKey === "All");
            }
        
            oTable.setNoDataText(sSelectedKey === "Pending" ? "Empty Right Now" : "No Data Available");
        },                
                   
isPending: function (status) {
         return status === "Pending";
    }                       
    });
})