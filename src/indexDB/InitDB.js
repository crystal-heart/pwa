import Dexie from 'dexie';

const db = new Dexie('laravel-api');
db.version(1).stores({
    notes: `++id,title,content,created_at,updated_at`
});

export default db;