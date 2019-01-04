import { url as urlUtil } from 'mobile-utils';

export const getQuery = ()=>(urlUtil.query_params(location.search.slice(1)) || {});