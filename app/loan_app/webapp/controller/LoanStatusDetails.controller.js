sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("loanapp.controller.LoanStatusDetails", {
        onInit: function () {
            this._fetchLoanDetails();
        },
        onBackButtonPress: function() {
            // Navigate back to the previous page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoanStatusPage");
        },

        _fetchLoanDetails: function () {
            // Mock backend API response
            var mockBackendData = {
                ApplicantName:"Ram",
                Email        :"ram@example.com",
                Phone        :"9876543210",
                Street       :"MG Road",
                HouseNumber  :"123",
                AadharNumber :"1234-5678-9101",
                LoanStatus   :"Submitted",
                DOB          :"1990-05-01",
                LoanID       :"LN12345",
                LoanAmount   :"500,000",
                PANNumber    :"ABCDE1234F"
            };

            var oModel = new JSONModel(mockBackendData);
            this.getView().setModel(oModel, "loanModel");

            // Map LoanStatus to ProgressIndicator values
            var statusMapping = {
                "Submitted": { percent: 50, text: "Submitted", state: "Information" },
                "Pending": { percent: 50, text: "Pending", state: "Warning" },
                "Reviewed": { percent: 75, text: "Reviewed", state: "Success" },
                "Approved": { percent: 100, text: "Approved", state: "Success" },
                "Rejected": { percent: 100, text: "Rejected", state: "Error" }
            };

            var loanStatus = mockBackendData.LoanStatus;
            var statusDetails = statusMapping[loanStatus] || { percent: 0, text: "Unknown", state: "Error" };

            oModel.setProperty("/StatusPercent", statusDetails.percent);
            oModel.setProperty("/StatusText", statusDetails.text);
            oModel.setProperty("/StatusState", statusDetails.state);
        }
    });
});




/*sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("loanapp.controller.LoanStatusDetails", {
        onInit: function() {
            // Initialization code can be added here if needed
        },
        onBackButtonPress: function() {
            // Navigate back to the previous page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoanStatusPage");
        },
        
    });
});*/
