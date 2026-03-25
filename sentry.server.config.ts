// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://531e627acf85bbc5c9a4954ee8b6d5d7@o4511106560425984.ingest.us.sentry.io/4511106591817728",

  integrations:[
    Sentry.vercelAIIntegration({
      recordInputs: true, // Whether to record the inputs to the AI provider. Be mindful of sensitive data.
      recordOutputs: true, // Whether to record the outputs from the AI provider. Be mindful of sensitive data.
    }) , 

     Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ] , 
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
