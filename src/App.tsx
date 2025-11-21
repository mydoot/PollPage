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

interface PollCard {
  data: PollData;
}

const PollStuff = ({ data }: PollCard) => {

  const totalVotes = data.answers.reduce((acc, ans) => acc + ans.voters.length, 0);
  // Find the highest vote count to set the Progress Bar max
  //const maxVotes = Math.max(...data.answers.map(a => a.voters.length));

  // Find the winner(s)
  const winners = () => {
    let highScore = 0;
    let theWinners: string[] = [];

    for (const curAns of data.answers) {
      const curScore = curAns.voters.length;
      if (curScore > highScore) {
        highScore = curScore;
        theWinners = [curAns.answer];
      }
      else if (curScore == highScore && curScore != 0) {
        theWinners.push(curAns.answer);
      }
    }

    if (!(theWinners.length)) {
      return "No Votes";
    }

    return theWinners.join(" & ")
  }
  //const isTie = winners.length > 1;

  // Get winner name (safe check for empty votes)
  const winnerText = winners();

  return (
    <div className="container">
      <article>
        <header>
          <h3>
            <span className="questionName">
              {data.question}
            </span>
          </h3>
          <span className="totalVoteCounter" style={{ float: 'right' }}>
            {totalVotes} Total Votes
          </span>
          <p>
            <span className="pollDetails">
              Winner(s): <span className="ansName" style={{ fontSize: '30px', fontWeight: '600' }}>{winnerText}</span>
            </span>
          </p>
        </header>

        {data.answers.map((ans: Answers, ansIndex: number) => {

          const percentage = (ans.voters.length / data.answers.reduce((acc, ans) => acc + ans.voters.length, 0) * 100);

          return (

            <div className="container">
              <article key={ansIndex}>
                <header>
                  <h3>
                    <span className="ansInfo" style={{ fontWeight: '400' }}>
                      {ans.answer}
                    </span>
                  </h3>

                  <div className="voterInfo">
                    <span>
                      <span style={{ fontSize: '15px' }}>
                        {ans.voters.length} Votes
                      </span> <br></br>
                      <span style={{ fontSize: '27px', fontWeight: '700' }}>
                        {percentage.toFixed(0)}%
                      </span>
                    </span>
                  </div>
                  <progress value={ans.voters.length} max={totalVotes} />
                </header>

                {/* 3. Conditional: Only show voter list if there are voters */}
                {ans.voters.length > 0 && (
                  <details>
                    <summary><div className="seeVotes">See who voted</div></summary>
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


          )


        })}

      </article>
    </div>

  )
}

function App() {
  /*  const [count, setCount] = useState(0) */


  return (
    <main className="container">
      <h1>
        <div className="Title">
          Poll Data
        </div>
      </h1>
      <details className="Polls" open>
        <summary > <div className="pollName">Polls </div> </summary>



        {pollDataJson.map((data: PollData, index: number) => (
          <PollStuff key={index} data={data}></PollStuff>
        ))}

      </details>
    </main>
  )
}

export default App
