/**
 * SCORM 1.2 API Wrapper
 * ---------------------
 * Käyttää aina SCORM 1.2 API:a (LMS-ympäristö oletuksena).
 * Jos API:a ei löydy tai yhteys epäonnistuu, kutsut keskeytetään virheilmoituksella.
 */

window.SCORM = (() => {
    let api = null;
    let connected = false;
    let finished = false;

    function findAPI(win) {
        const maxDepth = 50;
        let depth = 0;
        let current = win;

        while (current && depth < maxDepth) {
            try {
                if (current.API) return current.API;
            } catch (e) {
                // Ignore cross-origin access errors
            }

            try {
                if (current.parent && current.parent !== current) {
                    current = current.parent;
                    depth++;
                    continue;
                }
            } catch (e) {
                break;
            }
            break;
        }

        depth = 0;
        try {
            current = win && win.opener ? win.opener : null;
        } catch (e) {
            current = null;
        }

        while (current && depth < maxDepth) {
            try {
                if (current.API) return current.API;
            } catch (e) {
                // Ignore cross-origin access errors
            }

            try {
                if (current.parent && current.parent !== current) {
                    current = current.parent;
                } else if (current.opener) {
                    current = current.opener;
                } else {
                    break;
                }
            } catch (e) {
                break;
            }
            depth++;
        }

        return null;
    }

    function ensureConnected(options = {}) {
        if (connected && api && !finished) return true;
        return init({ markIncomplete: false, ...options });
    }

    function init(options = {}) {
        if (connected && !finished) return true;

        api = findAPI(window);
        finished = false;
        if (api) {
            const result = api.LMSInitialize('');
            connected = result === 'true' || result === true;

            if (!connected) {
                try {
                    api.LMSGetValue('cmi.core.lesson_status');
                    const probeError = String(api.LMSGetLastError());
                    if (probeError === '0') {
                        connected = true;
                    }
                } catch (e) {
                    connected = false;
                }
            }

            if (connected) {
                if (options.markIncomplete !== false) {
                    const currentStatus = getValue('cmi.core.lesson_status');
                    if (!currentStatus || currentStatus === 'not attempted') {
                        setValue('cmi.core.lesson_status', 'incomplete');
                    }
                }
                console.log('[SCORM] Yhteys LMS:ään muodostettu.');
            } else {
                let errCode = '';
                let errDiag = '';
                try {
                    errCode = String(api.LMSGetLastError());
                    errDiag = api.LMSGetDiagnostic(errCode);
                } catch (e) {
                    // ignore secondary error
                }
                console.error(`[SCORM] LMSInitialize epäonnistui. Koodi: ${errCode}. ${errDiag}`);
            }
        } else {
            console.error('[SCORM] SCORM API:a ei löytynyt tästä näkymästä.');
        }

        return connected;
    }

    function setValue(key, value) {
        if (!ensureConnected({ markIncomplete: false })) return;
        if (!connected || !api || finished) return;
        api.LMSSetValue(key, String(value));
        api.LMSCommit('');
    }

    function getValue(key) {
        if (!connected || !api) return '';
        return api.LMSGetValue(key);
    }

    function setScore(raw, max, min) {
        if (!ensureConnected({ markIncomplete: false })) {
            console.error('[SCORM] Pisteiden tallennus epäonnistui: LMS-yhteyttä ei löytynyt.');
            return;
        }
        setValue('cmi.core.score.raw', raw);
        setValue('cmi.core.score.max', max || 100);
        setValue('cmi.core.score.min', min || 0);
    }

    function setStatus(status) {
        if (!ensureConnected({ markIncomplete: false })) {
            console.error(`[SCORM] Statuksen tallennus epäonnistui: ${status}`);
            return;
        }
        setValue('cmi.core.lesson_status', status);
    }

    function finish() {
        if (!connected || !api || finished) {
            console.error('[SCORM] Finish epäonnistui: LMS-yhteyttä ei löytynyt.');
            return;
        }
        api.LMSCommit('');
        api.LMSFinish('');
        connected = false;
        finished = true;
        console.log('[SCORM] Yhteys LMS:ään suljettu.');
    }

    function advance() {
        const usingLms = ensureConnected({ markIncomplete: false }) && connected && api && !finished;

        if (usingLms) {
            setStatus('completed');
        } else {
            console.error('[SCORM] Siirtymistä ei tehty, koska LMS-yhteyttä ei löytynyt.');
            return false;
        }

        finish();
        return usingLms;
    }

    function goTo(url) {
        return advance();
    }

    function isConnected() {
        return connected;
    }

    return { init, setValue, getValue, setScore, setStatus, finish, advance, goTo, isConnected };
})();
