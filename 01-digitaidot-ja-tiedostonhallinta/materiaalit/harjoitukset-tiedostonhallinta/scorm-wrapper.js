/**
 * SCORM 1.2 API Wrapper
 * ---------------------
 * Tunnistaa automaattisesti onko SCORM-ympäristö (Moodle / LMS) käytössä.
 * Jos ei, kaikki kutsut ovat no-op → paikallinen selaintestaus toimii normaalisti.
 *
 * Käyttö harjoituksissa:
 *   <script src="scorm-wrapper.js"><\/script>
 *   SCORM.init();                              // kutsutaan sivun alussa
 *   SCORM.setScore(80, 100);                   // aseta pisteet (raw, max)
 *   SCORM.setStatus('completed');              // 'completed' | 'incomplete' | 'passed' | 'failed'
 *   SCORM.finish();                            // kutsutaan kun harjoitus päättyy
 */

const SCORM = (() => {
    let api = null;
    let connected = false;

    // ── SCORM 1.2 API:n etsintä ─────────────────────
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

    // ── Alustus ─────────────────────────────────────

    function init() {
        api = findAPI(window);
        if (api) {
            const result = api.LMSInitialize('');
            connected = result === 'true' || result === true;
            if (connected) {
                console.log('[SCORM] Yhteys LMS:ään muodostettu.');
            }
        } else {
            console.log('[SCORM] Ei LMS-ympäristöä — paikallinen tila.');
        }
    }

    // ── Arvon asettaminen ───────────────────────────

    function setValue(key, value) {
        if (!connected || !api) return;
        api.LMSSetValue(key, String(value));
        api.LMSCommit('');
    }

    // ── Arvon lukeminen ─────────────────────────────

    function getValue(key) {
        if (!connected || !api) return '';
        return api.LMSGetValue(key);
    }

    // ── Pisteiden raportointi ────────────────────────

    function setScore(raw, max, min) {
        if (!connected) {
            console.log(`[SCORM] Pisteet (paikallinen): ${raw}/${max}`);
            return;
        }
        setValue('cmi.core.score.raw', raw);
        setValue('cmi.core.score.max', max || 100);
        setValue('cmi.core.score.min', min || 0);
    }

    // ── Suoritusstatuksen asettaminen ────────────────

    function setStatus(status) {
        // SCORM 1.2 arvot: 'completed', 'incomplete', 'passed', 'failed', 'not attempted'
        if (!connected) {
            console.log(`[SCORM] Status (paikallinen): ${status}`);
            return;
        }
        setValue('cmi.core.lesson_status', status);
    }

    // ── Yhteyden sulkeminen ─────────────────────────

    function finish() {
        if (!connected || !api) {
            console.log('[SCORM] Finish (paikallinen).');
            return;
        }
        api.LMSFinish('');
        connected = false;
        console.log('[SCORM] Yhteys LMS:ään suljettu.');
    }

    // ── Onko yhdistetty? ────────────────────────────

    function isConnected() {
        return connected;
    }

    return { init, setValue, getValue, setScore, setStatus, finish, isConnected };
})();
