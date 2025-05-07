sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast"
], function(Controller, ODataModel, MessageToast) {
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
            var oMainModel = this.getView().getModel("mainModel");
            var sPath = "/customer('" + sCustomerId + "')";
            
            this.getView().bindElement({
                path: sPath,
                model: "mainModel",
                parameters: {
                    expand: "LoanDetails"
                },
                events: {
                    dataReceived: this._onDataReceived.bind(this)
                }
            });
        },
        
        _onDataReceived: function() {
            var oContext = this.getView().getBindingContext("mainModel");
            if (!oContext) {
                return;
            }
            var oData = oContext.getObject();
            var sLoanStatus = oData.loanStatus; // Expecting "Submitted", "Pending", "Approved", "Rejected"
            
            // Map loan status to an index:
            // 0: Submitted, 1: Pending, 2: Approved, 3: Rejected
            var activeStep = 0;
            switch (sLoanStatus) {
                case "Submitted":
                    activeStep = 0;
                    break;
                case "Pending":
                    activeStep = 1;
                    break;
                case "Approved":
                    activeStep = 2;
                    break;
                case "Rejected":
                    activeStep = 3;
                    break;
                default:
                    activeStep = 0;
            }
            
            // Define the active colors according to semantic state.
            // Colors: Blue for Submitted, Orange for Pending, Green for Approved, Red for Rejected.
            var stepColors = ["#007aff", "#ff9500", "#4cd964", "#ff3b30"];
            var defaultColor = "#d3d3d3"; // Grey for inactive segments.
            
            var steps = ["Submitted", "Pending", "Approved", "Rejected"];
            
            // Build the HTML snippet for the status bar.
            var htmlContent = '<div style="display: flex; justify-content: center; align-items: stretch; width: 100%; max-width:600px;">';
            steps.forEach(function(step, index) {
                // Use the designated color if this is the active step; otherwise use default grey.
                var bgColor = (index === activeStep) ? stepColors[index] : defaultColor;
                htmlContent += '<div style="flex:1; margin: 5px; padding: 10px; text-align: center; border-radius: 5px; background-color:' + bgColor + '; color: white; font-weight: bold;">' + step + '</div>';
            });
            htmlContent += '</div>';
            
            // Set the generated HTML content to the HTML control.
            this.getView().byId("statusBarHTML").setContent(htmlContent);
        },
        
        onNavBack: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoanStatusPage");
            MessageToast.show("Back to status");
        },
        onHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("dashboard");
            MessageToast.show("Returned Home");
        }
    });
});
