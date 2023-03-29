import React, { useEffect } from "react";
declare let $: any;

const CreateDashboards = () => {
  useEffect(() => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.startInEditMode = true;

    revealView.onDataSourcesRequested = (callback: any) => {

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
  }, []);

  return <div id="revealView" style={{ height: "calc(100vh - 90px)", width: "100%" }}></div>;
};

export default CreateDashboards;
