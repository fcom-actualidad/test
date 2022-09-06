import { useEffect, useRef, useState } from 'react'

function Question({
	question,
	handleAnswers,
	setTimer,
	withTimer,
	lastQuestion,
	gameEnded,
	timer,
}) {
	const [isAnswered, setIsAnswered] = useState(false)
	const [chosenAnswer, setChosenAnswer] = useState('')

	//enviar respuesta a motor acá
	const handleChosenAnswer = option => {
		setChosenAnswer(option)
		setIsAnswered(true)
		//enviar timer también, además de respuesta
		handleAnswers({
			questionId: question._id,
			option: option._id,
			time: question.time - timer,
			score: question.score + timer,
			correct: option.correct
		})

	}

	const handleTimeout = useRef()

	handleTimeout.current = () => {
		setChosenAnswer(question.answer)
		setIsAnswered(true)
		handleAnswers({
			questionId: question._id,
			option: null,
			time: question.time - timer,
			score: question.score + timer,
			correct: false
		})
	}

	useEffect(() => {
		setChosenAnswer('')
		setIsAnswered(false)
	}, [question])

	useEffect(() => {
		if (!withTimer) return

		let seconds = question.time;

		const countDown = setInterval(() => {
			setTimer(seconds)
			seconds--

			if (isAnswered) {
				setTimer(0)
				return clearInterval(countDown)
			}

			if (seconds < 0 && !isAnswered) {
				setTimer(0)
				handleTimeout.current()
				console.log("timeout");
				return clearInterval(countDown)
			}
		}, 1000)

		return () => clearInterval(countDown)
	}, [withTimer, question, setTimer, isAnswered])

	return (
		<article className='question'>
			<h2>{question.question}</h2>

			<ul>
				{question.options.map((option, idx) =>
					isAnswered ? (
						<li
							key={option._id}
							className={`answered
								${
									option === chosenAnswer
										? option.correct
											? 'isRight'
											: 'isWrong'
										: chosenAnswer !== question.answer &&
										  option.correct
										? 'isRight'
										: ''
								} 
							`}
						>
							{option.content}
						</li>
					) : (
						<li key={option._id} onClick={() => handleChosenAnswer(option)}>
							{option.content}
						</li>
					)
				)}
			</ul>

			{isAnswered && !lastQuestion && (
				<p>
					Cargando siguiente pregunta... <span className='loader'>⏳</span>
				</p>
			)}

			{isAnswered && lastQuestion && <p>¡Terminaste! 🏁</p>}

			{isAnswered && lastQuestion && !gameEnded && (
				<p>
					Calculando nota... <span className='loader'>⏳</span>
				</p>
			)}
		</article>
	)
}

export default Question
