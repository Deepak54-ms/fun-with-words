import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VocabItem } from './vocab';
import { vocabulary } from './vocab';
import './App.css';

function speak(text: string, lang: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  speechSynthesis.speak(utterance);
}

function VocabCard({ item, lang }: { item: VocabItem; lang: 'en' | 'hi' }) {
  const { t } = useTranslation();
  const { word, sentence } = item[lang];
  return (
    <div className="card">
      <img src={item.image} alt={word} className="img" />
      <h3>{word}</h3>
      <p>{sentence}</p>
      <button onClick={() => speak(word, lang)}>{t('speak')}</button>
    </div>
  );
}

function Quiz() {
  const { t, i18n } = useTranslation();
  const [question, setQuestion] = useState(() => createQuestion());
  const [feedback, setFeedback] = useState('');

  function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function createQuestion() {
    const correct = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    const options = shuffle(vocabulary).slice(0, 3);
    if (!options.includes(correct)) {
      options[Math.floor(Math.random() * options.length)] = correct;
    }
    return { correct, options };
  }

  const handleChoice = (id: string) => {
    if (id === question.correct.id) {
      setFeedback(t('correct'));
      setTimeout(() => {
        setQuestion(createQuestion());
        setFeedback('');
      }, 1000);
    } else {
      setFeedback(t('tryAgain'));
    }
  };

  return (
    <div className="quiz">
      <h2>{t('quizPrompt', { word: question.correct[i18n.language as 'en' | 'hi'].word })}</h2>
      <div className="options">
        {question.options.map((opt) => (
          <img
            key={opt.id}
            src={opt.image}
            alt=""
            className="option-img"
            onClick={() => handleChoice(opt.id)}
          />
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'hi';

  return (
    <div className="App">
      <header>
        <h1>{t('title')}</h1>
        <div className="lang-switcher">
          <label htmlFor="lang">{t('chooseLanguage')}:</label>
          <select
            id="lang"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="en">{t('english')}</option>
            <option value="hi">{t('hindi')}</option>
          </select>
        </div>
      </header>

      <section className="vocab-list">
        {vocabulary.map((item) => (
          <VocabCard key={item.id} item={item} lang={lang} />
        ))}
      </section>

      <section className="quiz-section">
        <Quiz />
      </section>
    </div>
  );
}
