import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { DataTable, MultiSelectModule }  from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import { DataService } from '../data.service';

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
	@Input() columns; //mapping field => label, the labels for each column
	@Input() buttonData; //array of objects with properties label, url and field to display buttons that have a label and navigate to the given url with the data of the field
	@Input() columnStyles;//mapping field => string, the styles for each column
	@Input() tableLabel; //label of the table
	@Input() private filepath; //filepath to the data file
	@Input() private differences: Array<{from: string, to: string, field: string}>;
	private baseURL; //url of where the component is integrated

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private data: DataService,
	) { }

	ngOnInit() {
		if(this.router.url.indexOf('?') > 0)
			this.baseURL = this.router.url.substr(0, this.router.url.indexOf('?')); //get the current url and remove the query parameters from it
		else
			this.baseURL = this.router.url;
		console.log("The base url is", this.baseURL);

		this.selectedItems = {};
		this.items = {};

		for(var i=0; i<this.filterFields.length; i++){
			this.selectedItems[this.filterFields[i]] = [];
			this.items[this.filterFields[i]] = [];
		}

		this.data.loadText(this.filepath, this.onDataLoaded);
	}

	onDataLoaded = (data:string) => {

		var rows = this.createRows(data);

		this.addDifferenceFields(rows);
		this.createFilters(rows);

		this.rows = rows;

		setTimeout(() => { //we need to wait one tick before we can parse the route and filter the table
			this.parseRoute();
		})
	}

	createRows(data:string): any{
		var lines: string[] = data.split(/\r?\n/); //split the file into lines

		var header = lines[0].split(/[ \t]+/); //the header, containing the names of the values

		var rows = new Array(); //the datatable rows

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
					else row[header[j]] = isNaN(Number(values[j])) ? values[j] : Number(values[j]); //if the value is of type number, parse it.
				}
				else {
					row[header[header.length-1]] += " " + values[j]; //the last value of each line - SUBMIT_TIME is split into multiple segments, since the date in the data is separated by spaces. This parses the date correctly.
				}
			}

			rows.push(row);
		}

		return rows;
	}

	createFilters(rows){
		var items = {}; //used to generate the item list for UI multiselect filters

		for(var i =0; i<this.filterFields.length; i++) items[this.filterFields[i]] = {};

		for(var i=0; i<rows.length; i++){
			for(var field in rows[i]){
				var selectItem = {label: String(rows[i][field]), value: rows[i][field]}; //create a selectItem, which we MAY insert into one of our select dropdowns.
				
				for(var k=0; k<this.filterFields.length; k++){
					var filterField = this.filterFields[k];

					if(field == filterField){
						if(!items[filterField].hasOwnProperty(rows[i][field])){ //if we haven't added that value yet
							items[filterField][rows[i][field]] = true; //mark that value as added

							this.items[filterField].push(selectItem); //add that value to the select dropdown.
						}
					}
				}
			}
		}
	}

	addDifferenceFields(rows){
		if(this.differences == undefined) return;
		
		console.log("Adding difference fields", this.differences);

		for(var i=0; i<this.differences.length; i++){
			var diff = this.differences[i];

			for(var j=0; j<rows.length; j++){
				var row = rows[j];

				row[diff.field] = row[diff.from] - row[diff.to];
			}
		}
	}

	parseRoute(){
		this.route.queryParams.subscribe(params => { //this is a subscription, so the code will be executed on any URL change and trigger a table update.
			for(var field in this.selectedItems){
				if(params.hasOwnProperty(field)){
					if(params[field] != undefined && params[field].length > 0)
						this.selectedItems[field] = params[field].split(",");
				}
			}

			console.log("Prased route with selection", this.selectedItems);

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
		var integerItems = selectedItems.map(function(item){
			if(!isNaN(Number(item))) return Number(item);
			return item;
		});

		this.table.filter(integerItems, field, filterMatchMode);
	}

	gotoDetail(path: string, file: string){
		this.router.navigate([path, file]);
	}
}
