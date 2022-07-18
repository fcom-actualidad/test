import { useEffect, useRef, useState } from 'react'

function Question({
	question,
	handleAnswers,
	setTimer,
	withTimer,
	lastQuestion,
	gameEnded,
}) {
	const [isAnswered, setIsAnswered] = useState(false)
	const [chosenAnwser, setChosenAnwser] = useState('')

	//enviar respuesta a motor acá
	const handleChosenAnser = option => {
		setChosenAnwser(option)
		setIsAnswered(true)
		//enviar timer también, además de respuesta
		handleAnswers({
			id: question.id,
			isCorrectAnswer: question.answer === option,
		})
	}

	const handleTimeout = useRef()

	handleTimeout.current = () => {
		setChosenAnwser(question.answer)
		setIsAnswered(true)
		handleAnswers(null)
	}

	useEffect(() => {
		setChosenAnwser('')
		setIsAnswered(false)
	}, [question])

	useEffect(() => {
		if (!withTimer) return

		let seconds = withTimer

		const countUp = setInterval(() => {
			setTimer(seconds)
			seconds++

			if (isAnswered) {
				setTimer(0)
				return clearInterval(countUp)
			}

			if (seconds < 0 && !isAnswered) {
				setTimer(0)
				handleTimeout.current()
				return clearInterval(countUp)
			}
		}, 1000)

		return () => clearInterval(countUp)
	}, [withTimer, question, setTimer, isAnswered])

	return (
		<article className='question'>
			<h2>{question.question}</h2>

			<ul>
				{question.options.map((option, idx) =>
					isAnswered ? (
						<li
							key={option}
							className={`answered
								${
									option === chosenAnwser
										? chosenAnwser === question.answer
											? 'isRight'
											: 'isWrong'
										: chosenAnwser !== question.answer &&
										  option === question.answer
										? 'isRight'
										: ''
								} 
							`}
						>
							{option}
						</li>
					) : (
						<li key={option} onClick={() => handleChosenAnser(option)}>
							{option}
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
