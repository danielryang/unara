class APIService {

    static async createAccount(username) {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/task/add-user?name=${username}&email="testemail@test.com"`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.text();  // Use .text() to get the plain ID

            return { id: parseInt(data) };  // Return the ID as part of an object
        } catch (error) {
            console.error("Error in APIService.createAccount:", error);
            throw error;
        }
    }


    static async loadTasks(userId, setTasks) {
        fetch(`${import.meta.env.VITE_URL}/task/get?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(response => {
                if (!response.ok) {
                    // If the response is not ok, reject the promise
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON data if response is OK
            })
            .then(data => setTasks(data))
            .catch(error => console.error("Error:", error));

    }

    static async addTask(userId, newTask, tasks, setTasks) {
        fetch(`${import.meta.env.VITE_URL}/task/add?userId=${userId}&title=${newTask.title}&description=${newTask.description}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, ...newTask }),
        })  .then((response) => (response.json()))
            .then((data) => setTasks([...tasks, { id: data.id, ...newTask }]))
    }

    static async editTask(taskId, changeParam, newChange) {
        fetch(`${import.meta.env.VITE_URL}/task/edit/${taskId}?whatToEdit=${changeParam}&newChange=${newChange}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        })
            // .then((response) => response.json())
            // .then((data) => {
            //     setTasks(data);
            // });
    }

    static async deleteTask(taskId, setTasks, tasks) {
        fetch(`${import.meta.env.VITE_URL}/task/delete/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Access-Control-Allow-Origin': `${import.meta.env.VITE_ORIGIN}`
            },
            credentials: 'include'
        })
            .then(setTasks(tasks.filter(task => task.id !== taskId)));
    }
}

export default APIService
