/**
 * Tiedostonhallintaharjoitusten moottori
 * File Management Exercise Engine v1.0
 *
 * Luokat:
 *  - FileTreeExercise    — kansiopuun navigointi, tiedoston valinta, ajastin
 *  - FileOrganizeExercise — drag & drop, uudelleennimeäminen, kansion luonti
 *  - DragSortExercise     — raahaa kohteeseen (paikallinen vs pilvi, tiedostomuodot)
 */

// ============================================================
// APUFUNKTIOT
// ============================================================

/** Tiedostotyypin ikoni */
function fileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    const icons = {
        docx: '📝', doc: '📝', odt: '📝', txt: '📄',
        xlsx: '📊', xls: '📊', ods: '📊', csv: '📊',
        pptx: '📽️', ppt: '📽️', odp: '📽️',
        pdf: '📕',
        jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', webp: '🖼️', svg: '🖼️',
        mp4: '🎬', avi: '🎬', mkv: '🎬', mov: '🎬',
        mp3: '🎵', wav: '🎵', flac: '🎵',
        zip: '📦', rar: '📦', '7z': '📦',
        exe: '⚙️', msi: '⚙️',
        html: '🌐', css: '🌐', js: '🌐',
        py: '🐍'
    };
    return icons[ext] || '📄';
}

function folderIcon(open) {
    return open ? '📂' : '📁';
}

// ============================================================
// FILETREEEXERCISE — Kansiopuun navigointi + tiedoston etsintä
// ============================================================

class FileTreeExercise {
    /**
     * @param {Object} config
     * @param {string} config.containerId
     * @param {Object} config.tree          — kansiorakenne {name, children?, type?}
     * @param {string} config.targetFile    — etsittävän tiedoston tarkka nimi
     * @param {string} config.targetPath    — etsittävän tiedoston polku (esim. "Koulu/Matematiikka/kotitehtava.docx")
     * @param {string} config.instruction   — tehtävänanto
     * @param {string} [config.hint]
     * @param {Object} [config.infoPanel]
     * @param {Function} [config.onComplete] — kutsutaan kun tiedosto löydetty {time, clicks}
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.tree = config.tree;
        this.targetFile = config.targetFile;
        this.targetPath = config.targetPath;
        this.instruction = config.instruction;
        this.hint = config.hint || null;
        this.infoPanel = config.infoPanel || null;
        this.onComplete = config.onComplete || null;
        this.container = null;
        this.startTime = null;
        this.clicks = 0;
        this.found = false;
        this.openFolders = new Set();
        this.timerEl = null;
        this.timerInterval = null;
        this.clicksEl = null;
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.found = false;
        this.clicks = 0;
        this.openFolders.clear();
        if (this.timerInterval) clearInterval(this.timerInterval);

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildStats();
        this._buildTree();
        this._buildControls();
        this.startTime = Date.now();
        this._startTimer();
    }

    _buildInfoPanel() {
        const p = document.createElement('div');
        p.className = 'info-panel';
        if (this.infoPanel.title) {
            const h = document.createElement('h3');
            h.textContent = this.infoPanel.title;
            p.appendChild(h);
        }
        const c = document.createElement('div');
        c.innerHTML = this.infoPanel.content;
        p.appendChild(c);
        this.container.appendChild(p);
    }

    _buildTaskPanel() {
        const panel = document.createElement('div');
        panel.className = 'task-panel';
        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = 'Tehtävä: ';
        panel.appendChild(label);
        const text = document.createElement('span');
        text.className = 'task-text';
        text.innerHTML = this.instruction;
        panel.appendChild(text);
        this.taskPanel = panel;
        this.container.appendChild(panel);
    }

    _buildStats() {
        const bar = document.createElement('div');
        bar.className = 'stats-bar';
        this.timerEl = document.createElement('span');
        this.timerEl.className = 'stat-item';
        this.timerEl.textContent = '⏱️ 0 s';
        bar.appendChild(this.timerEl);
        this.clicksEl = document.createElement('span');
        this.clicksEl.className = 'stat-item';
        this.clicksEl.textContent = '🖱️ 0 klikkausta';
        bar.appendChild(this.clicksEl);
        this.container.appendChild(bar);
    }

    _startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.found) { clearInterval(this.timerInterval); return; }
            const s = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerEl.textContent = '⏱️ ' + s + ' s';
        }, 500);
    }

    _buildTree() {
        this.treeWrap = document.createElement('div');
        this.treeWrap.className = 'file-tree';
        this.treeWrap.appendChild(this._renderNode(this.tree, ''));
        this.container.appendChild(this.treeWrap);
    }

    _renderNode(node, parentPath) {
        const isFolder = node.type === 'folder' || (node.children && node.children.length > 0);
        const fullPath = parentPath ? parentPath + '/' + node.name : node.name;

        if (isFolder) {
            const li = document.createElement('li');
            li.className = 'tree-folder';
            const row = document.createElement('div');
            row.className = 'tree-row tree-row-folder';
            const isOpen = this.openFolders.has(fullPath);
            row.innerHTML = `<span class="tree-icon">${folderIcon(isOpen)}</span><span class="tree-name">${node.name}</span>`;
            row.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.found) return;
                this.clicks++;
                this.clicksEl.textContent = '🖱️ ' + this.clicks + ' klikkausta';
                if (this.openFolders.has(fullPath)) {
                    this.openFolders.delete(fullPath);
                } else {
                    this.openFolders.add(fullPath);
                }
                // Päivitä vain tämä alikansio
                this._refreshTree();
            });
            li.appendChild(row);

            if (isOpen && node.children) {
                const ul = document.createElement('ul');
                ul.className = 'tree-children';
                node.children.forEach(child => ul.appendChild(this._renderNode(child, fullPath)));
                li.appendChild(ul);
            }
            return li;
        } else {
            // Tiedosto
            const li = document.createElement('li');
            li.className = 'tree-file';
            const row = document.createElement('div');
            row.className = 'tree-row tree-row-file';
            row.innerHTML = `<span class="tree-icon">${fileIcon(node.name)}</span><span class="tree-name">${node.name}</span>`;
            row.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.found) return;
                this.clicks++;
                this.clicksEl.textContent = '🖱️ ' + this.clicks + ' klikkausta';
                // Tarkista onko oikea
                if (fullPath === this.targetPath) {
                    this._fileFound(row);
                } else {
                    row.classList.add('wrong-pick');
                    setTimeout(() => row.classList.remove('wrong-pick'), 600);
                }
            });
            li.appendChild(row);
            return li;
        }
    }

    _refreshTree() {
        this.treeWrap.innerHTML = '';
        this.treeWrap.appendChild(this._renderNode(this.tree, ''));
    }

    _fileFound(row) {
        this.found = true;
        clearInterval(this.timerInterval);
        row.classList.add('correct-pick');
        this.taskPanel.classList.add('task-done');
        const elapsed = Math.round((Date.now() - this.startTime) / 1000);
        this.timerEl.textContent = '⏱️ ' + elapsed + ' s';
        if (this.onComplete) {
            this.onComplete({ time: elapsed, clicks: this.clicks });
        }
    }

    _buildControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';
        if (this.hint) {
            const hintBtn = document.createElement('button');
            hintBtn.className = 'btn btn-hint';
            hintBtn.textContent = '💡 Vihje';
            hintBtn.addEventListener('click', () => {
                const existing = this.container.querySelector('.hint-box');
                if (existing) { existing.remove(); return; }
                const box = document.createElement('div');
                box.className = 'hint-box';
                box.innerHTML = '💡 ' + this.hint;
                this.taskPanel.parentNode.insertBefore(box, this.taskPanel.nextSibling);
                setTimeout(() => { if (box.parentNode) box.remove(); }, 8000);
            });
            controls.appendChild(hintBtn);
        }
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '↺ Aloita alusta';
        resetBtn.addEventListener('click', () => this.init());
        controls.appendChild(resetBtn);
        this.container.appendChild(controls);
    }

    getResults() {
        return { time: Math.round((Date.now() - this.startTime) / 1000), clicks: this.clicks, found: this.found };
    }
}


// ============================================================
// FILEORGANIZEEXERCISE — Tiedostojen järjestäminen + nimeäminen
// ============================================================

class FileOrganizeExercise {
    /**
     * @param {Object} config
     * @param {string} config.containerId
     * @param {Array}  config.files          — [{name, correctName, correctFolder}]
     * @param {Array}  config.existingFolders — alkukansiot ["Koulu", "Koulu/Matematiikka"]
     * @param {Array}  config.requiredFolders — kansiot jotka pitää luoda
     * @param {Array}  config.tasks          — [{instruction, hint, validate(ex)}]
     * @param {Object} [config.infoPanel]
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.files = JSON.parse(JSON.stringify(config.files || []));
        this.existingFolders = [...(config.existingFolders || [])];
        this.folders = [...this.existingFolders];
        this.requiredFolders = config.requiredFolders || [];
        this.tasks = config.tasks || [];
        this.infoPanel = config.infoPanel || null;
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.totalTasks = this.tasks.length;
        this.container = null;
        this._checkTimer = null;

        this._initialFiles = JSON.parse(JSON.stringify(config.files || []));
        this._initialFolders = [...this.existingFolders];
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.currentTaskIndex = 0;
        this.completedCount = 0;
        this.files = JSON.parse(JSON.stringify(this._initialFiles));
        this.folders = [...this._initialFolders];

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildWorkspace();
        this._buildControls();
        this._showTask();
        this._updateProgress();
    }

    _buildInfoPanel() {
        const p = document.createElement('div');
        p.className = 'info-panel';
        if (this.infoPanel.title) {
            const h = document.createElement('h3');
            h.textContent = this.infoPanel.title;
            p.appendChild(h);
        }
        const c = document.createElement('div');
        c.innerHTML = this.infoPanel.content;
        p.appendChild(c);
        this.container.appendChild(p);
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
        this.taskPanel = panel;
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
        ws.className = 'organize-workspace';

        // Vasen: "Työpöytä" (tiedostot)
        const desktop = document.createElement('div');
        desktop.className = 'desktop-area';
        const deskTitle = document.createElement('h3');
        deskTitle.className = 'area-title';
        deskTitle.textContent = '🖥️ Työpöytä';
        desktop.appendChild(deskTitle);
        this.desktopList = document.createElement('div');
        this.desktopList.className = 'file-list';
        desktop.appendChild(this.desktopList);
        ws.appendChild(desktop);

        // Oikea: Kansiopuu + kansion luonti
        const folderArea = document.createElement('div');
        folderArea.className = 'folder-area';
        const folderTitle = document.createElement('h3');
        folderTitle.className = 'area-title';
        folderTitle.textContent = '📁 Kansiot';
        folderArea.appendChild(folderTitle);

        // Kansion luonti
        const addRow = document.createElement('div');
        addRow.className = 'add-folder-row';
        this.folderInput = document.createElement('input');
        this.folderInput.type = 'text';
        this.folderInput.className = 'folder-input';
        this.folderInput.placeholder = 'Uusi kansio (esim. Koulu/Historia)';
        addRow.appendChild(this.folderInput);
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-add-folder';
        addBtn.textContent = '+ Luo kansio';
        addBtn.addEventListener('click', () => this._addFolder());
        addRow.appendChild(addBtn);
        folderArea.appendChild(addRow);

        this.folderTree = document.createElement('div');
        this.folderTree.className = 'folder-tree-list';
        folderArea.appendChild(this.folderTree);
        ws.appendChild(folderArea);

        this.container.appendChild(ws);
        this._renderFiles();
        this._renderFolders();
    }

    _renderFiles() {
        this.desktopList.innerHTML = '';
        this.files.forEach((file, i) => {
            if (file.movedTo) return; // jo siirretty
            const card = document.createElement('div');
            card.className = 'file-card';
            card.draggable = true;
            card.setAttribute('data-file-index', i);

            const icon = document.createElement('span');
            icon.className = 'file-card-icon';
            icon.textContent = fileIcon(file.name);
            card.appendChild(icon);

            // Uudelleennimeäminen
            const nameWrap = document.createElement('div');
            nameWrap.className = 'file-card-name-wrap';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'file-rename-input';
            nameInput.value = file.name;
            nameInput.addEventListener('input', () => {
                file.name = nameInput.value;
                icon.textContent = fileIcon(file.name);
                this._scheduleCheck();
            });
            nameWrap.appendChild(nameInput);

            if (file.correctName && file.name !== file.correctName) {
                const hint = document.createElement('span');
                hint.className = 'rename-hint';
                hint.textContent = '✏️';
                hint.title = 'Nimeä uudelleen';
                nameWrap.appendChild(hint);
            }
            card.appendChild(nameWrap);

            // Siirrä kansioon -valinta
            const moveWrap = document.createElement('div');
            moveWrap.className = 'file-move-wrap';
            const sel = document.createElement('select');
            sel.className = 'file-move-select';
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = 'Siirrä kansioon…';
            sel.appendChild(defaultOpt);
            this.folders.forEach(f => {
                const opt = document.createElement('option');
                opt.value = f;
                opt.textContent = '📁 ' + f;
                sel.appendChild(opt);
            });
            sel.addEventListener('change', () => {
                if (sel.value) {
                    file.movedTo = sel.value;
                    this._renderFiles();
                    this._renderFolders();
                    this._scheduleCheck();
                }
            });
            moveWrap.appendChild(sel);
            card.appendChild(moveWrap);

            this.desktopList.appendChild(card);
        });

        // Tyhjä-viesti
        const remaining = this.files.filter(f => !f.movedTo);
        if (remaining.length === 0 && this.files.length > 0) {
            const done = document.createElement('div');
            done.className = 'empty-desktop';
            done.textContent = '✅ Työpöytä on tyhjä – kaikki tiedostot on siirretty!';
            this.desktopList.appendChild(done);
        }
    }

    _renderFolders() {
        this.folderTree.innerHTML = '';
        // Lajittele ja näytä hierarkkisesti
        const sorted = [...this.folders].sort();
        sorted.forEach(folderPath => {
            const div = document.createElement('div');
            div.className = 'folder-item';
            const depth = folderPath.split('/').length - 1;
            div.style.paddingLeft = (12 + depth * 18) + 'px';
            div.innerHTML = `<span class="tree-icon">📁</span> <strong>${folderPath.split('/').pop()}</strong>`;

            // Näytä siirretyt tiedostot
            const moved = this.files.filter(f => f.movedTo === folderPath);
            if (moved.length > 0) {
                const list = document.createElement('div');
                list.className = 'folder-files';
                moved.forEach(f => {
                    const item = document.createElement('div');
                    item.className = 'folder-file-item';
                    const correct = f.correctFolder === folderPath && (!f.correctName || f.name === f.correctName);
                    item.innerHTML = `${fileIcon(f.name)} ${f.name} ${correct ? '<span class="file-ok">✅</span>' : '<span class="file-wrong">❌ väärä paikka tai nimi</span>'}`;
                    list.appendChild(item);
                });
                div.appendChild(list);
            }

            this.folderTree.appendChild(div);
        });
    }

    _addFolder() {
        const name = this.folderInput.value.trim();
        if (!name || this.folders.includes(name)) {
            this.folderInput.classList.add('input-error');
            setTimeout(() => this.folderInput.classList.remove('input-error'), 500);
            return;
        }
        this.folders.push(name);
        this.folderInput.value = '';
        this._renderFolders();
        this._renderFiles(); // päivitä select-listat
        this._scheduleCheck();
    }

    // Tehtäväjärjestelmä
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
            this.completedCount++;
            this.currentTaskIndex++;
            this._updateProgress();
            this.taskPanel.classList.add('task-done');
            setTimeout(() => this.taskPanel.classList.remove('task-done'), 700);
            this._showTask();
        }
    }

    _updateProgress() {
        const pct = this.totalTasks > 0 ? (this.completedCount / this.totalTasks * 100) : 0;
        this.progressFill.style.width = pct + '%';
        this.progressText.textContent = `${this.completedCount} / ${this.totalTasks} tehtävää suoritettu`;
    }

    _showSuccess() {
        this.taskEl.innerHTML = '';
        this.taskCounter.textContent = '';
        const existing = this.container.querySelector('.success-message');
        if (existing) return;
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '🎉 <strong>Hienoa!</strong> Kaikki tiedostot on järjestetty ja nimetty oikein!';
        this.container.appendChild(msg);
    }

    _buildControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';
        const hintBtn = document.createElement('button');
        hintBtn.className = 'btn btn-hint';
        hintBtn.textContent = '💡 Vihje';
        hintBtn.addEventListener('click', () => {
            if (this.currentTaskIndex >= this.tasks.length) return;
            const task = this.tasks[this.currentTaskIndex];
            if (!task.hint) return;
            const existing = this.container.querySelector('.hint-box');
            if (existing) { existing.remove(); return; }
            const box = document.createElement('div');
            box.className = 'hint-box';
            box.innerHTML = '💡 ' + task.hint;
            this.taskPanel.parentNode.insertBefore(box, this.taskPanel.nextSibling);
            setTimeout(() => { if (box.parentNode) box.remove(); }, 8000);
        });
        controls.appendChild(hintBtn);
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '↺ Aloita alusta';
        resetBtn.addEventListener('click', () => this.init());
        controls.appendChild(resetBtn);
        this.container.appendChild(controls);
    }

    // Validointiapurit
    hasFolder(path) { return this.folders.includes(path); }
    getFile(index) { return this.files[index] || null; }
    isFileMoved(index, folder) { const f = this.files[index]; return f && f.movedTo === folder; }
    isFileRenamed(index, name) { const f = this.files[index]; return f && f.name === name; }
    allFilesMoved() { return this.files.every(f => f.movedTo); }
    allFilesCorrect() {
        return this.files.every(f =>
            f.movedTo === f.correctFolder &&
            (!f.correctName || f.name === f.correctName)
        );
    }
}


// ============================================================
// DRAGSORTEXERCISE — Raahaa oikeaan kategoriaan
// ============================================================

class DragSortExercise {
    /**
     * @param {Object} config
     * @param {string} config.containerId
     * @param {Array}  config.items        — [{id, text, icon?, correctTarget}]
     * @param {Array}  config.targets      — [{id, label, icon}]
     * @param {string} config.instruction
     * @param {Object} [config.infoPanel]
     * @param {Array}  [config.tasks]      — jos halutaan tehtäväkerrallaan-malli
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.items = JSON.parse(JSON.stringify(config.items || []));
        this.targets = config.targets || [];
        this.instruction = config.instruction;
        this.infoPanel = config.infoPanel || null;
        this.tasks = config.tasks || null;
        this.currentTaskIndex = 0;
        this.container = null;
        this.placed = {}; // itemId -> targetId
        this.completedCount = 0;
        this.totalItems = this.items.length;

        this._initialItems = JSON.parse(JSON.stringify(config.items || []));
    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.placed = {};
        this.completedCount = 0;
        this.items = JSON.parse(JSON.stringify(this._initialItems));

        if (this.infoPanel) this._buildInfoPanel();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildSortArea();
        this._buildControls();
        this._updateProgress();
    }

    _buildInfoPanel() {
        const p = document.createElement('div');
        p.className = 'info-panel';
        if (this.infoPanel.title) {
            const h = document.createElement('h3');
            h.textContent = this.infoPanel.title;
            p.appendChild(h);
        }
        const c = document.createElement('div');
        c.innerHTML = this.infoPanel.content;
        p.appendChild(c);
        this.container.appendChild(p);
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
        this.taskEl.innerHTML = this.instruction;
        panel.appendChild(this.taskEl);
        this.taskPanel = panel;
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

    _buildSortArea() {
        const area = document.createElement('div');
        area.className = 'drag-sort-area';

        // Yläosa: lajittelemattomat kohteet
        const itemsArea = document.createElement('div');
        itemsArea.className = 'drag-items';
        this.itemsContainer = itemsArea;
        area.appendChild(itemsArea);

        // Alaosa: kohdekategoriat
        const targetsArea = document.createElement('div');
        targetsArea.className = 'drag-targets';
        this.targets.forEach(target => {
            const box = document.createElement('div');
            box.className = 'drag-target-box';
            box.setAttribute('data-target', target.id);
            box.innerHTML = `<div class="target-header">${target.icon || ''} ${target.label}</div>`;

            const dropZone = document.createElement('div');
            dropZone.className = 'target-drop-zone';
            dropZone.setAttribute('data-target', target.id);

            // Drop-events
            dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                const itemId = e.dataTransfer.getData('text/plain');
                this._placeItem(itemId, target.id, dropZone);
            });
            box.appendChild(dropZone);
            targetsArea.appendChild(box);
        });
        area.appendChild(targetsArea);

        this.container.appendChild(area);
        this._renderItems();
    }

    _renderItems() {
        this.itemsContainer.innerHTML = '';
        const unplaced = this.items.filter(item => !this.placed[item.id]);
        if (unplaced.length === 0) {
            this.itemsContainer.innerHTML = '<div class="empty-desktop">Kaikki sijoitettu!</div>';
            return;
        }
        unplaced.forEach(item => {
            const chip = document.createElement('div');
            chip.className = 'drag-item';
            chip.draggable = true;
            chip.setAttribute('data-item', item.id);
            chip.textContent = (item.icon || '') + ' ' + item.text;
            chip.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.id);
                chip.classList.add('dragging');
            });
            chip.addEventListener('dragend', () => chip.classList.remove('dragging'));

            // Mobiilituki: klikkaa → valitse → klikkaa kohdetta
            chip.addEventListener('click', () => {
                this.container.querySelectorAll('.drag-item').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                this._selectedItemId = item.id;
            });

            this.itemsContainer.appendChild(chip);
        });
    }

    _placeItem(itemId, targetId, dropZone) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        this.placed[itemId] = targetId;
        const correct = item.correctTarget === targetId;

        // Lisää chipsi kohdealueelle
        const chip = document.createElement('div');
        chip.className = 'placed-item ' + (correct ? 'placed-correct' : 'placed-wrong');
        chip.textContent = (item.icon || '') + ' ' + item.text;

        if (!correct) {
            // Väärä: palauta hetken päästä
            dropZone.appendChild(chip);
            setTimeout(() => {
                delete this.placed[itemId];
                chip.remove();
                this._renderItems();
            }, 1200);
        } else {
            dropZone.appendChild(chip);
            this.completedCount++;
            this._updateProgress();
            this._renderItems();
            if (this.completedCount >= this.totalItems) {
                this._showSuccess();
            }
        }
    }

    _updateProgress() {
        const pct = this.totalItems > 0 ? (this.completedCount / this.totalItems * 100) : 0;
        this.progressFill.style.width = pct + '%';
        this.progressText.textContent = `${this.completedCount} / ${this.totalItems} oikein`;
    }

    _showSuccess() {
        const existing = this.container.querySelector('.success-message');
        if (existing) return;
        this.taskPanel.classList.add('task-done');
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '🎉 <strong>Hienoa!</strong> Kaikki kohdat sijoitettu oikein!';
        this.container.appendChild(msg);
    }

    _buildControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';

        // Mobiili: klikkaa-kohde -tuki
        this.targets.forEach(target => {
            const box = this.container.querySelector(`[data-target="${target.id}"].drag-target-box`);
            if (box) {
                box.addEventListener('click', () => {
                    if (this._selectedItemId) {
                        const dropZone = box.querySelector('.target-drop-zone');
                        this._placeItem(this._selectedItemId, target.id, dropZone);
                        this._selectedItemId = null;
                        this.container.querySelectorAll('.drag-item').forEach(c => c.classList.remove('selected'));
                    }
                });
            }
        });

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '↺ Aloita alusta';
        resetBtn.addEventListener('click', () => this.init());
        controls.appendChild(resetBtn);
        this.container.appendChild(controls);
    }
}


// ============================================================
// FILEEXPLOREREXERCISE — Explorer-tyylinen tiedostojen järjestely
// Vaiheet: 1) Luo kansiot  2) Nimeä uudelleen (monivalinta)  3) Raahaa paikoilleen
// ============================================================

class FileExplorerExercise {
    /**
     * @param {Object}  config
     * @param {string}  config.containerId
     * @param {Object}  [config.infoPanel]        — {title, content}
     * @param {Array}   config.files              — [{name, correctName, correctFolder, renameOptions:[opt,opt,opt,opt]}]
     *                                               renameOptions[0] = correctName (sekoitetaan näytettäessä)
     * @param {Array}   config.requiredFolders    — ['Talous','Talous/Kuitit', …]
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.infoPanel = config.infoPanel || null;
        this.filesConfig = config.files || [];
        this.requiredFolders = config.requiredFolders || [];
        this._initial = JSON.parse(JSON.stringify(this.filesConfig));
        this.container = null;
    }

    // ── Alustus ─────────────────────────────────────────

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;
        this.container.innerHTML = '';

        this.files = this._initial.map(f => ({
            ...JSON.parse(JSON.stringify(f)),
            currentName: f.name,
            renamed: false,
            movedTo: null
        }));
        this.folders = new Set();
        this.stage = 1;
        this._selectedFileIdx = null;

        if (this.infoPanel) this._buildInfoPanel();
        this._buildStageBar();
        this._buildTaskPanel();
        this._buildProgress();
        this._buildExplorer();
        this._buildControls();
        this._updateStage();
    }

    // ── Info-paneeli ────────────────────────────────────

    _buildInfoPanel() {
        const p = document.createElement('div');
        p.className = 'info-panel';
        if (this.infoPanel.title) {
            const h = document.createElement('h3');
            h.textContent = this.infoPanel.title;
            p.appendChild(h);
        }
        const c = document.createElement('div');
        c.innerHTML = this.infoPanel.content;
        p.appendChild(c);
        this.container.appendChild(p);
    }

    // ── Vaihe-ilmaisin ─────────────────────────────────

    _buildStageBar() {
        const bar = document.createElement('div');
        bar.className = 'stage-bar';
        ['Luo kansiot', 'Nimeä uudelleen', 'Siirrä paikoilleen'].forEach((text, i) => {
            const step = document.createElement('div');
            step.className = 'stage-step';
            step.setAttribute('data-stage', i + 1);
            step.innerHTML = `<span class="stage-num">${i + 1}</span><span class="stage-label">${text}</span>`;
            bar.appendChild(step);
            if (i < 2) {
                const arrow = document.createElement('span');
                arrow.className = 'stage-arrow';
                arrow.textContent = '→';
                bar.appendChild(arrow);
            }
        });
        this.stageBar = bar;
        this.container.appendChild(bar);
    }

    // ── Tehtäväpalkki ───────────────────────────────────

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
        this.taskPanel = panel;
        this.container.appendChild(panel);
    }

    // ── Edistymispalkki ─────────────────────────────────

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

    // ── Explorer-näkymä (kaksi paneelia) ────────────────

    _buildExplorer() {
        const view = document.createElement('div');
        view.className = 'explorer-view';

        // ── Vasen: Lataukset ────
        const left = document.createElement('div');
        left.className = 'explorer-panel downloads-panel';
        left.innerHTML = '<h3 class="panel-title">📥 Lataukset</h3>';
        this.fileGrid = document.createElement('div');
        this.fileGrid.className = 'file-grid';
        left.appendChild(this.fileGrid);
        view.appendChild(left);

        // ── Oikea: Resurssienhallinta ────
        const right = document.createElement('div');
        right.className = 'explorer-panel folders-panel';
        right.innerHTML = '<h3 class="panel-title">📁 Resurssienhallinta</h3>';

        // Kansion luonti
        const addRow = document.createElement('div');
        addRow.className = 'folder-create-row';
        this.folderInput = document.createElement('input');
        this.folderInput.type = 'text';
        this.folderInput.className = 'folder-input';
        this.folderInput.placeholder = 'Kansion nimi (esim. Talous)…';
        this.folderInput.addEventListener('keydown', e => { if (e.key === 'Enter') this._createFolder(); });
        addRow.appendChild(this.folderInput);
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-add-folder';
        addBtn.textContent = '📁+ Luo';
        addBtn.addEventListener('click', () => this._createFolder());
        addRow.appendChild(addBtn);
        this.folderCreateRow = addRow;
        right.appendChild(addRow);

        // Tarkistuslista
        this.folderChecklist = document.createElement('div');
        this.folderChecklist.className = 'folder-checklist';
        right.appendChild(this.folderChecklist);

        // Kansiopuu
        this.folderTreeEl = document.createElement('div');
        this.folderTreeEl.className = 'folder-tree-list';
        right.appendChild(this.folderTreeEl);

        view.appendChild(right);
        this.explorerView = view;
        this.container.appendChild(view);
    }

    // ── Vaiheen päivitys ────────────────────────────────

    _updateStage() {
        // Vaihe-ilmaisimet
        this.stageBar.querySelectorAll('.stage-step').forEach(step => {
            const s = parseInt(step.getAttribute('data-stage'));
            step.classList.toggle('active', s === this.stage);
            step.classList.toggle('done', s < this.stage);
        });
        // Ohjeet
        if (this.stage === 1) {
            this.taskEl.innerHTML = 'Luo kansiorakenne. Kirjoita kansion nimi ja paina <strong>Luo</strong>.';
            this.folderCreateRow.style.display = '';
            this._renderFolderChecklist();
        } else if (this.stage === 2) {
            this.taskEl.innerHTML = 'Nimeä tiedostot uudelleen. Klikkaa <strong>✏️ Nimeä</strong> ja valitse paras vaihtoehto.';
            this.folderCreateRow.style.display = 'none';
            this.folderChecklist.innerHTML = '';
        } else if (this.stage === 3) {
            this.taskEl.innerHTML = 'Siirrä tiedostot oikeisiin kansioihin <strong>raahaamalla</strong> tai klikkaa tiedostoa ja sitten kansiota.';
            this.folderCreateRow.style.display = 'none';
        }
        this._renderFiles();
        this._renderFolders();
        this._updateProgress();
    }

    // ── Kansiotarkistuslista ────────────────────────────

    _renderFolderChecklist() {
        this.folderChecklist.innerHTML = '<div class="checklist-title">Tarvittavat kansiot:</div>';
        this.requiredFolders.forEach(name => {
            const item = document.createElement('div');
            item.className = 'checklist-item' + (this.folders.has(name) ? ' checked' : '');
            item.innerHTML = `<span class="check-icon">${this.folders.has(name) ? '✅' : '⬜'}</span> ${name}`;
            // Klikkaa valmiiksi kansion nimen → täytä input
            if (!this.folders.has(name)) {
                item.style.cursor = 'pointer';
                item.title = 'Klikkaa kopioidaksesi nimi syöttökenttään';
                item.addEventListener('click', () => {
                    this.folderInput.value = name;
                    this.folderInput.focus();
                });
            }
            this.folderChecklist.appendChild(item);
        });
    }

    // ── Kansion luonti ──────────────────────────────────

    _createFolder() {
        const raw = this.folderInput.value.trim();
        if (!raw) {
            this.folderInput.classList.add('input-error');
            setTimeout(() => this.folderInput.classList.remove('input-error'), 500);
            return;
        }
        // Luo myös ylätason kansiot automaattisesti (Talous/Kuitit → Talous + Talous/Kuitit)
        const parts = raw.split('/');
        let path = '';
        parts.forEach((part, i) => {
            path = i === 0 ? part : path + '/' + part;
            this.folders.add(path);
        });
        this.folderInput.value = '';
        this._renderFolderChecklist();
        this._renderFolders();

        // Tarkista onko kaikki vaaditut kansiot luotu
        if (this.stage === 1 && this.requiredFolders.every(f => this.folders.has(f))) {
            this.taskPanel.classList.add('task-done');
            setTimeout(() => {
                this.taskPanel.classList.remove('task-done');
                this.stage = 2;
                this._updateStage();
            }, 800);
        }
    }

    // ── Tiedostoruudukko ────────────────────────────────

    _renderFiles() {
        this.fileGrid.innerHTML = '';
        const visible = this.files.filter(f => !f.movedTo);

        if (visible.length === 0 && this.files.length > 0) {
            this.fileGrid.innerHTML = '<div class="empty-desktop">✅ Kaikki tiedostot on siirretty!</div>';
            return;
        }

        visible.forEach(file => {
            const idx = this.files.indexOf(file);
            const card = document.createElement('div');
            card.className = 'file-grid-card' + (file.renamed ? ' is-renamed' : '');
            card.draggable = this.stage === 3;
            card.setAttribute('data-file-index', idx);

            // Ikoni
            const icon = document.createElement('div');
            icon.className = 'grid-card-icon';
            icon.textContent = fileIcon(file.currentName);
            card.appendChild(icon);

            // Nimi
            const nameEl = document.createElement('div');
            nameEl.className = 'grid-card-name';
            nameEl.textContent = file.currentName;
            card.appendChild(nameEl);

            // Nimeä-painike (vaihe 2)
            if (this.stage === 2 && !file.renamed) {
                const btn = document.createElement('button');
                btn.className = 'btn-rename';
                btn.textContent = '✏️ Nimeä';
                btn.addEventListener('click', e => { e.stopPropagation(); this._showRenameModal(idx); });
                card.appendChild(btn);
            }

            // ✅-merkki
            if (file.renamed) {
                const check = document.createElement('span');
                check.className = 'renamed-badge';
                check.textContent = '✅';
                card.appendChild(check);
            }

            // Drag & click (vaihe 3)
            if (this.stage === 3) {
                card.addEventListener('dragstart', e => {
                    e.dataTransfer.setData('text/plain', String(idx));
                    card.classList.add('dragging');
                });
                card.addEventListener('dragend', () => card.classList.remove('dragging'));
                card.addEventListener('click', () => {
                    this.fileGrid.querySelectorAll('.file-grid-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this._selectedFileIdx = idx;
                });
            }

            this.fileGrid.appendChild(card);
        });
    }

    // ── Uudelleennimeämismodaali ────────────────────────

    _showRenameModal(fileIdx) {
        const file = this.files[fileIdx];
        if (!file || file.renamed) return;

        const overlay = document.createElement('div');
        overlay.className = 'rename-overlay';

        const modal = document.createElement('div');
        modal.className = 'rename-modal';
        modal.innerHTML = `
            <h3>Nimeä uudelleen</h3>
            <div class="rename-original">Nykyinen nimi: <code>${file.name}</code></div>
            <p>Valitse paras tiedostonimi:</p>
        `;

        // Sekoita vaihtoehdot
        const opts = [...file.renameOptions];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }

        const grid = document.createElement('div');
        grid.className = 'rename-options';
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'rename-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                if (opt === file.correctName) {
                    btn.classList.add('correct');
                    file.currentName = opt;
                    file.renamed = true;
                    setTimeout(() => {
                        overlay.remove();
                        this._renderFiles();
                        this._checkRenamesDone();
                    }, 600);
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 800);
                }
            });
            grid.appendChild(btn);
        });
        modal.appendChild(grid);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-reset';
        cancelBtn.textContent = 'Peruuta';
        cancelBtn.style.marginTop = '12px';
        cancelBtn.addEventListener('click', () => overlay.remove());
        modal.appendChild(cancelBtn);

        overlay.appendChild(modal);
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    }

    _checkRenamesDone() {
        this._updateProgress();
        if (this.files.every(f => f.renamed)) {
            this.taskPanel.classList.add('task-done');
            setTimeout(() => {
                this.taskPanel.classList.remove('task-done');
                this.stage = 3;
                this._updateStage();
            }, 800);
        }
    }

    // ── Kansiopuu ───────────────────────────────────────

    _renderFolders() {
        this.folderTreeEl.innerHTML = '';
        const sorted = [...this.folders].sort();

        if (sorted.length === 0) {
            this.folderTreeEl.innerHTML = '<div class="folder-empty">Ei vielä kansioita.</div>';
            return;
        }

        sorted.forEach(folderPath => {
            const div = document.createElement('div');
            div.className = 'folder-tree-row';
            div.setAttribute('data-folder', folderPath);
            const depth = folderPath.split('/').length - 1;
            div.style.paddingLeft = (10 + depth * 20) + 'px';

            const label = document.createElement('span');
            label.className = 'folder-label';
            label.textContent = '📁 ' + folderPath.split('/').pop();
            div.appendChild(label);

            // Näytä tänne siirretyt tiedostot
            const movedHere = this.files.filter(f => f.movedTo === folderPath);
            if (movedHere.length > 0) {
                const list = document.createElement('div');
                list.className = 'folder-contents';
                movedHere.forEach(f => {
                    const row = document.createElement('div');
                    row.className = 'folder-content-file';
                    const ok = f.correctFolder === folderPath;
                    row.innerHTML = `${fileIcon(f.currentName)} ${f.currentName} <span class="${ok ? 'file-ok' : 'file-wrong'}">${ok ? '✅' : '❌'}</span>`;
                    list.appendChild(row);
                });
                div.appendChild(list);
            }

            // Drop-tapahtumat (vaihe 3)
            if (this.stage === 3) {
                div.addEventListener('dragover', e => { e.preventDefault(); div.classList.add('folder-drag-over'); });
                div.addEventListener('dragleave', () => div.classList.remove('folder-drag-over'));
                div.addEventListener('drop', e => {
                    e.preventDefault();
                    div.classList.remove('folder-drag-over');
                    const fIdx = parseInt(e.dataTransfer.getData('text/plain'));
                    this._moveFile(fIdx, folderPath);
                });
                // Mobiilivaihtoehto: klikkaa tiedostoa → klikkaa kansiota
                div.addEventListener('click', () => {
                    if (this._selectedFileIdx != null) {
                        this._moveFile(this._selectedFileIdx, folderPath);
                        this._selectedFileIdx = null;
                        this.fileGrid.querySelectorAll('.file-grid-card').forEach(c => c.classList.remove('selected'));
                    }
                });
            }

            this.folderTreeEl.appendChild(div);
        });
    }

    // ── Tiedoston siirto kansioon ───────────────────────

    _moveFile(fileIdx, folderPath) {
        const file = this.files[fileIdx];
        if (!file || file.movedTo) return;

        if (file.correctFolder === folderPath) {
            file.movedTo = folderPath;
            this._renderFiles();
            this._renderFolders();
            this._updateProgress();
            if (this.files.every(f => f.movedTo)) this._showSuccess();
        } else {
            // Väärä kansio → vilkkuu punaisena
            const el = this.folderTreeEl.querySelector(`[data-folder="${folderPath}"]`);
            if (el) {
                el.classList.add('folder-wrong');
                setTimeout(() => el.classList.remove('folder-wrong'), 800);
            }
        }
    }

    // ── Edistyminen ─────────────────────────────────────

    _updateProgress() {
        const total = this.requiredFolders.length + this.files.length * 2;
        let done = 0;
        done += this.requiredFolders.filter(f => this.folders.has(f)).length;
        done += this.files.filter(f => f.renamed).length;
        done += this.files.filter(f => f.movedTo).length;
        const pct = total > 0 ? (done / total * 100) : 0;
        this.progressFill.style.width = pct + '%';
        this.progressText.textContent = `${done} / ${total} vaihetta suoritettu`;
    }

    // ── Onnistuminen ────────────────────────────────────

    _showSuccess() {
        this.stage = 4;
        this.stageBar.querySelectorAll('.stage-step').forEach(s => s.classList.add('done'));
        this.taskPanel.classList.add('task-done');
        this.taskEl.innerHTML = 'Kaikki valmiina!';
        if (this.container.querySelector('.success-message')) return;
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '🎉 <strong>Hienoa!</strong> Kaikki tiedostot on nimetty ja järjestetty oikein!<br><small><a href="harjoitus-3-paikallinen-vs-pilvi.html" style="color:#2e7d32">→ Siirry seuraavaan harjoitukseen</a></small>';
        this.container.appendChild(msg);
    }

    // ── Painikkeet ──────────────────────────────────────

    _buildControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-reset';
        resetBtn.textContent = '↺ Aloita alusta';
        resetBtn.addEventListener('click', () => this.init());
        controls.appendChild(resetBtn);
        this.container.appendChild(controls);
    }
}
