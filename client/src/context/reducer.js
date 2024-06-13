export const actionType = {
    SET_USER: "SET_USER",
    SET_ARTISTS: "SET_ARTISTS",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_ARTISTS:
            return {
                ...state,
                artists: action.artists,
            };
        case actionType.SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers,
            };

        case actionType.SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.allSongs,
            };

        case actionType.SET_ALL_ALBUMNS:
            return {
                ...state,
                allAlbums: action.allAlbums,
            };

        default:
            return state;
    }
};

export default reducer