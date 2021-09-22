# Adyen Testing

## Description
This Postman collection allow Integration engineers to test the Adyen configuration in SAP Upscale Commerce.
This collection is **not** meant to fully test the Integration of Adyen in Upscale, and was solely designed to facilitate the integration testing by ensuring that both Adyen and Upscale Merchant accounts exist and are reachable.

The "Get Upscale Merchant Account" request in this Collection validate that the provided `upscaleAccountGroupId` and `upscaleAccountId` values are correct and exist in your Upscale tenant.

The "Get Adyen Payment Methods" request in this Collection return all supported Adyen's payment methods for your Adyen's Merchant Account for a specific combination of `countryCode`, `shopperLocale`, `amount_value` & `currency`. It also verifies that the Upscale `merchantId` corresponding to the `upscaleAccountGroupId` and `upscaleAccountId` in Upscale match the Adyen's `merchantAccount`.

## Download and Installation

In Postman, go to Environments > Import.

Import the "environment_configuration.json" file and replace the values for "Adyen Testing" environment:

- `apiVersion`: The Adyen API version.

- `authenticationApiKey`: The Adyen API Key available under Developers > API credentials (make sure to select the Webservice User).

- `merchantAccount`: The Adyen Merchant Account Code available under Account > Merchant accounts.

- `countryCode`: The shopper's country code. Used for testing the available payment methods for the given `merchantAccount`.
  
- `shopperLocale`: The combination of a language code and a country code to specify the language to be used in the payment. Used for testing the available payment methods for the given `merchantAccount`.
  
- `curency`: The three-character ISO currency code. Used for testing the available payment methods for the given `merchantAccount`.

- `amount_value`: The amount of the transaction, in minor units. Used for testing the available payment methods for the given `merchantAccount`.
  
- `checkoutPaymentHost`: Adyen Checkout API host. See [Adyen's CheckoutService](https://docs.adyen.com/api-explorer/#/CheckoutService/v67/post/paymentMethods__reqParam_amount) for more information.

- `upscaleRootUrl`: The base URL of your tenant account in SAP Upscale Commerce. Care needs to be taken not to copy the /.

- `upscaleToken`: Use an external application’s authentication API with HTTP parameters to generate access token. Be sure to prefix Bearer when working with Postman. To generate an access token, see [Making Authorized API Calls](https://help.sap.com/viewer/a99d6fa0606f4f3cbf251e4e61f35feb/SHIP/en-US/446a3d417aac4bd8a301464670995ed3.html)
  
- `upscaleAccountGroupId`: The first group of digit numbers in the base URL.
  
- `upscaleAccountId`: The second group of digit number in the base URL.

Go to Collection > Import
Import the "adyen_testing_collection.json" file and click "Run".

Make sure all Requests and their associated Tests are successful.

For more information about Postman Support, see [SAP Help Portal](https://help.sap.com/viewer/a99d6fa0606f4f3cbf251e4e61f35feb/SHIP/en-US/7f1efa3c176746548c79d984314fee94.html).

## Adyen's Test Card Numbers
You can test your integration with Adyen Test Card numbers, see https://docs.adyen.com/development-resources/test-cards/test-card-numbers for details.

## Test Payment from Adyen's Dashboard
From the Adyen’s Dashboard, you can do a Test payment under Account > Skins > (Select the Skin previously created) > Test.

## Test the Notifications from Adyen's Dashboard
From the Adyen’s Dashboard, you can ensure that Upscale is properly accepting notifications.
-	Go to Account > Merchant Accounts and Select your Merchant Account
-	Go to Developers > Webhooks
-	Select the Webhook previously created
-	Click the Test configuration button.
If the HTTP response status code is 401, make sure the basic authentication credential and HMAC Key are correct.
