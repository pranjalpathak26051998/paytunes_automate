const fs= require('fs')
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function create_DV_campaign() {
    let driver = await new Builder().forBrowser('chrome').build();

    console.log("Created an Instance for the Chrome Web-Browser");
    
    try {
        // Navigate to the website
        let website_url = "https://staging-connect.paytunes.in/";
        await driver.get(website_url);
        await driver.sleep(1000);
        console.log("Navigated to the website successfully");

        // Get the actual title of the page and print in console
        let title = await driver.getTitle();
        console.log(`The Title of the website is ${title}`);

        // Credentials for signing in
        let id_username = "pranjal.p+pranjalstgAdmin@paytunes.in";
        let id_password = "user@123";

        // Function to sign in
        async function signin(id_username, id_password) {
            // Enter username
            await driver.findElement(By.id("id_username")).clear();
            await driver.findElement(By.id("id_username")).sendKeys(id_username);
            console.log("Username entered correctly: " + id_username);
            await driver.sleep(1000);

            // Enter password
            await driver.findElement(By.id("id_password")).clear();
            await driver.findElement(By.id("id_password")).sendKeys(id_password);
            console.log("Password entered successfully: " + id_password);
            await driver.sleep(1000);

            // Click on the submit button to login
            await driver.findElement(By.xpath("//form[@id='login-form']//input[@type='submit' and @value='LOGIN']")).click();
            console.log("Clicked login button successfully");
            await driver.sleep(3000); // Adjust sleep time as per your application's response time
        }

        // Call the signin function
        await signin(id_username, id_password);

        try {
            // Check for error note element
            await driver.findElement(By.xpath("//p[@class='errornote']"));
            console.log("ErrorNote Found: Either username or password is wrong");

            // Click on the forgot password link
            await driver.findElement(By.xpath("//a[@href='/password_reset/']")).click();
            console.log("Clicked on the forgotten password link successfully");

            // Enter the email for password reset
            await driver.findElement(By.xpath("//input[@type='email']")).sendKeys(id_username);
            console.log(`Entered the username ${id_username} for password reset`);

            // Click on the reset password button
            await driver.findElement(By.xpath("//input[@type='submit' and @value='Reset my password']")).click();
            console.log("Clicked on the reset password button");

        } catch (error) {
            if (error.name === 'NoSuchElementError') {
                console.log("Error: Element not found. Handle the scenario accordingly.");
                // You can add logic to handle this situation, such as retrying or logging an error
                
    //now enter Agency 
    await driver.findElement(By.xpath("//div[@style='width:100%']")).click();
    // await driver.findElement(By.withTagName("h2 = Agency"));
    console.log("clicked on agency successfully");
    await driver.sleep(1000);

    // click on See all ROs
    await driver.findElement(By.xpath("//a[@href='/agency/order/ro/' and text()='See All ROs']")).click()
    console.log("Clicked on See All ROs successfully");
    await driver.sleep(2000);

    // get URL to be clicked , 
     
    let element =  await driver.findElement(By.xpath("//a[text()='676']"))
    let linkUrl = await element.getAttribute('href')
    console.log(linkUrl)
    //File Handling and reading from a file, 

    const readMe = fs.readFileSync('./tests/fs.txt', 'utf-8');
    console.log(readMe)
    console.log("above value is file handled")

       
    console.log(`Read content: ${readMe}`);
    let modifiedUrl = linkUrl.replace('/676/', `/${readMe}/`)
    console.log(`the modified URL is "${modifiedUrl}" `)
  
    //Open a new tab
    await driver.executeScript("window.open()")
    console.log("New tab opened successfully")
 
    // Handle all the window handles to switch to the new tab

    let tabs = await driver.getAllWindowHandles();
    console.log("Automation server has all the windows handles")
    await driver.switchTo().window(tabs[1])
    await driver.sleep(2000);
    console.log("New tab switched successfully")

    //Navigate to the new url to the RO is opened
    await driver.get(modifiedUrl)
    console.log("The new link opened successfully")
    await driver.sleep(3000);

    //Access and click on Create DV campaign button
    let dv360Button = await driver.findElement(By.xpath("//a[text()='Create DV-360 Campaign']"))
    await dv360Button.click() 
    await driver.sleep(2000)
    console.log("Successfully clicked on create DV-360 Campaign Button")

    //Enter Advertiser ID
    let advertiser_id = 12254
    // 775794139
    await driver.findElement(By.xpath("//input[@name='dv360_advertiser_id' and @placeholder='Enter Advertiser ID']")).clear()
    await driver.findElement(By.xpath("//input[@name='dv360_advertiser_id' and @placeholder='Enter Advertiser ID']")).sendKeys(advertiser_id)
    console.log("Advertiser Id entered successfully");

    //Enter the Dv Campaign...............................................................................
    let input_dv_campaign = 54349098
    await driver.findElement(By.xpath("//input[@name='dv360_campaign_id' and @placeholder='Enter DV-360 Campaign ID']")).clear()
    await driver.findElement(By.xpath("//input[@name='dv360_campaign_id' and @placeholder='Enter DV-360 Campaign ID']")).sendKeys(input_dv_campaign)
    console.log("Entered DV campaign successfully");
    await driver.sleep(3000)

    // //Setting the environment to take the input in console to execute whether which boolean has to be chosen.
    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output:process.stdout,
    // });

    // rl.question("Enter the input num: ",(num1)=>{
    //     console.log(num1)
    //     return num1
    // })

    
    async function show_client_budget(){
    //clicking on show client budget boolean
    await driver.findElement(By.xpath("//label[@class='vCheckboxLabel' and @for='dv360_show_client_budget']")).click()
    await driver.sleep(2000)
    console.log("Show Client Budget Boolean has been clicked successfully")
    }

    async function show_avg_cpm(){
    //Clicking on Show Average Client CPM boolean...
    await driver.findElement(By.xpath("//label[@class='vCheckboxLabel' and @for='dv360_show_avg_cpm']")).click()
    await driver.sleep(2000)
    console.log("Show Average CPM Boolean has been clicked successfully");
    let companion_num= 4000;// adding targeted companion number
    await driver.findElement(By.xpath("//input[@type='number' and @placeholder='Enter Companion Number']")).clear()
    await driver.findElement(By.xpath("//input[@type='number' and @placeholder='Enter Companion Number']")).sendKeys(companion_num)
    await driver.sleep(2000);
    console.log("companion number entered successfully")
    
    }
// here num value defines which function has to be fired....
    // let num= 1 //for selecting average client budget only
    // let num= 2 //for selecting average cpm only
    let num= 3 //for selecting both average client budget and average cpm also

    async function boolean_select(num){
        if(num == 1){
            await show_client_budget();
            console.log("show_client_budget boolean selected only")
        }
        else if(num == 2){
           await show_avg_cpm();
            console.log("Show_avg_cpm is selected only")
        }
        else if(num == 3){
          await  show_client_budget();
           await show_avg_cpm();
            console.log("Both show_client_budget and show_avg_cpm is selected")
            await driver.sleep(1500)
        }
        else{
            console.log("No requirement to mark any boolean true")
        }
    }
    await boolean_select(num) // the function is called here, because it takes the input num 1/2/3 
    await driver.sleep(3000);
    await driver.findElement(By.xpath("//button[text()='Save']")).click()
    console.log("Clicked on save button successfully")
    await driver.sleep(3000)
            } else {
                throw error; // Rethrow other errors
            }
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        await driver.quit();
    }
})();
