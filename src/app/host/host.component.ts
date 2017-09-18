import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

@Component({
	selector: 'app-host',
	templateUrl: './host.component.html',
	styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
	id: string = "";
	path: string = ""

	constructor(
		private route: ActivatedRoute,
		private data: DataService,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if(params["id"] != undefined){
				this.path = this.data.getHostPath();
				this.id = params["id"];
			}
		});
	}
}
