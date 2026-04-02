/**
 * Tekstinkäsittelyn interaktiivisten harjoitusten moottori
 * Word Exercise Engine v1.0
 *
 * Toteuttaa:
 * - Word-tyylisen editorin (toolbar + contenteditable)
 * - Tehtäväjärjestelmän ja validoinnin
 * - Muotoilumerkkien näyttämisen (¶, ↵, →)
 * - Pikanäppäinten seurannan
 * - Edistymispalkin
 */

// ============================================================
// WORDEXERCISE-LUOKKA
// ============================================================

class WordExercise {
    constructor(config) {
        this.containerId = config.containerId;
        this.tasks = config.tasks || [];
        this.initialHTML = config.initialHTML || '<p></p>';
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.totalTasks = this.tasks.length;
        this.showMarks = false;
        this.toolbarButtons = config.toolbarButtons || [
            'bold', 'italic', 'underline', 'sep',
            'heading1', 'heading2', 'heading3', 'normal', 'sep',
            'alignLeft', 'alignCenter', 'alignRight', 'sep',
            'bulletList', 'numberList', 'sep',
            'marks'
        ];
        this.infoPanel = config.infoPanel || null;
        this.keyboardOnly = config.keyboardOnly || false;

        this.editor = null;
        this.taskEl = null;
        this.taskCounter = null;
        this.progressFill = null;
        this.progressText = null;
        this.container = null;

        this.shortcutLog = [];
        this.taskShortcutStart = 0;
        this._checkTimer = null;
        this._initialHTMLBackup = this.initialHTML;
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.classList.add('word-exercise');

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildToolbar();
        this._buildEditor();
        this._buildControls();

        this._showTask();
        this._updateProgress();
        this._setupValidation();
    }

    // ─── UI ───────────────────────────────────────────────

    _buildInfoPanel() {
        const panel = document.createElement('div');
        panel.className = 'info-panel';
        if (this.infoPanel.title) {
            const h = document.createElement('h3');
            h.textContent = this.infoPanel.title;
            panel.appendChild(h);
        }
        const content = document.createElement('div');
        content.className = 'info-content';
        content.innerHTML = this.infoPanel.content;
        panel.appendChild(content);
        this.container.appendChild(panel);
    }

    _buildTaskPanel() {
        const panel = document.createElement('div');
        panel.className = 'task-panel';

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = 'Tehtävä: ';
        panel.appendChild(label);

        this.taskEl = document.createElement('span');
        this.taskEl.className = 'task-text';
        panel.appendChild(this.taskEl);

        this.taskCounter = document.createElement('span');
        this.taskCounter.className = 'task-counter';
        panel.appendChild(this.taskCounter);

        this.container.appendChild(panel);
    }

    _buildProgress() {
        const wrap = document.createElement('div');
        wrap.className = 'progress-container';

        const track = document.createElement('div');
        track.className = 'progress-bar-track';

        this.progressFill = document.createElement('div');
        this.progressFill.className = 'progress-bar-fill';
        track.appendChild(this.progressFill);
        wrap.appendChild(track);

        this.progressText = document.createElement('div');
        this.progressText.className = 'progress-text';
        wrap.appendChild(this.progressText);

        this.container.appendChild(wrap);
    }

    _buildToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'word-toolbar';
        if (this.keyboardOnly) toolbar.classList.add('toolbar-disabled');

        const defs = {
            'bold':       { html: '<b>B</b>', title: 'Lihavointi (Ctrl+B)', cmd: 'bold', cls: 'tb-bold' },
            'italic':     { html: '<i>I</i>', title: 'Kursiivi (Ctrl+I)', cmd: 'italic', cls: 'tb-italic' },
            'underline':  { html: '<u>U</u>', title: 'Alleviivaus (Ctrl+U)', cmd: 'underline', cls: 'tb-underline' },
            'heading1':   { html: 'H1', title: 'Otsikko 1', cmd: 'formatBlock', value: 'h1', cls: 'tb-h' },
            'heading2':   { html: 'H2', title: 'Otsikko 2', cmd: 'formatBlock', value: 'h2', cls: 'tb-h' },
            'heading3':   { html: 'H3', title: 'Otsikko 3', cmd: 'formatBlock', value: 'h3', cls: 'tb-h' },
            'normal':     { html: '¶', title: 'Normaali teksti', cmd: 'formatBlock', value: 'p', cls: 'tb-normal' },
            'alignLeft':  { html: '<span class="ico-align left"><span></span><span></span><span></span></span>', title: 'Tasaa vasemmalle', cmd: 'justifyLeft' },
            'alignCenter':{ html: '<span class="ico-align center"><span></span><span></span><span></span></span>', title: 'Keskitä', cmd: 'justifyCenter' },
            'alignRight': { html: '<span class="ico-align right"><span></span><span></span><span></span></span>', title: 'Tasaa oikealle', cmd: 'justifyRight' },
            'bulletList': { html: '•≡', title: 'Luettelomerkki', cmd: 'insertUnorderedList' },
            'numberList': { html: '1.', title: 'Numeroitu luettelo', cmd: 'insertOrderedList' },
            'marks':      { html: '¶', title: 'Muotoilumerkit', toggle: 'marks', cls: 'tb-marks' }
        };

        for (const id of this.toolbarButtons) {
            if (id === 'sep') {
                const sep = document.createElement('span');
                sep.className = 'toolbar-sep';
                toolbar.appendChild(sep);
                continue;
            }
            const d = defs[id];
            if (!d) continue;

            const btn = document.createElement('button');
            btn.className = 'toolbar-btn' + (d.cls ? ' ' + d.cls : '');
            btn.title = d.title || '';
            btn.innerHTML = d.html;

            if (d.toggle === 'marks') {
                btn.addEventListener('click', () => this._toggleMarks(btn));
            } else if (this.keyboardOnly) {
                btn.disabled = true;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._showNotice('⌨️ Käytä pikanäppäintä! Työkalupalkki on pois käytöstä tässä harjoituksessa.');
                });
            } else {
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (d.cmd) document.execCommand(d.cmd, false, d.value || null);
                    this._scheduleCheck();
                });
            }
            toolbar.appendChild(btn);
        }
        this.container.appendChild(toolbar);
    }

    _buildEditor() {
        const page = document.createElement('div');
        page.className = 'page-wrapper';

        this.editor = document.createElement('div');
        this.editor.className = 'word-editor';
        this.editor.contentEditable = 'true';
        this.editor.innerHTML = this.initialHTML;
        this.editor.spellcheck = false;

        this.editor.addEventListener('input', () => this._scheduleCheck());
        this.editor.addEventListener('keydown', (e) => this._handleKeydown(e));
        this.editor.addEventListener('keyup', () => this._scheduleCheck());
        this.editor.addEventListener('mouseup', () => this._scheduleCheck());

        page.appendChild(this.editor);
        this.container.appendChild(page);
    }

    _buildControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';

        const hintBtn = document.createElement('button');
        hintBtn.className = 'btn btn-hint';
        hintBtn.textContent = '💡 Vihje';
        hintBtn.addEventListener('click', () => this._showHint());
        controls.appendChild(hintBtn);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '↺ Aloita alusta';
        resetBtn.addEventListener('click', () => this._reset());
        controls.appendChild(resetBtn);

        this.container.appendChild(controls);
    }

    // ─── TEHTÄVIEN HALLINTA ───────────────────────────────

    _showTask() {
        if (this.currentTaskIndex >= this.tasks.length) {
            this._showSuccess();
            return;
        }
        const task = this.tasks[this.currentTaskIndex];
        this.taskEl.innerHTML = task.instruction;
        this.taskCounter.textContent = `(${this.currentTaskIndex + 1}/${this.totalTasks})`;
        this.taskShortcutStart = this.shortcutLog.length;

        // Remove old hints
        const old = this.container.querySelector('.hint-box');
        if (old) old.remove();
    }

    _scheduleCheck() {
        if (this._checkTimer) clearTimeout(this._checkTimer);
        this._checkTimer = setTimeout(() => this._checkTask(), 250);
    }

    _checkTask() {
        if (this.currentTaskIndex >= this.tasks.length) return;
        const task = this.tasks[this.currentTaskIndex];
        if (task.validate(this.editor, this)) {
            this._completeTask();
        }
    }

    _completeTask() {
        this.completedCount++;
        this.currentTaskIndex++;
        this._updateProgress();

        const panel = this.container.querySelector('.task-panel');
        panel.classList.add('task-done');
        setTimeout(() => panel.classList.remove('task-done'), 700);

        this._showTask();
    }

    _updateProgress() {
        const pct = this.totalTasks > 0 ? (this.completedCount / this.totalTasks * 100) : 0;
        this.progressFill.style.width = pct + '%';
        this.progressText.textContent = `${this.completedCount} / ${this.totalTasks} tehtävää suoritettu`;
    }

    _showHint() {
        if (this.currentTaskIndex >= this.tasks.length) return;
        const task = this.tasks[this.currentTaskIndex];
        if (!task.hint) return;

        const existing = this.container.querySelector('.hint-box');
        if (existing) existing.remove();

        const box = document.createElement('div');
        box.className = 'hint-box';
        box.innerHTML = '💡 ' + task.hint;

        const taskPanel = this.container.querySelector('.task-panel');
        taskPanel.parentNode.insertBefore(box, taskPanel.nextSibling);
        setTimeout(() => { if (box.parentNode) box.remove(); }, 8000);
    }

    _showNotice(text) {
        const existing = this.container.querySelector('.hint-box');
        if (existing) existing.remove();

        const box = document.createElement('div');
        box.className = 'hint-box warning';
        box.textContent = text;

        const taskPanel = this.container.querySelector('.task-panel');
        taskPanel.parentNode.insertBefore(box, taskPanel.nextSibling);
        setTimeout(() => { if (box.parentNode) box.remove(); }, 4000);
    }

    _showSuccess() {
        this.taskEl.innerHTML = '';
        this.taskCounter.textContent = '';

        const existing = this.container.querySelector('.success-message');
        if (existing) return;

        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '🎉 <strong>Hienoa!</strong> Kaikki tehtävät suoritettu!<br><small>Voit harjoitella lisää tai siirtyä seuraavaan harjoitukseen.</small>';
        this.container.appendChild(msg);
    }

    _reset() {
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.shortcutLog = [];
        this.taskShortcutStart = 0;
        this.editor.innerHTML = this._initialHTMLBackup;

        const msg = this.container.querySelector('.success-message');
        if (msg) msg.remove();
        const hint = this.container.querySelector('.hint-box');
        if (hint) hint.remove();

        this._showTask();
        this._updateProgress();
    }

    // ─── MUOTOILUMERKIT ───────────────────────────────────

    _toggleMarks(btn) {
        this.showMarks = !this.showMarks;
        this.editor.classList.toggle('show-marks', this.showMarks);
        if (btn) btn.classList.toggle('active', this.showMarks);
        this._scheduleCheck();
    }

    // ─── NÄPPÄIMISTÖ ──────────────────────────────────────

    _handleKeydown(e) {
        const ctrl = e.ctrlKey || e.metaKey;

        if (ctrl && !e.shiftKey) {
            this.shortcutLog.push('ctrl+' + e.key.toLowerCase());
        }
        if (ctrl && e.shiftKey) {
            this.shortcutLog.push('ctrl+shift+' + e.key.toLowerCase());
        }
        if (e.shiftKey && e.key === 'Enter') {
            this.shortcutLog.push('shift+enter');
        }
        if (!e.shiftKey && !ctrl && e.key === 'Enter') {
            this.shortcutLog.push('enter');
        }

        // Ctrl+Shift+Space → sitova välilyönti
        if (ctrl && e.shiftKey && e.key === ' ') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '\u00A0');
            this.shortcutLog.push('ctrl+shift+space');
        }

        // Ctrl+Enter → sivunvaihto (simuloitu)
        if (ctrl && !e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertHTML', false,
                '<div class="page-break-marker" contenteditable="false">····· sivunvaihto ·····</div><p><br></p>');
            this.shortcutLog.push('ctrl+enter');
        }

        // Tab → sarkain
        if (e.key === 'Tab' && !ctrl) {
            e.preventDefault();
            document.execCommand('insertHTML', false, '\u0009');
            this.shortcutLog.push('tab');
        }

        this._scheduleCheck();
    }

    // ─── VALIDOINTIAPURIT ─────────────────────────────────

    /** Tarkista onko tietty teksti muotoiltu (bold / italic / underline) */
    isTextFormatted(text, format) {
        const tagMap = {
            'bold': ['B', 'STRONG'],
            'italic': ['I', 'EM'],
            'underline': ['U']
        };
        const styleMap = {
            'bold': (s) => s.fontWeight === 'bold' || parseInt(s.fontWeight) >= 700,
            'italic': (s) => s.fontStyle === 'italic',
            'underline': (s) => (s.textDecorationLine || s.textDecoration || '').includes('underline')
        };

        const validTags = tagMap[format] || [];
        const styleCheck = styleMap[format] || (() => false);

        const walker = document.createTreeWalker(this.editor, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            if (!walker.currentNode.textContent.includes(text)) continue;
            let node = walker.currentNode.parentNode;
            while (node && node !== this.editor) {
                if (validTags.includes(node.nodeName)) return true;
                try { if (styleCheck(window.getComputedStyle(node))) return true; } catch (_) {}
                node = node.parentNode;
            }
        }
        return false;
    }

    /** Tarkista onko teksti tietyn elementin sisällä (esim. H1, H2, UL) */
    isTextInTag(text, tagName) {
        const tag = tagName.toUpperCase();
        const walker = document.createTreeWalker(this.editor, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            if (!walker.currentNode.textContent.includes(text)) continue;
            let node = walker.currentNode.parentNode;
            while (node && node !== this.editor) {
                if (node.nodeName === tag) return true;
                node = node.parentNode;
            }
        }
        return false;
    }

    /** Palauta kappaleen tasaus (left, center, right, justify) */
    getTextAlignment(text) {
        const blocks = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'LI'];
        const walker = document.createTreeWalker(this.editor, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            if (!walker.currentNode.textContent.includes(text)) continue;
            let node = walker.currentNode.parentNode;
            while (node && node !== this.editor) {
                if (blocks.includes(node.nodeName)) {
                    const align = window.getComputedStyle(node).textAlign;
                    // Normalize browser values
                    if (align === 'start' || align === '-webkit-auto') return 'left';
                    return align;
                }
                node = node.parentNode;
            }
        }
        return 'left';
    }

    /** Tarkista onko teksti luettelossa */
    isTextInList(text, type) {
        const listTag = type === 'bullet' ? 'UL' : 'OL';
        return this.isTextInTag(text, listTag);
    }

    /** Tarkista onko pikanäppäintä käytetty nykyisen tehtävän aikana */
    hasShortcutSinceTask(shortcut) {
        return this.shortcutLog.slice(this.taskShortcutStart).includes(shortcut);
    }

    /** Tarkista onko editorissa sivunvaihtomerkki */
    hasPageBreak() {
        return !!this.editor.querySelector('.page-break-marker');
    }

    /** Tarkista onko editorissa sisällä sitova välilyönti (\u00A0) annetun tekstin ympärillä */
    hasNbsp() {
        return this.editor.innerHTML.includes('\u00A0') || this.editor.innerHTML.includes('&nbsp;');
    }

    /** Laskee kappale-elementtien (<p>, <div>) ja rivinvaihtojen (<br>) määrän */
    countParagraphs() {
        const blocks = this.editor.querySelectorAll('p, div:not(.page-break-marker)');
        return blocks.length;
    }

    countLineBreaks() {
        return this.editor.querySelectorAll('br').length;
    }

    // ─── VALIDOINTI ───────────────────────────────────────

    _setupValidation() {
        const observer = new MutationObserver(() => this._scheduleCheck());
        observer.observe(this.editor, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
}
