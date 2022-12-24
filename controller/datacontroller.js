import asyncHandler from "express-async-handler";
import pkg from "xlsx";
const getcsvdata = asyncHandler(async (req, res) => {
  const pageSize=10
  const page=Number(req.query.page) ||1;
  const sort=Number(req.query.sort) || 0;  //0 for descending,1 for ascending
  const search=req.query.search || "";
  const type=req.query.type || "";
  const { readFile,utils } = pkg;
let dataPathExcel = "./data/Transactions.xlsx"
let wb = readFile(dataPathExcel);
let sheetName = wb.SheetNames[0]
let sheetValue = wb.Sheets[sheetName];
//console.log(sheetValue);
var excelData =await utils.sheet_to_json(sheetValue);
let searchdata=await excelData;
let count=await excelData.length;
//searching
if(search !==""){
  searchdata=await searchdata.filter((data)=>data.Address===search)
  count=await searchdata.length
}
//sorting
if(sort ===0){
 searchdata=await searchdata.sort(({Amount:a}, {Amount:b}) => b-a);
}
else {
  searchdata=await searchdata.sort(({Amount:a}, {Amount:b}) => a-b);
}
//pagination
let startIndex=await pageSize *(page-1)
let endIndex=await pageSize *page
searchdata=await searchdata.slice(startIndex,endIndex)
//pdf data
if(type ==="pdf"){
  searchdata= await excelData;
  count=await excelData.length;
}
res.send({
  data:searchdata,
  count,
  message:"xlsx to json data"
})
  });
  export {getcsvdata}