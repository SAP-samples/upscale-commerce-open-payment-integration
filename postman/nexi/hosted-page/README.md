# Nexi XPAY

## Supports

* Hosted Page
* Auto Capture
* Refunds

## Needs Work
* Delayed Capture
* Recurring Payments

## Setup

For Test mode all details can be obtained from: https://ecommerce.nexi.it/area-test


| Upscale Value | Nexi Value | Description |
| ------------- | ------------- | ------------- |
| Merchant ID   | Terminale | Merchant ID |
| alias  | Alias format ALIAS_WEB_<Terminale> | API Identifier | 
| secret | Chiave per il calcolo mac| Secret for HMAC used to authenticate api and payment page |
| TCONTAB | TCONTAB | Indicator for capture mode |   
  

Obtain Creds from Pagamenti E-commerce
![Obtain Creds from Pagamenti E-commerce](documentation/images/nexi-creds.png?raw=true "Obtain Creds from Pagamenti E-commerce")

Enable Immediate collection and Server to Server
![Enable Immediate collection and Server to Server](documentation/images/next-toggles.png?raw=true "Enable Immediate collection and Server to Server")
  
Test cards can also be found in area-test.
