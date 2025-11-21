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
        <div className = "Title">
        Poll Data
        </div>
      </h1>
      <details className="Polls" open>
        <summary > <div className ="pollName">Polls </div> </summary>



        {pollDataJson.map((data: PollData, index: number) => (
          <div className="container">
            <article key={index}>
              <header>
                <h3>
                  <span className = "questionName">
                  {data.question}
                 </span>
                </h3>
                <span className = "totalVoteCounter" style={{ float: 'right' }}>
                        {data.answers.reduce((acc, ans) => acc + ans.voters.length, 0)} Total Votes
                  </span>
                  <p>
                    <span className = "pollDetails">
                    Winner: <span className ="ansName" style={{ fontSize: '30px', fontWeight: '500'}}>{data.answers.reduce((prev, current) => (prev.voters.length > current.voters.length) ? prev : current, data.answers[0]).answer}</span>
                    </span>
                  </p>
              </header>
              
              {data.answers.map((ans: Answers, ansIndex: number) => (

                <div className="container">
                  <article key={ansIndex}>
                    <header>
                      <h3>
                        <span className="ansName">
                        {ans.answer}
                        </span>
                        </h3>
                        <div className = "voterInfo">
                      <span style={{ float: 'right' }}>
                        {ans.voters.length} Votes <br></br>
                        {(ans.voters.length / data.answers.reduce((acc, ans) => acc + ans.voters.length, 0) * 100).toFixed(0)}% of Votes
                      </span>
                      </div>
                      <progress value={ans.voters.length} max="10" />
                    </header>

                    {/* 3. Conditional: Only show voter list if there are voters */}
                    {ans.voters.length > 0 && (
                      <details>
                        <summary><div className = "seeVotes">See who voted</div></summary>
                        <ul>
                          {/* 4. Innermost Loop: Iterate through VOTERS */}
                          {ans.voters.map((voter: User) => (
                            <li key={voter.id}>
                              {voter.display_name} {/* <small>(@{voter.username})</small> */}
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
