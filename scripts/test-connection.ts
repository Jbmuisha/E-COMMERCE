
import { testConnection } from '../app/lib/mongodb';
import mongoose from 'mongoose';

async function main() {
    console.log('🔍 Test de connexion au backend MongoDB...\n');

    console.log('Vérification des variables d\'environnement:');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Définie' : ' Manquante');
    console.log('MONGODB_NAME:', process.env.MONGODB_NAME ? ` Définie (${process.env.MONGODB_NAME})` : 'Manquante');
    console.log('');
    
    try {
        const isConnected = await testConnection();
        
        if (isConnected) {
            console.log(' Connexion réussie!');
            console.log(' État de la connexion:');
            console.log('   - État:', mongoose.connection.readyState === 1 ? 'Connecté' : 'Non connecté');
            console.log('   - Base de données:', mongoose.connection.db?.databaseName || 'N/A');
            console.log('   - Host:', mongoose.connection.host || 'N/A');
            console.log('   - Port:', mongoose.connection.port || 'N/A');
            
           
            try {
                if (mongoose.connection.db) {
                    await mongoose.connection.db.admin().ping();
                    console.log('   - Ping:', 'Réussi');
                } else {
                    console.log('   - Ping:', 'Base de données non disponible');
                }
            } catch (pingError) {
                console.log('   - Ping:', ' Échoué');
            }
            
            process.exit(0);
        } else {
            console.log('Échec de la connexion');
            process.exit(1);
        }
    } catch (error) {
        console.error('Erreur lors du test:', error);
        process.exit(1);
    } finally {
        
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('\n🔌 Connexion fermée');
        }
    }
}

main();

