import axios from "axios";
import { ReactSession } from 'react-client-session';
import { decodeToken } from "react-jwt";

const generalUri = "https://engine-fcom.onrender.com/api";
// const generalUri = "http://localhost:3000/api";

export const registerPlayer = async (form) => {
    try {
        const login = await axios({
            method: 'POST',
            url: generalUri+"/sign/in-user",
            //params: { ...apiOptions },
            data: form,
        })
        if (login.data.code !== 200) {
            return {code:400,errors:'🙁 No logramos iniciar sesión!', data: login.data}
        }
        ReactSession.set("email", form.email);
        ReactSession.set("name", login.data.name);
        //ReactSession.get("username");
        return {code:200, data: login.data};
    } catch (error) {
        console.log(error)
        return {code:500,errors:'🙁 Ocurrió un error y no logramos iniciar sesión. '}
    }
}

export const loginPlayer = async (form) => {
    try {
        const login = await axios({
            method: 'POST',
            url: generalUri+"/sign/in-user",
            //params: { ...apiOptions },
            data: form,
        })
        if (login.status !== 200) {
            return {code:400,errors:'🙁 No logramos iniciar sesión!', data: login.data}
        }
        ReactSession.set("email", form.email);
        ReactSession.set("name", login.data.name);
        ReactSession.set("username", form.username);
        ReactSession.set("rut", form.rut );
        return {code:200, data: login.data};
    } catch (error) {
        console.log(error)
        return {code:500,errors:'🙁 Ocurrió un error y no logramos iniciar sesión. '}
    }
}

export const authPlayer = async (form) => {
    try {
        const auth = await axios({
            method: 'POST',
            url: generalUri + "/auth",
            data: form
        });
        console.log("aut",auth);
        if (auth.status !== 201) {
            return {code:400,errors:'🙁 No logramos iniciar sesión!', data: auth.data}
        }
        console.log(auth);
        ReactSession.set("token",auth.data.token );
        return {code:200, data: auth.data};
    } catch (error) {
        console.log(error)
        return {code:500,errors:'🙁 Ocurrió un error y no logramos iniciar sesión. '}
    }
}

export const checkGame = async (uncheckedGameName) => {
    try {
        const game = await axios({
            method: 'GET',
            url: generalUri+"/game/checkGame",
            params: {gameName:uncheckedGameName },
            headers: {
                'Authorization': "Bearer "+ReactSession.get("token")
            },
        })
        console.log("g",game);
        if (game.status !== 200) {
            return {code:400,errors: '🙁 No logramos encontrar el juego!'}
        }
        ReactSession.set("gameName", game.data.gameName);
        ReactSession.set("gameId", game.data._id);
        //ReactSession.get("username");
        return {code:200, data:game.data};
    } catch (error) {
        console.log(error)
        return {code:404,errors:'🙁 No logramos encontrar el juego!'}
    }
}

export const getQuestions = async (gameId) => {
    try {
        const response = await axios({
            method: 'GET',
            url: generalUri+"/game/questions",
            params: {gameId:gameId },
            headers: {
                'Authorization': "Bearer "+ReactSession.get("token")
            },
        })
        if (response.status !== 200) {
            return undefined;
        }

        if (response.data.code === 405){
            return {code:405, data:response.data};
        }

        response.data.forEach(q=>{
            q.options.forEach(a =>{
                const myDecodedToken = decodeToken(a.correct);
                a.correct = myDecodedToken;
            })
        })

        return {code:200, data:response.data};
    } catch (error) {
        console.log(error)
        return {code:404,errors:'🙁 No logramos encontrar el juego!'}
    }

}

export const newEmpty = async ()=>{
    try{
        const saveEmpty = await axios({
            method: 'POST',
            url: generalUri+"/game/newEmpty",
            data: {gameName:ReactSession.get("gameName"), userName: ReactSession.get("username") },
            headers: {
                'Authorization': 'Bearer '+ReactSession.get("token")
            }
        })
        if (saveEmpty.status !== 200) {
            console.log("error",saveEmpty);
            return undefined;
        }
        else{
            console.log("ok, saved exists",saveEmpty);
            return {code:200, data:saveEmpty.data};
        }
    } catch (error) {
        console.log(error)
        return {code:404,errors:'🙁 Error al guardar la partida!'}
    }
}

export const postAnswer = async (questionId, answerId, time) => {
    const gameId = ReactSession.get("gameId")
    try {
        const response = await axios({
            method: 'POST',
            url: generalUri+"/game/answer",
            data: {answerId: answerId, gameId: gameId, time: time, questionId: questionId},
            headers: {
                'Authorization': "Bearer "+ReactSession.get("token")
            },
        })
        if (response.status !== 200) {
            return undefined;
        }
        return {code:200, data:response.data};
    } catch (error) {
        console.log(error)
        return {code:404,errors:'🙁 Error al guardar la respuesta!'}
    }

}

export const newMessage = async () => {
    const gameName = ReactSession.get("gameName");
    const email = ReactSession.get("email");
    const userName = ReactSession.get("userName");
    try {
        const message = await axios({
            method: 'GET',
            url: generalUri+"/game/messages",
            params: {userName: userName, gameName: gameName, email: email },
        })

        if (!message.results.length) {
            return {code:400,errors:'🙁 No logramos encontrar el mensaje!'}
        }

        /*setQuestionsBank(
            message.results.map((questionItem, index) => {
                const answer = decodeString(questionItem.correct_answer)
                const wrongAnswers = [
                    ...questionItem.incorrect_answers.map(a => decodeString(a)),
                    answer,
                ]
                return {
                    id: `${index}-${Date.now()}`,
                    question: decodeString(questionItem.question),
                    answer: answer,
                    options: wrongAnswers.sort(() => Math.random() - 0.5),
                }
            })
        )
        setTotalQuestions(message.results.length)
        setQuizInProgress(true)*/
        return {code:200, message:message};
    } catch (error) {
        console.log(error)
        return {code:500, errors: '🙁 Ocurrió un error y no logramos recuperar los mensajes.'}
    }
}

export const scores = async () => {
    const gameName = ReactSession.get("gameName");
    const email = ReactSession.get("email");
    try {
        const message = await axios({
            method: 'GET',
            url: generalUri+"/game/scores",
            params: {gameName: gameName, email: email },
            headers: {
                'Authorization': "Bearer "+ReactSession.get("token")
            },
        })

        if (message.length > 0) {
            return {code:400,errors:'🙁 No logramos encontrar los puntajes aún!'}
        }

        return {code:200, message:message, user: email};
    } catch (error) {
        console.log(error)
        return {code:500, errors: '🙁 Ocurrió un error y no logramos recuperar los puntajes.'}
    }
}

export const grades = async () => {
    const email = ReactSession.get("email");
    try {
        const message = await axios({
            method: 'GET',
            url: generalUri+"/game/grades",
            params: {email: email },
            headers: {
                'Authorization': "Bearer "+ReactSession.get("token")
            },
        })

        if (message.length > 0) {
            return {code:400,errors:'🙁 No logramos encontrar los puntajes aún!'}
        }

        return {code:200, message:message, user: email};
    } catch (error) {
        console.log(error)
        return {code:500, errors: '🙁 Ocurrió un error y no logramos recuperar los puntajes.'}
    }
}

//Auth "/auth" +form
// NextMessage  /game/messages?userName={userName}&gameName={gameName}&stageId={stageId}&character={characterId}")
//PostAnswer /game/answer?userName={userName}&gameName={gameName}&stageId={stageId}&character={characterId}", form)
//newSave /game/newEmpty", form)
//getSave /game?userName={userName}&gameName={gameName}"
