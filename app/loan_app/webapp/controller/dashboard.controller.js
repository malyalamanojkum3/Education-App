sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("loanapp.controller.dashboard", {
        onInit: function () {
            const oModel = new sap.ui.model.json.JSONModel({
              tiles: [
                {
                  title: "Apply Loan",
                  description: "Apply for new education loan",
                  icon: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
                  key: "ApplyLoan"
                },
                {
                  title: "Loan Status",
                  description: "Check current status of loan",
                  icon: "https://cdn-icons-png.flaticon.com/512/3135/3135773.png",
                  key: "LoanStatus"
                },
                {
                  title: "Profile",
                  description: "User details and information",
                  icon: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
                  key: "Profile"
                },
                {
                  title: "Applied Loans",
                  description: "Track your previous applications",
                  icon: "https://cdn-icons-png.flaticon.com/512/943/943593.png",
                  key: "AppliedLoan"
                },
                {
                  title: "Loan Details",
                  description: "Interest rates, EMI, tenure info",
                  icon: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                  key: "LoanDetails"
                }
              ]
            });
          
            this.getView().setModel(oModel);
          },
          onTilePress: function (oEvent) {
            const oItem = oEvent.getSource(); // the clicked GridListItem
            const oContext = oItem.getBindingContext();
            if (!oContext) {
              sap.m.MessageToast.show("No binding context found");
              return;
            }
          
            const key = oContext.getObject().key;
            console.log("Pressed key:", key);
          
            const router = sap.ui.core.UIComponent.getRouterFor(this);
            switch (key) {
              case "ApplyLoan":
                router.navTo("RouteloanApplication");
                break;
              case "LoanStatus":
                router.navTo("LoanStatusPage");
                break;
              case "Profile":
                this.onProfile();
                break;
              case "AppliedLoan":
                router.navTo("AppliedLoan");
                break;
              case "LoanDetails":
                router.navTo("LoanDetails");
                break;
              default:
                sap.m.MessageToast.show("Unknown tile key: " + key);
            }
          }
          
        });

        
        
});
