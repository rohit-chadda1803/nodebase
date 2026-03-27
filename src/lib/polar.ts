import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
   accessToken : process.env.POLAR_ACCESS_TOKEN,
   server : "sandbox", // for production , change it . 
//    server : process.env.NODE_ENV === "production" ? "production" : "sandbox",

});
