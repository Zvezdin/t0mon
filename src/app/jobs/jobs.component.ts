import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {  ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { SelectItem } from 'primeng/primeng';

import * as $ from 'jquery';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.css']
})


export class JobsComponent implements OnInit {
	jobs: Array<{/* jobID: string, user: string, stat: string, queue: string, fromHost: string, execHost: string, jobName: string, submitTime: string*/}>;

	table: any; //here we will store the variable for the datatable.

	private users: SelectItem[];
	private statuses: SelectItem[];
	private queues: SelectItem[];
	private CEs: SelectItem[];

	private selectedUsers: string[];
	private selectedStatuses: string[];
	private selectedQueues: string[];
	private selectedCEs: string[];

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.loadJobs(this.onJobsLoaded);
	}

	loadJobs(callback){
		this.http.get('data/jobs/jobs.txt', {responseType: 'text'} ).subscribe(data => {
			callback(data);
		});
	}

	onJobsLoaded = (data:string) => {
		var jobLines: string[] = data.split(/\r?\n/); //split the file into lines

		console.log(jobLines[0].split(/[ \t]+/), jobLines[1].split(/[ \t]+/));

		var header = jobLines[0].split(/[ \t]+/); //the header, containing the names of the values

		var jobs = new Array();

		var users = {};
		var statuses = {};
		var queues = {};
		var CEs = {};

		this.users = [];
		this.statuses = [];
		this.queues = [];
		this.CEs = [];

		for(var i=1; i<jobLines.length; i++){
			var line = jobLines[i];

			if(line == undefined || line == "") continue;

			var values = line.split(/[ \t]+/); //split the line into values, separated by space or a tab.

			var job = {};
			for(var j=0; j< values.length; j++){
				if(j < header.length){

					if(header[j] == 'EXEC_HOST'){ //if we are processing an exec_host, we need to do a bit more than just adding it.
						var hosts = values[j].split(":");
						job[header[j]] = hosts[0]; //only the unique host ID
						job["CORES"] = hosts.length;
					}
					else job[header[j]] = values[j];

					var selectItem = {label: values[j], value: values[j]}; //create a selectItem, which we MAY insert into one of our select dropdowns.


					if(header[j] == 'USER'){ //if the current value is a USER
						if(!users.hasOwnProperty(values[j])){ //if we haven't added that user yet
							users[values[j]] = true; //mark that user as added

							this.users.push(selectItem); //add that user to the select dropdown.
						}
					}
					if(header[j] == 'STAT'){ //if the current value is a status
						if(!statuses.hasOwnProperty(values[j])){
							statuses[values[j]] = true;

							this.statuses.push(selectItem);
						}
					}
					if(header[j] == 'QUEUE'){
						if(!queues.hasOwnProperty(values[j])){
							queues[values[j]] = true;

							this.queues.push(selectItem);
						}
					}
					if(header[j] == 'FROM_HOST'){
						if(!CEs.hasOwnProperty(values[j])){
							CEs[values[j]] = true;

							this.CEs.push(selectItem);
						}
					}
				}
				else {
					job[header[header.length-1]] += " " + values[j]; //the last value of each line - SUBMIT_TIME is split into multiple segments, since the date in the data is separated by spaces. This parses the date correctly.
				}
			}

			jobs.push(job);
		}

		console.log(this.CEs);

		this.jobs = jobs;
		
		var self = this;

		setTimeout(function(){
			self.parseRoute();
			console.log("Parsed route");
		}, 3000)
	}

	parseRoute(){
		this.route.queryParams.subscribe(params => {
			console.log("Route parameters: ", params);

			if(params.hasOwnProperty('statuses')){
				this.selectedStatuses = params['statuses'].split(",");
			}

			if(params.hasOwnProperty('users')){
				this.selectedUsers = params['users'].split(",");
			}

			if(params.hasOwnProperty('queues')){
				this.selectedQueues = params['queues'].split(",");
			}
			if(params.hasOwnProperty('CEs')){
				this.selectedCEs = params['CEs'].split(",");
			}
		});

		console.log($("#table"), $("#usersSelect"));

		$("#usersSelect").click();
	}
	updateRoute(){
		let params: NavigationExtras = {
			queryParams: {},
		};
	  
		if(this.selectedUsers != undefined && this.selectedUsers.length > 0){
			params.queryParams['users'] = this.selectedUsers.join(',');
		}

		if(this.selectedStatuses != undefined && this.selectedStatuses.length > 0){
			params.queryParams['statuses'] = this.selectedStatuses.join(',');
		}

		if(this.selectedQueues != undefined && this.selectedQueues.length > 0){
			params.queryParams['queues'] = this.selectedQueues.join(',');
		}
		if(this.selectedCEs != undefined && this.selectedCEs.length > 0){
			params.queryParams['CEs'] = this.selectedCEs.join(',');
		}

		// Navigate to the login page with extras
		this.router.navigate(['/jobs'], params);

		console.log("Route updated")
	}

	gotoJobDetail(job){
		console.log(job, this.selectedUsers, this.selectedQueues, this.selectedStatuses);
		this.router.navigate(['/job', job]);
	}

	gotoHostDetail(host){
		console.log(host);
		this.router.navigate(['/host', host]);
	}

	printDebug(a: Array<any>){
		console.log(a);
	}

	setTable(table: any){
		this.table = table;

		console.log("Set table", table);
	}

	sortTable(selectedItems: string[], field: string, filterMatchMode: string){
		this.table.filter(selectedItems, field, filterMatchMode);
	}
}
