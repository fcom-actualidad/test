import axios from "axios";
import { ReactSession } from 'react-client-session';

const generalUri = "https://fcom-actualidad.herokuapp.com/api";

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
        //ReactSession.get("username");
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
        //ReactSession.get("username");
        return {code:200, data:game.data};
    } catch (error) {
        console.log(error)
        return {code:500,errors:'🙁 Ocurrió un error y no logramos iniciar sesión.'}
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



//Auth "/auth" +form
// NextMessage  /game/messages?userName={userName}&gameName={gameName}&stageId={stageId}&character={characterId}")
//PostAnswer /game/answer?userName={userName}&gameName={gameName}&stageId={stageId}&character={characterId}", form)
//newSave /game/newEmpty", form)
//getSave /game?userName={userName}&gameName={gameName}"
