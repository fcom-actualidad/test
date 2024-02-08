export default {
    id: "ssocas",
    name: "SSO CAS UC",
    description: "Central Authentication Service UC",
    action: "login",
    redirect: null,
    login: async (username, password) => {
        const loginEndpoint = "https://sso.uc.cl/cas/login";

        const initialForm = await (await fetch(loginEndpoint
            )).text();
        const doc = new DOMParser().parseFromString(initialForm, "text/html");
        const loginTicketField = doc.querySelector('input[name="execution"]');

        if (!loginTicketField) {
            return;
        }
        console.log("SSO CAS UC login");
        const body = new FormData();
        body.append("username", username);
        body.append("password", password);
        body.append("_eventId", "submit");
        body.append("execution", loginTicketField.getAttribute("value"));



            const websiteText = await (await fetch(loginEndpoint, {
                method: "POST",
                body,
            })).text();
            const docResponse = new DOMParser().parseFromString(websiteText, "text/html");
            console.log(docResponse);
            const tableRows = docResponse.querySelectorAll(
                "#divPrincipalAttributes table tr"
            );

            if (!tableRows || tableRows.length === 0) {
                //throw new Error("Attribute rows not found");
                return {code:400,errors:'🙁 No logramos iniciar sesión!'}
            }

            const [row] = Array.from(tableRows).filter((tr) => {
                const span = tr.querySelector(":scope > td code kbd");
                 return span?.innerText === "displayName";
            });

            if (!row) {
                throw new Error("Attribute row for displayName not found");
            }

            const displayNameSpan = row.querySelector(
                ":scope td:is(:last-child) code kbd"
            );

            const name = displayNameSpan?.innerText.slice(1, -1);
            if (!name) {
                throw new Error("Attribute name not found");
            }


            const [row2] = Array.from(tableRows).filter((tr) => {
                const span = tr.querySelector(":scope > td code kbd");
                return span?.innerText === "mail";
            });

            if (!row2) {
                throw new Error("Attribute row for email not found");
            }

            const displayEmailSpan = row2.querySelector(
                ":scope td:is(:last-child) code kbd"
            );

            const email = displayEmailSpan?.innerText.slice(1, -1);
            if (!email) {
                throw new Error("Attribute email not found");
            }

            const [row3] = Array.from(tableRows).filter((tr) => {
                const span = tr.querySelector(":scope > td code kbd");
                return span?.innerText === "carlicense";
            });

            if (!row3) {
                throw new Error("Attribute row for email not found");
            }

            const displayRutSpan = row3.querySelector(
                ":scope td:is(:last-child) code kbd"
            );

            const rut = displayRutSpan?.innerText.slice(1, -1);
            if (!rut) {
                throw new Error("Attribute email not found");
            }
            return {code:200, name: name, username: username, email: email, rut: rut};
        }
};
