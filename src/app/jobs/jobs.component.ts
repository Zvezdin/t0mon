import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { SelectItem } from 'primeng/primeng';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.css']
})


export class JobsComponent implements OnInit {
	private jobs: Array<{/* jobID: string, user: string, stat: string, queue: string, fromHost: string, execHost: string, jobName: string, submitTime: string*/}>;

	private users: SelectItem[];

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.loadJobs(this.onJobsLoaded);
	}

	loadJobs(callback){
		this.http.get('data/jobs.txt', {responseType: 'text'} ).subscribe(data => {
			callback(data);
		});
	}

	onJobsLoaded = (data:string) => {
		var jobLines: string[] = data.split(/\r?\n/); //split the file into lines

		console.log(jobLines[0].split(/[ \t]+/), jobLines[1].split(/[ \t]+/));

		var header = jobLines[0].split(/[ \t]+/); //the header, containing the names of the values

		var jobs = new Array();

		for(var i=1; i<jobLines.length; i++){
			var line = jobLines[i];

			if(line == undefined || line == "") continue;

			var values = line.split(/[ \t]+/); //split the line into values, separated by space or a tab.

			var job = {};
			for(var j=0; j< values.length; j++){
				if(j < header.length)
					job[header[j]] = values[j];
				else {
					job[header[header.length-1]] += " " + values[j]; //the last value of each line - SUBMIT_TIME is split into multiple segments, since the date in the data is separated by spaces. This parses the date correctly.
				}
			}

			jobs.push(job);
		}

		this.jobs = jobs;
		console.log(this.jobs);
	}

	gotoDetail(job){

	}
}
