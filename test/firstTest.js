
// var assert = require('assert');
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

const { Builder, Browser, By, value } = require("selenium-webdriver")
require('dotenv').config();
const assert = require('assert');
const mocha = require('mocha');

describe('Paytunes Brand Creation', () => {
  // this.timeout(30000) // Set a timeout for Mocha test (adjust as needed)

  let driver
  let dev_websiteUrl = `https://dev-connect.paytunes.in/`

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log("Driver accessed successfully");

  });

  after(async function () {
    await driver.quit();
    console.log("Closed WebDriver instance.");
  });

  it('should load the dev paytunes website', async function () {
    //dev-platform

    await driver.get(dev_websiteUrl);
    console.log(`website fetched successfully`);
  });

  it('should signin to the website', async function () {

    let id_username = process.env.username_dev;
    let id_password = process.env.password_dev;
    //enter username 
    await driver.findElement(By.id("id_username")).clear();
    await driver.findElement(By.id('id_username')).sendKeys(id_username);
    console.log("username entered correctly " + id_username);
    // await driver.sleep(1000);
    //enter password
    await driver.findElement(By.id("id_password")).clear();
    await driver.findElement(By.id("id_password")).sendKeys(id_password);
    console.log("the password entered is successfully " + id_password);
    // await driver.sleep(1000);

    //login to the site
    // await driver.findElement(By.css('input[value="LOGIN]')).click();
    await driver.findElement(By.xpath("//form[@id='login-form']//input[@type = 'submit' and @value='LOGIN']")).click();
    console.log("clicked successfully");
    // await driver.sleep(1000);

  });

  it('should enter the Agency ', async function () {
    await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
    // await driver.findElement(By.withTagName("h2 = Agency"));
    console.log("clicked on agency successfully");
    // await driver.sleep(1000);
  });

  it('should click on brands and enter', async function () {
    //clicking on brands  to create brand
    let click_brand_xpath = "//a[text()='Brands']"
    await driver.findElement(By.xpath(click_brand_xpath)).click();
    // await driver.sleep(1000);
    console.log("Clicked on Brands successfully");

  });

  it('should click on add brands for adding a new brand', async function () {
    //clicking on add brands for creating a new brand
    let add_brand_link_xpath = "//a[@class='addlink']"
    await driver.findElement(By.xpath(add_brand_link_xpath)).click();
    // await driver.sleep(2000);
    console.log("Clicked on add brand successfully");
  });

  it('//Enter the brand name ', async function () {
    //Enter the brand name 
    let brand_name = process.env.brand_name_dev
    console.log(`the brand name ${brand_name} fetched successfully from .env file`);
    // let brand_name_xpath = "//*[@id='id_name']"
    await driver.findElement(By.id("id_name")).clear();
    await driver.findElement(By.id("id_name")).sendKeys(brand_name);
    // await driver.sleep(2500);
    console.log("Brand name entered successfully");
  });

  it('//marking the boolean is whitelisted true', async function () {
    //marking the boolean is whitelisted true
    //  (comment out this piece of code when brand is required to created without whitelisting =true)

    let is_domain_whitelisting_xpath = "//div[@class='form-row field-name field-is_whitelisted']/div[2]/label"
    await driver.findElement(By.xpath(is_domain_whitelisting_xpath)).click();
    // await driver.findElement(By.id("id_is_whitelisted")).click()
    // await driver.sleep(2000);
    console.log(" is domain whitelisted boolean marked true successfully");
    // ----------------------------------------------------------------------------------------------------------------

  });


  it('//selecting the brand company ', async function () {
    //selecting the brand company 
    //initially clickin over it
    let brand_category_xpath = "//div[@class='form-row field-category field-domain']/div[1]/span[1]/span[1]/span[1]"
    let brand_category_selected = "Local News"
    // await driver.findElement(By.xpath(brand_category_xpath)).click()
    // await driver.findElement(By.xpath(brand_category_xpath)).clear()
    await driver.findElement(By.xpath(brand_category_xpath)).sendKeys(brand_category_selected);
    // await driver.sleep(2000);
    let brand_category_selected_xpath = `//li[text()='${brand_category_selected}']`
    await driver.findElement(By.xpath(brand_category_selected_xpath)).click();
    // await driver.sleep(2000);
    console.log("Brand Category " + brand_category_selected + " is selected successfully");


  });


  it('//Selecting for IAB_category', async function () {


    //Selecting for IAB_category
    let IAB_category_xpath = "//div[@class='form-row field-brand_company field-iab_category']/div[2]/div[1]/span/span/span/span"
    let IAB_category_selected = brand_category_selected
    await driver.findElement(By.xpath(IAB_category_xpath)).click();
    // await driver.sleep(2000);
    let IAB_category_selected_xpath = `//li[text()='${IAB_category_selected}']`
    await driver.findElement(By.xpath(IAB_category_selected_xpath)).click();
    // await driver.sleep(2000);
    console.log("IAB Category selected successfully");

  });


  it('//entering the Brand Domain name', async function () {

    //entering the Brand Domain name
    // let brand_domain_xpath="//input[@name='domain']"
    // let brand_domain = `${brand_name}.com`
    let brand_domain = "Z.com"
    console.log(brand_domain);
    await driver.findElement(By.name('domain')).sendKeys(brand_domain);
    // await driver.sleep(2000);
    console.log("Brand Domain entered successfully");


  });




  it('//enter notes', async function () {

    //enter notes
    let notes_to_enter = "This brand is created by automation for testing purpose , kindly ignore"
    await driver.findElement(By.id("id_notes")).sendKeys(notes_to_enter)
    // await driver.sleep(1500)
    console.log(notes_to_enter + " has been entered successfully")


  });


  it(' //clicking on save and continue to save the brand', async function () {

    //clicking on save and continue to save the brand
    await driver.findElement(By.xpath("//input[@value='Save and continue editing']")).click()
    // await driver.sleep(2000)
    
    console.log("clicked on save and continue button successfully")

  });

  // it('',async function(){

  // });
  // it('',async function(){

  // });
}).timeout(30000);
