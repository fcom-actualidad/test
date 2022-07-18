import { Fragment, useState } from 'react'
import { createPlayer } from '../utils/fauna.helpers'

function SaveScore({ category, score, setError, resetGame }) {
	const [playerName, setPlayerName] = useState('')

	const saveScore = async e => {
		e.preventDefault()

		if (!playerName || !category || !score) return

		try {
			await createPlayer({ category, name: playerName.trim(), score })
		} catch (error) {
			console.log(error)
			setError('🙁 Error saving player score.')
		}

		resetGame()
	}

	return (

				<Fragment>
					<h3>Revisa tu calificación 🙌</h3>
				</Fragment>

	)
}

export default SaveScore
