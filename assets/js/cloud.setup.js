/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"observeMySession":{"verb":"POST","url":"/api/v1/observe-my-session","args":[],"protocol":"io.socket"},"saveproduct":{"verb":"POST","url":"/api/v1/product/saveproduct","args":["id","name","slug","type","weight","location","productImage","company_id","minBid","maxBid"]},"removeproduct":{"verb":"DELETE","url":"/api/v1/product/removeproduct","args":["product_id","company_id"]},"savecompany":{"verb":"POST","url":"/api/v1/company/savecompany","args":["id","name","companyLogo","description","number","address"]},"removecompany":{"verb":"DELETE","url":"/api/v1/company/removecompany","args":["company_id"]},"uploadfile":{"verb":"POST","url":"/api/v1/upload/uploadfile","args":["mediaFile"]},"savebid":{"verb":"POST","url":"/api/v1/bid/savebid","args":["id","userDetails","userId","productId","productName","bidAmount"]},"savewaste":{"verb":"POST","url":"/api/v1/savewaste","args":["id","name","quantity"]},"removewaste":{"verb":"DELETE","url":"/api/v1/removewaste","args":[]}}
  /* eslint-enable */

});
