async function fetchService(endpoint, method = "GET", data = null) {
    try {
        const url = `${document.querySelector("#base-url").value}/${
            document.querySelector("#api-version").value
        }${endpoint}`;

        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: { ["Content-Type"]: "application/json" },
            credentials: "include"
        });

        const result = {
            status: response.status,
            data: !response.headers.get("Content-Type")?.includes("json")
                ? !response.headers.get("Content-Type")?.includes("text")
                    ? null
                    : await response.text()
                : await response.json()
        };

        if (result.status >= 400) {
            throw { response: result };
        }

        return result;
    } catch (error) {
        console.error(error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || error.message || error
        };
    }
}
