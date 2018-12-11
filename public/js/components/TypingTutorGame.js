import { fetchRandomQuote } from '../api-client.js';
import TypingTutorView from './TypingTutorView.js';
import { roundFloat } from '../math-util.js';

class TypingTutorGame {
  constructor() {
    this.isRoundInProgress = false;
    this.currentStrokeCount = -1;
    this.targetText = null;
  }

  init() {
    this.view = new TypingTutorView();
    this.view.registerStartRoundCallback(this.startRound.bind(this));
    this.view.registerHandleKeystrokeCallback(this.handleKeyStroke.bind(this));
    this.view.initDOMAndListeners();
  }

  startRound() {
    this.isRoundInProgress = true;
    this.currentStrokeCount = -1;
    this.initTargetText();
  }

  handleKeyStroke(key) {
    if (!this.isRoundInProgress) return;
    this.currentStrokeCount += 1;
    const targetChar = this.targetText[this.currentStrokeCount];
    this.view.renderKeystroke(key, targetChar);
    this.endJudge();
  }

  endJudge() {
    if (this.targetText.length -1 === this.currentStrokeCount) {
      const failedTyping = document.getElementsByClassName('key-incorrect').length;
      const succeededTyping = document.getElementsByClassName('key-correct').length;
      const successRate = roundFloat(succeededTyping / (failedTyping + succeededTyping), 2) * 100;
      console.log(`正答率： ${successRate}%`);
    }
  }

  initTargetText() {
    fetchRandomQuote()
      .then((quoteText) => {
        this.view.renderTargetText(quoteText);
        this.targetText = quoteText.split('');
      });
  }
}

export default TypingTutorGame;
