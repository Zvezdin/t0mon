import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-graph-display',
	templateUrl: './graph-display.component.html',
	styleUrls: ['./graph-display.component.css']
})
export class GraphDisplayComponent implements OnInit {
	error: boolean = false;

	@Input()
	charts: any;

	@Input()
	group: string;

	chartURLs: Array<string>; //urls to the chart graphs

	//json objects holding the .json metadata files.
	charts_json: any = undefined;

	selectedInterval: string = "month"; //interval for the graph dropdown

	constructor(private data: DataService) { }

	ngOnInit() {
		if(this.charts != undefined) //if we have certain charts as an input
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

		if(this.charts != undefined){
			for(var i=0; i<this.charts.length; i++){
				this.chartURLs.push(this.data.getChartPath(this.charts[i] + this.selectedInterval));
			}
		} else if(this.group != undefined && this.charts_json[this.group] != undefined){
			for(var i=0; i<this.charts_json[this.group].length; i++){
				this.chartURLs.push(this.data.getChartPath(this.charts_json[this.group][i] + this.selectedInterval));
			}
		} else this.error = true; //the given chart data to the component was invalid

		console.log("Loading graphs from URLs", this.chartURLs);
	}
}
