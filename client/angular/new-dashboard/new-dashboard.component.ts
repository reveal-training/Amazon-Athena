import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


declare let $: any;
// Set the Locaion of the Reveal Server - this is the default Sample Server for Reveal
// $.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:56565");


@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;
  
  ngAfterViewInit(): void {
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.startInEditMode = true;

    revealView.onDataSourcesRequested = (callback) => {

      // Athena Full Database
      var athenaDS = new $.ig.RVAthenaDataSource();
      athenaDS.id = "athenaDSId";
      athenaDS.title = "Athena Data Source";
      athenaDS.subtitle = "";
      athenaDS.region = "us-east-1";
      athenaDS.database = "mydatabase";

      // Athena Curated List of Tables / Views
      var athenaDSItem = new $.ig.RVAthenaDataSourceItem(athenaDS);
      athenaDSItem.id = "Invoices";
      athenaDSItem.title = "Invoices";
      athenaDSItem.subtitle = "";

      var athenaDSItem1 = new $.ig.RVAthenaDataSourceItem(athenaDS);
      athenaDSItem1.id = "Collisions";
      athenaDSItem1.title = "Collisions";
      athenaDSItem1.subtitle = "";

      callback(new $.ig.RevealDataSources([athenaDS], [athenaDSItem, athenaDSItem1], false));
  };

  }
  
}
