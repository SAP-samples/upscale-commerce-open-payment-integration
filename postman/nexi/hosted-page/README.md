# Nexi XPAY

## Supports

* Hosted Page
* Auto Capture
* Refunds

## Needs Work
* Delayed Capture
* Recurring Payments

## Setup

For Test mode all details can be obtained from: https://ecommerce.nexi.it/area-test. This includes sign-up for a test account.


| Upscale Field | Nexi Field | Description |
| ------------- | ------------- | ------------- |
| Merchant ID   | Terminale | Merchant ID |
| alias  | Alias format ALIAS_WEB_{{Terminale}} | API Identifier | 
| secret | Chiave per il calcolo mac| Secret for HMAC used to authenticate api and payment page |
| TCONTAB | TCONTAB | Indicator for capture mode (currently must be C) |
| apiEnv | [Documented Here](https://ecommerce.nexi.it/specifiche-tecniche/servertoserver/introduzione.html) | API endpoint for Test or Live System | 
  

Obtain Creds from Pagamenti E-commerce
![Obtain Creds from Pagamenti E-commerce](documentation/images/nexi-creds.png?raw=true "Obtain Creds from Pagamenti E-commerce")

Further down the page, Enable Immediate collection and Server to Server. It is also recommended to have communications sent to a service email account.
![Enable Immediate collection and Server to Server](documentation/images/next-toggles.png?raw=true "Enable Immediate collection and Server to Server")
  
Test cards can also be found in area-test.
  
Login Details for [Test Merchant Backoffice](https://int-ecommerce.nexi.it/ecomm/web/reporting/ReportLogin.jsp) can be found in area-test. 
  
*For Live, it may be necessary to Have Nexi Allowlist the calling PWA domain for Hosted Page to Work.*
  
  
