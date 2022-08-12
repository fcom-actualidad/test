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
	handleProfile
}) {
	return (
		<header>
			{currentPlayer && <div>
				<h1>Hola, {currentPlayer.name}</h1>
				<div className="buttons-section">
					<button className="btn bg-green" type="button" onClick={handleProfile}>Mis Puntajes</button>
				<button className="btn bg-red" type="button" onClick={handleLogout}>Salir</button>
				</div>
			</div>
				}
			{!currentPlayer &&<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type="text"
						id='email'
						defaultValue='email'
						disabled={loading || quizInProgress}
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
					<div className="checkbox-container">
						<label htmlFor="checkbox">Mostrar </label>
						<input
							id="checkbox"
							type="checkbox"
							checked={isShown}
							onChange={togglePassword}
						/>
					</div>
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
							: 'Ingresar'}
					</button>
				</div>
			</form>}
		</header>
	)
}

export default Header
