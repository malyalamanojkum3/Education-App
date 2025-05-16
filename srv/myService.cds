using { loan_app.db as db} from '../db/data-model';

service myService {
    entity customer as projection on db.loanDetails;
    entity user as projection on db.userDetails;
    action submitLoanApplication(
        applicantName : String,
        applicantAddress : String,
        applicantPHno : String,
        applicantEmail : String,
        applicantAadhar : String,
        applicantPAN : String,
        applicantSalary : String,
        loanAmount : String,
        loanRepaymentMonths : String,
        document : String
        ) returns { Id : String; };

}
