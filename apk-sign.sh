#!/bin/bash
framework=cordova
androidSDKVerTools=30.0.3
signingKeys=~/my-release-key.keystore
aliasName=alias_name
outputDir=dist/$framework
inputFile=dist/$framework/android/apk/release/app-release-unsigned.apk
name=DreamReader

echo "Signinig APK File"
$JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $signingKeys $inputFile $aliasName

echo -e "\n\nSigining Finished...\n\n"

echo "Zipligning APK File"
$ANDROID_SDK_ROOT/build-tools/$androidSDKVerTools/zipalign -f -v 4 $inputFile $outputDir/$name.apk

echo -e "\n\nProcess Completed!"