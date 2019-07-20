const express = require('express');
let func=require('../logic')
let router = express.Router();
router.get('/', function(req, res){
  res.render('home');
});
router.get('/prodhome', function(req, res){
  res.render('prodhome');
});
router.get('/ocd', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCD_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'Sales Order Production'});
};
});
router.get('/glbq', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('GLBQ_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title: 'Quotes Production'});
};
});
router.get('/istoremmi', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('MMI_ISTR_A0_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title:'Istore MMI'});
};
});
router.get('/istorermt', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('RMT_ISTR_A0_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title: 'Istore RMT'});
};
});
router.get('/rmtra', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCD_RA_A0_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title: 'RMT RA'});
};
});
router.get('/traxprod', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('TRAX_Prod_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'Trax Production'});
};
});
router.get('/wccocm', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('WCC_OCM_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title:'WCC OCM'});
};
});
router.get('/jdiquote', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('JDI_GLBQ_Prod_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors, title:'JDI Quote Production'});
};
});
router.get('/jdiorder', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('JDI_GSOF_PROD_A1_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title: 'JDI Sales Order Production'});
};
});
router.get('/crm', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('CRM_Prod_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title:'CRM'});
};
});
router.get('/newcrm', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('CRM_PRD_A0_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'New CRM'});
};
});
router.get('/wccedocs', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('WCC_A1_eDOC_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'WCC EDOCS'});
};
});
router.get('/wccedocsdb', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('WCC_A1_eDOCdb_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'WCC EDOCSDB'});
};
});
router.get('/wccedocsextranet', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('WCC_A1_eDOCExtra_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'WCC EDOCS Extranet'});
};
});
router.get('/wccocmmmidocs', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('WCC_A1_MMIDOC_Launch_To_Close');
  res.render('ocd',{data : data, colors : dynamicColors,title :'WCC MMIDOCS'});
};
});
module.exports = router;
async function dataCreation(transaction){
  let dates= await func.getDates(transaction);
  let locations=await func.getLocations(transaction);
  let elapsedTime=await func.getdata(transaction);
  return {
    dates: dates,
    locations: locations,
    elapsedTime: elapsedTime
  };
}
var dynamicColors = function() {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          //console.log("rgb(" + r + "," + g + "," + b + ")");
          return "rgba(" + r + "," + g + "," + b + ",0.5)";
       };
