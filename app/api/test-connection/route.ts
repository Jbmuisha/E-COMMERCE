import { NextResponse } from 'next/server';
import { testConnection } from '../../lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const isConnected = await testConnection();
        
        if (isConnected) {
            const connectionInfo: {
                status: string;
                connected: boolean;
                database: string;
                host: string;
                port: string | number;
                readyState: number;
                readyStateText: string;
                ping: string;
            } = {
                status: 'success',
                connected: true,
                database: mongoose.connection.db?.databaseName || 'N/A',
                host: mongoose.connection.host || 'N/A',
                port: mongoose.connection.port || 'N/A',
                readyState: mongoose.connection.readyState,
                readyStateText: getReadyStateText(mongoose.connection.readyState),
                ping: 'pending'
            };
            
            // Test ping
            try {
                if (mongoose.connection.db) {
                    await mongoose.connection.db.admin().ping();
                    connectionInfo.ping = 'success';
                } else {
                    connectionInfo.ping = 'database_not_available';
                }
            } catch (pingError) {
                connectionInfo.ping = 'failed';
            }
            
            return NextResponse.json({
                message: '✅ Connexion MongoDB réussie',
                ...connectionInfo
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: '❌ Échec de la connexion MongoDB',
                connected: false
            }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({
            message: '❌ Erreur lors du test de connexion',
            error: error.message || 'Erreur inconnue',
            connected: false
        }, { status: 500 });
    }
}

function getReadyStateText(state: number): string {
    const states: { [key: number]: string } = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    return states[state] || 'unknown';
}

