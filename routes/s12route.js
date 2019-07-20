const express = require('express');
let func=require('../logic')
let router = express.Router();
router.get('/S12home', function(req, res){
  res.render('S12home');
});
router.get('/ocds12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCDS12_A1_Launch_To_Close');
  res.render('ocds12',{data : data, colors : dynamicColors,title:'Sales Order S12'});
};
});
router.get('/glbqs12', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('GLBQS12_A1_Launch_To_Close');
  res.render('ocds12',{data : data, colors : dynamicColors,title:'Quotes S12'});
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
