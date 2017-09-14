import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {  ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { DataTable, MultiSelectModule }  from 'primeng/primeng';

import { SelectItem } from 'primeng/primeng';

@Component({
	selector: 'app-datatable-visualization',
	templateUrl: './datatable-visualization.component.html',
	styleUrls: ['./datatable-visualization.component.css']
})
export class DatatableVisualizationComponent implements OnInit {
	@ViewChild(DataTable)
	private table: DataTable; //here we will store the variable for the datatable.

	rows: Array<{}>;

	private items: any;
	
	private selectedItems: any;

	@Input() filterFields; //the fields for which we want to filter
	@Input() columnLabels; //mapping field => label, the labels for each column
	@Input() buttonData; //array of objects with properties label, url and field to display buttons that have a label and navigate to the given url with the data of the field
	@Input() columnStyles;//mapping field => string, the styles for each column
	@Input() tableLabel; //label of the table
	@Input() private filepath; //filepath to the data file
	@Input() private baseURL; //url of where the component is integrated

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.selectedItems = {};
		this.items = {};

		for(var i=0; i<this.filterFields.length; i++){
			this.selectedItems[this.filterFields[i]] = [];
			this.items[this.filterFields[i]] = [];
		}

		this.loadData(this.onDataLoaded);
	}

	loadData(callback){
		this.http.get(this.filepath, {responseType: 'text'} ).subscribe(data => {
			callback(data);
		});
	}

	onDataLoaded = (data:string) => {
		var lines: string[] = data.split(/\r?\n/); //split the file into lines

		console.log(lines[0].split(/[ \t]+/), lines[1].split(/[ \t]+/)); //debug

		var header = lines[0].split(/[ \t]+/); //the header, containing the names of the values

		var rows = new Array(); //the datatable rows

		var items = {}; //used to generate the item list for UI multiselect filters

		for(var i =0; i<this.filterFields.length; i++) items[this.filterFields[i]] = {};

		for(var i=1; i<lines.length; i++){
			var line = lines[i];

			if(line == undefined || line == "") continue;

			var values = line.split(/[ \t]+/); //split the line into values, separated by space or a tab.

			var row = {};
			for(var j=0; j< values.length; j++){
				if(j < header.length){

					if(header[j] == 'EXEC_HOST'){ //if we are processing a field type exec_host, we need to do a bit more than just adding it.
						var hosts = values[j].split(":");
						row[header[j]] = hosts[0]; //only the unique host ID
						row["CORES"] = hosts.length;
					}
					else row[header[j]] = values[j];

					var selectItem = {label: values[j], value: values[j]}; //create a selectItem, which we MAY insert into one of our select dropdowns.

					for(var k=0; k<this.filterFields.length; k++){
						var field = this.filterFields[k];

						if(header[j] == field){
							if(!items[field].hasOwnProperty(values[j])){ //if we haven't added that value yet
								items[field][values[j]] = true; //mark that value as added

								this.items[field].push(selectItem); //add that value to the select dropdown.
							}
						}
					}
				}
				else {
					row[header[header.length-1]] += " " + values[j]; //the last value of each line - SUBMIT_TIME is split into multiple segments, since the date in the data is separated by spaces. This parses the date correctly.
				}
			}

			rows.push(row);
		}

		this.rows = rows;

		console.log(this.items); //debug

		setTimeout(() => { //we need to wait one tick before we can parse the route and filter the table
			this.parseRoute();
		})
	}

	parseRoute(){
		this.route.queryParams.subscribe(params => {
			console.log("Route parameters: ", params);

			for(var field in this.selectedItems){
				if(params.hasOwnProperty(field)){
					if(params[field] != undefined && params[field].length > 0)
						this.selectedItems[field] = params[field].split(",");
				}
			}

			console.log(this.selectedItems);

			this.updateTable();
		});
	}

	updateRoute(){
		let params: NavigationExtras = {
			queryParams: {},
		};
	  
		for(var field in this.selectedItems){
			if(this.selectedItems[field] != undefined && this.selectedItems[field].length > 0){
				if(this.selectedItems[field] != undefined && this.selectedItems[field].length > 0)
					params.queryParams[field] = this.selectedItems[field].join(',');
			}
		}

		//Update the actual route
		this.router.navigate([this.baseURL], params);

		console.log("Route updated")
	}

	updateTable(){
		for(var field in this.selectedItems){
			this.sortTable(this.selectedItems[field], field);
		}
	}

	sortTable(selectedItems: string[], field: string, filterMatchMode: string = "in"){
		this.table.filter(selectedItems, field, filterMatchMode);
	}

	gotoDetail(path: string, file: string){
		this.router.navigate([path, file]);
	}
}
