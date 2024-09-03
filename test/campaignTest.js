const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const mocha = require('mocha');
require('dotenv').config();
const { create_RO } = require('../tests/ro');

describe('RO and Campaign end-to-end', () => {
    let driver;
    let website_url = 'https://staging-connect.paytunes.in/';
    let ro_id;

    let id_username = process.env.username_staging;
    let id_password = process.env.password_staging;

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

    it('Find, click, and enter on Agency', async function () {
        await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
        console.log("Clicked on Agency successfully");
        await driver.sleep(1000);
    });
}).timeout(90000);
