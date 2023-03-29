var express = require('express');
var reveal = require('reveal-sdk-node');
var cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());

  app.get('/dashboards', (req, res) => {
    const directoryPath = './dashboards';
  
    fs.readdir(directoryPath, (err, files) => {
      const fileNames = files.map((file) => {
      const { name } = path.parse(file);
      return { name };
      });
      res.send(fileNames);
      //console.log(fileNames);
    });
  });
  
const authenticationProvider = async (userContext, dataSource) => {
  //if (dataSource.host == undefined) { return null; }
  if (dataSource instanceof reveal.RVAthenaDataSource) {
    return new reveal.RVAmazonWebServicesCredentials("username", "password"); }
}

const dataSourceProvider = async (userContext, dataSource) => {
  if (dataSource instanceof reveal.RVAthenaDataSource) {
    console.log("in Athena dataSource");  
    dataSource.id = "athenaDSId";
    dataSource.title = "Athena Data Source";
    dataSource.region = "us-east-1";
    dataSource.database = "mydatabase";
    dataSource.outputLocation = "s3://bucket-instance/Temp";
  }
  return dataSource;
}

const dataSourceItemProvider = async (userContext, dataSourceItem) => {  
    if (dataSourceItem instanceof reveal.RVAthenaDataSourceItem) {      
      if (dataSourceItem.id == "Invoices") {
        dataSourceItem.database = "mydatabase";
        dataSourceItem.table = "northwindinvoicesparquet";
      }
      else if (dataSourceItem.id == "Collisions") {
        dataSourceItem.database = "mydatabase";
        dataSourceItem.table = "motor_vehicle_collisions_full_parquet";
      }
    }
    return dataSourceItem;
    }

const revealOptions = {
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
    dataSourceItemProvider: dataSourceItemProvider,
    localFileStoragePath: "data"
}

//add reveal sdk
app.use('/', reveal(revealOptions));

app.listen(56565, () => {
    console.log(`Reveal server accepting http requests`);
});