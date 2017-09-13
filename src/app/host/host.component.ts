import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';

@Component({
	selector: 'app-host',
	templateUrl: './host.component.html',
	styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
	id: string = "";
	path: string = "data/hosts/"

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if(params["id"] != undefined){
				this.id = params["id"];
			}
		});
	}
}
