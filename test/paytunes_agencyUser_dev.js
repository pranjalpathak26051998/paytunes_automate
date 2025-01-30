const { Builder, value, By, until, Browser } = require('selenium-webdriver');
require('dotenv').config();
const mocha = require('mocha');
const fs = require('fs');
const path = require('path');

(async function agencyUserCreation() {
    let driver;
    let website_dev = process.env.website_dev;
    // let website_staging = process.env.website_staging;
    let username_dev = process.env.username_dev;
    let password_dev = process.env.password_dev;
    let login_button_xpath = "//input[@type='submit']";
    let Agency_click_btn_xpath = "//div[@class='app-name']/div/h2[text()='Agency']";
    let User_management_xpath = "//a[@href='/agency/user_management/agencyuser/']";
    let Add_agency_user_xpath = "//a[@class ='addlink' and @href='/agency/user_management/agencyuser/add/']";
    let id_firstname = "id_first_name";
    let id_email = "id_email";
    let id_mobile = "id_mobile";
    let save_and_continue_button_xpath = "//input[@value='Save and continue editing' and @type = 'submit']"


    //helper functions
    // maximize the screen

    async function maximizeWindow() {
        await driver.manage().window().maximize();

    }
    //created this function and generated the random number so that the First name 
    // can always be made unique while testing the agency user creation
    async function firstName() {
        //generate a random number and round off to the nearest integer
        let randomNumber = Math.round(Math.random() * 1000);
        let firstname = `p-testFirstName` + randomNumber;
        return firstname;
    };
    let first_Name = await firstName();

    // take screenshot and save in the agencyUserSS folder
    async function takeScreenshot(filename) {
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync(path.resolve(__dirname, 'agencyUserSS', filename), screenshot, 'base64');
        console.log('Screenshot saved as agencyUserSS/' + filename);
        return screenshot;
    };

    describe('Agency User Creation Begins', function () {
        this.timeout(30000);
        before(async function () {
            driver = await new Builder().forBrowser(Browser.CHROME).build();
            // await driver.get(website_dev);
            await maximizeWindow();
            console.log("accessed the browser successfully");
            // await driver.sleep(2000);
        });
        after(async function () {
            await driver.quit();
            console.log("driver closed successfully");
        });
        it('should open the website', async function () {
            await driver.get(website_dev);
            await takeScreenshot('website_opened.png');
            console.log("website opened successfully: " + website_dev);
            // await driver.sleep(2000);
        });
        it('enter username and password', async function () {
            // enter username and password
            await driver.wait(until.elementLocated(By.id('id_username')), 10000);
            await driver.findElement(By.id('id_username')).sendKeys(username_dev);
            console.log("username entered: " + username_dev);

            await driver.wait(until.elementLocated(By.id('id_password')), 10000);
            await driver.findElement(By.id('id_password')).sendKeys(password_dev);
            console.log("password entered: " + password_dev);
            await takeScreenshot('username_password_entered.png');

            await driver.sleep(2000);
        });
        it('Click on login button successfull', async function () {
            await driver.wait(until.elementLocated(By.xpath(login_button_xpath)), 10000);
            await driver.findElement(By.xpath(login_button_xpath)).click();
            console.log("login button clicked successfully");
            await takeScreenshot('login_button_clicked.png');
        });
        it('should open the agency page', async function () {
            await driver.wait(until.elementLocated(By.xpath(Agency_click_btn_xpath)), 10000);
            await driver.findElement(By.xpath(Agency_click_btn_xpath)).click();
            console.log("Clicked on agency button page ");
            await takeScreenshot('agency_button_clicked.png');
        });
        it('Should click on the user management link', async () => {
            await driver.wait(until.elementLocated(By.xpath(User_management_xpath)), 10000);
            await driver.findElement(By.xpath(User_management_xpath)).click();
            console.log("Clicked on user management link");
            await takeScreenshot('user_management_link_clicked.png');
        });
        it("Should click on the add agency user button", async () => {
            await driver.wait(until.elementLocated(By.xpath(Add_agency_user_xpath)), 10000);
            await driver.findElement(By.xpath(Add_agency_user_xpath)).click();
            console.log("Clicked on add agency user button");
            await takeScreenshot('add_agency_user_button_clicked.png');
        });
        let first_Name_To_Enter = first_Name;
        it("Should enter the first name of the agency user", async () => {
            await driver.wait(until.elementLocated(By.id(id_firstname)), 10000);
            await driver.findElement(By.id(id_firstname)).sendKeys(first_Name_To_Enter);
            console.log("First name entered: " + first_Name_To_Enter);
            await takeScreenshot('first_name_entered.png');

        });
        it("Should enter the email of the agency user", async () => {
            await driver.wait(until.elementLocated(By.id(id_email)), 10000);
            await driver.sleep(2000);
            console.log(first_Name_To_Enter);
            await driver.findElement(By.id(id_email)).sendKeys(`pranjal.p+${first_Name_To_Enter}@paytunes.in`);
            await driver.sleep(2000);
            console.log("Email entered successfully " + `pranjal.p+${first_Name_To_Enter}@paytunes.in`);
            await takeScreenshot('email_entered.png');

        });
        //enter the mobile number
        it("Should enter the mobile number of the agency user", async () => {
            await driver.wait(until.elementLocated(By.id(id_mobile)), 10000);
            await driver.findElement(By.id(id_mobile)).sendKeys("+919616000000");
            console.log("Mobile number entered successfully: +919616000000");
            await takeScreenshot('mobile_number_entered.png');
        });
        // select role
        // #select2-id_role-container
        it("Should click for selecting the role", async () => {
            await driver.findElement(By.id("select2-id_role-container")).click();
            console.log("Clicked on the role drop-down successfully");
            await takeScreenshot('role_dropdown_clicked.png');
        });

        // select role option in the role drop-down;
        //select[@id='id_role']//option[@value='editor']
        let role = "Editor";
        //click on the select area 
        // ."//input[@class='select2-search__field']"
        it("Should click on the select area", async () => {
            await driver.wait(until.elementLocated(By.xpath("//input[@class='select2-search__field']")), 10000);
            await driver.findElement(By.xpath("//input[@class='select2-search__field']")).click();
            await driver.findElement(By.xpath("//input[@class='select2-search__field']")).sendKeys(role)
            //click on the selected role
            await driver.findElement(By.xpath("//li[@class='select2-results__option select2-results__option--highlighted']")).click()
            console.log("Role selected successfully: " + role);
            await takeScreenshot('role_selected.png');
        });
        //click on the save and continue button
        it("Should click on the save and continue button", async () => {
            await driver.wait(until.elementLocated(By.xpath(save_and_continue_button_xpath)), 10000);
            await driver.findElement(By.xpath(save_and_continue_button_xpath)).click();
            console.log("Save and continue button clicked successfully");
            await driver.sleep(2000); // wait for the page to load completely before taking screenshot
            await takeScreenshot('save_and_continue_button_clicked.png');
        });

        //check whether the boolean Enable ad maker is marked true or false
        // let enable_ad_maker = await driver.findElement(By.xpath("//input[@type='checkbox' and @name='is_ad_maker_access']"));



    });
})();
