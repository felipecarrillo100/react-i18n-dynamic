/*
 * This script utilizes Microsoft's Azure translation API to translate English source file to
 * other languages to implement localization.
 */

const request = require('request');
const fs = require('fs');
const sourceFolder = "../lang/";
const localesFolder = "../public/translations/";

// Make sure you copy the subscription key from the translation resource on Azure
let subscriptionKeyFile = "./azurekey.txt";
let subscriptionKeyBuffer;
try {
    subscriptionKeyBuffer = fs.readFileSync(subscriptionKeyFile);
} catch (err) {
    console.log("Microsoft Azure key file not found.  Create ./scripts/azurekey.txt and put your key inside");
    process.exit()
}
let subscriptionKey = "";

subscriptionKeyBuffer.toString().split(/\n/).forEach(function(line){
    line = line.trim()
    if (line.startsWith("#")) {
        // Ignore line
    } else {
        subscriptionKey += line;
    }
});
subscriptionKey = subscriptionKey.trim();

if (subscriptionKey.length < 1) {
    console.log("Microsoft Azure key is missing in file scripts/azurekey.txt");
    process.exit()
}

// Make sure you copy the World region (You have specified the region when you created the translation resource). Using "global" means world wide service coverage
const region = "global";

/*
 * Iterates over every locale defined in the 'localesFolder'
 * Makes an API call to MS-translate to translate the default text (in English) to the target laguage
 * Overwrites each locale's json file with the translations obtained from the API
 */
const translate = async () => {
    let locales = parseLocales(localesFolder);


    for (let locale of locales) {
        console.log("Processing: " + locale)
        let sourceFile = `${sourceFolder}/en.json`;
        let transData = JSON.parse(fs.readFileSync(sourceFile));

        for (let key of Object.keys(transData)) {
            let Text = transData[key].defaultMessage;

            let options = {
                'method': 'POST',
                'url': 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='+locale,
                'headers': {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Ocp-Apim-Subscription-Region': 'global',
                    'Content-Type': 'application/json',
                },
                body: [{"Text": preprocessText(Text)}],
                json: true
            };
            try {
                let resultText = await requestTranslation(options);
                let result = resultText;
                transData[key] = postprocessText(Text, result[0].translations[0].text);
            } catch (err) {
                console.log(err)
            }

        }

       let localeFile = `${localesFolder}/${locale}.json`;
       fs.writeFile(localeFile, JSON.stringify(transData, null, 2), (err) => {
            if (err) return console.log(err);
            console.log('writing to ' + localeFile);
            console.log(transData);
        });
    }
}

/*
 * Get the list of desired languages from localesFolder. If you want to add a new language just an empty file. i.e  it.json
 */
const parseLocales = (localesFolder) => {
    let locales = [];

    fs.readdirSync(localesFolder).forEach(file => {
        if (file.slice(0, 9) != 'whitelist')
            locales.push(file.split('.')[0])
    });

    console.log('Locales supported: ', locales);
    return locales
}

/*
 * Wraps the nodejs 'request' into a promise so that we can use async/await
 */
const requestTranslation = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject(options.url + ' / Invalid status code <' + response.statusCode + '>' + ":" + response.statusMessage);
            }
            resolve(body);
        });
    });
}

/* Microsoft Azure translation is not aware of the syntax used for variale values. This workaround solved this issue */
/* The Workround consiste on a preprocess  replacing {name} for <script>name<script> */
/* Asure will not tranlate html tags.  We send the new text to Azure for translation. */
/* Asure will will provide a translated text which now we postprocess to replace <script>translatedname</script> back to {name} */
function preprocessText(originalText) {
    let text = originalText.replace(/{/g, "<script>");
    text = text.replace(/}/g, "</script>");
    return text;
}
function replceScriptToBracker(str, newStr) {
    let result = str.replace(/<script>.*<\/script>/, "{"+newStr+"}")
    return result;
}
function postprocessText(originalText, text) {
    var matches = [],          // an array to collect the strings that are found
        rxp = /{([^}]+)}/g,
        curMatch;

    while( curMatch = rxp.exec( originalText ) ) {
        matches.push( curMatch[1] );
    }

    if (matches.length>0) {
        let mainMatch = matches[0]
        let result = replceScriptToBracker(text, mainMatch);
        return  result;
    } else {
        return text;
    }
}

//  Main!!
translate();
