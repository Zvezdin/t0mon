import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { InputTextModule, ButtonModule, DataTableModule, DialogModule, DropdownModule, MultiSelectModule }  from 'primeng/primeng';

import {MdButtonModule, MdCheckboxModule, MdCardModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { HostsComponent } from './hosts/hosts.component';
import { HostComponent } from './host/host.component';
import { KeysPipe } from './keys.pipe';

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'jobs', component: JobsComponent },
	{ path: 'hosts', component: HostsComponent },
	{ path: 'job/:id', component: JobComponent },
	{ path: 'host/:id', component: HostComponent },
	//{ path: 'hero/:id',      component: HeroDetailComponent },
	/*{
	  path: 'heroes',
	  component: HeroListComponent,
	  data: { title: 'Heroes List' }
	},*/
	{ path: '',
	  redirectTo: '/home',
	  pathMatch: 'full'
	},
	//{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		JobsComponent,
		JobComponent,
		HostsComponent,
		HostComponent,
		KeysPipe
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

		InputTextModule, ButtonModule, DataTableModule, DialogModule, DropdownModule, MultiSelectModule,
	
		MdButtonModule, MdCheckboxModule, MdCardModule,
	],
		providers: [],
		bootstrap: [AppComponent]
})
export class AppModule { }
