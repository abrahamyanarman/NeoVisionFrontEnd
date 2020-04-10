import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import { ChartComponent } from "ng-apexcharts";


export interface ChartOptions{
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() totalInterest: number;
  @Input() totalPrincipal: number;
  private totalInterestTmp: number;
  private totalPrincipalTmp: number;
  private interestRate = 60;
  private principalRate = 40;

  // @ts-ignore
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
  }

  ngOnInit(): void {
    this.generateValues();
  }

  calculateTotlalInterestToPrincipalRate(): number {
    return (this.totalInterestTmp * 100) / (this.totalInterestTmp + this.totalPrincipalTmp);
  }

  generateValues() {
    this.interestRate = Math.round((this.calculateTotlalInterestToPrincipalRate() * 100) / 100);
    this.principalRate =100 - this.interestRate;
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'totalInterest') {
        this.totalInterestTmp = changes[property].currentValue;
      }
      if (property === 'totalPrincipal') {
        this.totalPrincipalTmp = changes[property].currentValue;
      }
    }
    this.generateValues();
    this.chartOptions = {
      series: [this.principalRate, this.interestRate ],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Total Principal Paid", "Total Interest Paid"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
