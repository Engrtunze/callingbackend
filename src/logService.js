import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";

function init() {

    Sentry.init({
        dsn: "https://f84747e4146f4111a260fb9b824582a8@o461435.ingest.sentry.io/5463207",
        integrations: [
            new Integrations.BrowserTracing(),
        ],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });

}

function log(error) {
    Sentry.captureMessage(error);
}

export  default  {
    init,
    log
}