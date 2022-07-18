function Header({
	handleSubmit,
	setWithTimer,
	loading,
	loadingQuestions,
	quizInProgress,
	isShown,
	togglePassword,
	currentPlayer,
	handleLogout,
}) {
	return (
		<header>
			{currentPlayer && <div>
				<h1>Hola, {currentPlayer.name}</h1>
				<button type="button" onClick={handleLogout}>Log out</button>
			</div>
				}
			{!currentPlayer &&<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type="text"
						id='email'
						defaultValue='email'
						disabled={loading || quizInProgress}
						hide={currentPlayer !== null}
					>
					</input>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Contraseña</label>
					<input
						id='password'
						type={isShown ? "text" : "password"}
						defaultValue='contraseña'
						disabled={loading || quizInProgress}
					>
					</input>
				</div>
				<div className="checkbox-container">
					<label htmlFor="checkbox">ver</label>
					<input
						id="checkbox"
						type="checkbox"
						checked={isShown}
						onChange={togglePassword}
					/>
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
							: 'Log in'}
					</button>
				</div>
			</form>}
		</header>
	)
}

export default Header
