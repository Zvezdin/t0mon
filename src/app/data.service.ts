import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DataService {
	private jsonPath = 'data/'; //folder from where to find the jsons
	private chartPath = 'data/chart/' //folder from where to load charts
	private chartExtension = ".svg";

	constructor(private http: HttpClient) { }

	getJSONPath(name: string){
		return this.jsonPath + name;
	}

	getChartPath(name: string){
		return this.chartPath + name + this.chartExtension;
	}

	loadJSON(name: string, callback){
		this.http.get(this.getJSONPath(name)).subscribe(data => {
			console.log("Got JSON:", data);

			callback(data);
		});
	}
}
