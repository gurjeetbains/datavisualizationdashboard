const express = require('express');
let func=require('../logic')
let router = express.Router();
router.get('/n1home', function(req, res){
runs();
async function runs(){
  res.render('n1home');
};
});
router.get('/sanityltc', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCD_HCK_A0_Launch_To_Close');
  res.render('ocdn1',{data : data, colors : dynamicColors,title: 'Sanity LTC'});
};
});
router.get('/sanitycopy', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCD_HCK_A2_Copy_Order');
  res.render('ocdn1',{data : data, colors : dynamicColors,title:'Order Copy Sanity'});
};
});
router.get('/3051sfasanity', function(req, res){
runs();
async function runs(){
  let data =await dataCreation('OCD_HCK_A3_Config_3051SFA');
  res.render('ocdn1',{data : data, colors : dynamicColors,title:'Config R3051SFA'});
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
