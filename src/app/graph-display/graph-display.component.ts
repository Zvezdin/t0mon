import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-graph-display',
	templateUrl: './graph-display.component.html',
	styleUrls: ['./graph-display.component.css']
})
export class GraphDisplayComponent implements OnInit {

	@Input()
	charts: any;

	chartURLs: Array<string>; //urls to the chart graphs

	//json objects holding the .json metadata files.
	charts_json: any = undefined;

	selectedInterval: string = "month"; //interval for the graph dropdown

	constructor(private data: DataService) { }

	ngOnInit() {		
		this.charts = this.charts.split(','); //split the string to array of charts with , as the delimeter

		this.data.loadJSON('charts.json', res =>{
			this.charts_json = res;

			this.onJSONLoaded();
		})
	}

	onJSONLoaded(){
		console.log("Loaded charts", this.charts_json);
		this.parseJSON();
	}

	parseJSON(){
		this.updateCharts();
	}

	updateCharts(){
		this.chartURLs = [];

		for(var i=0; i<this.charts.length; i++){
			this.chartURLs.push(this.data.getChartPath(this.charts[i] + this.selectedInterval));
		}

		console.log("Loading graphs", this.charts, "from URLs", this.chartURLs);
	}
}
