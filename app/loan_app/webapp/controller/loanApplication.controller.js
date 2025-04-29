sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("loanapp.controller.loanApplication", {
        onSubmit() {
            MessageBox.success("You have applied for loan successfully\nYour loan id: 092889123");
            
        },
        onCancel() {
            sap.m.MessageToast.show("Loan application cancelled");
            
        },
        
        onChooseFile: function () {
            var oFileUploader = document.createElement('input');
            oFileUploader.type = 'file';
            oFileUploader.onchange = function (event) {
            var oFilePathInput = this.byId("filePath");
            oFilePathInput.setValue(event.target.files[0].name);
                 }.bind(this);
            oFileUploader.click();
                }
    
    });
});