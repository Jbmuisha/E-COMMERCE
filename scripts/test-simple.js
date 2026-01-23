
const fs = require('fs');
const mongoose = require('mongoose');


function loadEnv() {
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
               
                const match = trimmed.match(/^([^=:]+)[=:]\s*(.+)$/);
                if (match) {
                    const key = match[1].trim();
                    let value = match[2].trim();
                   
                    value = value.replace(/^["']|["']$/g, '');
                    env[key] = value;
                }
            }
        });
        return env;
    } catch (error) {
        console.error('Erreur lecture .env:', error.message);
        return {};
    }
}

const env = loadEnv();
process.env.MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI;
process.env.MONGODB_NAME = env.MONGODB_NAME || process.env.MONGODB_NAME;

async function test() {
    console.log('🔍 Test de connexion MongoDB...\n');
    
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_NAME;
    
    console.log(' Variables d\'environnement:');
    console.log('   MONGODB_URI:', uri ? ` (${uri.substring(0, 40)}...)` : ' Manquante');
    console.log('   MONGODB_NAME:', dbName ? `(${dbName})` : ' Manquante');
    console.log('');
    
    if (!uri || !dbName) {
        console.log(' Variables d\'environnement manquantes');
        process.exit(1);
    }
    
    try {
        console.log(' Tentative de connexion...');
        await mongoose.connect(uri, { dbName: dbName });
        console.log(' Connexion réussie!');
        console.log(' Informations:');
        console.log('   - Base de données:', mongoose.connection.db?.databaseName || 'N/A');
        console.log('   - Host:', mongoose.connection.host || 'N/A');
      
        if (mongoose.connection.db) {
            await mongoose.connection.db.admin().ping();
            console.log('   - Ping:  Réussi');
        }
        
        await mongoose.connection.close();
        console.log('\nTest réussi!');
        process.exit(0);
    } catch (error) {
        console.error('Erreur:', error.message);
        process.exit(1);
    }
}

test();
