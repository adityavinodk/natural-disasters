# Natural Disaster Project
## This project aims to do the following main tasks (Use-Cases) - 
1. Build a mobile application for users which can be used in situations of emergency to send a message to the nearest task force establishment for support-
   * Has options like Enable/Disable Emergency, SOS, Helpline, Notifying Important Contacts, 
   * Receive ETA of support in critical conditions

2. Monitor the live location of the those users who have sent an emergency message and spread their coordinates on the Map. If those coordinates are ratified by our database as a disaster prone region for landslides, tsunami, floods etc, it shall immediately send a message to the nearest set of Task Forces and wait for their response. 

3. Run Analysis on the clusters of users on the map who are in a disaster prone region and make several inferences on the number of people who have been affected during intervals of time. 
   * Regular predictions can be made as to the number of affected inhabitants over a certain period of time or season in a particular disaster prone region
   * Real-time map data can be sent to task-forces to streamline rescue efforts
   * Before the common season for natural disasters, task forces can be notified about the number of affected civilians  the previous time, so as to have a clear picture of the aid and relief measures needed to handle the situation appropriately.
	
We believe that with these measures in place, the entire flow of rescue and relief operations becomes more accurate and reliable with minimal wastage of time and effort. 

## Target Audience-
1. civilians who reside in disaster prone regions
2. governmental and non-governmental agencies that help in the relief of affected inhabitants.

## Installation instructions- 
This project is being implemented using React Native and Firebase.

1. Clone the repository and enter ```npm install``` in the terminal
2. Add config file with credentials to config/config.js
3. Run ```react-native run ios``` for ios 
4. Run ```react-native run android``` for android

Check [React-Native Documentation](https://facebook.github.io/react-native/docs/getting-started) for more information
