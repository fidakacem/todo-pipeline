const db = require('../../src/persistence/sqlite');
const fs = require('fs');
const path = require('path');

const location = process.env.SQLITE_DB_LOCATION || 'C:/etc/todos/todo.db';

const ITEM = {
    id: '7aef3d7c-d301-4846-8358-2a91ec9d6be3',
    name: 'Test',
    completed: false,
};

async function deleteDbFile() {
    if (fs.existsSync(location)) {
        try {
            fs.unlinkSync(location);
        } catch (err) {
            if (err.code === 'EBUSY') {
                console.log('File locked, retrying delete...');
                await new Promise(res => setTimeout(res, 250));
                fs.unlinkSync(location);
            } else {
                throw err;
            }
        }
    }
}

beforeEach(async () => {
    // fermer la base pour Windows
    try { await db.close(); } catch (e) {}

    // supprimer l'ancienne DB
    await deleteDbFile();
});

afterEach(async () => {
    try { await db.close(); } catch (e) {}
});

test('it initializes correctly', async () => {
    await db.init();
});

test('it can store and retrieve items', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(ITEM);
});

test('it can update an existing item', async () => {
    await db.init();

    const initialItems = await db.getItems();
    expect(initialItems.length).toBe(0);

    await db.storeItem(ITEM);

    await db.updateItem(
        ITEM.id,
        Object.assign({}, ITEM, { completed: !ITEM.completed }),
    );

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0].completed).toBe(!ITEM.completed);
});

test('it can remove an existing item', async () => {
    await db.init();
    await db.storeItem(ITEM);
    await db.removeItem(ITEM.id);

    const items = await db.getItems();
    expect(items.length).toBe(0);
});

test('it can get a single item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const item = await db.getItem(ITEM.id);
    expect(item).toEqual(ITEM);
});