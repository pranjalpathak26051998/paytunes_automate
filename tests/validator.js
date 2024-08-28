const { create_RO } = require("./ro");
const { Builder, By, value, Browser } = require("selenium-webdriver");

async function getro() {
    try {
        let ro_no = await create_RO();
        // console.log("ro_no", ro_no.resultant_ro);
        console.log("ro_search_part", ro_no.RO_no_search_part);

        // Return ro_no if you need to use it outside this function
        return ro_no;
    } catch (error) {
        console.error("Error in getro:", error);
    }
}

// Execute getro and handle the returned value
(async function() {
    const ro_no = await getro();
    if (ro_no) {
        console.log(ro_no.RO_no_search_part);
    }
})();
