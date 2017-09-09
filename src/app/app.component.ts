import * as $ from 'jquery';
import {Component,Input,ViewChild,ElementRef,OnInit} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	ngOnInit(): void {
	}
}
