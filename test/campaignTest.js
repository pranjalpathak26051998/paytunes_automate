

const { Builder, Browser, By, value } = require('selenium-webdriver')
const assert = require('assert');
const mocha = require('mocha');
require('dotenv').config();
const { create_RO } = require('../tests/ro');

describe('RO and Campaign end to end', () => {
    let driver
    let website_url = 'https://staging-connect.paytunes.in/';

    let id_username = process.env.username_staging;
    let id_password = process.env.password_staging;
    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        console.log("Driver accessed successfully");
    });
    after(async function () {
        await driver.quit();
        console.log("Closed WebDriver instance.");
    });

    it('fetching RO creation', async function () {
        // await getro();
        ro_no = await getro();
        if (ro_no) {
            console.log(ro_no.RO_no_search_part);
        }
        let ro_id = ro_no.RO_no_search_part

    });

    it('should load the STAGING paytunes website', async function () {
        await driver.get(website_url);
        console.log("Website fetched and loaded successfully");
    });
    //signin process

    it('Enter the username ', async function () {
        await driver.findElement(By.id("id_username")).clear();
        await driver.findElement(By.id('id_username')).sendKeys(id_username);
        console.log("username entered correctly " + id_username);
        await driver.sleep(1000);

    });


    it('Enter the password', async function () {
        await driver.findElement(By.id("id_password")).clear();
        await driver.findElement(By.id("id_password")).sendKeys(id_password);
        console.log("the password entered is successfully " + id_password);
        await driver.sleep(1000);

    });

    //login to the site by clicking on signin button   
    it('click on signin button to signin to the site', async function () {
        await driver.findElement(By.xpath("//form[@id='login-form']//input[@type = 'submit' and @value='LOGIN']")).click();
        console.log("signin button clicked successfully")
        await driver.sleep(1000);

    });

    //enter Agency by clicking on Agency    
    it('Find,click and Enter on Agency ', async function () {
        await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
        // await driver.findElement(By.withTagName("h2 = Agency"));
        console.log("clicked on agency successfully");
        await driver.sleep(1000);

    });


    it('', async function () {

    });


    it('', async function () {

    });


    it('', async function () {

    });


    it('', async function () {

    });


}).timeout(90000);