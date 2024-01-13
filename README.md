# tripaidFYP
To Run Code from Github: (please download the most updated one)

1. Run these commands in your terminal

  - expo install @react-native-community/datetimepicker@7.2.0expo install expo-updates@0.18.19
  - npm update
  - npx expo install --fix
    
2. Then edit the app.json file, remove this section:

      "extra": { 
        "eas": { 
          "projectId": "a....." 
          } 
        },

3. Run this command:

  - npm start
