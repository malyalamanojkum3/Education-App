sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/m/MessageToast"
], function (Controller, ODataModel, MessageToast) {
    "use strict";

    return Controller.extend("loanapp.controller.LoanDetails", {
        onInit: function () {
            // Initialize the OData model
            var oModel = new ODataModel({
                serviceUrl: "/odata/v4/my/"
            });
            this.getView().setModel(oModel, "mainModel");
        }
    });
});
