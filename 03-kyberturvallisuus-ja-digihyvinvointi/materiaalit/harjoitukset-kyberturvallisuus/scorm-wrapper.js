const SCORM = (() => {
    let api = null;
    let connected = false;
    function findAPI(win) {
        let attempts = 0;
        while (win && !win.API && attempts < 10) {
            if (win.parent && win.parent !== win) {
                win = win.parent;
            } else if (win.opener) {
                win = win.opener;
            } else {
                break;
            }
            attempts++;
        }
        return win && win.API ? win.API : null;
    }
    function init() {
        api = findAPI(window);
        if (api) {
            const result = api.LMSInitialize('');
            connected = result === 'true' || result === true;
        }
    }
    function setScore(raw, max) {
        if (!connected || !api) return;
        api.LMSSetValue('cmi.core.score.raw', String(raw));
        api.LMSSetValue('cmi.core.score.max', String(max));
        api.LMSCommit('');
    }
    return { init, setScore };
})();
