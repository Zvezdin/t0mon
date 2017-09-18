import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { InputTextModule, ButtonModule, DataTableModule, DialogModule, MultiSelectModule }  from 'primeng/primeng';

import {MdButtonModule, MdCheckboxModule, MdCardModule, MdSelectModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { HostsComponent } from './hosts/hosts.component';
import { HostComponent } from './host/host.component';
import { KeysPipe } from './keys.pipe';
import { TxtReaderComponent } from './txt-reader/txt-reader.component';
import { DatatableVisualizationComponent } from './datatable-visualization/datatable-visualization.component';
import { GraphDisplayComponent } from './graph-display/graph-display.component';

import { DataService } from './data.service';
import { JobsGraphsComponent } from './jobs-graphs/jobs-graphs.component';
import { HostsGraphsComponent } from './hosts-graphs/hosts-graphs.component'

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'jobs', component: JobsComponent },
	{ path: 'hosts', component: HostsComponent },
	{ path: 'job/:id', component: JobComponent },
	{ path: 'host/:id', component: HostComponent },
	{ path: 'jobs-graphs', component: JobsGraphsComponent },
	{ path: 'hosts-graphs', component: HostsGraphsComponent },
	{ path: '',
	  redirectTo: '/home',
	  pathMatch: 'full'
	},
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		JobsComponent,
		JobComponent,
		HostsComponent,
		HostComponent,
		KeysPipe,
		TxtReaderComponent,
		DatatableVisualizationComponent,
		GraphDisplayComponent,
		JobsGraphsComponent,
		HostsGraphsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false } // <-- if true, for debugging purposes only
		),

		InputTextModule, ButtonModule, DataTableModule, DialogModule, MultiSelectModule,
	
		MdButtonModule, MdCheckboxModule, MdCardModule, MdSelectModule,
	],
		providers: [DataService],
		bootstrap: [AppComponent]
})
export class AppModule { }
