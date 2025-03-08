import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Flash from './components/Flash'
import bee from './assets/bee.png'

function App() {
  const [count, setCount] = useState(0)
  const questions = [
    { "red": { "What is the primary role of a queen bee in a hive?": "The queen bee's main role is to lay eggs and maintain the colony's population." } },
    { "green": { "How do honeybees communicate with each other?": "They use a 'waggle dance' to indicate the direction and distance of food sources." } },
    { "yellow": { "What is the average lifespan of a worker bee?": "Worker bees typically live about 6 weeks during the summer and several months in the winter." } },
    { "red": { "What do bees collect from flowers to make honey?": "They collect nectar, which they transform into honey through enzymatic processes and evaporation." } },
    { "yellow": { "Why are bees important for the environment?": "Bees pollinate plants, helping fruits, vegetables, and flowers grow, which supports biodiversity and food production." } },
    { "green": { "What happens to a honeybee after it stings?": "A honeybee dies after stinging because its stinger gets stuck in the skin and tears away part of its abdomen." } },
    { "green": { "How many eyes does a bee have?": "Bees have five eyes—two large compound eyes and three small simple eyes on top of their head." } },
    { "yellow": { "What is the primary ingredient in beeswax?": "Beeswax is made from wax secreted by special glands in worker bees." } },
    { "yellow": { "How fast can a honeybee fly?": "A honeybee can fly at about 15-20 mph." } },
    { "red": { "What is the process of a new queen bee being chosen?": "Worker bees feed selected larvae a special diet of royal jelly, which allows them to develop into potential queens." } }
  ];


  const [currentCard, setCurrentCard] = useState(null);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const cardObj = questions[randomIndex];
    
    const color = Object.keys(cardObj)[0];
    const questionObj = cardObj[color];
    const question = Object.keys(questionObj)[0];
    const answer = questionObj[question];
    
    return { color, question, answer };
  };

  const handleNewCard = () => {
    setCurrentCard(getRandomCard());
  };

  if (currentCard === null) {
    handleNewCard();
  }

  return (
    <>
      <main className='main'>
        <div className='title'>
          <h1>Bee Factual</h1>
          <h2>Beekeeping facts and tips</h2>
          <h3 className='subtitle'>10 total cards</h3>
        </div>
        <div className='card'>
          {currentCard && (
            <Flash 
              color={currentCard.color} 
              question={currentCard.question} 
              answer={currentCard.answer}
              img = {bee}
            />
          )}
        </div>
        <div>
          <button 
            onClick={handleNewCard}
            style={{
              padding: '10px 20px',
              margin: '20px 0',
              backgroundColor: '#FFD700',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            New Card
          </button>
        </div>
      </main>
    </>
  )
}

export default App