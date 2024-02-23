# SAP Commerce Cloud Open Payment Framework

## Before Importing
The meaning of some fields in environment variables:  
token: A Bearer token to access opf core.  
rootUrl: The root url of opf service, e.g. https://opf-iss-d0.api.commerce.stage.context.cloud.sap  
accountGroupId: The id of merchant account group you created in opf workbench.  
accountId: The id of account you created under the account group.  

## Description
This repository offers sample pre-built integrations to payment gateways and methods in the form of Postman Collections that can be imported into your SAP Open Payment Framework tenant.

The repository is a means to share working examples and is provided as-is coming with no official SAP/Payment Provider support. You are strongly advised to test out the integration on your Upscale tenant before promoting to live customers.

## Requirements
A licensed SAP Open Payment Framework Tenant.

One or more test/live merchant accounts for the Payment Gateway/Method you are importing the collection of.

## Download and Installation
Replace the payment account specific secrets and variables in the Environment file.

Import the postman collection with the updated Environment settings into your OPF tenant as described on [SAP Help Portal](https://help.sap.com/docs/MCS/41fb1a1906864b35b6a731dbd1d0cd86/562879e4d6fd4826b5d82219e5f19412.html?state=DRAFT&version=DEV&profile=20003453).

## Known Issues
No known issues.

## How to obtain support
Read the Open Payment Framework [documentation](https://help.sap.com/docs/MCS/41fb1a1906864b35b6a731dbd1d0cd86/f3d565da0d524b8081c861b4f5dea359.html?state=DRAFT&version=DEV&profile=20003453) on SAP Help Portal.
 
For additional support, request you can request access to SAP Commerce Open Payment Framework slack channel via your assigned integration manager.

## Troubleshooting

Please refer to the [OPF Logging](https://help.sap.com/docs/MCS/41fb1a1906864b35b6a731dbd1d0cd86/beab05c2985242d396b6f454dc1b8bea.html?state=DRAFT&version=DEV&profile=20003453) feature.

## Contributing
You are welcome to add collections for other gateways to this repo. 

The repository is open for contribution. To contribute to the repository you can create a fork, and then create a Pull Request with all your changes. The administrator of the repository will look into the Pull Request and will merge your changes.

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/upscale-commerce-open-payment-integration)](https://api.reuse.software/info/github.com/SAP-samples/upscale-commerce-open-payment-integration)
