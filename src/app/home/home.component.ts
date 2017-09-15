import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	hostStatus: string[] = ['ok', 'closed', 'unavail', 'unreach'];
	jobStatus: string[] = ['RUN', 'PEND', 'UNKWN'];

	jsonPath = 'data/';
	chartPath = 'data/chart/'
	jobsChart = "jobs_all_";
	hostsChart = "slots_";
	chartExtension = ".svg";

	first_graph: string = "";
	second_graph: string = "";
	jobs_json: any = undefined;
	hosts_json: any = undefined;
	charts_json: any = undefined;
	total: {};

	maxCores: number = Infinity;
	minCores: number = -Infinity;
	coresArray: Array<number>;

	selectedInterval: string = "month";

	constructor(private http: HttpClient){

	}

	ngOnInit(): void {

		var self = this;

		this.loadJSON(this.jsonPath + 'jobs.json', data => {
			this.jobs_json = data;
		});
		this.loadJSON(this.jsonPath + 'hosts.json', data => {
			this.hosts_json = data;
		});
		this.loadJSON(this.jsonPath + 'charts.json', data  => {
			this.charts_json = data;
		})
	}

	loadJSON(path: string, callback) {
		this.http.get(path).subscribe(data => {
			// Read the result field from the JSON response.
			console.log("Got JSON:", data);

			callback(data);

			this.onJSONLoaded();
		});
	}

	onJSONLoaded() {
		if(this.jobs_json != undefined && this.hosts_json != undefined && this.charts_json != undefined){ //if both of our JSONs are loaded, parse them.
			this.parseJSON();
		}
	}

	parseJSON(){
		this.parseJobs();
		this.parseHosts();
		this.parseCharts();
	}

	parseJobs() {
		var running: number = 0, pending: number = 0, unknown: number = 0;

		var total = {};

		this.jobs_json.forEach(element => {
			for(var key in element.STAT){
				if(!total.hasOwnProperty(key)) total[key] = element.STAT[key];
				else total[key] += element.STAT[key];
			}
		});

		this.total = total;
		console.log(total);
	}

	parseHosts() {
		this.maxCores = -Infinity;
		this.minCores = Infinity;
		
		this.coresArray = new Array<number>();

		for(var type in this.hosts_json){
			for(var core in this.hosts_json[type]['list_of_differences_between_max_and_current_jobs_sorted_by_difference_size']){
				var c = Number(core);
				this.maxCores = Math.max(c, this.maxCores);
				this.minCores = Math.min(c, this.minCores);

				if(this.coresArray.indexOf(c) < 0) this.coresArray.push(c);
			}
		}

		this.coresArray = this.coresArray.sort((n1,n2) => n1 - n2);

		console.log("Max number of cores is ", this.maxCores, this.minCores, this.coresArray);
	}

	parseCharts(){
		this.onIntervalSelected();
	}

	onIntervalSelected(){
		this.first_graph = this.chartPath + this.jobsChart + this.selectedInterval + this.chartExtension;
		this.second_graph = this.chartPath + this.hostsChart + this.selectedInterval + this.chartExtension;

		console.log("Loading graphs ", this.first_graph, this.second_graph);
	}
}
