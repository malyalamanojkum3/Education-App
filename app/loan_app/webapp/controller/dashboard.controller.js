sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("loanapp.controller.dashboard", {
        onInit: function () {
           
        },

        onProfile: function()
        {
            var oView = this.getView();
            if (!this.byID('profiledialog')) {
                Fragment.load({
                    id: oView.getId(),
                    name: "loanapp.fragments.ProfileDialog"
                    
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    oDialog.open();
                     
                });

            }else
            {
                this.byID('profiledialog').open();
            }
        }

    });    
});
