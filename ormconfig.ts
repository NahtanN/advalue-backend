export default {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "migrations": [
        "dist/database/migrations/*.js"
    ],
    "cli": {
        "migrationsDir": [
            "src/database/migrations"
        ]        
    },
    "entities": [
        "dist/models/*.js"
    ]
}