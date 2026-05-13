/**
 * Taulukkolaskennan interaktiivisten harjoitusten moottori
 * Spreadsheet Exercise Engine v1.0
 * 
 * Toteuttaa:
 * - Taulukkolaskentaruudukon renderöinnin (sarakkeet A,B,C... rivit 1,2,3...)
 * - Kaavojen jäsentämisen ja evaluoinnin (=B2*C2, =SUMMA(B2:B7) jne.)
 * - Suomalaiset ja englanninkieliset funktiot (SUMMA/SUM, KESKIARVO/AVERAGE jne.)
 * - Soluviittausten oikaisun täyttökahvaa varten ($-lukitut viittaukset)
 * - Validoinnin ja visuaalisen palautteen (vihreä = oikein)
 * - Satunnaisten lukuarvojen generoinnin
 */

// ============================================================
// APUFUNKTIOT
// ============================================================

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDecimal(min, max, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function isClose(a, b, epsilon = 0.01) {
    return Math.abs(a - b) < epsilon;
}

function formatNumber(value) {
    if (typeof value !== 'number' || isNaN(value)) return String(value);
    if (Number.isInteger(value)) return String(value);
    return value.toFixed(2).replace('.', ',');
}

function scrollInDocument(el, offset = 12) {
    if (!el) return;
    const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset);
    window.scrollTo({ top, behavior: 'smooth' });
}

// ============================================================
// KAAVAMOOTTORI (FormulaEngine)
// ============================================================

class FormulaEngine {
    constructor() {
        this.cells = new Map();
    }

    // --- Solujen hallinta ---

    setCell(id, value) {
        this.cells.set(id.toUpperCase(), { value: value, computedValue: value });
    }

    getCellValue(id) {
        const cell = this.cells.get(id.toUpperCase());
        if (!cell) return 0;
        return (cell.computedValue !== undefined) ? cell.computedValue : cell.value;
    }

    updateCellComputed(id, computedValue) {
        const cell = this.cells.get(id.toUpperCase());
        if (cell) {
            cell.computedValue = computedValue;
        } else {
            this.cells.set(id.toUpperCase(), { value: computedValue, computedValue });
        }
    }

    // --- Sarake/rivi-apurit ---

    static colToIndex(col) {
        let index = 0;
        col = col.toUpperCase();
        for (let i = 0; i < col.length; i++) {
            index = index * 26 + (col.charCodeAt(i) - 64);
        }
        return index - 1;
    }

    static indexToCol(index) {
        let col = '';
        index++;
        while (index > 0) {
            index--;
            col = String.fromCharCode(65 + (index % 26)) + col;
            index = Math.floor(index / 26);
        }
        return col;
    }

    static parseCellId(id) {
        const match = id.toUpperCase().match(/^([A-Z]+)(\d+)$/);
        if (!match) return null;
        return { col: match[1], row: parseInt(match[2]) };
    }

    // --- Alueen laajennus (esim. B2:B7 → [B2, B3, B4, B5, B6, B7]) ---

    expandRange(rangeStr) {
        const clean = rangeStr.replace(/\$/g, '');
        const parts = clean.split(':');
        if (parts.length !== 2) return [clean];

        const start = FormulaEngine.parseCellId(parts[0]);
        const end = FormulaEngine.parseCellId(parts[1]);
        if (!start || !end) return [clean];

        const startCol = FormulaEngine.colToIndex(start.col);
        const endCol = FormulaEngine.colToIndex(end.col);
        const cells = [];

        for (let r = start.row; r <= end.row; r++) {
            for (let c = startCol; c <= endCol; c++) {
                cells.push(FormulaEngine.indexToCol(c) + r);
            }
        }
        return cells;
    }

    // --- Kaavan evaluointi ---

    evaluate(formula) {
        if (typeof formula !== 'string') return formula;
        formula = formula.trim();
        if (!formula.startsWith('=')) {
            const num = parseFloat(formula.replace(',', '.'));
            return isNaN(num) ? formula : num;
        }

        let expr = formula.substring(1).trim().toUpperCase();

        try {
            expr = this._evaluateFunctions(expr);
            expr = this._replaceCellRefs(expr);
            const result = this._evaluateArithmetic(expr);
            return Math.round(result * 10000) / 10000; // pyöristys float-virheiden välttämiseksi
        } catch (e) {
            return '#VIRHE!';
        }
    }

    _evaluateFunctions(expr) {
        const funcPattern = /\b(SUMMA|SUM|KESKIARVO|AVERAGE|MIN|MAKS|MAX|LASKE|COUNT)\s*\(([^()]*)\)/g;
        let iterations = 0;

        while (funcPattern.test(expr) && iterations++ < 20) {
            funcPattern.lastIndex = 0;
            expr = expr.replace(funcPattern, (match, funcName, argsStr) => {
                return String(this._evalFunc(funcName, argsStr));
            });
        }
        return expr;
    }

    _evalFunc(name, argsStr) {
        // Jaetaan argumentit ; tai , -merkillä
        const args = argsStr.split(/[;]/).map(a => a.trim()).filter(a => a);
        // Jos ei löydy ;-erotinta, kokeillaan pilkkua (mutta vain jos ei ole alueita)
        let finalArgs = args;
        if (args.length === 1 && !args[0].includes(':') && args[0].includes(',')) {
            finalArgs = args[0].split(',').map(a => a.trim()).filter(a => a);
        }

        let values = [];
        for (const arg of finalArgs) {
            if (arg.includes(':')) {
                const cells = this.expandRange(arg);
                values.push(...cells.map(c => this.getCellValue(c)));
            } else {
                const clean = arg.replace(/\$/g, '');
                if (/^[A-Z]+\d+$/i.test(clean)) {
                    values.push(this.getCellValue(clean));
                } else {
                    const num = parseFloat(arg.replace(',', '.'));
                    if (!isNaN(num)) values.push(num);
                }
            }
        }

        values = values.filter(v => typeof v === 'number' && !isNaN(v));

        const norm = { SUMMA: 'SUM', SUM: 'SUM', KESKIARVO: 'AVG', AVERAGE: 'AVG', MIN: 'MIN', MAKS: 'MAX', MAX: 'MAX', LASKE: 'CNT', COUNT: 'CNT' };
        switch (norm[name] || name) {
            case 'SUM': return values.reduce((a, b) => a + b, 0);
            case 'AVG': return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
            case 'MIN': return values.length ? Math.min(...values) : 0;
            case 'MAX': return values.length ? Math.max(...values) : 0;
            case 'CNT': return values.length;
            default: return 0;
        }
    }

    _replaceCellRefs(expr) {
        return expr.replace(/\$?[A-Z]+\$?\d+/g, ref => {
            const clean = ref.replace(/\$/g, '');
            if (/^[A-Z]+\d+$/.test(clean)) {
                const val = this.getCellValue(clean);
                return (typeof val === 'number') ? String(val) : '0';
            }
            return ref;
        });
    }

    // Turvallinen aritmetiikan evaluointi (ei eval())
    _evaluateArithmetic(exprStr) {
        const s = exprStr.replace(/\s/g, '').replace(/,/g, '.');
        const tokens = [];
        let i = 0;

        while (i < s.length) {
            if ('+-*/()'.includes(s[i])) {
                tokens.push({ type: 'op', value: s[i] });
                i++;
            } else if (/[\d.]/.test(s[i])) {
                let num = '';
                while (i < s.length && /[\d.]/.test(s[i])) { num += s[i]; i++; }
                tokens.push({ type: 'num', value: parseFloat(num) });
            } else {
                throw new Error('Odottamaton merkki: ' + s[i]);
            }
        }

        if (tokens.length === 0) return 0;

        let pos = 0;

        function parseExpr() {
            let result = parseTerm();
            while (pos < tokens.length && tokens[pos].type === 'op' && (tokens[pos].value === '+' || tokens[pos].value === '-')) {
                const op = tokens[pos++].value;
                const right = parseTerm();
                result = (op === '+') ? result + right : result - right;
            }
            return result;
        }

        function parseTerm() {
            let result = parseFactor();
            while (pos < tokens.length && tokens[pos].type === 'op' && (tokens[pos].value === '*' || tokens[pos].value === '/')) {
                const op = tokens[pos++].value;
                const right = parseFactor();
                result = (op === '*') ? result * right : result / right;
            }
            return result;
        }

        function parseFactor() {
            if (pos < tokens.length && tokens[pos].type === 'op' && tokens[pos].value === '-') {
                pos++;
                return -parseFactor();
            }
            if (pos < tokens.length && tokens[pos].type === 'op' && tokens[pos].value === '(') {
                pos++;
                const result = parseExpr();
                if (pos < tokens.length && tokens[pos].value === ')') pos++;
                return result;
            }
            if (pos < tokens.length && tokens[pos].type === 'num') {
                return tokens[pos++].value;
            }
            return 0;
        }

        return parseExpr();
    }

    // --- Täyttökahva: viittausten oikaisu ---
    static adjustFormula(formula, rowDelta, colDelta = 0) {
        if (!formula || !formula.startsWith('=')) return formula;
        return '=' + formula.substring(1).replace(
            /(\$?)([A-Z]+)(\$?)(\d+)/gi,
            (match, dollarCol, col, dollarRow, row) => {
                let newCol = col.toUpperCase();
                let newRow = parseInt(row);
                if (!dollarCol) {
                    const idx = FormulaEngine.colToIndex(newCol) + colDelta;
                    newCol = FormulaEngine.indexToCol(Math.max(0, idx));
                }
                if (!dollarRow) {
                    newRow = Math.max(1, newRow + rowDelta);
                }
                return dollarCol + newCol + dollarRow + newRow;
            }
        );
    }
}

// ============================================================
// TAULUKKOLASKENTAHARJOITUKSEN UI (SpreadsheetExercise)
// ============================================================

class SpreadsheetExercise {
    constructor(config) {
        this.config = config;
        this.engine = new FormulaEngine();
        this.selectedCell = null;
        this.completedCells = new Set();
        this.cellElements = {};
        this.cellInputs = {};
        this.cellFormulas = {};
        this.filledCells = new Set();
        this.fillSourceCells = new Set();
        this.selectedCells = new Set();
        this.dragState = null; // Vetämisen tila
        this.scormCompletionHandled = false;
        this.scormButtonBound = false;
    }

    init() {
        // Alustetaan moottorin solut datan perusteella
        const cells = this.config.cells;
        for (const [id, def] of Object.entries(cells)) {
            if (def.type === 'data' || def.type === 'header' || def.type === 'label') {
                this.engine.setCell(id, def.value);
            }
        }

        // Tunnistetaan täyttökahvan lähtösolut
        if (this.config.fillGroups) {
            for (const group of this.config.fillGroups) {
                this.fillSourceCells.add(group.source);
            }
        }

        this.render();
    }

    // --- Renderöinti ---

    render() {
        const container = document.getElementById(this.config.containerId);
        container.innerHTML = '';

        // Ohjeet
        if (this.config.instructions) {
            const instrDiv = document.createElement('div');
            instrDiv.className = 'exercise-instructions';
            instrDiv.innerHTML = this.config.instructions;
            container.appendChild(instrDiv);
        }

        // Kaavapalkki
        const formulaBar = document.createElement('div');
        formulaBar.className = 'formula-bar';
        formulaBar.innerHTML = '<span class="fb-icon">fx</span><span class="fb-cell" id="fb-cell"></span><span class="fb-formula" id="fb-formula">Valitse solu</span>';
        container.appendChild(formulaBar);
        this.formulaBarCell = document.getElementById('fb-cell');
        this.formulaBarText = document.getElementById('fb-formula');

        // Ruudukko
        this._renderGrid(container);

        // Palaute kaavan virheistä
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'formula-feedback';
        feedbackDiv.id = 'formula-feedback';
        feedbackDiv.style.display = 'none';
        container.appendChild(feedbackDiv);

        // Täyttökahvan ohje (taulukon jälkeen)
        if (this.config.fillGroups && this.config.fillGroups.length > 0) {
            const fillInstr = document.createElement('div');
            fillInstr.className = 'fill-instruction';
            fillInstr.id = 'fill-instruction';
            fillInstr.style.display = 'none';
            fillInstr.innerHTML = 'Vedä <span class="fill-handle-icon">■</span> täyttökahvaa solun oikeasta alakulmasta kopioidaksesi kaavan alas.';
            container.appendChild(fillInstr);
        }

        // Edistyminen
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-container';
        progressDiv.id = 'progress';
        container.appendChild(progressDiv);
        this._updateProgress();

        // Painikkeet
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'controls';

        const hintBtn = document.createElement('button');
        hintBtn.className = 'btn btn-hint';
        hintBtn.textContent = '💡 Vihje';
        hintBtn.addEventListener('click', () => this._showHint());
        controlsDiv.appendChild(hintBtn);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '🔄 Nollaa';
        resetBtn.addEventListener('click', () => this._reset());
        controlsDiv.appendChild(resetBtn);

        container.appendChild(controlsDiv);

        // Onnistumisviesti
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.id = 'success-message';
        successDiv.style.display = 'none';
        successDiv.innerHTML = `
            🎉 <strong>Hienoa!</strong> Kaikki kaavat ovat oikein!
            <p class="score-note" id="score-note"></p>
            <div class="controls completion-actions" id="completion-actions"></div>
        `;
        container.appendChild(successDiv);
    }

    _renderGrid(container) {
        const cols = this.config.cols;
        const rowCount = this.config.rowCount;
        const table = document.createElement('table');
        table.className = 'spreadsheet-grid';

        // Sarakeotsikot
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const cornerTh = document.createElement('th');
        cornerTh.className = 'corner-header';
        headerRow.appendChild(cornerTh);

        for (const col of cols) {
            const th = document.createElement('th');
            th.className = 'col-header';
            th.textContent = col;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Rivit
        const tbody = document.createElement('tbody');
        for (let r = 1; r <= rowCount; r++) {
            const tr = document.createElement('tr');

            // Rivinumero
            const rowTh = document.createElement('td');
            rowTh.className = 'row-header';
            rowTh.textContent = r;
            tr.appendChild(rowTh);

            for (const col of cols) {
                const cellId = col + r;
                const cellDef = this.config.cells[cellId];
                const td = document.createElement('td');

                if (!cellDef) {
                    td.className = 'cell empty';
                } else if (cellDef.type === 'header') {
                    td.className = 'cell header-cell';
                    td.textContent = cellDef.value;
                } else if (cellDef.type === 'label') {
                    td.className = 'cell label-cell';
                    td.textContent = cellDef.value;
                } else if (cellDef.type === 'data') {
                    td.className = 'cell data-cell';
                    td.textContent = formatNumber(cellDef.value);
                } else if (cellDef.type === 'editable') {
                    td.className = 'cell editable-cell';
                    this._makeEditable(td, cellId, cellDef);
                } else if (cellDef.type === 'fill-target') {
                    td.className = 'cell fill-target-cell';
                    td.innerHTML = '<span class="fill-placeholder">⬇</span>';
                }

                td.dataset.cellId = cellId;
                td.addEventListener('click', () => this._selectCell(cellId));
                this.cellElements[cellId] = td;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }

    _makeEditable(td, cellId, cellDef) {
        const wrapper = document.createElement('div');
        wrapper.className = 'editable-wrapper';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell-input';
        input.placeholder = cellDef.placeholder || '=';
        input.spellcheck = false;
        input.autocomplete = 'off';

        const display = document.createElement('span');
        display.className = 'cell-display';

        const status = document.createElement('span');
        status.className = 'cell-status';

        input.addEventListener('focus', () => {
            this._selectCell(cellId);
            td.classList.add('editing');
            if (this.cellFormulas[cellId]) {
                input.value = this.cellFormulas[cellId];
            }
        });

        input.addEventListener('blur', () => {
            td.classList.remove('editing');
            this._submitCell(cellId);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
                this._moveToNextEditable(cellId);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                input.blur();
                this._moveToNextEditable(cellId);
            }
        });

        wrapper.appendChild(input);
        wrapper.appendChild(display);
        wrapper.appendChild(status);
        td.appendChild(wrapper);

        // Täyttökahva lähtösoluihin
        if (this.fillSourceCells.has(cellId)) {
            const handle = document.createElement('div');
            handle.className = 'fill-handle';
            handle.title = 'Kopioi kaava alas';
            handle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._startDrag(e, cellId);
            });
            td.appendChild(handle);
        }

        this.cellInputs[cellId] = input;

        // Lisätään mousemove ja mouseup dokumenttiin (vain kerran)
        if (!window._spreadsheetDragInitialized) {
            document.addEventListener('mousemove', (e) => {
                if (this.dragState) this._updateDrag(e);
            });
            document.addEventListener('mouseup', (e) => {
                if (this.dragState) this._endDrag(e);
            });
            window._spreadsheetDragInitialized = true;
        }
    }

    // --- Interaktiot ---

    _selectCell(cellId) {
        // Poista vanha valinta
        if (this.selectedCell && this.cellElements[this.selectedCell]) {
            this.cellElements[this.selectedCell].classList.remove('selected');
        }
        this.selectedCell = cellId;
        if (this.cellElements[cellId]) {
            this.cellElements[cellId].classList.add('selected');
        }
        this._updateFormulaBar(cellId);

        // Fokusoi input-kenttä automaattisesti muokattavassa solussa
        if (this.cellInputs[cellId] && document.activeElement !== this.cellInputs[cellId]) {
            this.cellInputs[cellId].focus();
        }
    }

    _updateFormulaBar(cellId) {
        this.formulaBarCell.textContent = cellId;
        const cellDef = this.config.cells[cellId];
        if (!cellDef) {
            this.formulaBarText.textContent = '';
        } else if (cellDef.type === 'editable') {
            const formula = this.cellFormulas[cellId];
            this.formulaBarText.textContent = formula || '';
        } else if (cellDef.type === 'fill-target' && this.cellFormulas[cellId]) {
            this.formulaBarText.textContent = this.cellFormulas[cellId];
        } else {
            this.formulaBarText.textContent = cellDef.value !== undefined ? String(cellDef.value) : '';
        }
    }

    _submitCell(cellId) {
        const input = this.cellInputs[cellId];
        if (!input) return;

        const formula = input.value.trim();
        if (!formula) {
            this._clearCell(cellId);
            return;
        }

        this.cellFormulas[cellId] = formula;
        const result = this.engine.evaluate(formula);

        // Päivitä moottori
        this.engine.updateCellComputed(cellId, (typeof result === 'number') ? result : 0);

        // Näytä tulos
        const td = this.cellElements[cellId];
        const display = td.querySelector('.cell-display');
        const status = td.querySelector('.cell-status');

        if (result === '#VIRHE!') {
            display.textContent = '#VIRHE!';
            input.value = '';
            td.classList.remove('correct', 'incorrect');
            td.classList.add('error');
            status.textContent = '✗';
            return;
        }

        display.textContent = formatNumber(result);
        input.value = '';
        td.classList.remove('error');

        // Validointi
        this._validateCell(cellId, formula, result);
        this._updateFormulaBar(cellId);
        this._checkFillReady();
    }

    _validateCell(cellId, formula, result) {
        const cellDef = this.config.cells[cellId];
        const td = this.cellElements[cellId];
        const status = td.querySelector('.cell-status');

        let correct = true;
        let feedbackMsg = '';

        // 1. Kaavan on alettava =-merkillä
        if (cellDef.requireFormula !== false && !formula.startsWith('=')) {
            correct = false;
        }

        // 2. Tarkista vaaditut soluviittaukset (estää kovakoodatut arvot)
        if (correct && cellDef.requiredRefs && cellDef.requiredRefs.length > 0) {
            for (const ref of cellDef.requiredRefs) {
                const cleanRef = ref.toUpperCase().replace(/\$/g, '');
                const colPart = cleanRef.match(/^([A-Z]+)/)[1];
                const rowPart = cleanRef.match(/(\d+)$/)[1];
                const pat = new RegExp('\\$?' + colPart + '\\$?' + rowPart, 'i');
                if (!pat.test(formula)) {
                    correct = false;
                    feedbackMsg = '⚠ Käytä soluviittauksia lukuarvojen sijaan (esim. ' + (cellDef.hint || '') + ')';
                    break;
                }
            }
        }

        // 3. Tarkista kaavan rakenne (valinnainen regex)
        if (correct && cellDef.formulaPattern) {
            const pattern = new RegExp(cellDef.formulaPattern, 'i');
            if (!pattern.test(formula)) correct = false;
        }

        // 4. Tarkista funktion käyttö (valinnainen)
        if (correct && cellDef.requiredFunction) {
            const funcPattern = new RegExp('\\b(' + cellDef.requiredFunction + ')\\s*\\(', 'i');
            if (!funcPattern.test(formula)) {
                correct = false;
                feedbackMsg = '⚠ Käytä funktiota kaavassa (esim. ' + (cellDef.hint || '') + ')';
            }
        }

        // 5. Tarkista tulos
        if (correct && typeof cellDef.expectedValue === 'number') {
            if (!isClose(result, cellDef.expectedValue)) correct = false;
        }

        if (correct) {
            td.classList.remove('incorrect');
            td.classList.add('correct');
            status.textContent = '✓';
            this.completedCells.add(cellId);
            this._setFeedback('');
        } else {
            td.classList.remove('correct');
            td.classList.add('incorrect');
            status.textContent = '✗';
            this.completedCells.delete(cellId);
            this._setFeedback(feedbackMsg);
        }

        this._updateProgress();
    }

    _clearCell(cellId) {
        const td = this.cellElements[cellId];
        const display = td.querySelector('.cell-display');
        const status = td.querySelector('.cell-status');
        display.textContent = '';
        status.textContent = '';
        td.classList.remove('correct', 'incorrect', 'error');
        this.completedCells.delete(cellId);
        delete this.cellFormulas[cellId];
        this._setFeedback('');
        this._updateProgress();
    }

    _moveToNextEditable(currentCellId) {
        const editableIds = Object.keys(this.config.cells)
            .filter(id => this.config.cells[id].type === 'editable')
            .sort((a, b) => {
                const pa = FormulaEngine.parseCellId(a);
                const pb = FormulaEngine.parseCellId(b);
                if (pa.row !== pb.row) return pa.row - pb.row;
                return FormulaEngine.colToIndex(pa.col) - FormulaEngine.colToIndex(pb.col);
            });

        const idx = editableIds.indexOf(currentCellId);
        if (idx >= 0 && idx < editableIds.length - 1) {
            const nextId = editableIds[idx + 1];
            if (this.cellInputs[nextId]) {
                this.cellInputs[nextId].focus();
            }
        }
    }

    // --- Edistyminen ---

    _getEditableCellCount() {
        let count = Object.values(this.config.cells).filter(c => c.type === 'editable').length;
        if (this.config.fillGroups) {
            for (const group of this.config.fillGroups) {
                count += group.targets.length;
            }
        }
        return count;
    }

    _updateProgress() {
        const total = this._getEditableCellCount();
        const done = this.completedCells.size;
        const pct = total > 0 ? Math.round(done / total * 100) : 0;

        const progressDiv = document.getElementById('progress');
        progressDiv.innerHTML = `
            <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width: ${pct}%"></div>
            </div>
            <div class="progress-text">${done} / ${total} oikein</div>
        `;

        // Näytä onnistumisviesti
        const successDiv = document.getElementById('success-message');
        if (successDiv) {
            successDiv.style.display = (done >= total && total > 0) ? 'block' : 'none';
        }

        this._reportScormProgress(done, total, pct);

        if (done >= total && total > 0) {
            this._ensureCompletionAction(pct);
        }
    }

    _reportScormProgress(done, total, pct) {
        if (typeof window.SCORM === 'undefined' || !window.SCORM) return;

        window.SCORM.setScore(pct, 100, 0);

        // Pidetään status keskeneräisenä, kunnes opiskelija valitsee "siirry eteenpäin".
        if (done < total) {
            window.SCORM.setStatus('incomplete');
        }
    }

    _ensureCompletionAction(pct) {
        if (this.scormCompletionHandled) return;

        const actions = document.getElementById('completion-actions');
        const scoreNote = document.getElementById('score-note');
        if (!actions || !scoreNote) return;

        scoreNote.innerHTML = `Saat tästä harjoituksesta pisteet: <strong>${pct}%</strong>.`;

        if (!this.scormButtonBound) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-next';
            nextBtn.type = 'button';
            nextBtn.id = 'exercise-complete-next';
            nextBtn.textContent = this.config.nextExerciseUrl
                ? 'Siirry seuraavaan harjoitukseen →'
                : 'Merkitse harjoitus valmiiksi';

            nextBtn.addEventListener('click', () => {
                nextBtn.disabled = true;
                nextBtn.textContent = 'Tallennetaan...';

                if (typeof window.SCORM === 'undefined' || !window.SCORM) {
                    scoreNote.textContent = 'SCORM-yhteyttä ei löytynyt. Suoritusta ei voitu tallentaa.';
                    return;
                }

                const usingLms = window.SCORM.advance(this.config.nextExerciseUrl);
                if (usingLms) {
                    this.scormCompletionHandled = true;
                    scoreNote.textContent = this.config.nextExerciseUrl
                        ? 'Suoritus tallennettu. Oppimisympäristö avaa seuraavan harjoituksen automaattisesti.'
                        : 'Suoritus tallennettu oppimisympäristöön valmiiksi.';
                } else {
                    nextBtn.disabled = false;
                    nextBtn.textContent = this.config.nextExerciseUrl
                        ? 'Siirry seuraavaan harjoitukseen →'
                        : 'Merkitse harjoitus valmiiksi';
                    scoreNote.textContent = 'Tallennus epäonnistui: SCORM-yhteyttä ei löytynyt.';
                }
            });

            actions.innerHTML = '';
            actions.appendChild(nextBtn);
            
            // Scrollaa palautelaatikkoon kun tehtävä on valmis
            scrollInDocument(actions, 24);
            
            this.scormButtonBound = true;
        }
    }

    // --- Täyttökahva ---

    _startDrag(event, sourceId) {
        const parsed = FormulaEngine.parseCellId(sourceId);
        if (!parsed) return;

        this.dragState = {
            sourceId,
            sourceRow: parsed.row,
            sourceCol: parsed.col,
            currentIndex: parsed.row,
            handle: event.currentTarget
        };

        if (this.dragState.handle) {
            this.dragState.handle.style.opacity = '0.5';
        }

        document.body.classList.add('fill-dragging');
        this._updateDragHighlight();
    }

    _updateDrag(event) {
        if (!this.dragState) return;

        event.preventDefault();

        const hovered = document.elementFromPoint(event.clientX, event.clientY);
        if (!hovered) return;

        const td = hovered.closest('td.cell');
        if (!td || !td.dataset.cellId) return;

        const parsed = FormulaEngine.parseCellId(td.dataset.cellId);
        if (!parsed) return;
        if (parsed.col !== this.dragState.sourceCol) return;

        const nextIndex = Math.max(this.dragState.sourceRow, parsed.row);
        if (nextIndex === this.dragState.currentIndex) return;

        this.dragState.currentIndex = nextIndex;
        this._updateDragHighlight();
    }

    _updateDragHighlight() {
        if (!this.dragState) return;

        for (const cellId of this.selectedCells) {
            const td = this.cellElements[cellId];
            if (td) td.classList.remove('drag-target');
        }
        this.selectedCells.clear();

        const startRow = Math.min(this.dragState.sourceRow, this.dragState.currentIndex);
        const endRow = Math.max(this.dragState.sourceRow, this.dragState.currentIndex);

        for (let row = startRow; row <= endRow; row++) {
            if (row === this.dragState.sourceRow) continue;
            const cellId = this.dragState.sourceCol + row;
            const td = this.cellElements[cellId];
            if (!td) continue;
            td.classList.add('drag-target');
            this.selectedCells.add(cellId);
        }
    }

    _endDrag(event) {
        if (!this.dragState) return;
        if (event) event.preventDefault();

        if (this.dragState.handle) {
            this.dragState.handle.style.opacity = '1';
        }

        for (const cellId of this.selectedCells) {
            const td = this.cellElements[cellId];
            if (td) td.classList.remove('drag-target');
        }
        this.selectedCells.clear();
        document.body.classList.remove('fill-dragging');

        if (this.dragState.currentIndex !== this.dragState.sourceRow) {
            this._doFillDownRange(
                this.dragState.sourceId,
                this.dragState.sourceRow,
                this.dragState.currentIndex
            );
        }

        this.dragState = null;
    }

    _doFillDownRange(sourceId, startRow, endRow) {
        if (!this.config.fillGroups) return;

        const group = this.config.fillGroups.find(g => g.source === sourceId);
        if (!group) return;

        const sourceFormula = this.cellFormulas[sourceId];
        if (!sourceFormula) return;

        const sourceRow = FormulaEngine.parseCellId(sourceId).row;
        const rangeStart = Math.min(startRow, endRow);
        const rangeEnd = Math.max(startRow, endRow);

        for (const targetId of group.targets) {
            const targetParsed = FormulaEngine.parseCellId(targetId);
            if (!targetParsed) continue;
            if (targetParsed.row < rangeStart || targetParsed.row > rangeEnd) continue;

            const rowDelta = targetParsed.row - sourceRow;
            const adjustedFormula = FormulaEngine.adjustFormula(sourceFormula, rowDelta, 0);
            const result = this.engine.evaluate(adjustedFormula);

            this.cellFormulas[targetId] = adjustedFormula;
            this.engine.updateCellComputed(targetId, (typeof result === 'number') ? result : 0);

            // Päivitä UI
            const td = this.cellElements[targetId];
            td.className = 'cell fill-target-cell filled';

            td.innerHTML = '';
            const formulaSpan = document.createElement('div');
            formulaSpan.className = 'fill-formula-display';
            formulaSpan.textContent = adjustedFormula;

            const valueSpan = document.createElement('div');
            valueSpan.className = 'fill-value-display';
            valueSpan.textContent = formatNumber(result);

            const statusSpan = document.createElement('span');
            statusSpan.className = 'cell-status';

            td.appendChild(formulaSpan);
            td.appendChild(valueSpan);
            td.appendChild(statusSpan);

            // Validointi
            const cellDef = this.config.cells[targetId];
            let correct = true;

            if (cellDef && typeof cellDef.expectedValue === 'number') {
                correct = isClose(result, cellDef.expectedValue);
            }

            // Tarkista absoluuttisten viittausten säilyminen
            if (correct && cellDef && cellDef.formulaPattern) {
                const pattern = new RegExp(cellDef.formulaPattern, 'i');
                correct = pattern.test(adjustedFormula);
            }

            if (correct) {
                td.classList.add('correct');
                statusSpan.textContent = '✓';
                this.completedCells.add(targetId);
            } else {
                td.classList.add('incorrect');
                statusSpan.textContent = '✗';
            }

            this.filledCells.add(targetId);
        }

        this._updateProgress();

        // Kahvan pitää olla käytettävissä uudestaan (osittainen täyttö / kaavan korjaus).
        this._checkFillReady();
    }

    _checkFillReady() {
        if (!this.config.fillGroups) return;

        let allReady = true;
        for (const group of this.config.fillGroups) {
            if (!this.completedCells.has(group.source)) {
                allReady = false;
                break;
            }
        }

        // Näytä/piilota täyttökahvat lähtösoluissa
        for (const sourceId of this.fillSourceCells) {
            const td = this.cellElements[sourceId];
            if (!td) continue;
            const handle = td.querySelector('.fill-handle');
            if (handle) {
                if (allReady) {
                    handle.classList.add('visible');
                } else {
                    handle.classList.remove('visible');
                }
            }
        }

        // Näytä/piilota ohjeteksti
        const fillInstr = document.getElementById('fill-instruction');
        if (fillInstr) {
            fillInstr.style.display = allReady ? 'block' : 'none';
        }
    }

    _doFillDown() {
        if (!this.config.fillGroups) return;

        for (const group of this.config.fillGroups) {
            const sourceFormula = this.cellFormulas[group.source];
            if (!sourceFormula) continue;

            const sourceRow = FormulaEngine.parseCellId(group.source).row;

            for (const targetId of group.targets) {
                const targetRow = FormulaEngine.parseCellId(targetId).row;
                const rowDelta = targetRow - sourceRow;
                const adjustedFormula = FormulaEngine.adjustFormula(sourceFormula, rowDelta, 0);
                const result = this.engine.evaluate(adjustedFormula);

                this.cellFormulas[targetId] = adjustedFormula;
                this.engine.updateCellComputed(targetId, (typeof result === 'number') ? result : 0);

                // Päivitä UI
                const td = this.cellElements[targetId];
                td.className = 'cell fill-target-cell filled';

                td.innerHTML = '';
                const formulaSpan = document.createElement('div');
                formulaSpan.className = 'fill-formula-display';
                formulaSpan.textContent = adjustedFormula;

                const valueSpan = document.createElement('div');
                valueSpan.className = 'fill-value-display';
                valueSpan.textContent = formatNumber(result);

                const statusSpan = document.createElement('span');
                statusSpan.className = 'cell-status';

                td.appendChild(formulaSpan);
                td.appendChild(valueSpan);
                td.appendChild(statusSpan);

                // Validointi
                const cellDef = this.config.cells[targetId];
                let correct = true;

                if (cellDef && typeof cellDef.expectedValue === 'number') {
                    correct = isClose(result, cellDef.expectedValue);
                }

                // Tarkista absoluuttisten viittausten säilyminen
                if (correct && cellDef && cellDef.formulaPattern) {
                    const pattern = new RegExp(cellDef.formulaPattern, 'i');
                    correct = pattern.test(adjustedFormula);
                }

                if (correct) {
                    td.classList.add('correct');
                    statusSpan.textContent = '✓';
                    this.completedCells.add(targetId);
                } else {
                    td.classList.add('incorrect');
                    statusSpan.textContent = '✗';
                }

                this.filledCells.add(targetId);
            }
        }

        this._updateProgress();

        // Piilota täyttökahvat kopioimisen jälkeen
        for (const sourceId of this.fillSourceCells) {
            const td = this.cellElements[sourceId];
            if (!td) continue;
            const handle = td.querySelector('.fill-handle');
            if (handle) {
                handle.classList.remove('visible');
                handle.classList.add('done');
            }
        }

        // Piilota ohjeteksti
        const fillInstr = document.getElementById('fill-instruction');
        if (fillInstr) {
            fillInstr.style.display = 'none';
        }
    }

    // --- Palaute ---

    _setFeedback(msg) {
        const fb = document.getElementById('formula-feedback');
        if (!fb) return;
        if (msg) {
            fb.textContent = msg;
            fb.style.display = 'block';
        } else {
            fb.style.display = 'none';
        }
    }

    // --- Vihje ---

    _showHint() {
        // Näytä vihje ensimmäiselle tyhjälle tai virheelliselle solulle
        const editableIds = Object.keys(this.config.cells)
            .filter(id => this.config.cells[id].type === 'editable' && !this.completedCells.has(id))
            .sort((a, b) => {
                const pa = FormulaEngine.parseCellId(a);
                const pb = FormulaEngine.parseCellId(b);
                return pa.row - pb.row || FormulaEngine.colToIndex(pa.col) - FormulaEngine.colToIndex(pb.col);
            });

        if (editableIds.length === 0) return;

        const cellId = editableIds[0];
        const cellDef = this.config.cells[cellId];
        const td = this.cellElements[cellId];

        if (cellDef.hint) {
            // Näytä vihje solun yläpuolella
            let tooltip = td.querySelector('.hint-tooltip');
            if (tooltip) {
                tooltip.remove();
                return;
            }
            tooltip = document.createElement('div');
            tooltip.className = 'hint-tooltip';
            tooltip.textContent = cellDef.hint;
            td.style.position = 'relative';
            td.appendChild(tooltip);

            // Piilota automaattisesti
            setTimeout(() => tooltip.remove(), 5000);

            // Valitse solu
            if (this.cellInputs[cellId]) {
                this.cellInputs[cellId].focus();
            }
        }
    }

    // --- Nollaus ---

    _reset() {
        this.completedCells.clear();
        this.cellFormulas = {};
        this.filledCells.clear();
        this.scormCompletionHandled = false;
        this.scormButtonBound = false;

        for (const [id, def] of Object.entries(this.config.cells)) {
            if (def.type === 'editable') {
                const td = this.cellElements[id];
                const input = this.cellInputs[id];
                const display = td.querySelector('.cell-display');
                const status = td.querySelector('.cell-status');
                if (input) input.value = '';
                if (display) display.textContent = '';
                if (status) status.textContent = '';
                td.classList.remove('correct', 'incorrect', 'error');
            } else if (def.type === 'fill-target') {
                const td = this.cellElements[id];
                td.className = 'cell fill-target-cell';
                td.innerHTML = '<span class="fill-placeholder">⬇</span>';
            }
        }

        // Nollaa täyttökahvat
        for (const sourceId of this.fillSourceCells) {
            const td = this.cellElements[sourceId];
            if (!td) continue;
            const handle = td.querySelector('.fill-handle');
            if (handle) {
                handle.classList.remove('visible', 'done');
            }
        }

        // Piilota ohje ja palaute
        const fillInstr = document.getElementById('fill-instruction');
        if (fillInstr) fillInstr.style.display = 'none';
        this._setFeedback('');

        const scoreNote = document.getElementById('score-note');
        if (scoreNote) scoreNote.textContent = '';
        const actions = document.getElementById('completion-actions');
        if (actions) actions.innerHTML = '';

        this._updateProgress();
    }
}
