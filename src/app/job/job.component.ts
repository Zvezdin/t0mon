import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';

import { DataService } from '../data.service';

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
	id: string = "";
	path: string = ""

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
		private data: DataService,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if(params["id"] != undefined){
				this.path = this.data.getJobPath();
				this.id = params["id"];
			}
		});
	}
}
