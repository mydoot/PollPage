import pollDataJson from './assets/all_polls.json';

/* const pollData = pollDataJson as PollData[]; */

interface PollData{
    question: string, 
    answers: Answers[]

}

interface Answers{
    answer: string,
    vote_count: number,
    voters: User[]
}

interface User{
    id: string,
    username: string,
    display_name: string
}


function App() {
 /*  const [count, setCount] = useState(0) */

  return (
    <main>
    <h1>
     Poll Data
    </h1>
    <div className="container">
        {pollDataJson.map((data: PollData, index: number) => (
          <article key={index}>
            <header>
              <h3>{data.question}</h3>
            </header>
        
          
          </article>
        ))}
      </div>
    </main>
  )
}

/* function List() {
const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
} */

export default App
