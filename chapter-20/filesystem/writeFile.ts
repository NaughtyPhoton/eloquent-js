

import {writeFile} from 'fs'

const path = '/Users/nstrong/Desktop/graffiti.txt';

writeFile(path, "Node was here", err => {
    if (err) console.log(`Failed to write file: ${err}`);
    else console.log("File written.");
});


