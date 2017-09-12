import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
	error: boolean = false; 
	jobFile: string = "Loading job file...";
	job: string = "";

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if(params["id"] != undefined){
				this.getJob(params["id"]);
				this.job = params["id"];
			}
			else this.error = true;
		});
	}

	getJob(job: string){

		this.http.get('data/jobs/'+job, {responseType: 'text'} ).subscribe(data => {
			this.jobFile = data;
		}, err => {
			this.error = true;
		});
	}

}
