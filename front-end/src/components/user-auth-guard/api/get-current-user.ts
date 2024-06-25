export const getCurrentUser = async () => {
    const response = await fetch("http://localhost:8080/current-user", {
        method: "GET",
        headers: {
            auhorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    if (!response.ok) throw new Error("UNAUTHORIZED");
    return await response.json()

}