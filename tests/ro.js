require('dotenv').config();
const {
  Builder,
  value,
  Browser,
  By,
  Key,
  Until,
  withTagName,
  until,
} = require("selenium-webdriver");
const fs = require("fs");

// function inner(){
async function test() {
  return 1;
}
async function create_RO() {
  let ro_store_array_DS = [];
  //Created an instance of the Chrome Webdriver
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  console.log("Created an instance of the Chrome Webdriver");
  try {
    //navigating to the website
    // https://dev-connect.paytunes.in/    --> on dev
    // https://staging-connect.paytunes.in/  --> on staging
    let website_url = "https://staging-connect.paytunes.in/";
    // let website_url='https://dev-connect.paytunes.in/';

    await driver.get(website_url);
    await driver.sleep(1000);
    //get the actual title of the page
    let title = await driver.getTitle();
    //Print the title of the page
    console.log("the title of the page = " + title);

    //signin process
    // pranjal.p+1@paytunes.in     --> on dev
    // pranjal.p+pranjalstgAdmin@paytunes.in   --> on staging
    // let id_username = "pranjal.p+1@paytunes.in";
    // let id_password = "Pravas@200";
    // let id_username = "pranjal.p+pranjalstgAdmin@paytunes.in";
    let id_username= process.env.username_staging;
    // let id_password = process.env.username_password;
    console.log("username fetched successfully from .env file ");
    // let id_password = "Pravas@200";
    let id_password = "user@123";
    
    //enter username
    await driver.findElement(By.id("id_username")).clear();
    await driver.findElement(By.id("id_username")).sendKeys(id_username);
    console.log("username entered correctly " + id_username);
    await driver.sleep(1000);
    //enter password
    await driver.findElement(By.id("id_password")).clear();
    await driver.findElement(By.id("id_password")).sendKeys(id_password);
    console.log("the password entered is successfully " + id_password);
    await driver.sleep(1000);

    //login to the site
    // await driver.findElement(By.css('input[value="LOGIN]')).click();
    await driver
      .findElement(
        By.xpath(
          "//form[@id='login-form']//input[@type = 'submit' and @value='LOGIN']"
        )
      )
      .click();
    console.log("clicked successfully");
    await driver.sleep(1000);

    //now enter Agency
    await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
    // await driver.findElement(By.withTagName("h2 = Agency"));
    console.log("clicked on agency successfully");
    await driver.sleep(1000);

    //search for create ro
    await driver.findElement(By.css("a[href='/agency/order/ro/add/']")).click();
    console.log("clicked on create ro button successfully");
    await driver.sleep(1000);

    // search for client
    //form[@id='login-form']//input[@type='submit' and @value='LOGIN']
    let clientClick = await driver.findElement(
      By.xpath("//span[@dir='ltr' and @style='width: auto;']")
    ); //.click() //.sendKeys("P-testingClient2")   //.click();
    await clientClick.click();
    console.log("clicked on client successfully");
    // await clientClick.getText("P-testingClient2").click();
    // console.log("selected P-testingClient2 successfully");

    await driver.sleep(1000);
    // let selected_client = 'p-testClient';
    let selected_client = process.env.client_to_be_selected;
    // p-testClient
    selected_client_xpath = `//ul[@id='select2-id_releasing_company-results']//li[text()='${selected_client}']`;
    await driver.findElement(By.xpath(selected_client_xpath)).click(); //important to select from the drop-down

    await driver.sleep(1000);
    console.log("client selected successfully");
    //selecting the ro file to upload
    let file_to_upload = process.env.file_to_upload;
    await driver
      .findElement(By.id("id_release_order"))
      .sendKeys(file_to_upload);
    console.log("file uploaded successfully");

    //clicking the client_contact container;

    await driver
      .findElement(
        By.xpath(
          "//span[@class='select2-selection__rendered' and @id='select2-id_contact-container']"
        )
      )
      .click();
    await driver.sleep(1000);
    console.log("client contact container clicked successfully");

    //selecting the client_contact from the container
    // let client_contacted = "tessting@tessting.tessting | p-testClient"
    let client_contacted = process.env.contacted_client;
    // tessting@tessting.tessting | p-testClient
    let client_contact_xpath = `//ul[@class='select2-results__options']//li[text()='${client_contacted}']`;
    await driver.findElement(By.xpath(client_contact_xpath)).click();
    await driver.sleep(1000);
    console.log(
      "successfully clicked on the client to be connected from the container"
    );

    // clicking on the brand drop-down
    await driver
      .findElement(By.xpath("//span[@id='select2-id_brand-container']"))
      .click();
    console.log("clicked on the brand drop-down successfully");
    await driver.sleep(1000);
    //Selecting the brand
    // let brand_selected = 'amul';
    let brand_selected = process.env.selected_brand;
    // amul
    let brand_selected_xpath = `//ul[@id='select2-id_brand-results']//li[text()='${brand_selected}']`;
    await driver.findElement(By.xpath(brand_selected_xpath)).click();
    await driver.sleep(1000);
    console.log("Brand Apple selected successfully");
    //RO container click

    await driver
      .findElement(By.xpath("//span[@id='select2-id_type-container']"))
      .click();
    await driver.sleep(1000);
    console.log("Clicked successfully on the RO drop-down");

    //selecting RO option in the RO drop-down;
    let option_from_ro_dropDown = "RO";
    let option_from_ro_dropDown_xpath = `//ul[@id='select2-id_type-results']//li[text()='${option_from_ro_dropDown}']`;
    await driver.findElement(By.xpath(option_from_ro_dropDown_xpath)).click();
    await driver.sleep(1000);
    console.log("Successfully clicked and selected the option RO");

    //clicking on the date input field for selecting the date for the RO
    let input_date = "2024-07-18";
    await driver
      .findElement(By.xpath("//input[@class='vDateField hasDatepicker']"))
      .sendKeys(input_date);
    //   await driver.sleep(1000);
    console.log("RO date selected successfully");
    //entering the budget for creating an RO
    let ro_budget = process.env.ro_budget;
    await driver
      .findElement(By.xpath("//input[@id='id_value']"))
      .sendKeys(ro_budget);
    await driver.sleep(1000);
    console.log("RO budget entered successfully");

    //saving the RO and creating
    await driver.findElement(By.xpath("//input[@name='_save']")).click();
    await driver.sleep(1000);
    console.log("RO saved and Created successfully");

    //finding RO number
    let RO_no = await driver
      .findElement(
        By.xpath(
          "//ul[@class='messagelist']//li[@class='success'  and contains(text(),'The RO “')]//a"
        )
      )
      .getText();
    let RO_to_click = await driver.findElement(
      By.xpath(
        "//ul[@class='messagelist']//li[@class='success'  and contains(text(),'The RO “')]//a"
      )
    );
    let RO_no_id = await driver
      .findElement(
        By.xpath(
          "//ul[@class='messagelist']//li[@class='success'  and contains(text(),'The RO “')]//a"
        )
      )
      .getAttribute("href");
    console.log("the href text =" + RO_no_id);
    await RO_to_click.click();

    var str = RO_no_id;
    //  var str = "https://staging-connect.paytunes.in/agency/order/ro/655/change/";
    let first_split = str.split("ro/")[1];
    console.log(first_split);
    let resultant_ro = first_split.split("/")[0];
    console.log(resultant_ro);
    let RO_no_search_part = RO_no.split("|")[1];
    console.log("the ro number is = " + RO_no);
    console.log("the splitted ro number search= " + RO_no_search_part);
    ro_store_array_DS.push(resultant_ro);

    // File Handling to be used to store the RO number so that it can be fetched for DV360 Campaign Creation
    console.log(`to be used for file handling ${resultant_ro}`);
    fs.writeFile("./tests/fs.txt", resultant_ro, (err) => {
      if (err) throw err;
      console.log(
        ` File handled successfully and the RO ${resultant_ro} written on fs.txt successfully `
      );
    });

    // await driver.findElement(By.css("a[href='/agency/order/ro/646/change/']")).click();
    // console.log("clicked on the new RO successfully");
    await driver.sleep(1000);
    console.log(ro_store_array_DS);
    console.log("the ro stored are " + ro_store_array_DS);
    return {resultant_ro, RO_no_search_part};
  } catch (error) {
    console.log("the error occurred is " + error);
  } finally {
    await driver.quit();
    0.3;
  }

  // console.log(RO_no);
}


  // ro_no =  create_RO();
//  console.log("ro_no", ro_no);
 // let x = ro_no.resultant_ro
 // console.log("ro_search_part", ro_no.RO_no_search_part)
 // let y = ro_no.RO_no_search_part
// return ro_no
module.exports = { create_RO, test };

//write a function to export resultant_ro
//   function export_resultant_ro(resultant_ro){
//     return resultant_ro
// }