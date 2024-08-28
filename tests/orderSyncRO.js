const { Builder, value, Browser, By, Key, Until, withTagName, until } = require('selenium-webdriver');
(async function sync_RO(){
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log("Created an instance for the chrome browser");
    try {
        //visiting the website
        let website_url = "https://dev-app.paytunes.in/";   //sync RO on dev
        await driver.get(website_url);
        console.log("Website reached successfully");
        //login using superUser having the permission of order full access;
        let id_username='pranjal.p+super@paytunes.in';
        let id_password='Pravas@200';
                         //enter username
        await driver.findElement(By.id('id_username')).clear();
        await driver.findElement(By.id('id_username')).sendKeys(id_username);
        console.log("Username entered");
                         //enter password
        await driver.findElement(By.id('id_password')).clear();
        await driver.findElement(By.id('id_password')).sendKeys(id_password);
        console.log("password entered");
        //click on the login button
        await driver.findElement(By.xpath("//input[@value='LOGIN']")).click();
        console.log("Logged In successfully");
        //finding the order button 
        await driver.findElement(By.xpath("//div[@class='app-name']//h2[text()='Order']")).click();
        
        console.log("Order clicked successfully");
        //finding the See All ROs and clicking on it
        
        await driver.findElement(By.xpath('//a[text()="See All ROs"]')).click();
        await driver.sleep(2000);
        console.log("Clicked on the see all ROs link successfully");
        //finding the sync RO button
        let i = false
        await driver.findElement(By.xpath('//a[text()="Sync RO"]')).click();
        i= true;
        console.log(i);
        console.log("the sync RO button clicked");
        await driver.sleep(2000);
        // ------------------------------------------------------------------------x-------------------- --> Opening the RO for Invoice creation 

        if(i== true) console.log("Sync RO is successful and the system is ready to open RO for invoice creation");
        let ro_id_invoice = 444;
        let ro_invoice_path= `//a[text()=${ro_id_invoice}]`
        await driver.findElement(By.xpath(ro_invoice_path)).click();
        console.log("Opened the RO whose invoice has to be created successfully");
        await driver.sleep(2000);
        //Clicking on the create invoice button....
        //a[text()='Create Invoice']
        await driver.findElement(By.xpath("//a[text()='Create Invoice']")).click();
        console.log("Invoice created successfully");
        await driver.sleep(2000);
        //getting the attribute href for the invoice id and number..
        //li[@class='success']//a
       let invoice_href= await driver.findElement(By.xpath("//li[@class='success']//a")).getAttribute("href");
        console.log("the invoice href link = "+invoice_href);


         






    } catch (error) {
            console.log("the error is "+error);
    }finally{
        await driver.quit();
    }
})();


