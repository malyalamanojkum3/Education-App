module.exports = cds.service.impl(function(){
  const { customer} = this.entities;
    function customIdGenerator(){
        const currentYear = new Date().getFullYear();
        const randomNumber = Math.floor(Math.random() * 10000);
        const Id = `${currentYear}-EducationLoan-${randomNumber}`;
        return Id;
    }
    this.on('submitLoanApplication', async req => {
        const data = req.data;
        Id = customIdGenerator();
        // Insert into DB
        await INSERT.into(customer).entries({
          Id,
          applicantName: data.applicantName,
          applicantAddress: data.applicantAddress,
          applicantPHno: data.applicantPHno,
          applicantEmail: data.applicantEmail,
          applicantAadhar: data.applicantAadhar,
          applicantPAN: data.applicantPAN,
          applicantSalary: data.applicantSalary,
          loanAmount: data.loanAmount,
          loanRepaymentMonths: data.loanRepaymentMonths,
          loanStatus: "Pending",
          //document: data.doucument
        });
    
        return { Id };
      });
    })
