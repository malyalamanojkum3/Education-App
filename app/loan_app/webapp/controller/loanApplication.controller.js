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
        onUpload: function () {
          sap.m.MessageToast.show("Documents uploaded successfully");  
        },
        onClear: function(){
            this.byId("enterApplicantName").setValue("");
            this.byId("enterApplicantAddress").setValue("");
            this.byId("enterApplicantMobileNo").setValue("");
            this.byId("enterEmailId").setValue("");
            this.byId("enterAadhaarNo").setValue("");
            this.byId("enterPanNo").setValue("");
            this.byId("enterSalary").setValue("");
            this.byId("enterloanamount").setValue("");
            this.byId("enterloanrepaymentmonths").setValue("");

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
          },
          numValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[0-9]{10}$/);
            var blen = fieldValue.length;
          
            if (blen !== 10) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Mobile number must be 10 digits");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Numbers can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          },
          emailValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
            if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Invalid email address");
              
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          },
          aadhaarValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[0-9]{12}$/);
            var blen = fieldValue.length;
          
            if (blen !== 12) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Aadhaar number must be 12 digits");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Numbers can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }

          },
          panValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            var blen = fieldValue.length;
          
            if (blen !== 10) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Pan number must be 10 digits");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Invalid Pan number");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          },
          repayValidation: function(oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[0-9]{1,2}$/);
            var blen = fieldValue.length;
          
            if (blen === 0 || blen > 2) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Repayment months allowed upto 2 digits");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Numbers can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          },
          salaryValidation: function (oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[0-9]*$/);
            var blen = fieldValue.length;

            if(blen === 0) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Salary cannot be empty");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Numbers can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          },
          loanamountValidation: function (oEvent) {
            var fieldValue = oEvent.getSource().getValue();
            var fieldName = oEvent.getSource();
            var format = (/^[0-9]*$/);
            var blen = fieldValue.length;

            if(blen === 0) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Loan Amount cannot be empty");
            } else if (!fieldValue.match(format)) {
              fieldName.setValueState(sap.ui.core.ValueState.Error);
              fieldName.setValueStateText("Only Numbers can Accepted");
              fieldName.setValue("");
            } else {
              fieldName.setValueState(sap.ui.core.ValueState.None);
            }
          }
          
    
    });
});