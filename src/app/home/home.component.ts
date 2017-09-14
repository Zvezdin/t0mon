import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	first_graph: string = "";
	second_graph: string = "";
	jobs_json: any = undefined;
	hosts_json: any = undefined;
	running_count: number
	pending_count: number;
	unknown_count: number;

	title = 'the best graph thing that ever existed';

	constructor(private http: HttpClient){

	}

	ngOnInit(): void {
		this.first_graph = 'data/ok_valueM.svg';
		this.second_graph = 'data/closed_valueM.svg';

		var self = this;

		this.loadJSON('data/jobs.json', data => {
			this.jobs_json = data;
		});
		this.loadJSON('data/hosts.json', data => {
			this.hosts_json = data;
		});
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
		if(this.jobs_json != undefined && this.hosts_json != undefined){ //if both of our JSONs are loaded, parse them.
			this.parseJSON();

			console.log("Loaded json ", this.jobs_json);
		}
	}

	parseJSON(){
		this.parseJobs();
		this.parseHosts();
	}

	parseJobs() {
		var running: number = 0, pending: number = 0, unknown: number = 0;


		this.jobs_json.forEach(element => {
			running += element.jobs.running;
			pending += element.jobs.pending;
			unknown += element.jobs.unknown;
		});

		this.running_count = running;
		this.pending_count = pending;
		this.unknown_count = unknown;

		console.log(running, pending, unknown);
	}

	parseHosts() {

	}
}
