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

--------------------------------------------------------------------------------------------------------------

To Connect the Code to Firebase: (based on the Youtube Video)

1. After testing out to run the Code, run this command:
  - npx expo install firebase

2. In your Code add this in App.js:
	import { initializeApp } from "firebase/app"

	const firebaseConfig = {
  	apiKey: 'api-key',
  	authDomain: 'fir-4fyp.firebaseapp.com',
  	databaseURL: 'https://fir-4fyp-default-rtdb.asia-southeast1.firebasedatabase.app/',
  	projectId: 'fir-4fyp',
	};

	const app = initializeApp(firebaseConfig)
	console.log(app)

3. You should be able to see a console message the same as the YT Video
