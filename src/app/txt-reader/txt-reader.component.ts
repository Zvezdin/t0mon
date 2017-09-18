import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

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
		private data: DataService,
	) { }

	ngOnInit() {
		this.getData(this.path, this.id);
	}

	getData(path: string, id: string){
		this.data.loadText(path + id, data => {
			if(data != undefined) this.file = data;
			else this.error = true;
		});
	}
}
