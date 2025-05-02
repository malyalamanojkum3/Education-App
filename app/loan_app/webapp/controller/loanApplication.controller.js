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
                },
        onClear: function(){
            this.byId("enterApplicantName").setValue("");
            this.byId("enterApplicantName").setValue("");
            this.byId("enterApplicantAddress").setValue("");
            this.byId("enterApplicantMobileNo").setValue("");
            this.byId("enterEmailId").setValue("");
            this.byId("enterAadhaarNo").setValue("");
            this.byId("enterPanNo").setValue("");
            this.byId("enterSalary").setValue("");
            this.byId("enterloanamount").setValue("");

        },
        nameValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[a-zA-Z\s]+$/);
            var blen = fieldValue.length;
          
            if (blen == 50) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("More Than 50 Characters Not Accepted");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Alphabets can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          }
          
    
    });
});