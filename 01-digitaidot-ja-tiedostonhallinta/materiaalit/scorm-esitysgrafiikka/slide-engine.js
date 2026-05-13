/**
 * Esitysgrafiikan interaktiivisten harjoitusten moottori
 * Slide Exercise Engine v1.0
 *
 * Toteuttaa:
 * - PowerPoint-tyylisen dianäkymän (diasorttaus + dia-editori)
 * - Diojen lisäämisen, poistamisen ja järjestämisen (drag & drop)
 * - Layoutvalinnan (otsikkodia, otsikko+sisältö, tyhjä…)
 * - Tehtäväjärjestelmän ja validoinnin
 * - Edistymispalkin
 */

// ============================================================
// APUFUNKTIOT
// ============================================================

function slideId() {
    return 'slide-' + Math.random().toString(36).substring(2, 9);
}

// ============================================================
// SLIDEEXERCISE-LUOKKA
// ============================================================

class SlideExercise {
    constructor(config) {
        this.containerId = config.containerId;
        this.tasks = config.tasks || [];
        this.slides = config.slides || [];
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.totalTasks = this.tasks.length;
        this.container = null;
        this.selectedSlideIndex = 0;
        this.infoPanel = config.infoPanel || null;
        this.readOnly = config.readOnly || false;
        this._checkTimer = null;
        this._initialSlides = JSON.parse(JSON.stringify(config.slides || []));

        // UI handles
        this.thumbStrip = null;
        this.slideView = null;
        this.taskEl = null;
        this.taskCounter = null;
        this.progressFill = null;
        this.progressText = null;
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.classList.add('slide-exercise');

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildWorkspace();
        if (!this.readOnly) this._buildSlideControls();
        this._buildControls();

        this._renderThumbs();
        this._selectSlide(0);
        this._showTask();
        this._updateProgress();
    }

    // ─── UI-RAKENNUS ──────────────────────────────────────

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

    _buildWorkspace() {
        const ws = document.createElement('div');
        ws.className = 'slide-workspace';

        // Vasemman reunan thumbnailit
        this.thumbStrip = document.createElement('div');
        this.thumbStrip.className = 'thumb-strip';
        ws.appendChild(this.thumbStrip);

        // Oikean puolen dianäkymä
        this.slideView = document.createElement('div');
        this.slideView.className = 'slide-main-view';
        ws.appendChild(this.slideView);

        this.container.appendChild(ws);
    }

    _buildSlideControls() {
        const bar = document.createElement('div');
        bar.className = 'slide-action-bar';

        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-slide-action';
        addBtn.textContent = '+ Lisää dia';
        addBtn.addEventListener('click', () => this._showLayoutPicker());
        bar.appendChild(addBtn);

        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-slide-action btn-danger';
        delBtn.textContent = '🗑 Poista dia';
        delBtn.addEventListener('click', () => this._deleteSelectedSlide());
        bar.appendChild(delBtn);

        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'btn btn-slide-action';
        moveUpBtn.textContent = '↑ Siirrä ylös';
        moveUpBtn.addEventListener('click', () => this._moveSlide(-1));
        bar.appendChild(moveUpBtn);

        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'btn btn-slide-action';
        moveDownBtn.textContent = '↓ Siirrä alas';
        moveDownBtn.addEventListener('click', () => this._moveSlide(1));
        bar.appendChild(moveDownBtn);

        this.container.appendChild(bar);
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

    // ─── DIOJEN RENDERÖINTI ───────────────────────────────

    _renderThumbs() {
        this.thumbStrip.innerHTML = '';
        this.slides.forEach((slide, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'slide-thumb' + (i === this.selectedSlideIndex ? ' selected' : '');
            thumb.innerHTML = `<span class="thumb-num">${i + 1}</span>` + this._renderSlideContent(slide, true);
            thumb.addEventListener('click', () => this._selectSlide(i));
            this.thumbStrip.appendChild(thumb);
        });
    }

    _selectSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        this.selectedSlideIndex = index;
        // Päivitä thumbnailit
        this.thumbStrip.querySelectorAll('.slide-thumb').forEach((el, i) => {
            el.classList.toggle('selected', i === index);
        });
        this._renderMainSlide();
    }

    _renderMainSlide() {
        this.slideView.innerHTML = '';
        if (this.slides.length === 0) {
            this.slideView.innerHTML = '<div class="empty-slide-msg">Ei dioja. Lisää dia + -painikkeella.</div>';
            return;
        }
        const slide = this.slides[this.selectedSlideIndex];
        const el = document.createElement('div');
        el.className = 'slide-canvas ' + (slide.theme || '');
        el.innerHTML = this._renderSlideContent(slide, false);

        // Tee kentät muokattaviksi
        if (!this.readOnly) {
            el.querySelectorAll('[data-field]').forEach(field => {
                field.contentEditable = 'true';
                field.spellcheck = false;

                // Placeholder-logiikka: focus tyhjentää, blur palauttaa
                const ph = field.querySelector('.placeholder');
                const phText = ph ? ph.textContent : '';

                field.addEventListener('focus', () => {
                    if (field.querySelector('.placeholder')) {
                        field.innerHTML = '';
                    }
                });
                field.addEventListener('input', () => {
                    const key = field.getAttribute('data-field');
                    slide[key] = field.innerHTML;
                    this._scheduleCheck();
                    this._renderThumbs();
                });
                field.addEventListener('blur', () => {
                    const key = field.getAttribute('data-field');
                    const text = this._stripHtml(field.innerHTML || '');
                    if (text.trim() === '') {
                        // Palauta placeholder
                        field.innerHTML = '<span class="placeholder">' + phText + '</span>';
                        slide[key] = '';
                    } else {
                        slide[key] = field.innerHTML;
                    }
                });
            });
        }

        this.slideView.appendChild(el);
    }

    _renderSlideContent(slide, isThumb) {
        const layout = slide.layout || 'title-content';
        const tag = isThumb ? 'div' : 'div';
        const editAttr = isThumb ? '' : 'data-field';

        switch (layout) {
            case 'title':
                return `
                    <div class="sl-title-slide">
                        <div class="sl-title" ${isThumb ? '' : 'data-field="title"'}>${slide.title || '<span class="placeholder">Otsikko</span>'}</div>
                        <div class="sl-subtitle" ${isThumb ? '' : 'data-field="subtitle"'}>${slide.subtitle || '<span class="placeholder">Alaotsikko</span>'}</div>
                    </div>`;

            case 'title-content':
                return `
                    <div class="sl-content-slide">
                        <div class="sl-heading" ${isThumb ? '' : 'data-field="title"'}>${slide.title || '<span class="placeholder">Otsikko</span>'}</div>
                        <div class="sl-body" ${isThumb ? '' : 'data-field="body"'}>${slide.body || '<span class="placeholder">Sisältö</span>'}</div>
                    </div>`;

            case 'two-column':
                return `
                    <div class="sl-two-col-slide">
                        <div class="sl-heading" ${isThumb ? '' : 'data-field="title"'}>${slide.title || '<span class="placeholder">Otsikko</span>'}</div>
                        <div class="sl-columns">
                            <div class="sl-col" ${isThumb ? '' : 'data-field="bodyLeft"'}>${slide.bodyLeft || '<span class="placeholder">Vasen sarake</span>'}</div>
                            <div class="sl-col" ${isThumb ? '' : 'data-field="bodyRight"'}>${slide.bodyRight || '<span class="placeholder">Oikea sarake</span>'}</div>
                        </div>
                    </div>`;

            case 'blank':
                return `
                    <div class="sl-blank-slide">
                        <div class="sl-free" ${isThumb ? '' : 'data-field="body"'}>${slide.body || '<span class="placeholder">Tyhjä dia</span>'}</div>
                    </div>`;

            case 'section':
                return `
                    <div class="sl-section-slide">
                        <div class="sl-section-title" ${isThumb ? '' : 'data-field="title"'}>${slide.title || '<span class="placeholder">Osion otsikko</span>'}</div>
                    </div>`;

            default:
                return `<div class="sl-content-slide">
                    <div class="sl-heading" ${isThumb ? '' : 'data-field="title"'}>${slide.title || ''}</div>
                    <div class="sl-body" ${isThumb ? '' : 'data-field="body"'}>${slide.body || ''}</div>
                </div>`;
        }
    }

    // ─── DIOJEN HALLINTA ──────────────────────────────────

    _showLayoutPicker() {
        // Poista vanha
        const old = this.container.querySelector('.layout-picker');
        if (old) { old.remove(); return; }

        const picker = document.createElement('div');
        picker.className = 'layout-picker';
        picker.innerHTML = '<div class="picker-title">Valitse dian asettelu:</div>';

        const layouts = [
            { id: 'title',         label: 'Otsikkodia',       icon: '🏷️' },
            { id: 'title-content', label: 'Otsikko + sisältö', icon: '📄' },
            { id: 'two-column',    label: 'Kaksi saraketta',   icon: '📑' },
            { id: 'section',       label: 'Osion otsikko',     icon: '📌' },
            { id: 'blank',         label: 'Tyhjä dia',         icon: '⬜' }
        ];

        layouts.forEach(l => {
            const btn = document.createElement('button');
            btn.className = 'layout-option';
            btn.innerHTML = `<span class="lo-icon">${l.icon}</span><span class="lo-label">${l.label}</span>`;
            btn.addEventListener('click', () => {
                this._addSlide(l.id);
                picker.remove();
            });
            picker.appendChild(btn);
        });

        // Lisää valikon jälkeen
        const actionBar = this.container.querySelector('.slide-action-bar');
        if (actionBar) actionBar.after(picker);
        else this.container.appendChild(picker);
    }

    _addSlide(layout) {
        const newSlide = {
            id: slideId(),
            layout: layout,
            title: '',
            subtitle: '',
            body: '',
            bodyLeft: '',
            bodyRight: '',
            theme: ''
        };
        // Lisää valitun dian jälkeen
        this.slides.splice(this.selectedSlideIndex + 1, 0, newSlide);
        this._renderThumbs();
        this._selectSlide(this.selectedSlideIndex + 1);
        this._scheduleCheck();
    }

    _deleteSelectedSlide() {
        if (this.slides.length <= 1) return; // Vähintään yksi dia
        this.slides.splice(this.selectedSlideIndex, 1);
        if (this.selectedSlideIndex >= this.slides.length) {
            this.selectedSlideIndex = this.slides.length - 1;
        }
        this._renderThumbs();
        this._renderMainSlide();
        this._scheduleCheck();
    }

    _moveSlide(direction) {
        const i = this.selectedSlideIndex;
        const j = i + direction;
        if (j < 0 || j >= this.slides.length) return;
        [this.slides[i], this.slides[j]] = [this.slides[j], this.slides[i]];
        this.selectedSlideIndex = j;
        this._renderThumbs();
        this._renderMainSlide();
        this._scheduleCheck();
    }

    // ─── TEHTÄVÄJÄRJESTELMÄ ───────────────────────────────

    _showTask() {
        if (this.currentTaskIndex >= this.tasks.length) {
            this._showSuccess();
            return;
        }
        const task = this.tasks[this.currentTaskIndex];
        this.taskEl.innerHTML = task.instruction;
        this.taskCounter.textContent = `(${this.currentTaskIndex + 1}/${this.totalTasks})`;
        const old = this.container.querySelector('.hint-box');
        if (old) old.remove();
    }

    _scheduleCheck() {
        if (this._checkTimer) clearTimeout(this._checkTimer);
        this._checkTimer = setTimeout(() => this._checkTask(), 300);
    }

    _checkTask() {
        if (this.currentTaskIndex >= this.tasks.length) return;
        const task = this.tasks[this.currentTaskIndex];
        if (task.validate(this)) {
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
        this.slides = JSON.parse(JSON.stringify(this._initialSlides));
        this.selectedSlideIndex = 0;

        const msg = this.container.querySelector('.success-message');
        if (msg) msg.remove();
        const hint = this.container.querySelector('.hint-box');
        if (hint) hint.remove();
        const picker = this.container.querySelector('.layout-picker');
        if (picker) picker.remove();

        this._renderThumbs();
        this._selectSlide(0);
        this._showTask();
        this._updateProgress();
    }

    // ─── VALIDOINTIAPURIT ─────────────────────────────────

    /** Palauttaa diojen lukumäärän */
    getSlideCount() {
        return this.slides.length;
    }

    /** Palauttaa dian tietyllä indeksillä (0-pohjainen) */
    getSlide(index) {
        return this.slides[index] || null;
    }

    /** Tarkistaa onko diassa tietty layout */
    slideHasLayout(index, layout) {
        const s = this.slides[index];
        return s && s.layout === layout;
    }

    /** Tarkistaa onko diassa otsikko kirjoitettu */
    slideHasTitle(index) {
        const s = this.slides[index];
        if (!s) return false;
        const txt = this._stripHtml(s.title || '');
        return txt.trim().length > 0;
    }

    /** Tarkistaa sisältääkö dian teksti tietyn merkkijonon */
    slideContainsText(index, text) {
        const s = this.slides[index];
        if (!s) return false;
        const all = [s.title, s.subtitle, s.body, s.bodyLeft, s.bodyRight]
            .map(v => this._stripHtml(v || '')).join(' ').toLowerCase();
        return all.includes(text.toLowerCase());
    }

    /** Tarkistaa onko dian kenttä tyhjä */
    slideFieldEmpty(index, field) {
        const s = this.slides[index];
        if (!s) return true;
        const txt = this._stripHtml(s[field] || '');
        return txt.trim().length === 0;
    }

    /** Tarkistaa sisältääkö body-teksti luettelolistan */
    slideHasList(index) {
        const s = this.slides[index];
        if (!s) return false;
        const all = (s.body || '') + (s.bodyLeft || '') + (s.bodyRight || '');
        return /<(ul|ol)\b/i.test(all) || /^[\s]*[-•●▪]\s/m.test(this._stripHtml(all));
    }

    /** Tarkistaa monenko rivin pituinen dian body on */
    slideBodyLineCount(index) {
        const s = this.slides[index];
        if (!s) return 0;
        const txt = this._stripHtml(s.body || '');
        return txt.split('\n').filter(l => l.trim()).length;
    }

    /** Apuri HTML -> teksti */
    _stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}


// ============================================================
// FIXSLIDEEXERCISE - "Korjaa esitys" -harjoitus
// ============================================================

class FixSlideExercise {
    constructor(config) {
        this.containerId = config.containerId;
        this.tasks = config.tasks || [];
        this.slides = config.slides || [];
        this.infoPanel = config.infoPanel || null;
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.totalTasks = this.tasks.length;
        this.container = null;
        this.selectedSlideIndex = 0;
        this._checkTimer = null;
        this._initialSlides = JSON.parse(JSON.stringify(config.slides || []));
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.classList.add('slide-exercise');

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildFixWorkspace();
        this._buildControls();

        this._renderSlideCards();
        this._showTask();
        this._updateProgress();
    }

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
        label.textContent = 'Korjaa: ';
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

    _buildFixWorkspace() {
        this.slideArea = document.createElement('div');
        this.slideArea.className = 'fix-slide-area';
        this.container.appendChild(this.slideArea);
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

    _renderSlideCards() {
        this.slideArea.innerHTML = '';
        this.slides.forEach((slide, i) => {
            const card = document.createElement('div');
            card.className = 'fix-card' + (slide.problems && slide.problems.length ? ' has-problem' : ' ok');
            card.setAttribute('data-slide-index', i);

            const label = document.createElement('div');
            label.className = 'fix-card-label';
            label.textContent = `Dia ${i + 1}`;
            card.appendChild(label);

            const canvas = document.createElement('div');
            canvas.className = 'slide-canvas mini ' + (slide.theme || '');
            canvas.innerHTML = this._renderContent(slide);
            card.appendChild(canvas);

            // Alla olevat säätimet
            if (slide.controls) {
                const ctrl = document.createElement('div');
                ctrl.className = 'fix-controls';
                slide.controls.forEach(c => {
                    if (c.type === 'select') {
                        const wrap = document.createElement('label');
                        wrap.className = 'fix-ctrl-label';
                        wrap.textContent = c.label + ' ';
                        const sel = document.createElement('select');
                        sel.className = 'fix-select';
                        c.options.forEach(o => {
                            const opt = document.createElement('option');
                            opt.value = o.value;
                            opt.textContent = o.label;
                            if (o.value === c.current) opt.selected = true;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', () => {
                            slide[c.field] = sel.value;
                            this._applyControl(slide, c.field, sel.value, canvas);
                            this._scheduleCheck();
                        });
                        wrap.appendChild(sel);
                        ctrl.appendChild(wrap);
                    }
                    if (c.type === 'range') {
                        const wrap = document.createElement('label');
                        wrap.className = 'fix-ctrl-label';
                        wrap.textContent = c.label + ' ';
                        const range = document.createElement('input');
                        range.type = 'range';
                        range.min = c.min;
                        range.max = c.max;
                        range.value = c.current;
                        range.className = 'fix-range';
                        const valSpan = document.createElement('span');
                        valSpan.className = 'range-val';
                        valSpan.textContent = c.current + (c.unit || '');
                        range.addEventListener('input', () => {
                            slide[c.field] = parseInt(range.value);
                            valSpan.textContent = range.value + (c.unit || '');
                            this._applyControl(slide, c.field, range.value, canvas);
                            this._scheduleCheck();
                        });
                        wrap.appendChild(range);
                        wrap.appendChild(valSpan);
                        ctrl.appendChild(wrap);
                    }
                    if (c.type === 'textarea') {
                        const wrap = document.createElement('div');
                        wrap.className = 'fix-ctrl-label';
                        wrap.textContent = c.label;
                        const ta = document.createElement('textarea');
                        ta.className = 'fix-textarea';
                        ta.rows = c.rows || 3;
                        ta.value = c.current || '';
                        ta.addEventListener('input', () => {
                            slide[c.field] = ta.value;
                            this._applyTextControl(slide, c.field, ta.value, canvas);
                            this._scheduleCheck();
                        });
                        wrap.appendChild(ta);
                        ctrl.appendChild(wrap);
                    }
                    if (c.type === 'checkbox') {
                        const wrap = document.createElement('label');
                        wrap.className = 'fix-ctrl-label fix-checkbox';
                        const cb = document.createElement('input');
                        cb.type = 'checkbox';
                        cb.checked = !!c.current;
                        cb.addEventListener('change', () => {
                            slide[c.field] = cb.checked;
                            this._scheduleCheck();
                        });
                        wrap.appendChild(cb);
                        wrap.appendChild(document.createTextNode(' ' + c.label));
                        ctrl.appendChild(wrap);
                    }
                });
                card.appendChild(ctrl);
            }

            this.slideArea.appendChild(card);
        });
    }

    _renderContent(slide) {
        const layout = slide.layout || 'title-content';
        switch (layout) {
            case 'title':
                return `<div class="sl-title-slide">
                    <div class="sl-title">${slide.title || ''}</div>
                    <div class="sl-subtitle">${slide.subtitle || ''}</div>
                </div>`;
            case 'title-content':
                return `<div class="sl-content-slide">
                    <div class="sl-heading">${slide.title || ''}</div>
                    <div class="sl-body">${slide.body || ''}</div>
                </div>`;
            default:
                return `<div class="sl-content-slide">
                    <div class="sl-heading">${slide.title || ''}</div>
                    <div class="sl-body">${slide.body || ''}</div>
                </div>`;
        }
    }

    _applyControl(slide, field, value, canvas) {
        if (field === 'fontSize') {
            canvas.querySelector('.sl-body').style.fontSize = value + 'pt';
        }
        if (field === 'fontColor' || field === 'bgColor') {
            this._reRenderCard(slide, canvas);
        }
    }

    _applyTextControl(slide, field, value, canvas) {
        const bodyEl = canvas.querySelector('.sl-body');
        if (bodyEl && field === 'body') {
            bodyEl.textContent = value;
        }
    }

    _reRenderCard(slide, canvas) {
        canvas.innerHTML = this._renderContent(slide);
        if (slide.bgColor) canvas.style.backgroundColor = slide.bgColor;
        if (slide.fontColor) {
            const body = canvas.querySelector('.sl-body');
            if (body) body.style.color = slide.fontColor;
        }
        if (slide.fontSize) {
            const body = canvas.querySelector('.sl-body');
            if (body) body.style.fontSize = slide.fontSize + 'pt';
        }
    }

    // ─── TEHTÄVÄJÄRJESTELMÄ ───────────────────────────────

    _showTask() {
        if (this.currentTaskIndex >= this.tasks.length) {
            this._showSuccess();
            return;
        }
        const task = this.tasks[this.currentTaskIndex];
        this.taskEl.innerHTML = task.instruction;
        this.taskCounter.textContent = `(${this.currentTaskIndex + 1}/${this.totalTasks})`;
        const old = this.container.querySelector('.hint-box');
        if (old) old.remove();

        // Korosta ongelmakortti
        this.slideArea.querySelectorAll('.fix-card').forEach(c => c.classList.remove('highlight'));
        if (task.slideIndex !== undefined) {
            const card = this.slideArea.querySelector(`[data-slide-index="${task.slideIndex}"]`);
            if (card) card.classList.add('highlight');
        }
    }

    _scheduleCheck() {
        if (this._checkTimer) clearTimeout(this._checkTimer);
        this._checkTimer = setTimeout(() => this._checkTask(), 300);
    }

    _checkTask() {
        if (this.currentTaskIndex >= this.tasks.length) return;
        const task = this.tasks[this.currentTaskIndex];
        if (task.validate(this)) {
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

        // Poista korjatun kortin ongelma-tyyli
        if (this.currentTaskIndex > 0) {
            const prev = this.tasks[this.currentTaskIndex - 1];
            if (prev.slideIndex !== undefined) {
                const card = this.slideArea.querySelector(`[data-slide-index="${prev.slideIndex}"]`);
                if (card) { card.classList.remove('has-problem'); card.classList.add('ok', 'fixed'); }
            }
        }

        this._showTask();
    }

    _updateProgress() {
        const pct = this.totalTasks > 0 ? (this.completedCount / this.totalTasks * 100) : 0;
        this.progressFill.style.width = pct + '%';
        this.progressText.textContent = `${this.completedCount} / ${this.totalTasks} ongelmaa korjattu`;
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

    _showSuccess() {
        this.taskEl.innerHTML = '';
        this.taskCounter.textContent = '';
        this.slideArea.querySelectorAll('.fix-card').forEach(c => c.classList.remove('highlight'));
        const existing = this.container.querySelector('.success-message');
        if (existing) return;
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '🎉 <strong>Hienoa!</strong> Kaikki ongelmat korjattu! Esitys on nyt selkeä ja ammattimainen.<br><small>Voit siirtyä seuraavaan harjoitukseen.</small>';
        this.container.appendChild(msg);
    }

    _reset() {
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.slides = JSON.parse(JSON.stringify(this._initialSlides));
        const msg = this.container.querySelector('.success-message');
        if (msg) msg.remove();
        const hint = this.container.querySelector('.hint-box');
        if (hint) hint.remove();
        this._renderSlideCards();
        this._showTask();
        this._updateProgress();
    }

    /** Apuri: dian kentän tekstisisältö */
    getSlideText(index, field) {
        const s = this.slides[index];
        if (!s) return '';
        const tmp = document.createElement('div');
        tmp.innerHTML = s[field] || '';
        return tmp.textContent || '';
    }

    getSlide(index) {
        return this.slides[index] || null;
    }
}
