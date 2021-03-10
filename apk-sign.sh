#!/bin/bash
framework=capacitor
androidSDKVerTools=30.0.3
signingKeys=~/Nextcloud/Tools/Android.my-release-key.keystore
aliasName=alias_name
ANDROID_SDK_ROOT=~/Android/Sdk
outputDir=dist/$framework
inputFile=dist/$framework/android/apk/release/app-release-unsigned.apk
name=DreamReader

echo "Signinig APK File"
$JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $signingKeys $inputFile $aliasName

echo -e "\n\nSigining Finished...\n\n"

echo "Zipligning APK File"
$ANDROID_SDK_ROOT/build-tools/$androidSDKVerTools/zipalign -f -v 4 $inputFile $outputDir/$name.apk

echo -e "\n\nProcess Completed!"