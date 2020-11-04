import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import _ from 'lodash';


import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order';
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ],
    //firstRowIsData: true,
    options: { 'title': 'Tasks' },
  };

  userListData: any = [];

  displayedColumns: string[] = ['name', 'address.city', 'address.zipcode', 'company.name'];
  dataSource = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Latitude > 0', 'Latitude < 0', 'Longitude > 0', 'Longitude < 0'];
  public pieChartData = [1, 1, 1, 1]
  // public pieChartData: number[] 

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgb(255, 0, 0)', 'rgb(72, 209, 204)', 'rgb(255,140,0)', 'rgb(95,158,160)'],
    },
  ];

  constructor(private _demoService: DemoService) {

  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 3 : 1;

    this.getUsersList();

  }


  getUsersList() {
    this._demoService.getUserList().subscribe(listData => {
      this.userListData = [...listData];
      var count = [];

      this.dataSource = this.userListData;


      var latList = _.map(this.userListData, (data) => {
        return data.address.geo.lat
      })

      let countData = {
        moreLat: 0,
        lessLat: 0,
        moreLng: 0,
        lesslng: 0
      }
      let tempcount = _.countBy(latList, function (number) {
        return number > 0;
      });
      countData.moreLat = tempcount.true;
      countData.lessLat = tempcount.false;

      var longList = _.map(this.userListData, (data) => {
        return data.address.geo.lng
      })

      let tempcounting = _.countBy(longList, function (number) {
        return number > 0;
      });
      countData.moreLng = tempcounting.true;
      countData.lesslng = tempcounting.false;

      this.pieChartData = [countData.moreLat, countData.lessLat, countData.moreLng, countData.lesslng]

    })
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 3 : 1;
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}

