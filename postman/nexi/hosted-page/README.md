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
  
Test cards can also be found in area-test, please verify there if below do not work.

| Circuito | Numero carta | Scadenza | CVV2* |	Esito  Atteso	| Messaggio  Errore |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | 
| VISA | 4539970000000006 (EUR)	| 12/2030	 | 123	| Pagamento accettato	| Message  Ok |
| VISA | 4539970000000014 (EUR)	| 12/2030	| 123	| Pagamento rifiutato	Auth. | Denied |
| MASTERCARD | 5255000000000001 (EUR)	| 12/2030	| 123	|Pagamento accettato	| Message Ok |
| MASTERCARD | 5255000000000019 (EUR)	| 12/2030	| 123	| Pagamento rifiutato	Auth. | Denied |

*CVV any 3 numbers
  
Login Details for [Test Merchant Backoffice](https://int-ecommerce.nexi.it/ecomm/web/reporting/ReportLogin.jsp) can be found in area-test. 
  
*For Live, it may be necessary to Have Nexi Allowlist the calling PWA domain for Hosted Page to Work.*
  
## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.  
