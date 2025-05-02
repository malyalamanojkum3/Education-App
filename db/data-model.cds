namespace loan_app.db;

type UserRole : String enum{
   admin;
   customer
}
type LoanStatus : String enum{
   Pending;
   Approved;
   Rejected;
}
 entity userDetails{
    key Id : Integer;
    email : String;
    password: String;
    username: String;
    mobileNumber: String;
    userRole: UserRole;
 }
 entity loanDetails{
   key Id: UUID;
   loanStatus : LoanStatus;
   applicantName :String;
   applicantAddress:String;
   applicantPHno:String;
   applicantEmail:String;
   applicantAadhar:String;
   applicantPAN:String;
   applicantSalary:String;
   loanAmount:String;
   loanRepaymentMonths:String;
 }
