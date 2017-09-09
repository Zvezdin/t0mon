import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private first_graph: String = "";
	private second_graph: String = "";

	title = 'the best graph thing that ever existed';

	constructor(){

	}

	ngOnInit(): void {
		this.first_graph = 'https://bgt0mon.web.cern.ch/bgt0mon/data/icon.png';
		this.second_graph = this.first_graph;
	}
}
