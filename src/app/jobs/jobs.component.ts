import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {
	filterFields = ['USER', 'STAT', 'QUEUE', 'FROM_HOST']; //the fields for which we want to filter
	columnLabels = {JOBID: 'Job ID', USER: 'User', STAT: 'Status', QUEUE: 'Queue', FROM_HOST: 'CE', EXEC_HOST: 'Exec host', CORES: 'Cores', JOB_NAME: 'Job name', SUBMIT_TIME: 'Submit time'};
	buttonData = [{label: 'Job details', url: '/job', field: 'JOBID'}, {label: 'Host details', url: '/host', field: 'EXEC_HOST'}];
	columnStyles = {FROM_HOST: "{'width':'200px'}"};
	tableLabel = "List of jobs";
	filepath = 'data/jobs/jobs.txt';
	baseURL = '/jobs';

	constructor(
	) { }

	ngOnInit() {
	}
}