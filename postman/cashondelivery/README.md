these json files should be used to configure the Cash On Delivery payment method. this repo should be used by the instructions from the help portal (to be added)

The integration requires a backend api to automate the acceptance of the authorization / settlement and refund messages. For testing you can use https://pipedream.com/ as endpoint to capture these requests. A sample configuration js is provided so you can quickly setup the pipedream endpoint to respond with an expected payload.

In Production you should replace these with connectors to your own account systems. For example For Authorize, you store on Record that you require a cash payment on delivery for the item.


Typically it does not make sense to automate the settlement step, since by nature cash-on-delivery requires the item to have been delivered to receive cash. Since settlement happens before that time, it really only makes sense to manually mark the orders as paid on actual exchange.

It is possible to automate the manual steps by APi

![image](https://user-images.githubusercontent.com/10423174/144270662-69f5bb65-00d1-4787-8c2a-bf0c36f0b48d.png)
