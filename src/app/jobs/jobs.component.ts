import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {
	filterFields = ['USER', 'STAT', 'QUEUE', 'FROM_HOST']; //the fields for which we want to filter
	columns = []; //we will fill it up with information after that
	buttonData = [{label: 'Job details', url: '/job', field: 'JOBID'}, {label: 'Host details', url: '/host', field: 'EXEC_HOST'}];
	columnStyles = {FROM_HOST: "{'width':'200px'}"};
	tableLabel = "List of jobs";
	filepath = '';

	constructor(
		private data: DataService,
	) { }

	ngOnInit() {
		this.columns = [];

		this.columns.push({field: 'JOBID', label: 'Host name'});
		this.columns.push({field: 'USER', label: 'User'});
		this.columns.push({field: 'STAT', label: 'Status'});
		this.columns.push({field: 'QUEUE', label: 'Queue'});
		this.columns.push({field: 'FROM_HOST', label: 'CE'});
		this.columns.push({field: 'EXEC_HOST', label: 'Exec host'});
		this.columns.push({field: 'CORES', label: 'Cores'});
		this.columns.push({field: 'JOB_NAME', label: 'Job name'});
		this.columns.push({field: 'SUBMIT_TIME', label: 'Submit time'});

		this.filepath = this.data.getJobsPath();
	}
}