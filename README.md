# SteamWorksScouting
Scouting app for the steamworks frc game. Our application is built using the Ionic framework version 1.

# Requirement 
* Node/npm
* Ionic
* Cordova

# Commands
## Initial Setup
> npm install -g ionic cordova

## Run
> cd steamWorksScouting

> ionic serve

## Starting App on Raspberry Pi
> cd steamWorksScoutingDB

> sh startup.sh

>cd steamWorksDB

> sudo node index.js

## Exporting Data from the Pi
> cd steamWorksScoutingDB

> sh export.sh

> Eject the flash-drive from the pi

> *Make sure to have android file transfer on computer*

> Plug flashdrive into computer 

TO VIEW DATA ON DEVICE:

> Open data.csv

> Copy the data.csv

> Open downloads folder on device and data.csv

## Putting app on Android
> Enable USB debugging on device

> settings, general, about device, tap "Build Number" 7 times

> Plug device into laptop and trust computer on device

> ON TERMINAL:
> cd steamWorksScouting

> ionic build android

> ionic run android