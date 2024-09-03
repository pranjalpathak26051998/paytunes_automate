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
    let count_line

    let id_username = process.env.username_staging;
    let id_password = process.env.password_staging;
    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    async function checkAndInputImpressions(checkboxXPath, inputXPath, impressionValue) {
        let checkbox = await driver.findElement(By.xpath(checkboxXPath));
        if (await checkbox.isSelected()) {
            await driver.findElement(By.xpath(inputXPath)).sendKeys(impressionValue);
            console.log(`${checkboxXPath} checkbox is marked true, therefore adding the impressions.`);
        } else {
            console.log(`${checkboxXPath} checkbox is marked false, therefore not adding the impressions.`);
        }
    };

    async function select_gender(genderXpath, inputGender) {
        console.log(genderXpath);
        const elementXpath = await driver.findElement(By.xpath(genderXpath))
        console.log(elementXpath)

        switch (inputGender) {
            case 0:
                await elementXpath.click();
                console.log("Selected gender is Male")
                break;

            case 1:
                await elementXpath.click();
                console.log("selected gender is Female")
                break;

            case 2:
                await elementXpath.click()
                console.log("Selected Gender is Both")
                break;

            case 3:
                await elementXpath.click()
                console.log("Selected gender is unspecified")
                break;

            default:
                console.log("No gender selected")
        }
    }
    // 0 = Male 
    // 1= Female
    // 2= Both 
    // 3= Unspecified
    

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

    it('open a new tab for campaign',async function () {
        //open a new tab
        await driver.executeScript('window.open()');
        console.log("new tab opened successfully");
        
    });

    it('handle all the functions of the window in a new tab',async function(){
        // handle all the functions of the window
        let newTabs = await driver.getAllWindowHandles();
        console.log("Automation server has access to all window handles");
        await driver.switchTo().window(newTabs[1]);
        await driver.sleep(1000);
        console.log("new tab opened successfully");

    });

    it('navigate to the new url of the campaign on a new tab',async function(){
        //navigate to the new url on new tab
        await driver.get(campaign_href_link);
        await driver.sleep(1500);
        console.log("switched to the new url on a new tab successfully");
        
    });

    it('Clicking on the general tab',async function(){
        //Clicking on the general tab
        await driver.wait(until.elementLocated(By.xpath("//a[text()='General']")), 1000).click();
        console.log("Clicked on General tab successfully");
        
    });

    it('Enter the publisher on campaign general page,,,',async function(){
        //Enter the publisher on campaign general page,,,
        // const publisher_xpath = "//div[@class='field-box field-publishers width2 ']//span[@class='selection']";
        const publisher_xpath = "//select[@name='publishers' and @id='id_publishers']"
        const publisher_name = "Saavn | Magnite";
        await driver.findElement(By.xpath(publisher_xpath)).sendKeys(publisher_name);
        await driver.sleep(2000);
        console.log("Publisher selected successfully");
        
    });

    it('enter the unique publisher reach',async function(){
        // enter the unique publisher reach
        let unique_publ_num = process.env.unique_publ_num
        await driver.findElement(By.xpath("//input[@id='id_committed_unique_reach']")).sendKeys(unique_publ_num);
        console.log(`unique publisher entered is ${unique_publ_num}`);
        await driver.sleep(1000);
        
    });

    it('Click on the Pricing tab',async function(){
         //Click on the Pricing tab
         await driver.findElement(By.xpath("//ul[@class='changeform-tabs']//a[text()='Pricing']")).click();
         console.log("Changed to Pricing Tab successfully");
         await driver.sleep(1000);
        
    });

    it('Check for podcast impressions',async function(){
        // Check for podcast impressions
        await checkAndInputImpressions(
            "//input[@id='id_podcast_campaign']",
            "//input[@id='id_total_impression_podcast']",
            "4000"
        );        
    });

    it('Check for audio impressions',async function(){
        // Check for audio impressions
        await checkAndInputImpressions(
            "//input[@id='id_audio_campaign']",
            "//input[@id='id_total_impression_audio']",
            "4000"
        );
        
    });

    it('Check for video impressions',async function(){
        // Check for video impressions
        await checkAndInputImpressions(
            "//input[@id='id_video_campaign']",
            "//input[@id='id_total_impression_video']",
            "4000"
        );        
    });

    it(' Check for connected TV impressions',async function(){
        // Check for connected TV impressions
        await checkAndInputImpressions(
            "//input[@id='id_connected_tv_campaign']",
            "//input[@id='id_total_impression_connected_tv']",
            "4000"
        );
    });

    it('Check for display ads impressions',async function(){
        // Check for display ads impressions
        await checkAndInputImpressions(
            "//input[@id='id_display_campaign']",
            "//input[@id='id_total_impression_display_retargeted_banner']",
            "4000"
        );
        
    });

    it('Check for Show Avg. CPM and add targeting banner companion',async function(){
       // Check for Show Avg. CPM and add targeting banner companion
        await checkAndInputImpressions(
            "//input[@type = 'checkbox' and @id='id_show_avg_cpm']",
            "//input[@id='id_total_impression_companion_banner']",
            "40000")
        console.log("Companion banner targeting value added successfully if marked true")
        await driver.sleep(1000)
        console.log("Entered pricing successfully executed")        
    });

    it('Move to the Targeting Tab',async function(){
        //Move to the Targeting Tab
        let targetingTabXpath = "//a[text()='Targeting']"
        await driver.findElement(By.xpath(targetingTabXpath)).click();
        await driver.sleep(3000)
        console.log("Switched to Targeting tab inline")
        
    });

    it('Marking the gender',async function(){
        // Marking the gender
        await select_gender(`//label[@for='id_gender_3']`, 3)
        await driver.sleep(1500)
        
    });

    it('Marking the age group',async function(){
        //Marking the age group
        const age_group = "Unspecified"
        // const age_group = "13-17"
        // const age_group = "18-24"
        // const age_group = "25-34"
        // const age_group = "35-44"
        // const age_group = "45+"
        const age_xpath = "//div[@class='form-row field-age']//span[@class='selection']//span//input"
        await driver.findElement(By.xpath(age_xpath)).click()
        await driver.findElement(By.xpath(`//li[@class='select2-results__option' and text() ='${age_group}']`)).click()
        // await driver.findElement(By.xpath(age_xpath)).sendKeys(age_group)
        console.log(`age group ${age_group} is selected`)
        await driver.sleep(1500);
    });

    it('Selecting Urban or rural or Both',async function(){
        //Selecting Urban or rural or Both
        const select_demo_type_xpath = "//div[@class='form-row field-urban_type']//div//div//div//label[@for='id_urban_type_2']//input"
        await driver.findElement(By.xpath(select_demo_type_xpath), 3000).click()
        console.log("Both(Urban and Rural) type selected");
        await driver.sleep(2000);
    });

    it('Entering Pincode',async function(){
        //Entering Pincode
        const Pincode_xpath = "//textarea[@name='pincode']"
        const pincodes_to_enter = "211010,110096,110098"
        await driver.findElement(By.xpath(Pincode_xpath)).sendKeys(pincodes_to_enter);
        await driver.sleep(1000);
        console.log("entered pincodes successfully ");
        
    });

    it('Moving to PCA page ',async function(){
        //Moving to PCA page 
        const move_to_pca_inline_xpath = "//a[@href='#/tab/module_6/' and text()='PCA']"
        await driver.findElement(By.xpath(move_to_pca_inline_xpath)).click()
        await driver.sleep(2000);
        console.log("Moved to PCA page successfully ")
        
    });

    it('click the default pca template drop-down',async function(){
        //click the default pca template drop-down 
        const default_pca_template_xpath = "//*[@id='campaign_form']/div/fieldset[7]/div[1]/div/div/span/span[1]/span/span[2]/b"
        await driver.findElement(By.xpath(default_pca_template_xpath)).click()
        await driver.sleep(2000);
        console.log("Clicked on tge default pca template drop-down opened successfully")
        
    });

    it('select and click to select pca template',async function(){
        //select and click to select pca template
        const pca_template = "PCA - 3"
        const select_pca_xpath = `//*[@class='select2-results__option' and text() ='${pca_template}']`
        await driver.findElement(By.xpath(select_pca_xpath)).click()
        console.log("pca template selected successfully");
        await driver.sleep(2000);        
    });

    it('clicking on Line items page inline',async function(){
        //clicking on Line items page inline
        const line_item = "Line Items"
        const line_item_xpath = `//a[text()='${line_item}']`
        await driver.findElement(By.xpath(line_item_xpath)).click()
        await driver.sleep(2000)
        console.log("Line item selected successfully")
    });

    it('getting the count of line items',async function(){
        //getting the count of line items 
        count_line = await driver.findElement(By.id("id_lineitems-TOTAL_FORMS")).getAttribute("value")
        console.log(count_line + " no. of line items")
        
    });

    it('clicking on add another line item',async function(){
        //clicking on add another line item       

        const add_another_line_item_xpath = "//a[text()='Add another Line Item']"
        await driver.findElement(By.xpath(add_another_line_item_xpath)).click()
        await driver.sleep(1500)
        console.log("Clicked to add another Line item")
        
    });

    it('Completing the Line Item Details',async function(){
        const remove_inline_xpath = "//a[@class='inline-deletelink']"
        const remove_inline_available = await driver.findElement(By.xpath(remove_inline_xpath))
        console.log(" remove inline line item option found successfully")
        // ---------------------------------------------------------------------------------------------------------------------------------------------


        if (!remove_inline_available) {
            console.log("click to add another line item option")
        }
        else {

            console.log("remove option available therefore begin filling line item details")

            //marking the line item active
            const active_checkBox_xpath = `//*[@id='lineitems-${count_line}']/fieldset/div[1]/div[1]/label`
            await driver.findElement(By.xpath(active_checkBox_xpath)).click()
            await driver.sleep(1000)
            console.log("Marked the Line item active = true")

            // enter line item name 
            const line_item_name_xpath = `//*[@id='id_lineitems-${count_line}-name']`
            const line_item_name = "p-testLineItemAutomation"
            await driver.findElement(By.xpath(line_item_name_xpath)).sendKeys(line_item_name)
            await driver.sleep(2000)
            console.log("Line item name entered successfully")

            // enter c-line item name
            const c_line_item_xpath = `//*[@id='id_lineitems-${count_line}-c_line_item_name']`
            const c_line_item_name = line_item_name
            await driver.findElement(By.xpath(c_line_item_xpath)).sendKeys(c_line_item_name)
            await driver.sleep(2000)
            console.log("c_line_item name entered successfully")

            // click on the line item type drop down to select the line item type
            const line_item_type_drop_down = `//*[@id='lineitems-${count_line}']/fieldset/div[1]/div[4]/span/span[1]/span/span[2]`
            // await driver.findElement(By.xpath(line_item_type_drop_down)).click()
            // await driver.sleep(1000)
            // console.log("clicked on line item type drop down successfully")

            //selecting the line item type
            const line_item_type_selected = "audio_with_companion"
            const line_item_type_selected_xpath = `//li[@id="select2-id_lineitems-${count_line}-line_item_type-result-fmsb-audio_with_companion" and text()='Audio with companion']`
            await driver.findElement(By.xpath(line_item_type_drop_down)).sendKeys(line_item_type_selected)
            await driver.sleep(2000)
            console.log(` the selected line item type from the drop down = ${line_item_type_selected}`)

            
            //selecting the c-line item type
            const c_line_item_type_selected = "Display"
            const c_line_item_type_selected_xpath= `//*[@id='id_lineitems-${count_line}-c_line_item_type']`
            await driver.findElement(By.xpath(c_line_item_type_selected_xpath)).sendKeys(c_line_item_type_selected)
            await driver.sleep(2000)
            console.log(` the selected line item type from the drop down = ${c_line_item_type_selected}`)
        }
        
    });

    it('//clicking on save and continue',async function(){
        //clicking on save and continue
        const save_and_continue_button_xpath=`//*[@id="campaign_form"]/div/div[7]/input[2]`
        await driver.findElement(By.xpath(save_and_continue_button_xpath)).click()
        await driver.sleep(2000);
        console.log("Clicked on Save and Continue successfully ")
        console("Line item created successfully")
        
    });

    // it('',async function(){
        
    // });

    // it('',async function(){
        
    // });

    // it('',async function(){
        
    // });
}).timeout(90000);
