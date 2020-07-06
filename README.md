# WebBrowser

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

  - [Developer Environment Requirements](#developer-environment-requirements)
    - [Android](#android)
    - [iOS](#ios)
  - [Installing](#installing)
    - [Clone repository](#clone-repository)
    - [Install Packages](#install-packages)
  - [Building your app for production](#building-your-app-for-production)
    - [iOS](#ios-2)
      - [Generate IPA](#generate-ipa)
      - [Resign IPA with different provisioning certificate.](#resign-ipa-with-different-provisioning-certificate)
    - [Android](#android-2)
      - [Generating a signing key](#generating-a-signing-key)
      - [Setting up gradle variables](#setting-up-gradle-variables)
      - [Changing App Name](#changing-app-name)
      - [Changing bundle identifier](#changing-bundle-identifier)
      - [Generating the release APK](#generating-the-release-apk)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Developer Environment Requirements

### Android
* Android Studio 3.0 or above + Android SDK: https://developer.android.com/studio/
* Code Editor
    - Visual Studio Code: https://code.visualstudio.com/download
    - Sublime Text: https://www.sublimetext.com/3
* Node: https://nodejs.org/en/
* Python2 or above: https://www.python.org/downloads/

### iOS
* XCode 8.0 or above: https://developer.apple.com/download/
* Code Editor(any)
    - Visual Studio Code: https://code.visualstudio.com/download
    - Sublime Text: https://www.sublimetext.com/3
* Nodejs LTS: https://nodejs.org/en/

## Installing

Setup your machine for Android and iOS using react native guideline for [Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started.html). 

### Clone repository
    
    git clone https://github.com/daipl/rn-webbrowser
    cd rn-webbrowser

### Install Packages

    npm install


## Building your app for production

### iOS

#### Firebase

A GoogleService-Info.plist file contains all of the information required by the Firebase iOS SDK to connect to your Firebase project. To automatically generate the plist file, [follow the instructions](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app) on the Firebase console to "Add Firebase to your app".

Once downloaded, place the file in the root of your iOS app at ios/[YOUR APP NAME]/GoogleService-Info.plist.

Make sure that the GoogleService-Info.plist file has been added to your project within XCode.

#### Generate IPA

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the `ios` folder in your project, then open the `.xcworkspace` file within it using Xcode. 

You can change **App Name** and **bundle identifier** in Xcode.

Go to "Signing" and make sure you have selected right Provisioning Profile and Signing Certificate

To configure your app to be built using the `Release` scheme, go to **Product** → **Scheme** → **Edit Scheme**. Select the **Run** tab in the sidebar, then set the Build Configuration dropdown to `Release`.

![](https://facebook.github.io/react-native/docs/assets/ConfigureReleaseScheme.png)

Now, Go to **Build** → **Archive**. 

This will generate **IPA**.

#### Resign IPA with different provisioning certificate.

**Note: Follow the firebase instruction for the new bundle id. and generate IPA**

Make sure you have selected command line tools in Xcode. (Go to Xcode -> Preference -> Locations)

![](https://image.prntscr.com/image/DB5tRkwQTNysiSneCCNzTQ.png)

Install Fastline

    xcode-select --install
    sudo gem install fastlane -NV

Put the **IPA and New Provisioning certificate** in a single folder. Make the sure the certificate attached to the provisioning files is in your keychain.

Run the resign command. 

    fastlane sigh resign

This command will resign the IPA and change its bundle id. 

### Android

#### Firebase

A GoogleService-Info.plist file contains all of the information required by the Firebase iOS SDK to connect to your Firebase project. To automatically generate the plist file, [follow the instructions](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app) on the Firebase console to "Add Firebase to your app".

Once downloaded, place this file in the root of your project at android/app/google-services.json.

#### Generating a signing key

You can generate a private signing key using `keytool`. On Windows `keytool` must be run from `C:\Program Files\Java\jdkx.x.x_x\bin`

```
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
**Note:** I have already added my keystore in the app. you have to replace it. 

This command prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called  `my-release-key.keystore`.

The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.

#### Setting up gradle variables

1.  Place the  `my-release-key.keystore`  file under the  `android/app`  directory in your project folder.
2.  Edit the file `android/gradle.properties`  and add the following (replace  `*****`  with the correct keystore password, alias and key password),

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

#### Changing App Name

Open `android/src/res/values/strings.xml` and change the value.

#### Changing bundle identifier

Open React Native project in Android Studio. click on the little gear icon ( ![Gears icon](https://i.stack.imgur.com/lkezT.png) )

Uncheck / De-select the `Hide Empty Middle Packages` option

![](https://image.prntscr.com/image/xTaeeB48TJOPSyQiKN5fcw.png)

Your package directory will now be broken up in individual directories

Individually select each directory you want to rename, and
-   Right-click it
-   Select  `Refactor`
-   Click on  `Rename`
-   In the Pop-up dialog, click on  `Rename Package`  instead of Rename Directory
-   Enter the new name and hit  **Refactor**
-   Click  **Do Refactor**  in the bottom
-   Allow a minute to let Android Studio update all changes

![](https://image.prntscr.com/image/GhbTcHtMT-iYkk9uDzisOw.png)

Now open your  **_Gradle Build File_**  (`build.gradle`  - Usually  `app`  or  `mobile`). Update the  `applicationId`  to your new Package Name and Sync Gradle, if it hasn't already been updated automatically:

![](https://image.prntscr.com/image/gXVsdXDtS9K6z-vYneb4NQ.png)

You may need to change the `package=` attribute in your manifest.

**Note:**  Please do not update gradle in Android Studio. 

Now close the Android Studio. 

#### Generating the release APK
```

## for MacOS and Linux
cd android
chmod +x gradlew
./gradlew assembleRelease


## for Windows
cd android
.\gradlew.bat assembleRelease
```

The generated APK can be found under `android/app/build/outputs/apk/app-release.apk`, and is ready to be distributed.
