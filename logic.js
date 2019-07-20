const sql = require("mssql");
const configurations =  require('./config/configurations');
let monthNames = [
   "Jan", "Feb", "Mar",
   "Apr", "May", "Jun", "Jul",
   "Aug", "Sep", "Oct",
   "Nov", "Dec"
 ];
let config = configurations.databaseConfig;
let connectToDataBase = async function (){
  const pool =await new sql.ConnectionPool(config);
  await pool.connect();
  return pool;
}
let getDates=async function(transaction,defaultdays=150){
  let connection = await connectToDataBase();
  let transactionName=transaction;
  let days=defaultdays;
  let dates = await connection.query`SELECT  DISTINCT CAST(DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') AS DATE) As StartDate FROM transactiondetailsview
				 where TransactionName=${transactionName}
                  AND DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days}  as date) order by StartDate ASC`
  let datesData=dates.recordset.map(function (element){
    let year = (element.StartDate.getFullYear())%100;
    let monthIndex = element.StartDate.getMonth();
    let day = element.StartDate.getDate();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  });
  return datesData;
}
let getLocations=async function(transaction,defaultdays=150){
  let connection = await connectToDataBase();
  let transactionName=transaction;
  let days=defaultdays;
  let locations = await connection.query`SELECT DISTINCT LocationName FROM transactiondetailsview where TransactionName=${transactionName}
                  AND DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days} as date) order by LocationName ASC`
let locationData=locations.recordset.map(function (element){
  return element.LocationName;
});
  return locationData;
}
let getdata =async function (transaction,defaultdays=150){
  let connection = await connectToDataBase();
  let transactionName=transaction;
  let days=defaultdays;
  let result = await connection.query`SELECT --LocationName
      --,StartDate,
       CASE WHEN EXISTS (SELECT 1 FROM TransactionDetailsView c WHERE TransactionName=${transactionName}
                  AND GiveupTime<>ElapsedTime AND DATEADD(second,c.StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days} as date) AND CAST(DATEADD(second,c.StartTimeUTC, '1970/01/01 00:00:00') AS DATE) = t1.StartDate AND c.LocationName = t1.LocationName)
             THEN (SELECT AVG(ElapsedTime/1000) FROM TransactionDetailsView c WHERE TransactionName=${transactionName}
                  AND GiveupTime<>ElapsedTime AND DATEADD(second,c.StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days} as date) AND CAST(DATEADD(second,c.StartTimeUTC, '1970/01/01 00:00:00') AS DATE) = t1.StartDate AND c.LocationName = t1.LocationName)
             ELSE -1 end as ElapsedTime
FROM
(
SELECT *
FROM
(SELECT  DISTINCT CAST(DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') AS DATE) As StartDate FROM transactiondetailsview
				 where TransactionName=${transactionName}
                  AND DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days} as date)) a
,(SELECT DISTINCT LocationName FROM transactiondetailsview where TransactionName=${transactionName}
                  AND DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') >cast(getdate() - ${days} as date)) b
) t1
ORDER BY LocationName,StartDate`
  let elapsedTimeData=result.recordset.map(function (element){
    return element.ElapsedTime;
  });
  return elapsedTimeData;
}
let func ={
  getDates : getDates,
  getLocations : getLocations,
  getdata : getdata
 }
module.exports=func;
