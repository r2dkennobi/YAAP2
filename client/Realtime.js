import socketClient from 'socket.io-client';

export function setupRealtime(store, action) {
    const io = socketClient();

    io.on('receipt-change', (change) => {
        let state = store.getState();
        if (!change.old_val) {
            if (change.new_val.userId !== state.userId) {
                store.dispatch(actions.addReceiptSuccess(change.new_val));
            }
        }
    });

    return io;
}
