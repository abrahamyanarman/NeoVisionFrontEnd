import {AmortizationStatus} from "./amortizationStatus";
import {Loan} from "./loan";

export interface AmortizationShedule {
  id?: number;
  loan?: Loan;
  paymentDate: Date;
  payment: number;
  principal: number;
  interest: number;
  totalInterest: number;
  balance: number;
  payedDate?: Date;
  status: AmortizationStatus;
}
