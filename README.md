# Internationalization Example with 'react-int' with automatic tranlations using Microsoft Azure Translator 

This example loads the languages dynamicaly at runtime. Only one language is loaded in memory at a time, saving size and memory and reducing doenload time.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Install
`npm install`

### Initialize the internationalization script
`npm run int:init`

### Parse source your react app source code for uses of internationalization code to extract
`npm run int:extract`

This will look for anny occurance of the react-int api in your code declaring a new translation and it will put all the definitions found in the ./lang folder. All definitions are in english so the file will be called en.json.   This files is the input for npm run int:translate

### Automatically Translates the extracted source Microsoft Azure Translator service
`npm run int:translate`

To use this part you will need to go to Microsoft Azure portal [https://portal.azure.com/](https://portal.azure.com/), 
register and create a translation resource. Once created copy your key for the service to the the azurekey.txt file.

This will translate en.json in to any language you want.  To add a new language simply create a new empty xx.json file in ./public/translations, for instance add 'it.json'.
After running int:translate  the it.json will be overwritten with the italizan translation for the original english source

### React Application
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More
This file was created with create-react-app.
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

