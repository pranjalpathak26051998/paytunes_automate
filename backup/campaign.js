// const { Driver } = require("selenium-webdriver/chrome");
// const { create_RO } = require("../tests/ro");
const { Builder, Browser, By, value } = require('selenium-webdriver');
require('dotenv').config();
// const fs = require('fs');
// const chai = require('chai')
// const path = require('path')
// const expect = chai.expect

(async function instanceCampaignElements() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    console.log("Driver has accessed the chrome browser")
    try {
        // accessing the website for extracting cookies 
        let website_url = "https://staging-connect.paytunes.in/agency/campaign/campaign/XgiLVna5wnbCMyRxBivSfC/change/"
        await driver.get(website_url);
        console.log("website url of campaign accessed successfully");

        //signin process

        let id_username = process.env.username_staging;
        let id_password = process.env.password_staging;

        //enter username 
        await driver.findElement(By.id("id_username")).clear();
        await driver.findElement(By.id('id_username')).sendKeys(id_username);
        console.log("username entered correctly " + id_username);
        await driver.sleep(1000);
        //enter password
        await driver.findElement(By.id("id_password")).clear();
        await driver.findElement(By.id("id_password")).sendKeys(id_password);
        console.log("the password entered is successfully " + id_password);
        await driver.sleep(1000);

        //login to the site
        // await driver.findElement(By.css('input[value="LOGIN]')).click();
        await driver.findElement(By.xpath("//form[@id='login-form']//input[@type = 'submit' and @value='LOGIN']")).click();
        console.log("clicked successfully")
        await driver.sleep(1000);

        //now enter Agency 
        await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
        // await driver.findElement(By.withTagName("h2 = Agency"));
        console.log("clicked on agency successfully");
        await driver.sleep(1000);

        //clicking on the See All ROs link
        await driver.findElement(By.xpath("//a[text()='See All ROs']")).click();
        console.log("Clicked on the  See All ROs link successfully");
        await driver.sleep(2000);
        let ro_num = "APPLE180720247"
        await driver.findElement(By.id("searchbar")).clear()
        await driver.findElement(By.id("searchbar")).sendKeys(ro_num);
        await driver.sleep(1000);
        console.log("Ro number entered in the searchbar");
        await driver.findElement(By.xpath("//input[@type='submit']")).click()
        console.log("Clicked on search button successfully");
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//th[@class='field-id']//a")).click();
        console.log("Clicked on the RO id successfully")
        await driver.sleep(1000);

        //url_to_open_on_newTab 
        let url_on_new_tab = "https://staging-connect.paytunes.in/agency/campaign/campaign/EVnrTwrYSMcjCRBKLZnAyA/change/"
        // EVnrTwrYSMcjCRBKLZnAyA
        // XgiLVna5wnbCMyRxBivSfC    --original
        //open a new tab
        await driver.executeScript('window.open()');
        console.log("new tab opened successfully");
        // handle all the functions of the window
        let newTabs = await driver.getAllWindowHandles();
        console.log("Automation server has access to all window handles");
        await driver.switchTo().window(newTabs[1]);
        await driver.sleep(1000);
        console.log("new tab opened successfully");
        //navigate to the new url on new tab
        await driver.get(url_on_new_tab);
        await driver.sleep(2500);
        console.log("switched to the new url on a new tab successfully");

        //now completing the campaign 

        // click on the publisher texarea to enter the publisher--------not tested yet, may be error would occur
        let enter_publisher_xpath = "//div//select[@name='publishers' and @id = 'id_publishers']"

        // await driver.findElement(By.xpath(enter_publisher_xpath)).click();
        await driver.sleep(1500);

        // enter publisher to be selected
        let publisher_to_select = "Saavn | magnite"
        await driver.findElement(By.xpath(enter_publisher_xpath)).sendKeys(publisher_to_select);
        console.log("Publisher entered successfully")
        await driver.sleep(1000);
        // enter the unique publisher reach
        let unique_publ_num = process.env.unique_publ_num
        await driver.findElement(By.xpath("//input[@id='id_committed_unique_reach']")).sendKeys(unique_publ_num);
        console.log(`unique publisher entered is ${unique_publ_num}`)
        await driver.sleep(1000);
        //input[@id='id_committed_unique_reach']

        //Click on the Pricing tab
        await driver.findElement(By.xpath("//ul[@class='changeform-tabs']//a[text()='Pricing']")).click();
        console.log("Changed to Pricing Tab successfully")
        await driver.sleep(1000);

        //creating a function so that to check whether checkbox isSelected()  whereas isSelected()
        // isSelected() method is intended for form elements like <input>, <select>, and <option>.
        async function checkAndInputImpressions(checkboxXPath, inputXPath, impressionValue) {
            let checkbox = await driver.findElement(By.xpath(checkboxXPath));
            if (await checkbox.isSelected()) {
                await driver.findElement(By.xpath(inputXPath)).sendKeys(impressionValue);
                console.log(`${checkboxXPath} checkbox is marked true, therefore adding the impressions.`);
            } else {
                console.log(`${checkboxXPath} checkbox is marked false, therefore not adding the impressions.`);
            }
        }

        // Check for podcast impressions
        await checkAndInputImpressions(
            "//input[@id='id_podcast_campaign']",
            "//input[@id='id_total_impression_podcast']",
            "4000"
        );

        // Check for audio impressions
        await checkAndInputImpressions(
            "//input[@id='id_audio_campaign']",
            "//input[@id='id_total_impression_audio']",
            "4000"
        );

        // Check for video impressions
        await checkAndInputImpressions(
            "//input[@id='id_video_campaign']",
            "//input[@id='id_total_impression_video']",
            "4000"
        );

        // Check for connected TV impressions
        await checkAndInputImpressions(
            "//input[@id='id_connected_tv_campaign']",
            "//input[@id='id_total_impression_connected_tv']",
            "4000"
        );

        // Check for display ads impressions
        await checkAndInputImpressions(
            "//input[@id='id_display_campaign']",
            "//input[@id='id_total_impression_display_retargeted_banner']",
            "4000"
        );

        // Check for Show Avg. CPM and add targeting banner companion
        await checkAndInputImpressions(
            "//input[@type = 'checkbox' and @id='id_show_avg_cpm']",
            "//input[@id='id_total_impression_companion_banner']",
            "40000")
        console.log("Companion banner targeting value added successfully if marked true")
        // await check_box_mark_publisherNum()
        await driver.sleep(1000)
        console.log("Entered pricing successfully executed")
        //Move to the Targeting Tab
        let targetingTabXpath = "//a[text()='Targeting']"
        await driver.findElement(By.xpath(targetingTabXpath)).click();
        await driver.sleep(2000)
        console.log("Switched to Targeting tab inline")

        //Marking the Gender 

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

        // selecting Male
        // const input_gender_code = "3"
        await select_gender(`//label[@for='id_gender_3']`, 3)
        await driver.sleep(1500)
        // //extracting the cookies
        // let cookies = await driver.manage().getCookies();
        // fs.writeFileSync('cookies.json',JSON.stringify(cookies));
        // console.log(cookies)

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
        await driver.sleep(3000);
        //Selecting Urban or rural or Both
        const select_demo_type_xpath = "//div[@class='form-row field-urban_type']//div//div//div//label[@for='id_urban_type_2']//input"
        await driver.findElement(By.xpath(select_demo_type_xpath), 3000).click()
        console.log("Both(Urban and Rural) type selected");
        await driver.sleep(2000);
        //Entering Pincode
        const Pincode_xpath = "//textarea[@name='pincode']"
        const pincodes_to_enter = "211010,110096,110098"
        await driver.findElement(By.xpath(Pincode_xpath)).sendKeys(pincodes_to_enter);
        await driver.sleep(1000);
        console.log("entered pincodes successfully ");

        //Moving to PCA page 
        const move_to_pca_inline_xpath = "//a[@href='#/tab/module_6/' and text()='PCA']"
        await driver.findElement(By.xpath(move_to_pca_inline_xpath)).click()
        await driver.sleep(2000);
        console.log("Moved to PCA page successfully ")
        //click the default pca template drop-down 
        const default_pca_template_xpath = "//*[@id='campaign_form']/div/fieldset[7]/div[1]/div/div/span/span[1]/span/span[2]/b"
        await driver.findElement(By.xpath(default_pca_template_xpath)).click()
        await driver.sleep(2000);
        console.log("Clicked on tge default pca template drop-down opened successfully")
        //select and click to select pca template
        const pca_template = "PCA - 3"
        const select_pca_xpath = `//*[@class='select2-results__option' and text() ='${pca_template}']`
        await driver.findElement(By.xpath(select_pca_xpath)).click()
        console.log("pca template selected successfully");
        await driver.sleep(2000);

        //clicking on Line items page inline
        const line_item = "Line Items"
        const line_item_xpath = `//a[text()='${line_item}']`
        await driver.findElement(By.xpath(line_item_xpath)).click()
        await driver.sleep(2000)
        console.log("Line item selected successfully")

        //getting the count of line items 
        let count_line = await driver.findElement(By.id("id_lineitems-TOTAL_FORMS")).getAttribute("value")
        console.log(count_line + " no. of line items")



        //clicking on add another line item       

        const add_another_line_item_xpath = "//a[text()='Add another Line Item']"
        await driver.findElement(By.xpath(add_another_line_item_xpath)).click()
        await driver.sleep(1500)
        console.log("Clicked to add another Line item")




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
            const select_line_item_type_xpath=`//*[@id='id_lineitems-${count_line}-line_item_type']`

            // await driver.findElement(By.xpath(line_item_type_drop_down)).click()
            // await driver.sleep(1000)
            // console.log("clicked on line item type drop down successfully")

            //selecting the line item type
            const line_item_type_selected = "audio_with_companion"
           
            await driver.findElement(By.xpath(select_line_item_type_xpath)).sendKeys(line_item_type_selected)
            await driver.sleep(2000)
            console.log(` the selected line item type from the drop down = ${line_item_type_selected}`)

            //selecting the c-line item type
            const c_line_item_type_selected = "Display"
            const c_line_item_type_selected_xpath= `//*[@id='id_lineitems-${count_line}-c_line_item_type']`
            await driver.findElement(By.xpath(c_line_item_type_selected_xpath)).sendKeys(c_line_item_type_selected)
            await driver.sleep(2000)
            console.log(` the selected line item type from the drop down = ${c_line_item_type_selected}`)
        }
        //clicking on save and continue
        const save_and_continue_button_xpath=`//*[@id="campaign_form"]/div/div[7]/input[2]`
        await driver.findElement(By.xpath(save_and_continue_button_xpath)).click()
        await driver.sleep(2000);
        console.log("Clicked on Save and Continue successfully ")
        console("Line item created successfully")


    }
    catch (error) {
        console.log(`the error fetched ${error.message} `);

    } finally {
        await driver.quit()
    }
})();

