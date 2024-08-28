const {ExtentReports, ReportAggregator}= require('extent');
const path = require('path');
//defining the path for HTML report
const reportPath = path.join(__dirname, 'report','extent-report.html');

//create ExtentReports instance
const extent = new ExtentReports(reportPath);

module.exports = extent;