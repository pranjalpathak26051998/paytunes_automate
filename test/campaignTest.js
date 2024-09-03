const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const mocha = require('mocha');
require('dotenv').config();
const { create_RO } = require('../tests/ro');

describe('RO and Campaign end-to-end', function() {
    let driver;
    let website_url = 'https://staging-connect.paytunes.in/';
    let ro_id;
    let campaign_href_link

    let id_username = process.env.username_staging;
    let id_password = process.env.password_staging;
    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        console.log("Driver accessed successfully");

        // Fetching RO creation before other tests
        let ro_no;
        async function getro() {
            ro_no = await create_RO();
            console.log("RO created:", ro_no);
            return ro_no;
        }

        ro_no = await getro(); // Await the asynchronous function
        if (ro_no) {
            ro_id = ro_no.RO_no_search_part;
            console.log("RO number fetched successfully:", ro_id);
        } else {
            throw new Error("RO creation failed.");
        }
    });

    after(async function () {
        await driver.quit();
        console.log("Closed WebDriver instance.");
    });

 

    it('should load the STAGING PayTunes website', async function () {
        await driver.get(website_url);
        console.log("Website fetched and loaded successfully");
        
    });

    it('Enter the username', async function () {
        await driver.findElement(By.id("id_username")).clear();
        await driver.findElement(By.id('id_username')).sendKeys(id_username);
        console.log("Username entered correctly: " + id_username);
        await driver.sleep(1000);
    });

    it('Enter the password', async function () {
        await driver.findElement(By.id("id_password")).clear();
        await driver.findElement(By.id("id_password")).sendKeys(id_password);
        console.log("Password entered successfully: " + id_password);
        await driver.sleep(1000);
    });

    it('Click on sign-in button to sign in to the site', async function () {
        await driver.findElement(By.xpath("//form[@id='login-form']//input[@type='submit' and @value='LOGIN']")).click();
        console.log("Sign-in button clicked successfully");
        await driver.sleep(1000);
    });

            
    // await if(ro_id){
    //     console.log(" the RO Check is successfull")
    // }
    // else{
    //     console.log("RO check failed")
    // }


    it('Find, click, and enter on Agency', async function () {
        await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
        console.log("Clicked on Agency successfully");
        await driver.sleep(1000);
    });

    it('clicking on see all ROs ',async function(){
                //clicking on the See All ROs link
        await driver.findElement(By.xpath("//a[text()='See All ROs']")).click();
        console.log("Clicked on the  See All ROs link successfully");
        await driver.sleep(1000);
    });

    it('Entering the RO to be picked',async function(){
        //Enter the RO to be opened for creating campaign using searchbar;
        await driver.findElement(By.xpath('//input[@id="searchbar"]')).sendKeys(ro_id);
        console.log("RO for creating campaign filtered successfully");
        await driver.sleep(1000);
    });

    it('Clicking on the search button to search the RO', async function(){
                //click on the Search button 
        await driver.findElement(By.xpath('//input[@value="Search"]')).click()
        await driver.sleep(1000);
        console.log("Search button clicked successfully");

    });

    it('click on the id to open the detailed page of the RO for creating campaign', async function(){
        //click on the id to open the detailed page of the RO for creating campaign
        await driver.findElement(By.xpath("//th[@class='field-id']//a[@href]")).click();
        await driver.sleep(2000);
        console.log("Successfully opened the detailed page of the RO where Campaign has to be created");
    });

    it('find the Campaign inline and click open', async function(){
        //find the Campaign inline and click open
        await driver.findElement(By.xpath("//a[text()='Campaign ro budget']")).click();
        await driver.sleep(1000);
        console.log("Clicked on campaign inline successfully");
    });

    it('find and click on add another campaign for adding new campaign',async function(){
                //find and click on add another campaign for adding new campaign
        await driver.findElement(By.xpath("//a[text()='Add another Campaign ro budget']")).click();
        await driver.sleep(1000);
        console.log("Successfully clicked on add another campaign href ");

    });

    it(`creating a formatted date function for using today's date as a start date for campaign`,async function(){
                //creating a formatted date function for using today's date as a start date for campaign
        return  getFormattedDate();
       
    });
    // getFormattedDate()
//-----------------------------------resolve for start and end date ----------------------------------------
    it('entered start date',async function(){
        let for_start_date =await getFormattedDate()
        //entered start date
        await driver.findElement(By.xpath("//input[@name='ro_campaigns_budget-0-start_date' and @class='vDateField hasDatepicker']")).sendKeys(for_start_date);
        await driver.sleep(1000);
        console.log("start date entered successfully");        
    });

    it('entered the end date',async function(){
        let for_end_date = getFormattedDate();
        console.log(for_end_date);
        // let end_date='2024-04-01';
        await driver.findElement(By.xpath("//input[@name='ro_campaigns_budget-0-end_date' and @class='vDateField hasDatepicker']")).sendKeys(for_end_date);
        await driver.sleep(2000);
        console.log("Entered end date successfully");        
    });
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
    it('select campaign type (here select all)',async function(){
        //select campaign type (here select all)
        await driver.findElement(By.xpath("//div[@class='form-row field-campaign_type']//span[@class='select2-selection select2-selection--multiple']")).click();
        await driver.findElement(By.xpath("//a[text()='select all']")).click();
        await driver.sleep(2000);
        console.log("Campaign type selected = select all");
        
    });

    it('enter the budget',async function(){
        // enter the budget
        let campaign_budget = 600000;
        await driver.findElement(By.xpath("//input[@name='ro_campaigns_budget-0-budget' and @type='number']")).sendKeys(campaign_budget);
        await driver.sleep(2000);
        console.log("budget for the campaign entered successfully");
        
    });

    it('Click on show average CPM',async function(){
        //Click on show average CPM
        await driver.findElement(By.xpath("//label[@for='id_ro_campaigns_budget-0-show_avg_cpm']"), 2000).click();
        console.log("Show average CPM budget selected successfully");
        
    });

    it('Click to show average CLient BUdget',async function(){
        // Click to show average CLient BUdget
        await driver.findElement(By.xpath("//label[@for='id_ro_campaigns_budget-0-show_client_budget']")).click();
        console.log("Show average client budget selected successfully");
        
    });

    it('Click on Save and continue to create campaign',async function(){
        //Click on Save and continue to create campaign
        await driver.findElement(By.xpath("//input[@value='Save and continue editing']")).click();
        console.log("Campaign Created Successfully");
        await driver.sleep(2000)        
    });

    it('getting the href link', async function () {
        //Getting the href link 

        campaign_href_link = await driver.findElement(By.xpath("//table[@class='dataframe data-frame']//td//a")).getAttribute("href");
        console.log(`the href link ${campaign_href_link}`);
    });
}).timeout(90000);
