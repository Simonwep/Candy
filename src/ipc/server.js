const {ipcMain} = require('electron');
const events = require('./events');

for (const [key, val] of Object.entries(events)) {

    // Validate
    /* eslint-disable no-console */
    if (typeof key !== 'string' || typeof val !== 'function') {
        console.error('[IPC-SERVER] Invalid construct: ', key, val);
    }

    // Set-up listener
    ipcMain.on(key, (event, {data, id}) => {

        // Fire handler
        val(data, event).then(data => {
            event.sender.send('response', {id, data});
        });
    });
}
