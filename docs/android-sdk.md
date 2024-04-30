---
hide:
  - footer
---
# Integrate the Atar Android SDK

The guide below will walk you through the steps to integrate the Atar Android SDK into your app, in order to start showing offers to your users.

## Step 1: Create an account and get your App Key

If you haven't already, create an account on the [Atar Dashboard](https://app.atargrowth.com/). Once you've created an account, you'll be able to create an app and get your App Key from the [settings page](https://app.atargrowth.com/settings).

## Step 2: Add the Atar Android SDK to your app

The Atar SDK is distributed as an AAR file. You can follow these instructions to add it to your app.

### 2.1 Download the AAR

Download the Atar Android SDK AAR file from here: [https://postintent-hosting.s3.amazonaws.com/atar-sdk-1.0.aar](https://postintent-hosting.s3.amazonaws.com/atar-sdk-1.0.aar)

### 2.2 Add the AAR to your project

Place the Atar SDK in the `libs` folder of your Android project. If you don’t have a `libs` folder, create one. It should be placed in the same folder as your `src` folder like so:

```bash
project-folder/src/main/java/com/example/project/MainActivity.java
project-folder/libs/atar-sdk-1.0.aar
```

### 2.3 Add the AAR to your build.gradle

Open your app's build.gradle file and add the following line to the dependencies block:

```groovy
dependencies {
    implementation files('libs/atar-sdk-1.0.aar')
}
```

or in other Gradle versions:

```groovy
dependencies {
  implementation(files('libs/atar-sdk-1.0.aar'))
}
```

## Step 3: Initialize the Atar SDK

Initialize the Atar SDK in your **Application** class's **onCreate** method.

=== "Java"
    ```java
    @Override
    public void onCreate() {
      super.onCreate();
      Atar.getInstance(this).onCreate("YOUR APP KEY");
      // any other code you have
    }
    ```

=== "Kotlin"
    ```kotlin
    override fun onCreate() {
      super.onCreate()
      Atar.getInstance(this).onCreate("YOUR APP KEY")
      // any other code you have
    }
    ```

Replace **YOUR APP KEY** with the App Key you got from the Atar Dashboard.

## Step 4: Show Offers after the user has completed a transaction

Once you've initialized the Atar SDK, you can show offers to your users. Here's an example of how you can show an interstitial offer after the user has completed a transaction.

=== "Java"
    ```java
    OfferRequest request = new OfferRequest(new OfferRequestCallback() {
    @Override
    public void onShown(boolean success, Exception error) {
        if (success) {
            Log.i("AtarTestBed", "Popup shown successfully");
        } else {
            Log.e("AtarTestBed", "Error: " + error.getMessage());
        }
    }
    @Override
    public void onClicked() {
        Log.i("AtarTestBed", "Interstitial was clicked!");
    }
    });

    // Complete the information about the user and transaction
    request.event = "purchase";
    request.userId = "userId1234";
    request.email = "user1234@email.com";
    request.phone = "1234567890";
    // this is some unique reference ID for the transaction
    request.referenceId = "12345;
    request.gender = "M";
    request.dob = "YYYYMMDD";
    request.address1 = "123 Example St";
    request.address2 = "Suite 123";
    request.city = "City";
    request.state = "State";
    request.zip = "12345";
    request.country = "Country";
    request.amount = 29.98;

    Atar.getInstance(this).showOfferPopup(request);
    ```

=== "Kotlin"
    ```kotlin
    val request = OfferRequest(object : OfferRequestCallback {
      override fun onShown(success: Boolean, error: Exception?) {
          if (success) {
              Log.i("AtarTestBed", "Popup shown successfully")
          } else {
              Log.e("AtarTestBed", "Error: " + error?.message)
          }
      }
      override fun onClicked() {
          Log.i("AtarTestBed", "Interstitial was clicked!")
      }
    })

    // Complete the information about the user and transaction
    request.event = "purchase";
    request.userId = "userId1234";
    request.email = "user1234@email.com";
    request.phone = "1234567890";
    // this is some unique referenced ID for the transaction
    request.referenceId = "12345";

    .randomUUID().toString(); 
    request.gender = "M";
    request.dob = "YYYYMMDD";
    request.address1 = "123 Example St";
    request.address2 = "Suite 123";
    request.city = "City";
    request.state = "State";
    request.zip = "12345";
    request.country = "Country";
    request.amount = 29.98;

    Atar.getInstance(this).showOfferPopup(request);
    ```

Replace the values in the **OfferRequest** object with the appropriate values for your user and transaction. Below you can find the full documented list of fields you can use in the **OfferRequest** object.

Note that the callback is optional and purely in case you would like to tie any additional functionality to the presentation of the offer.

### Offer Request Object Fields

| Req. | Field name  | Description                                    | Data type |
|------|-------------|------------------------------------------------|-----------|
| Req  | event       | User event that preceded the offers            | string    |
| Req  | referenceId | Some ID for the reference for deduplication.   | string    |
| Req  | email       | User email.                                    | string    |
| Req  | userId      | Some ID for the user.                          | string    |
| Rec  | phone       | User phone number.                             | string    |
| Rec  | gender      | User gender: M/F                               | string    |
| Rec  | dob         | Date of birth, YYYYMMDD                        | string    |
| Rec  | firstName   | User first name                                | string    |
| Rec  | lastName    | User last name                                 | string    |
| Opt  | amount      | Transaction amount                             | string    |
| Opt  | quantity    | Quantity of items purchased                    | int       |
| Opt  | paymentType | credit, PayPal, or other                       | string    |
| Opt  | address1    | Street address line 1                          | string    |
| Opt  | address2    | Street address line 2                          | string    |
| Opt  | city        | City                                           | string    |
| Opt  | state       | State                                          | string    |
| Opt  | country     | Country                                        | string    |

## Need help?

If you have any questions or need help, please contact us at [support@atargrowth.com](mailto:support@atargrowth.com).
