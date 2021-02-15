import React, {useEffect, useState} from 'react';
import {createIntl, RawIntlProvider} from 'react-intl';

export const Context = React.createContext(undefined);

export const SupportedLanguages = [
    {name: "fr", title: "French", hint: ""},
    {name: "en", title: "English", hint: ""},
    {name: "ar", title: "Arabic", hint: ""},
    {name: "es", title: "Spanish", hint: ""},
]

let local = "en";
let lang: any;

function fetchLanguage(language: string) {
    return new Promise((resolve, reject) => {
        fetch('./translations/' + language + '.json')
            .then(response => response.json())
            .then(data => {
                resolve(JSON.parse(JSON.stringify(data)))
            });
    });
}

const Wrapper = (props: any) => {
    const [locale, setLocale] = useState(local);
    const [messages, setMessages] = useState(lang);
    const intl = createIntl({
        locale,
        messages: messages as any
    });

    const onComponentDidMounted = () => {
            let localAutodetect = navigator.language.substr(0, 2);
            // let localAutodetect = "fr";
            fetchLanguage(localAutodetect).then((content) => {
                setMessages(content);
                setLocale(localAutodetect);
            }, () => {
                setLocale("en")
            })
    }

    useEffect(() => {
        onComponentDidMounted();
    }, [])

    function selectLanguage(e: any) {
        const newLocale = e.target.value.substr(0, 2);
        fetchLanguage(newLocale).then((content) => {
            setMessages(content);
            setLocale(newLocale);
        }, () => {
            setLocale("en")
        });
    }

    return (
        <Context.Provider value={{locale, selectLanguage, intl} as any}>
            <RawIntlProvider value={intl}>
                {props.children}
            </RawIntlProvider>
        </Context.Provider>
    );
}

export default Wrapper;
