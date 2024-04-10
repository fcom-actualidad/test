export default {
    id: "ssocas",
    name: "SSO CAS UC",
    description: "Central Authentication Service UC",
    action: "login",
    redirect: null,
    login: async (username, password) => {
        const loginEndpoint = "https://sso.uc.cl/cas/login";
        let myHeaders = new Headers();
        myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0");
        myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
        myHeaders.append("Accept-Language", "en-US,en;q=0.5");
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Origin", "https://sso.uc.cl");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Referer", "https://sso.uc.cl/cas/login");
        myHeaders.append("Cookie", "DISSESSION=c7d34519-3d70-4e45-a261-30bcd2a46270; _ga_0DRBB1BHRY=GS1.1.1704305820.19.1.1704305928.46.0.0; _ga=GA1.1.349908351.1667401263; _ga_EY4KK54CMC=GS1.1.1667765842.1.1.1667765891.11.0.0; _ga_L2T1WJ322Z=GS1.1.1702309502.15.0.1702309502.60.0.0; _ga_B3DQG9K367=GS1.1.1700232677.5.1.1700233270.0.0.0; _ga_T12EMGK497=GS1.1.1700232677.5.1.1700233270.60.0.0; _ga_36JQFDD7PW=GS1.1.1700232677.5.1.1700233270.60.0.0; _hjSessionUser_1620623=eyJpZCI6IjZmNGZiOTM2LTRjNGEtNWM5ZC1hMTdkLTY4ZDE3YTNjOGYyMSIsImNyZWF0ZWQiOjE2NzAzNTk2NTIzNzgsImV4aXN0aW5nIjp0cnVlfQ==; _ga_X2HJETL6M2=GS1.1.1702945914.6.1.1702945963.11.0.0; _ga_2CLXTJ61FF=GS1.1.1679594707.2.1.1679594876.60.0.0; _ga_5XVH1RRLFP=GS1.1.1706298448.3.1.1706298475.33.0.0; _ga_RF5RBBJMNH=GS1.1.1701410896.4.0.1701410897.59.0.0; _hjSessionUser_1367121=eyJpZCI6ImJkNzA5OGM2LTlmNzYtNTBmMy1hZDFhLTRkMmM0ZDU5YjEzYyIsImNyZWF0ZWQiOjE2Nzk2MjI5NzQxMTIsImV4aXN0aW5nIjp0cnVlfQ==; _ga_ZWSQMK1EE6=GS1.1.1698699436.3.0.1698699445.51.0.0; _ga_MGS7E54EJV=GS1.1.1697131984.3.0.1697131984.60.0.0; _ga_RD1NQ4T8LM=GS1.1.1690139163.2.0.1690139165.58.0.0; _ga_SLEHJZYHF1=GS1.2.1703613461.47.0.1703613461.0.0.0; _ga_WGNFQSYN34=GS1.1.1705949143.3.0.1705949143.60.0.0; _ga_CG7EBPXKW0=GS1.2.1705949144.3.0.1705949144.0.0.0; _ga_VRF77KMK74=GS1.1.1702309502.8.0.1702309502.60.0.0; _ga_3HB5TCPS2Z=GS1.1.1702943948.4.1.1702945882.42.0.0; _hjSessionUser_700025=eyJpZCI6ImQzYWY2NjQxLWU2Y2EtNWEyMi1hNWFmLWE2ZWU4MGJiODA0ZSIsImNyZWF0ZWQiOjE2OTMzNDY0MjUxMDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_HW67QMR0LR=GS1.1.1702945767.2.1.1702945784.0.0.0; _ga_S4GB3BR36B=GS1.1.1694145125.1.1.1694145366.60.0.0; fpestid=BFwENHv6qBqv_Q-7BkhPkPzt0A9FUlhkIHaJK6CNbvnQjIxXM3qBExlOuY6wyV0bbWJFcw; _ga_HER6R4V98F=GS1.2.1694145126.1.0.1694145126.0.0.0; _ga_Z41RD1TE8F=GS1.1.1694524494.1.1.1694524740.33.0.0; _fbp=fb.1.1694524494468.2043816072; _ga_LGVJF0KDCV=GS1.2.1703613461.33.1.1703613663.60.0.0; _ga_MEZ07Z164M=GS1.1.1698699448.1.1.1698699909.4.0.0; _ga_D0Q1893GM1=GS1.1.1700232677.3.1.1700233270.60.0.0; _ga_4RMGRRCQ9W=GS1.1.1700232677.3.1.1700233270.60.0.0; _ga_2KM923EMRT=GS1.1.1700435653.1.1.1700435701.12.0.0; _ga_ET7FKDMSML=GS1.1.1700435653.1.1.1700435701.12.0.0; _ga_BWCDHHFM2D=GS1.1.1701394827.1.1.1701394841.46.0.0; _ga_BW3FJN33V3=GS1.1.1701394853.1.0.1701394860.0.0.0; _ga_9DVXDVYE1Q=GS1.1.1701403806.1.0.1701403806.60.0.0; _ga_PT1C8EEC4P=GS1.2.1701403806.1.0.1701403806.0.0.0; org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; _ga_QWCSVER6K6=GS1.1.1706298291.1.1.1706298311.40.0.0; _ga_Q5HQJHC18L=GS1.1.1706483367.3.1.1706483387.40.0.0; _ga_2C2QQEF311=GS1.1.1706483367.1.1.1706483387.40.0.0; UqZBpD3n=v17Iy1Gw__Zjv");
        myHeaders.append("Upgrade-Insecure-Requests", "1");
        myHeaders.append("Sec-Fetch-Dest", "document");
        myHeaders.append("Sec-Fetch-Mode", "navigate");
        myHeaders.append("Sec-Fetch-Site", "same-origin");
        myHeaders.append("Sec-Fetch-User", "?1");
        myHeaders.append("Pragma", "no-cache");
        myHeaders.append("Cache-Control", "no-cache");

        let urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);
        urlencoded.append("execution", "7ecc5072-866c-430f-a0c4-4a573f7025f4_ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmJjcXBFX3VLTFVxQnJPaUVkcjZ5SE80ZmxQZTVfbzlsSC1KZjZ3b2NhZmhkWTFJRTUzMU1xN2EtZTVlbTNFVW5ZckxKUk8yVUk2Zkd5Q21qVEVuaGFnWTd2OXFsSDFFdzRZVm5fSHBqdVR1djNOMlp0X29sYks2NGlCd2FaUDV3VGhXOS1aOHh0eDd6ODM5bmJoU2lmeWFVY1ZKNE9VUmZyazVlUXh3OGhiWWVJcXViSWhQd1pRb2xlVW1Ca3J3RTJrUngyb2oyN1RHdUhab0QweHVueDQzNWNtbFVWRXFEMGM0YVJnQkNLTElCTUg1bDEwRzgyM0pNUTBaZ2dkbDlaR2ctSFJ4MHY4VkF4SWFpd3M3WU5GLWg3dnVxNUdMNHFZNXI5a1k5NGY5NEJOdXZPTVRYUDVzTURaSG9aLW11cGRYWUhqbkM4U0FQc3JEQ0ZCZWJFYzM3bWREM0V3LV9mMVBkRnhaUmNxSjBUYlYxdXFZMU0yaWhNeVNyeEZfNmt4Ul9DWVhGdWVDMFhmX2NqSHRKQzdDeGpKM2VNTWxRbHpZVDhqWDF4SFMybDB3eWNMeXZvNnVVdWlmNkJ0TUZiUGtFTzNnX1EwV3pvQzFYeEVmdkZvQ29YdDNzaXFhTThFdG04MXd1aDBwOXBHMk1ydFlaV2tKVmU4VGk3VUJDbW1SbU5TVnVTdnkzU01lUVltTDJscG5nSk80cG9kMlRNLWRrdi0ySW9MN1JvMFIzSE85TjVkdmh5OS10RTg2UmpmWmJkSDZCOUViOFVOR2ZNMWt2X1FYalAwbXctbEVYMWc2a2lSeTBjMmFuZHNmSXJwem5QdG9rVTN5WVA3dFc0QUNNSGJOeGg5c0R4YjRXUVVZZlhwdmsxVlhzZmJtVkphTElBcTY3RUtob3dud0lsaUxZdFNub0xnZTRkVlkzVTk2U3g5bmY0OW5Eekh3UXdUMFJKdkJ4VFdmR2xjOHNOR0tZLUh3WVJFZlEyY0VFcGhDWTRXZk5YdzFnckVfVjZyd1RGejRxSTlOel9YVlA3ZEpDNGpaNjBFZG1SQUdac1pXWUxKWnF3ai1QSVEycGg5ZkQxdU5Fb0FWZ3ZzbVZuVFR3U1NOMGh3SUc4MEY0cmhGaERoQ0pVTElxblM0VG9tQWt1VXpPdWtPU3pYS0xWTUVTLVVGVm02SzhyNTQyQ1JvbE9FUmVRQXF6VHJlU0FHUmo1U2VqdWZmSTJCMDE2NmZfWmhDdXVFZXVyQ25vS29kdTF4SnJJM1JsRmhONWdlNmVDa2xfQUg5ME5qM1U5a1pZbXpZa21yQWp1WlRMUGZPS3F0c0w1Y0hyM2ltOXBPSXdvandmR3czajVuRjdydDFkSDRCeFJJVTdPeEVHV1Nvb0dwT05YeW5NRUJ5SGM4Yk1sY0o2VXJ5S3RmS3hUcVBQdUIxQ1ZCdWouVGNIT3BfeldKYWJsaWltREdfVlVJYTVSbS10NFdyWDRlV0dQWHNjZ0FuV2xhT0JuRGVnLTNRcXE5MzUxMnJkZWRQZ0hvUXlqMC12c2VLa25rc2pTcUE=");
        urlencoded.append("_eventId", "submit");
        urlencoded.append("geolocation", "");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        console.log(requestOptions);
        const initialForm = await (await  fetch("https://sso.uc.cl/cas/login",
            requestOptions)).text();
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
                headers: {
                    'Access-Control-Allow-Origin': 'https://fcom-test.onrender.com',
                    'Access-Control-Allow-Methods': 'GET, POST',
                },
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
