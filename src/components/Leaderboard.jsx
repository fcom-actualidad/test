import { useEffect, useState } from 'react'
import { scores } from '../utils/engine.helpers'

const mergeSortArray = arr => {
	/*const mergedEntriesIntoObject = arr.reduce((acc, val) => {
		const key = val.userName.toLowerCase()
		if (key in acc) {
			acc[key] = { ...acc[key], score: acc[key].finalScore + val.finalScore }
		} else {
			acc[key] = val
		}
		return acc
	}, {})*/
	const sortedArrayByHighScore = Object.values(arr).sort(
		(a, b) => b.finalScore - a.finalScore
	)
	return sortedArrayByHighScore
}

const findArrayElementByEdit = (array,email) => {
	return array.find((element) => {
		return element.email === email;
	})
}


function Leaderboard({ setError }) {
	const [isLoading, setIsLoading] = useState(false)
	const [leaderboard, setLeaderboard] = useState(null)
	const [topScorer, setTopScorer] = useState('')

	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			try {
				const scoresData = await scores();
				const playerData = scoresData.message.data;
				if (!playerData.length > 0) {
					return setIsLoading(false)
				}
				//setTopScorer(mergeSortArray(playerData)[0])
				console.log(playerData);
				const merge = mergeSortArray(playerData);
				console.log(merge);
				const currentUser = findArrayElementByEdit(merge,scoresData.user)
				setTopScorer(currentUser);
				setLeaderboard(merge)

			} catch (error) {
				console.log(error)
				setError('🙁 Error loading leaderboard.')
			}
			setIsLoading(false)
		})()
	}, [setError])

	return (
		<div className='leaderboard'>

			{topScorer && (
				<div className='leaderboard-group gold'>
					<h3>Tu puntaje Obtenido</h3>
					<span>
						{topScorer.userName} - {topScorer.finalScore}
					</span>
					<h5>Nota: {(topScorer.grade/10).toFixed(1)}</h5>
				</div>
			)}
			<h1>RANKING 🏆</h1>
			{leaderboard &&
					<div key='' className='leaderboard-group'>
						<h3>Top 10</h3>
						<ul>
							{leaderboard.filter((player, idx) => idx < 10).map((player,idx) => (

								<li key={player}>
									{idx === 0 && '🥇 '}
									{idx === 1 && '🥈 '}
									{idx === 2 && '🥉 '}
									{player.email} - {player.finalScore}
								</li>
							))}
						</ul>
					</div>
				}

			{isLoading && <h3>Cargando ranking...</h3>}

			{!leaderboard && !isLoading && <h3>¡Aún sin puntajes!</h3>}
		</div>
	)
}

export default Leaderboard
