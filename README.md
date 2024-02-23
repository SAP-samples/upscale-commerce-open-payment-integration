# SAP Commerce Cloud, open payment framework

## Before Importing
The meaning of some fields in environment variables:  
**token**: A Bearer token to access open payment framework core.  
**rootUrl**: The root URL of open payment framework service, e.g. https://opf-iss-d0.api.commerce.stage.context.cloud.sap  
**accountGroupId**: The ID of merchant account group you created in open payment framework workbench.  
**accountId**: The ID of account you created under the account group.  

## Description
This repository offers sample pre-built integrations to payment gateways and methods in the form of Postman Collections that can be imported into your SAP Commerce Cloud, open payment framework tenant.

The repository is a means to share working examples and is provided as-is coming with no official SAP/Payment Provider support. You are strongly advised to test out the integration on your open payment framework tenant before promoting to live customers.

## Requirements
A licensed SAP Commerce Cloud, open payment framework Tenant.

One or more test/live merchant accounts for the Payment Gateway/Method you are importing the collection of.

## Download and Installation
Replace the payment account specific secrets and variables in the Environment file.

Import the postman collection with the updated Environment settings into your open payment framework tenant as described on [SAP Help Portal](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/0996ba68e5794b8ab51db8d25d4c9f8a/562879e4d6fd4826b5d82219e5f19412.html).

## Known Issues
No known issues.

## How to obtain support
Read the open payment framework [documentation](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/0996ba68e5794b8ab51db8d25d4c9f8a/f3d565da0d524b8081c861b4f5dea359.html) on SAP Help Portal.
 
For additional support, request you can request access to open payment framework slack channel via your assigned integration manager.

## Troubleshooting

Please refer to the [Open Payment Framework Logging](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/0996ba68e5794b8ab51db8d25d4c9f8a/beab05c2985242d396b6f454dc1b8bea.html) feature.

## Contributing
You are welcome to add collections for other gateways to this repo. 

The repository is open for contribution. To contribute to the repository you can create a fork, and then create a Pull Request with all your changes. The administrator of the repository will look into the Pull Request and will merge your changes.

## License
Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.

[![REUSE status](https://api.reuse.software/badge/github.com/opf-postman/commerce-cloud-open-payment-integration)](https://api.reuse.software/info/github.com/opf-postman/commerce-cloud-open-payment-integration)
