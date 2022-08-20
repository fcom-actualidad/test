import {Fragment, useEffect, useState} from 'react'
import {grades, scores} from '../utils/engine.helpers'

function Profile({ user, setError, resetGame }) {
    const [isLoading, setIsLoading] = useState(false)
    const [myGrades, setMyGrades] = useState(null)
    useEffect(() => {
        ;(async () => {
            setIsLoading(true)
            try {
                const getData = await grades(user);
                let scores = [];
                scores = (getData.message.data);
                setMyGrades(scores);
            } catch (error) {
                console.log(error)
                setError('🙁 Error.')
            }
            setIsLoading(false)
        })()
    }, [setError])

    return (
        <div className='leaderboard'>
            <h3>Revisa tus calificaciones 🖥</h3>
            {myGrades &&
            <div className='leaderboard-group'>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Test</th>
                                <th>Nota</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                    {myGrades.map((game,idx) => (
                        <tr key={idx}>
                            <td>{new Date(game.updated_at).toLocaleDateString()}</td>
                            <td>{game.gameName}</td>
                            <td>{game.grade}</td>
                            <td>{game.finalScore}</td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>
            }


            {isLoading && <h3>Cargando calificaciones...</h3>}

            {!myGrades && !isLoading && <h3>¡Aún sin puntajes!</h3>}
        </div>
    )
}

export default Profile
