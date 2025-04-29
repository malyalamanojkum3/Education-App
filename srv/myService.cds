using { loan_app.db as db} from '../db/data-model';

service myService {
    entity customerSet as projection on db.loanDetails;
}