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

	jsonPath = 'data/'; //folder from where to find the jsons
	chartPath = 'data/chart/' //folder from where to load charts
	jobsChart = "jobs_all_"; //the default charts on the page
	hostsChart = "slots_";
	chartExtension = ".svg";

	first_graph: string = ""; //url for the graph
	second_graph: string = "";
	jobs_json: any = undefined; //json objects holding the .json metadata files.
	hosts_json: any = undefined;
	charts_json: any = undefined;
	totalJobs: {}; //object, holding the total count of the current jobs by status.

	coresArray: Array<number>; //an array holding all the possible cores we need to display info about
	hostCoresArray: Array<number>; //an array holding the core counts for the different types of hosts

	selectedInterval: string = "month"; //interval for the graph dropdown

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

		var totalJobs = {};

		this.jobs_json.forEach(element => {
			for(var key in element.STAT){
				if(!totalJobs.hasOwnProperty(key)) totalJobs[key] = element.STAT[key];
				else totalJobs[key] += element.STAT[key];
			}
		});

		this.totalJobs = totalJobs;
		console.log(totalJobs);
	}

	parseHosts() {	
		this.coresArray = new Array<number>();
		this.hostCoresArray = new Array<number>();

		for(var type in this.hosts_json){
			for(var core in this.hosts_json[type]['list_of_differences_between_max_and_current_jobs_sorted_by_difference_size']){
				var c = Number(core);

				if(this.coresArray.indexOf(c) < 0) this.coresArray.push(c);
			}

			for(var core in this.hosts_json[type]['list_of_differences_between_max_and_current_jobs_sorted_by_number_of_max_jobs']){
				var c = Number(core);

				if(this.hostCoresArray.indexOf(c) < 0) this.hostCoresArray.push(c);
			}
		}

		this.coresArray = this.coresArray.sort((n1,n2) => n1 - n2);
		this.hostCoresArray = this.hostCoresArray.sort((n1,n2) => n1 - n2);

		console.log("Core arrays:", this.coresArray, this.hostCoresArray);
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
