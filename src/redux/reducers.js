export default function reducers(state, action) {
    if(action.type === 'add'){

    }
    console.log('reducers file');
    console.log(state, action);
    if(action.user)
        state.users.push(action.user);
    return {
        users: state.users
    }
}