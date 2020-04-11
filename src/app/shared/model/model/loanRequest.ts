import {User} from "../User";
import {LoanType} from "./loanType";
import {LoanRequestStatus} from "./loanRequestStatus";

export class LoanRequest {
  user: User;
  preferredLoanAmount: number;
  preferredLoanTerm: number;
  preferredLoanInterestRate: number;
  preferredPaymentDate: string;
  loanType: LoanType;
  crated: string;
  status: LoanRequestStatus;
}