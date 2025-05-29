sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("loanapp.controller.main", {
        onInit() {
            sap.ui.core.BusyIndicator.show(0);
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.navTo("dashboard");
            sap.ui.core.BusyIndicator.hide();
        },
        
        onSignup: function () {
            var oSignupBox = this.byId("signUpFields");
            var oLoginBox = this.byId("loginfields");

            if(oSignupBox) {
                oSignupBox.setVisible(true);
                oLoginBox.setVisible(false);
            }
        },
        onRegister: function () {
            var oView = this.getView();
            var oModel = oView.getModel("mainModel");
          
            var oNewUser = {
              email: oView.byId("regemail").getValue(),
              password: oView.byId("regpass").getValue(),
              username: oView.byId("regusername").getValue(),
              mobileNumber: oView.byId("regmobile").getValue(),
              userRole: "customer",
            };
            if (!oNewUser.email || !oNewUser.password || !oNewUser.username || !oNewUser.mobileNumber) {
              sap.m.MessageToast.show("Please fill in all required fields.");
              return;
            }
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                 if (!emailRegex.test(oNewUser.email)) {
                 sap.m.MessageToast.show("Please enter a valid email address.");
                 return;
                 }
            
                 // Mobile number validation (10 digits, numeric only)
                 var mobileRegex = /^\d{10}$/;
                 if (!mobileRegex.test(oNewUser.mobileNumber)) {
                 sap.m.MessageToast.show("Please enter a valid 10-digit mobile number.");
                 return;
                 }

                 // Password validation (minimum 6 characters, at least one number and one letter)
                 var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
                 if (!passwordRegex.test(oNewUser.password)) {
                 sap.m.MessageToast.show("Password must be at least 6 characters long and include both letters and numbers.");
                 return;
                 }

                 var sReenteredPassword = oView.byId("regpass1").getValue();

// Password match validation
if (oNewUser.password !== sReenteredPassword) {
    sap.m.MessageToast.show("Passwords do not match.");
    return;
}
                        
            var oListBinding = oModel.bindList("/user", undefined, undefined, 
              [new sap.ui.model.Filter("email", sap.ui.model.FilterOperator.EQ, oNewUser.email)]
            );
          
            oListBinding.requestContexts().then(function (aContexts) {
              if (aContexts.length > 0) {
                sap.m.MessageToast.show("User already exists. Please login.");
              } else {
                // Create user with event-based handling
                var oUserListBinding = oModel.bindList("/user");
                var oContext = oUserListBinding.create(oNewUser);
          
                oContext.created().then(function () {
                  sap.m.MessageToast.show("Registration successful!");
                  this.onLogin(); // Optional: switch to login view
                }.bind(this)).catch(function (oError) {
                  sap.m.MessageToast.show("Error during registration.");
                  console.error("Registration error:", oError);
                });
              }
            }.bind(this)).catch(function (oError) {
              sap.m.MessageToast.show("Error checking existing users.");
              console.error("User check error:", oError);
            });
          }          ,          
        onLogin: function () {
            var oSignupBox = this.byId("signUpFields");
            var oLoginBox = this.byId("loginfields");

            if(oSignupBox && oLoginBox) {
                oSignupBox.setVisible(false);
                oLoginBox.setVisible(true);
            }
        },
        onTogglePasswordVisibility: function () {
            var oInput = this.byId("passinput");
            var bIsPassword = oInput.getType() === "Password";
        
            oInput.setType(bIsPassword ? "Text" : "Password");
            oInput.setValueHelpIconSrc(bIsPassword ? "sap-icon://hide" : "sap-icon://show");
        },
        onTogglePasswordVisibilityreg: function () {
            var oInput = this.byId("regpass");
            var bIsPassword = oInput.getType() === "Password";
        
            oInput.setType(bIsPassword ? "Text" : "Password");
            oInput.setValueHelpIconSrc(bIsPassword ? "sap-icon://hide" : "sap-icon://show");
        },
        OnLoginbutton: function () {
            var oView = this.getView();
            var oModel = oView.getModel("mainModel");
          
            var sEmail = oView.byId("emailinput").getValue();
            var sPassword = oView.byId("passinput").getValue();
          
            if (!sEmail || !sPassword) {
              sap.m.MessageToast.show("Please enter both email and password.");
              return;
            }
          
            // Create a list binding with filters for email and password
            var oListBinding = oModel.bindList("/user", undefined, undefined, [
              new sap.ui.model.Filter("email", sap.ui.model.FilterOperator.EQ, sEmail),
              new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, sPassword)
            ]);
          
            oListBinding.requestContexts().then(function (aContexts) {
              if (aContexts.length > 0) {
                sap.m.MessageToast.show("Login successful!");
                // Navigate to dashboard (replace with your actual navigation logic)
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("dashboard"); // Make sure 'dashboard' route exists in manifest.json
              } else {
                sap.m.MessageToast.show("Invalid email or password. Please try again or register.");
              }
            }.bind(this)).catch(function (oError) {
              sap.m.MessageToast.show("Error during login.");
              console.error("Login error:", oError);
            });
          } 
    });
});