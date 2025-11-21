import pollDataJson from './assets/all_polls.json';

/* const pollData = pollDataJson as PollData[]; */

interface PollData {
  question: string,
  answers: Answers[]

}

interface Answers {
  answer: string,
  vote_count: number,
  voters: User[]
}

interface User {
  id: string,
  username: string,
  display_name: string
}


function App() {
  /*  const [count, setCount] = useState(0) */

  return (
    <main className="container">
      <h1>
        Poll Data
      </h1>
      <details className="Polls" open>
        <summary > Polls </summary>



        {pollDataJson.map((data: PollData, index: number) => (
          <div className="container">
            <article key={index}>
              <header>
                <h3>{data.question}</h3>
              </header>
              {data.answers.map((ans: Answers, ansIndex: number) => (
                <div className="container">
                  <article key={ansIndex}>
                    <header>
                      <h3>{ans.answer}</h3>
                      <span style={{ float: 'right' }}>
                        {ans.voters.length} Votes
                      </span>
                      <progress value={ans.voters.length} max="10" />
                    </header>

                    {/* 3. Conditional: Only show voter list if there are voters */}
                    {ans.voters.length > 0 && (
                      <details>
                        <summary>See who voted</summary>
                        <ul>
                          {/* 4. Innermost Loop: Iterate through VOTERS */}
                          {ans.voters.map((voter: User) => (
                            <li key={voter.id}>
                              {voter.display_name} <small>(@{voter.username})</small>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}

                  </article>
                </div>
              ))}

            </article>
          </div>
        ))}

      </details>
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
