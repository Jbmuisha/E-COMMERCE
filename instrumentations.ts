import connection from "./app/lib/mongodb";

export async function register() {
    try {
        await connection();
        console.log("Instrumentation MongoDB initialisée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'initialisation MongoDB:", error);
        
    }
}