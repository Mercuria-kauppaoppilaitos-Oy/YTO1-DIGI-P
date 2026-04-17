class PhishingExercise {
    constructor(config) {
        this.containerId = config.containerId;
        this.infoPanel = config.infoPanel;
        this.emails = config.emails;
        this.score = 0;
        this.completed = 0;
    }

    init() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        this._buildInfoPanel(container);
        this._buildProgress(container);
        this._buildEmails(container);
    }

    _buildInfoPanel(container) {
        const panel = document.createElement('div');
        panel.className = 'info-panel';
        panel.innerHTML = '<h3>' + this.infoPanel.title + '</h3>' + this.infoPanel.content;
        container.appendChild(panel);
    }

    _buildProgress(container) {
        const prog = document.createElement('div');
        prog.className = 'progress-container';
        prog.innerHTML = '<div class="progress-bar-track"><div class="progress-bar-fill" style="width: 0%;" id="progress-fill"></div></div><div class="progress-text"><span id="progress-count">0</span> / ' + this.emails.length + '</div>';
        container.appendChild(prog);
        this.progressFill = prog.querySelector('#progress-fill');
        this.progressCount = prog.querySelector('#progress-count');
    }

    _buildEmails(container) {
        const emailsDiv = document.createElement('div');
        emailsDiv.className = 'emails-container';
        
        for (let i = 0; i < this.emails.length; i++) {
            const card = this._createEmailCard(this.emails[i], i);
            emailsDiv.appendChild(card);
        }

        container.appendChild(emailsDiv);
    }

    _createEmailCard(email, index) {
        const card = document.createElement('div');
        card.className = 'email-card';

        const header = document.createElement('div');
        header.className = 'email-header';
        header.innerHTML = '<div><div class="email-from"><strong>Lähettäjä:</strong> ' + email.from + '</div><div class="email-subject"><strong>Aihe:</strong> ' + email.subject + '</div></div><div class="email-number">Sähköposti ' + (index + 1) + '/' + this.emails.length + '</div>';
        card.appendChild(header);

        const preview = document.createElement('div');
        preview.className = 'email-preview';
        preview.textContent = email.preview;
        card.appendChild(preview);

        const question = document.createElement('div');
        question.className = 'email-question';
        question.innerHTML = '<strong>❓ Onko tämä phishing-yritys?</strong>';
        card.appendChild(question);

        const buttons = document.createElement('div');
        buttons.className = 'email-buttons';
        
        const yesBtn = document.createElement('button');
        yesBtn.className = 'btn btn-danger';
        yesBtn.textContent = '⚠️ Kyllä, phishing!';
        yesBtn.addEventListener('click', () => this._answerQuestion(email, true, card));

        const noBtn = document.createElement('button');
        noBtn.className = 'btn btn-success';
        noBtn.textContent = '✅ Ei, turvallinen';
        noBtn.addEventListener('click', () => this._answerQuestion(email, false, card));

        buttons.appendChild(yesBtn);
        buttons.appendChild(noBtn);
        card.appendChild(buttons);

        const flagsDiv = document.createElement('div');
        flagsDiv.className = 'email-flags';
        flagsDiv.style.display = 'none';
        
        if (email.redFlags && email.redFlags.length > 0) {
            const flagsTitle = document.createElement('h4');
            flagsTitle.textContent = email.isPhishing ? '🚩 Varoitusmerkit:' : '✅ Turvallinen viesti';
            flagsDiv.appendChild(flagsTitle);

            for (let i = 0; i < email.redFlags.length; i++) {
                const flagItem = document.createElement('div');
                flagItem.className = 'flag-item';
                flagItem.innerHTML = '<div class="flag-text">' + email.redFlags[i] + '</div>';
                flagsDiv.appendChild(flagItem);
            }
        }

        card.appendChild(flagsDiv);
        return card;
    }

    _answerQuestion(email, isPhishing, card) {
        const correct = isPhishing === email.isPhishing;
        const buttons = card.querySelectorAll('.email-buttons button');
        const flagsDiv = card.querySelector('.email-flags');

        buttons.forEach(b => b.disabled = true);

        if (correct) {
            card.classList.add('email-correct');
            this.score++;
        } else {
            card.classList.add('email-incorrect');
        }

        flagsDiv.style.display = 'block';
        this.completed++;
        this._updateProgress();

        if (this.completed === this.emails.length) {
            setTimeout(() => this._showSummary(card), 800);
        }
    }

    _updateProgress() {
        const pct = Math.round(this.completed / this.emails.length * 100);
        this.progressFill.style.width = pct + '%';
        this.progressCount.textContent = this.completed;
    }

    _showSummary(lastCard) {
        const container = lastCard.parentElement;
        const pct = Math.round(this.score / this.emails.length * 100);
        
        const summary = document.createElement('div');
        summary.className = 'summary-panel';
        summary.innerHTML = '<h3>📊 Yhteenveto</h3><p><strong>Pisteet: ' + this.score + '/' + this.emails.length + '</strong> (' + pct + '%)</p><p>' + (pct >= 80 ? '🎉 Erinomainen! Tunnistat phishing-yritykset hyvin.' : '👍 Hyvä alku. Harjoita lisää!') + '</p>';
        container.after(summary);
    }
}
