import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';

@Component({
  selector: 'app-txt-reader',
  templateUrl: './txt-reader.component.html',
  styleUrls: ['./txt-reader.component.css']
})
export class TxtReaderComponent implements OnInit {
	error: boolean = false; 
	file: string = "Loading file...";
	@Input() id: string = "";
	@Input() path: string = "";

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.getData(this.path, this.id);
	}

	getData(path: string, id: string){
		this.http.get(path+id, {responseType: 'text'} ).subscribe(data => {
			this.file = data;
		}, err => {
			this.error = true;
		});
	}
}
