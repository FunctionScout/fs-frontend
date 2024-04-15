import { Link } from 'react-router-dom';

export const services = ['Core', 'Search', 'Globalization', 'Payment'];

function getFunctionObject(serviceName, functionName, dependencyType="Internal") {
    const functionRoute = `/service/${serviceName}/function/${functionName}`;
    const link = `https://github.com/${serviceName}/${functionName}`;
    const nameValue = dependencyType === "Internal"
                    ? (<Link to={functionRoute}>{functionName}</Link>)
                    : functionName

    return  {
        name: nameValue,
        githubLink: <a href={link}>{link}</a>,
        label: functionName
    };
}

function getUnusedFunctionObject(serviceName, functionName) {
    const link = `https://github.com/${serviceName}/${functionName}`;

    return  {
        name: functionName,
        githubLink: <a href={link}>{link}</a>,
        label: functionName
    };
}

function getDependentServiceObject(serviceName) {
    const link = `https://github.com/${serviceName}`;

    return  {
        name: (
          <Link to={`/service/${serviceName}`}>{serviceName}</Link>
        ),
        githubLink: <a href={link}>{link}</a>,
    };
}

export const serviceDetails = {
    Core: {
        dependencies: [
            {
                name: 'Search',
                type: 'Internal',
                functions: [
                    getFunctionObject("Search", "getSavedSearch"),
                    getFunctionObject("Search", "getFavourites")
                ]
            },
            {
                name: 'Globalization',
                type: 'Internal',
                functions: [
                    getFunctionObject("Globalization", "getTranslations"),
                    getFunctionObject("Globalization", "getLanguages")
                ]
            }
        ],
        usedFunctions: [
            getFunctionObject("Core", "getUserDetails"),
            getFunctionObject("Core", "getUserPreferences")
        ],
        unusedFunctions: [
            getUnusedFunctionObject("Core", "validateUser"),
            getUnusedFunctionObject("Core", "validateUserPreference")
        ]
    },
    Search: {
        dependencies: [
            {
                name: 'ElasticSearchLib',
                type: 'External',
                functions: [
                    getFunctionObject("ElasticSearchLib", "search", "External"),
                    getFunctionObject("ElasticSearchLib", "partialSearch", "External")
                ]
            },
            {
                name: 'Globalization',
                type: 'Internal',
                functions: [
                    getFunctionObject("Globalization", "getTranslations"),
                    getFunctionObject("Globalization", "getLanguages")
                ]
            }
        ],
        usedFunctions: [
            getFunctionObject("Search", "search"),
            getFunctionObject("Search", "partialSearch"),
            getFunctionObject("Search", "getSavedSearch"),
            getFunctionObject("Search", "getFavourites")
        ],
        unusedFunctions: [
            getUnusedFunctionObject("Search", "filterSearch")
        ]
    },
    Globalization: {
        dependencies: [
            {
                name: 'LocalizationLib',
                type: 'External',
                functions: [
                    getFunctionObject("LocalizationLib", "translate"),
                    getFunctionObject("LocalizationLib", "bulkTranslate")
                ]
            },
            {
                name: 'Core',
                type: 'Internal',
                functions: [
                    getFunctionObject("Core", "getUserDetails")
                ]
            }
        ],
        usedFunctions: [
            getFunctionObject("Globalization", "getTranslations"),
            getFunctionObject("Globalization", "getLanguages"),
            getFunctionObject("Globalization", "saveLanguagePreference")
        ],
        unusedFunctions: [
            getUnusedFunctionObject("Globalization", "addTranslation"),
            getUnusedFunctionObject("Globalization", "editTranslation")
        ]
    },
    Payment: {
        dependencies: [
            {
                name: 'StripeLib',
                type: 'External',
                functions: [
                    getFunctionObject("StripeLib", "processPayment", "External"),
                    getFunctionObject("StripeLib", "getPaymentStatus", "External")
                ]
            },
            {
                name: 'Core',
                type: 'Internal',
                functions: [
                    getFunctionObject("Core", "getUserDetails")
                ]
            }
        ],
        usedFunctions: [
            getFunctionObject("Payment", "savePaymentInfo"),
            getFunctionObject("Payment", "getPaymentInfo"),
            getFunctionObject("Payment", "processPayment"),
            getFunctionObject("Payment", "getPaymentStatus")
        ],
        unusedFunctions: [
            getUnusedFunctionObject("Payment", "switchPaymentProvider"),
            getUnusedFunctionObject("Payment", "getPaymentProviders")
        ]
    }
};

export const usedFunctionDetails = {
    getUserDetails: {
        dependents: [
            getDependentServiceObject("Globalization"),
            getDependentServiceObject("Payment")
        ]
    },
    getUserPreferences: {
        dependents: [
        ]
    },
    search: {
        dependents: [
        ]
    },
    partialSearch: {
        dependents: [
        ]
    },
    getSavedSearch: {
        dependents: [
            getDependentServiceObject("Core")
        ]
    },
    getFavourites: {
        dependents: [
            getDependentServiceObject("Core")
        ]
    },
    getTranslations: {
        dependents: [
            getDependentServiceObject("Core"),
            getDependentServiceObject("Search")
        ]
    },
    getLanguages: {
        dependents: [
            getDependentServiceObject("Core"),
            getDependentServiceObject("Search")
        ]
    },
    saveLanguagePreference: {
        dependents: [
        ]
    },
    savePaymentInfo: {
        dependents: [
        ]
    },
    getPaymentInfo: {
        dependents: [
        ]
    },
    processPayment: {
        dependents: [
        ]
    },
    getPaymentStatus: {
        dependents: [
        ]
    }
};