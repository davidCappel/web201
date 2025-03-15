import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Flash from './components/Flash'
import bee from './assets/bee.png'

function App() {
  const [count, setCount] = useState(0)
  const questions = [
    { "red": { "What is the primary role of a queen bee in a hive?": "lay eggs" } },
    { "green": { "How do honeybees communicate with each other?": "'waggle dance'" } },
    { "yellow": { "What is the average lifespan of a worker bee?": "6 weeks during the summer and several months in the winter." } },
    { "red": { "What do bees collect from flowers to make honey?": "nectar" } },
    { "yellow": { "Why are bees important for the environment?": "The pollinate plants, fruits, vegetables, and flowers." } },
    { "green": { "What happens to a honeybee after it stings?": "It dies" } },
    { "green": { "How many eyes does a bee have?": "5" } },
    { "yellow": { "What is the primary ingredient in beeswax?": " Wax from worker bees" } },
    { "yellow": { "How fast can a honeybee fly?": "15-20 mph" } },
    { "red": { "What is the process of a new queen bee being chosen?": "Bees feed selected larvae royal jelly, making them develop into potential queens" } }
  ];


  const [currentCard, setCurrentCard] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  const getRandomCard = () => {
    const cardObj = questions[cardIndex];
    const color = Object.keys(cardObj)[0];
    const questionObj = cardObj[color];
    const question = Object.keys(questionObj)[0];
    const answer = questionObj[question];
    return { color, question, answer };
  };

  const handleNewCard = () => {
    setCurrentCard(getRandomCard());
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentCard.answer.toLowerCase()) {
      setIsCorrect(true);
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
    setUserGuess('');
  };

  const handleNext = () => {
    const nextIndex = (cardIndex + 1) % questions.length;
    setCardIndex(nextIndex);
    setIsCorrect(null);
    handleNewCard();
  };

  const handleBack = () => {
    const prevIndex = (cardIndex - 1 + questions.length) % questions.length;
    setCardIndex(prevIndex);
    setIsCorrect(null);
    handleNewCard();
  };

  const handleShuffle = () => {
    const shuffledIndex = Math.floor(Math.random() * questions.length);
    setCardIndex(shuffledIndex);
    handleNewCard();
  };

  return (
    <div>
      <h1 className='proj'>Bee Factual</h1>
      <div className='card'>
        {currentCard && (
          <Flash
            color={currentCard.color}
            question={currentCard.question}
            answer={currentCard.answer}
            img={bee}
          />
        )}
      </div>
      <div>
        <input 
          type="text" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          placeholder="Enter your guess" 
        />
        <button onClick={handleGuess}>Submit Guess</button>
        {isCorrect !== null && (
          <div className={isCorrect ? 'feedback' : 'incorrect'}>
            {isCorrect ? 'Correct!' : 'Incorrect, try again.'}
          </div>
        )}
      </div>
      <div>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShuffle}>Shuffle</button>
      </div>
      <div className='proj'>
        <h3>Current Streak: {streak}</h3>
        <h3>Longest Streak: {longestStreak}</h3>
      </div>
    </div>
  );
}


export default App