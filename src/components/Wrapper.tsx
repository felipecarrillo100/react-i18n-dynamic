import React, {useEffect, useState} from 'react';
import {createIntl, RawIntlProvider} from 'react-intl';
var rtlDetect = require('rtl-detect');

export const Context = React.createContext(undefined);

export const SupportedLanguages = [
    {name: "fr", title: "French", hint: ""},
    {name: "en", title: "English", hint: ""},
    {name: "ar", title: "Arabic", hint: ""},
    {name: "es", title: "Spanish", hint: ""},
]

let local = "en";
let rtlMain = false;
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
    const [rtl, setRtl] = useState(rtlMain);
    const [locale, setLocale] = useState(local);
    const [messages, setMessages] = useState(lang);

    const intl = createIntl({
        locale,
        messages: messages as any,
    });

    const onComponentDidMounted = () => {
            let localAutodetect = navigator.language.substr(0, 2);
            // let localAutodetect = "fr";
            fetchLanguage(localAutodetect).then((content) => {
                const isRtl = rtlDetect.isRtlLang(localAutodetect);
                setRtl(isRtl);
                setMessages(content);
                setLocale(localAutodetect);
            }, () => {
                setRtl(false);
                setLocale("en")
            })
    }

    useEffect(() => {
        onComponentDidMounted();
    }, [])

    function selectLanguage(e: any) {
        const newLocale = e.target.value.substr(0, 2);
        fetchLanguage(newLocale).then((content) => {
            const isRtl = rtlDetect.isRtlLang(newLocale);
            setRtl(isRtl);
            setMessages(content);
            setLocale(newLocale);
        }, () => {
            setRtl(false);
            setLocale("en")
        });
    }

    return (
        <Context.Provider value={{locale, selectLanguage, intl, rtl} as any}>
            <RawIntlProvider value={intl}>
                {props.children}
            </RawIntlProvider>
        </Context.Provider>
    );
}

export default Wrapper;
