import { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Progress from './components/Progress'
import Score from './components/Score'
import Question from './components/Question'
import Leaderboard from './components/Leaderboard'
import SaveScore from './components/SaveScore'
import {loginPlayer, checkGame, authPlayer} from './utils/engine.helpers'

import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

const decodeString = string => {
	const text = document.createElement('textarea')
	text.innerHTML = string
	return text.value
}

const calculatePercentage = (fraction, total) => {
	if (fraction === 0 || total === 0) return 0
	return Math.floor((fraction * 100) / total)
}

function App() {
	const [currentPlayer, setCurrentPlayer] = useState(null)
	const [error, setError] = useState(false)
	const [isShown, setIsSHown] = useState(false);
	const [gameInitialized, setGameInitialized] = useState(false);
	const [loading, setLoading] = useState(false)
	const [loadingQuestions, setLoadingQuestions] = useState(false)
	const [apiOptions, setApiOptions] = useState({ amount: '5' })
	const [withTimer, setWithTimer] = useState(true)
	const [timer, setTimer] = useState(0)
	const [categories, setCategories] = useState([])
	const [questionsBank, setQuestionsBank] = useState([])
	const [currentCategory, setCurrentCategory] = useState('General Knowledge')
	const [currentQuestion, setCurrentQuestion] = useState(null)
	const [questionNum, setQuestionNum] = useState(0)
	const [totalQuestions, setTotalQuestions] = useState(0)
	const [answers, setAnswers] = useState([])
	const [score, setScore] = useState(0)
	const [quizInProgress, setQuizInProgress] = useState(false)
	const [gameEnded, setGameEnded] = useState(false)

	const togglePassword = () => {
		setIsSHown((isShown) => !isShown);
	};

	const resetGame = () => {
		setTimer(0)
		setQuestionsBank([])
		setCurrentCategory('General Knowledge')
		setCurrentQuestion(null)
		setQuestionNum(0)
		setTotalQuestions(0)
		setAnswers([])
		setScore(0)
		setQuizInProgress(false)
		setGameEnded(false)
	}

//función para realizar login en motor
	const handleSubmitLogin = async e => {
		e.preventDefault()
		setLoading(true);
		resetGame()
		const email = e.target.email.value;
		const pass = e.target.password.value;
		const results = await loginPlayer({email,password:pass});
		if (results.code === 200){
			setCurrentPlayer(results.data);
			await authPlayer({email,password:pass});
		} else {
			setError(results.errors);
		}
		setLoading(false);
	}

//función para cerrar sesión
	const handleLogout = async e =>{
		e.preventDefault()
		resetGame()
		ReactSession.remove("userName");
		ReactSession.remove("name");
		ReactSession.remove("email");
		ReactSession.remove("gameName");
		setCurrentPlayer(null);
	}

	const handleSelectGameSubmit = async e =>{
		e.preventDefault()
		setLoading(true);
		resetGame()
		const gameName = e.target.gameCode.value;
		const results = await checkGame(gameName);
		console.log(results);
		if (results.code === 200){
			setGameInitialized(true);
			setTotalQuestions(results.data.scenes.length);
		} else {
			setError(results.errors);
		}
		setLoading(false);

		//TEMPORAL, SOLO PRUEBA
		setQuestionsBank([{id: `00-${Date.now()}`,
			question: "Esta es la pregunta 01",
			answer: "opción01",
			options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			time: 30},
			{id: `01-${Date.now()}`,
			question: "Esta es la pregunta 02",
			answer: "opción03",
			options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			time: 20},
			{id: `02-${Date.now()}`,
				question: "Esta es la pregunta 03",
				answer: "opción02",
				options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			time: 25}
			]
		)
		setQuizInProgress(true)
	}

	const handleAnswers = data => {
		setAnswers(prevData => [...prevData, data])
		setScore('?')
	}

	const setNewScoreAndQuestionNum = useRef()

	setNewScoreAndQuestionNum.current = () => {
		let newScore = 0

		for (const answer of answers) {
			if (answer !== null && answer.isCorrectAnswer) newScore += 100
		}

		setScore(newScore)

		if (questionNum < totalQuestions) {
			setCurrentQuestion(questionsBank[questionNum])
			setQuestionNum(questionNum + 1)
		}

		if (questionNum === totalQuestions) setGameEnded(true)
	}

	useEffect(() => {
		setCurrentQuestion(questionsBank[0])
		setQuestionNum(1)
	}, [questionsBank])

	useEffect(() => {
		if (!answers.length) return
		const timeout = setTimeout(() => setNewScoreAndQuestionNum.current(), 1500)
		return () => clearTimeout(timeout)
	}, [answers])

	useEffect(() => {
		const timeout = setTimeout(() => setError(false), 5000)
		return () => clearTimeout(timeout)
	}, [error])

	return (
		<Fragment>
			<Header
				handleSubmit={handleSubmitLogin}
				setWithTimer={setWithTimer}
				loading={loading}
				loadingQuestions={loadingQuestions}
				quizInProgress={quizInProgress}
				isShown = {isShown}
				togglePassword = {togglePassword}
				currentPlayer = {currentPlayer}
				handleLogout = {handleLogout}
			/>

			<div className='container'>
				{error && <div className='error-message'>{error}</div>}

				{/*Loader visual para que el usuario sepa que se está ejectuando un proceso*/}
				{loading && (
					<p>
						Cargando... <span className='loader'>⏳</span>
					</p>
				)}

				{!quizInProgress && !totalQuestions && (
					<Leaderboard setError={setError} />
				)}

				{
					currentPlayer && !quizInProgress && !gameInitialized && (
						<form onSubmit={handleSelectGameSubmit}>
							<div className='form-group'>
								<label htmlFor='gameCode'>Código de juego</label>
								<input type="text"
									   id='gameCode'
									   defaultValue='secreto'
								>
								</input>
							</div>
							<div className='form-group'>
								<button
									className='btn'
									type='submit'
									disabled={loading || quizInProgress}
								>
									{loading
										? 'Loading...'
										: quizInProgress
											? 'En juego'
											: 'Jugar'}
								</button>
							</div>
						</form>
					)
				}

				{currentQuestion && !gameEnded && (
					<Fragment>
						<div className='flex-between'>
							<Progress
								questionNum={questionNum}
								totalQuestions={totalQuestions}
								percentage={calculatePercentage(questionNum, totalQuestions)}
							/>
							<Score
								question={currentQuestion}
								score={score}
								withTimer={withTimer}
								timer={timer}
							/>
						</div>

						<Question
							question={currentQuestion}
							handleAnswers={handleAnswers}
							lastQuestion={questionNum === totalQuestions}
							gameEnded={gameEnded}
							setTimer={setTimer}
							withTimer={withTimer}
						/>
					</Fragment>
				)}

				{gameEnded && (
					<SaveScore
						category={currentCategory}
						score={score}
						setError={setError}
						resetGame={resetGame}
					/>
				)}
			</div>
		</Fragment>
	)
}

export default App
