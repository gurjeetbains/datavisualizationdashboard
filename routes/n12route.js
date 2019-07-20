const express = require('express');
let func=require('../logic')
let router = express.Router();
router.get('/N12home', function(req, res){
  res.render('N12home');
});
router.get('/ocdn12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCDN12_A1_Launch_To_Close');
  res.render('ocdn12',{data : data, colors : dynamicColors,title:'Sales Order N12'});
};
});
router.get('/glbqn12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('GLBQN12_A1_Launch_To_Close');
  res.render('ocdn12',{data : data, colors : dynamicColors,title:'Quotes N12'});
};
});
router.get('/jdiquoten12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('JDI_GLBQ_N12_A1_Launch_To_Close');
  res.render('ocdn12',{data : data, colors : dynamicColors,title :'JDI Quotes N12'});
};
});
router.get('/jdiordern12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('JDI_GSOF_N12_A1_Launch_To_Close');
  res.render('ocdn12',{data : data, colors : dynamicColors,title:'JDI Sales Order N12'});
};
});
router.get('/traxn12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('TRAX_N12_A1_Launch_To_Close');
  res.render('ocdn12',{data : data, colors : dynamicColors,title:'TRAX N12'});
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
