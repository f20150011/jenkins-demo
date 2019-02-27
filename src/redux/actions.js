export function saveAction(data) {
    console.log("actions file");
    return {
        type: 'add',
        user: data
    }
}