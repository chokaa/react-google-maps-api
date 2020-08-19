Dev dependencies which were added after creating react app: 
    "@react-google-maps/api": "^1.9.8",
    "node-sass": "^4.14.1",
    "react-redux": "^7.2.0",
    "redux": "^4.0.5",
    "redux-state-sync": "^3.1.1"

Inside src/components/constants.js is googleAPIKey which is left there intentionally so you can just run it out of the box ( yarn/npm install and yarn/npm start ), if not and you need to extend something on this you will probably need to update it ( and also set it up on your google cloud platform ).

If having any troubles delete local storage, since it state relies on it
