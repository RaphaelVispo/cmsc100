import { readFileSync, writeFileSync } from 'fs';

const dbFile = 'db.json';

export async function getTodos () {
  const dbtext = readFileSync(dbFile, 'utf8');
  return JSON.parse(dbtext);
}

export async function saveTodos (db) {
  const dbtext = JSON.stringify(db, null, 2);
  writeFileSync(dbFile, dbtext, 'utf8');
}
