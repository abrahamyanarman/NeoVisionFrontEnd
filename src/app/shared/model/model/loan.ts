import {LoanType} from "./loanType";
import {AmortizationShedule} from "./amortizationShedule";
import {User} from "../User";

export interface Loan {
  id: number;
  loanUUID: string;
  loanAmount: number;
  loanTerm: number;
  loanInterestRate: number;
  createDate: string;
  loanType: LoanType;
  amortiazation: AmortizationShedule[];
  user?: User;
}
