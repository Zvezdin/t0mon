import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-hosts',
	templateUrl: './hosts.component.html',
	styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {

	filterFields = ['STATUS', 'MAX']; //the fields for which we want to filter
	//HOST_NAME          STATUS       JL/U    MAX  NJOBS    RUN  SSUSP  USUSP    RSV 
	columnLabels = {HOST_NAME: 'Host name', STATUS: 'Status', 'JL/U': 'JL/U', MAX: 'Max', NJOBS: 'N Jobs', diff: 'Diff', RUN: 'Run', SSUSP: 'SSUSP', USUSP: 'USUSP', RSV: 'RSV'};
	buttonData = [{label: 'Host details', url: '/host', field: 'HOST_NAME'}];
	columnStyles = {};
	tableLabel = "List of hosts";
	differences = [{from: 'MAX', to: 'NJOBS', field: 'diff'}] //This means that a field will be generated in the data table that equals the integer diff from - to
	filepath = '';

	constructor(
		private data: DataService,
	) { }

	ngOnInit() {
		this.filepath = this.data.getHostsPath();
	}

}
