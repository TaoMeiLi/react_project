export const newlineAfterBlank = str=>str.replace(/^(.*?)\s(.*?)$/, '$1<p>$2</p>');