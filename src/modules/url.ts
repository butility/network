export * from '@/core/url';
import {
    constructURL,
    parseQueryStringParameters,
    removeQueryStringParameter,
    replaceQueryStringParameter,
    extractFragment,
    mergeURL,
    normalizeURL,
} from '@/core/url';

const URL = {
    constructURL,
    parseQueryStringParameters,
    removeQueryStringParameter,
    replaceQueryStringParameter,
    extractFragment,
    mergeURL,
    normalizeURL,
};

export default URL;
