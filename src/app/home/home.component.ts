import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	hostStatus: string[] = ['ok', 'closed', 'unavail', 'unreach'];
	jobStatus: string[] = ['RUN', 'PEND', 'UNKWN'];

	jobs_json: any = undefined; //json objects holding the .json metadata files.
	hosts_json: any = undefined;
	totalJobs: {}; //object, holding the total count of the current jobs by status.

	coresArray: Array<number>; //an array holding all the possible cores we need to display info about
	hostCoresArray: Array<number>; //an array holding the core counts for the different types of hosts

	constructor(private data: DataService){

	}

	ngOnInit(): void {

		var self = this;

		this.data.loadJSON('jobs.json', data => {
			this.jobs_json = data;
			this.onJSONLoaded();
		});
		this.data.loadJSON('hosts.json', data => {
			this.hosts_json = data;
			this.onJSONLoaded();
		});
	}

	onJSONLoaded() {
		if(this.jobs_json != undefined && this.hosts_json != undefined){ //if both of our JSONs are loaded, parse them.
			this.parseJSON();
		}
	}

	parseJSON(){
		this.parseJobs();
		this.parseHosts();
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

	//Finds out if there are free slots in hosts.json which's host has a certain amount of host cores and free cores.
	hostsHave(hostCores: number, core: number = undefined){
		var result: boolean = false; //by default, we don't have any data to display here

		for(var i=0; i < this.hostStatus.length; i++){
			var label = this.hostStatus[i];

			if(this.hosts_json[label].list_of_differences_between_max_and_current_jobs_sorted_by_number_of_max_jobs[hostCores] != undefined){ //if the host group has this number of host cores
				if(core == undefined) result = true;

				if(this.hosts_json[label].list_of_differences_between_max_and_current_jobs_sorted_by_number_of_max_jobs[hostCores][core] != undefined){ //if the host cores have free cores of size core
					result = true; //mark that we have data to display
				}
			}
		}

		return result;
	}
}
