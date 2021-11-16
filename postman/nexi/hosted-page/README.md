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


| Upscale Value | Nexi Value | Description |
| ------------- | ------------- | ------------- |
| Merchant ID   | Terminale | Merchant ID |
| alias  | Alias format ALIAS_WEB_<Terminale> | API Identifier | 
| secret | Chiave per il calcolo mac| Secret for HMAC used to authenticate api and payment page |
| TCONTAB | TCONTAB | Indicator for capture mode (currently must be C) |   
  

Obtain Creds from Pagamenti E-commerce
![Obtain Creds from Pagamenti E-commerce](documentation/images/nexi-creds.png?raw=true "Obtain Creds from Pagamenti E-commerce")

Further down the page, Enable Immediate collection and Server to Server. It is also recommended to have communications sent to a service email account.
![Enable Immediate collection and Server to Server](documentation/images/next-toggles.png?raw=true "Enable Immediate collection and Server to Server")
  
Test cards can also be found in area-test.
  
*For Live, it may be necessary to Have Nexi Allowlist the calling PWA domain for Hosted Page to Work.*
