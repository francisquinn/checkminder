let db, tx, store, index;
const request = window.indexedDB.open('checklists', 1);

request.onupgradeneeded = () => {
    db = request.result;
    store = db.createObjectStore('checklistStore', {keyPath: 'id'});
    index = store.createIndex('name', 'name', { unique: false })
};

// check for error
request.onerror = (e) => {
   console.error(e);
}

request.onsuccess = (e) => {
    db = request.result;
    tx = db.transaction('checklistStore', 'readwrite');
    store = tx.objectStore('checklistStore');
    index = store.index('name');

    db.onerror = (e) => {
        console.error(e);
    }

    store.put({
        id: 1,
        name: 'test list'
    });

    tx.oncomplete = () => {
        db.close();
    }
}

