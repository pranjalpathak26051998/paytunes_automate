import { create_RO, test } from "./ro.js";

async function multiRo(){
    for(let i =0;i<=4;i++){
       await create_RO();
    }
}
multiRo()
