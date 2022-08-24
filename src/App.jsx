import { Fragment, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Progress from './components/Progress'
import Score from './components/Score'
import Question from './components/Question'
import Leaderboard from './components/Leaderboard'
import SaveScore from './components/SaveScore'
import Profile from './components/Profile'
import {loginPlayer, checkGame, authPlayer, getQuestions, postAnswer} from './utils/engine.helpers'

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
	let userInit = null;
	if(ReactSession.get("name") !== undefined){
		userInit = {name:ReactSession.get("name"),email:ReactSession.get("email")}
	}

	const [currentPlayer, setCurrentPlayer] = useState(userInit)
	const [error, setError] = useState(false)
	const [isShown, setIsSHown] = useState(false);
	const [gameInitialized, setGameInitialized] = useState(false);
	const [loading, setLoading] = useState(false)
	const [loadingQuestions, setLoadingQuestions] = useState(false)
	const [withTimer, setWithTimer] = useState(true)
	const [timer, setTimer] = useState(0)
	const [questionsBank, setQuestionsBank] = useState([])
	const [currentCategory, setCurrentCategory] = useState('General Knowledge')
	const [currentQuestion, setCurrentQuestion] = useState(null)
	const [questionNum, setQuestionNum] = useState(0)
	const [totalQuestions, setTotalQuestions] = useState(0)
	const [answers, setAnswers] = useState([])
	const [score, setScore] = useState(0)
	const [quizInProgress, setQuizInProgress] = useState(false)
	const [gameEnded, setGameEnded] = useState(false)
	const [profile, setProfile] = useState(false)


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
			console.log("logueado!");
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
		ReactSession.remove("gameId");
		ReactSession.remove("token");
		setProfile(false)
		setCurrentPlayer(null);
	}

	const handleMyProfile = async e =>{
		e.preventDefault()
		setProfile(true);
	}

	const handleHome= async e =>{
		e.preventDefault()
		setProfile(false);
	}

	const handleSelectGameSubmit = async e =>{
		e.preventDefault()
		setLoading(true);
		resetGame()
		const gameName = e.target.gameCode.value;
		const results = await checkGame(gameName);
		if (results.code === 200){
			setGameInitialized(true);
			setTotalQuestions(results.data.questions.length);
			let questions = await getQuestions(results.data._id);
			if (questions.code === 200){
				setQuestionsBank(questions.data);
				setQuizInProgress(true)
			} else {
				setError(questions.errors);
			}


			//TEMPORAL, SOLO PRUEBA
			// setQuestionsBank(
			// 	[
			// 		{id: `00-${Date.now()}`,
			// 		question: "Esta es la pregunta 01",
			// 		options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			// 		time: 30},
			// 		{id: `01-${Date.now()}`,
			// 		question: "Esta es la pregunta 02",
			// 		options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			// 		time: 20},
			// 		{id: `02-${Date.now()}`,
			// 			question: "Esta es la pregunta 03",
			// 			options: ["opción01","opción02","opción03"].sort(() => Math.random() - 0.5),
			// 		time: 25}
			// 	]
			// )

		} else {
			setError(results.errors);
		}
		setLoading(false);


	}

	const handleAnswers = data => {
		if (!data) return;
		console.log("Post answer:", data.questionId, data.option, data.time);
		postAnswer(data.questionId, data.option, data.time);
		setAnswers(prevData => [...prevData, data])
		setScore(score + data.score)
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
			<div className='game-title'><a onClick={handleHome} href="/"><h1> 🚀 TEST DE ACTUALIDAD</h1></a></div>
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
				handleProfile = {handleMyProfile}
			/>

			<div className='container'>
				{error && <div className='error-message'>{error}</div>}

				{/*Loader visual para que el usuario sepa que se está ejectuando un proceso*/}

				{loading && (
					<p>
						Cargando... <span className='loader'>⏳</span>
					</p>
				)}

				{
					currentPlayer && profile && (!quizInProgress || gameEnded) && (
						<Fragment>
							<Profile
								user={currentPlayer}
								setError={setError}
							/>
						</Fragment>

					)
				}


				{
					currentPlayer && !profile && !quizInProgress && !gameInitialized && (
						<form onSubmit={handleSelectGameSubmit}>
							<div>
								<p>Para responder el test debes indicar primero el código específico de la sesión que te corresponde</p>
							</div>
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
											: 'Responder'}
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
							timer={timer}
						/>
					</Fragment>
				)}

				{gameEnded && !profile && (
					<SaveScore
						category={currentCategory}
						score={score}
						setError={setError}
						resetGame={resetGame}
					/>
				)}
				{gameEnded && !profile && (
					<Leaderboard setError={setError} />
				)}


			</div>
		</Fragment>
	)
}

export default App
