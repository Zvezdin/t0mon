import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
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
	HomeComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	RouterModule.forRoot(
		appRoutes,
		{ enableTracing: false } // <-- if true, for debugging purposes only
	)
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
