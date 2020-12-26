export const UserModule = {
    namespaces: true, 

    state: {
        user: null
    },
        //functions are functions that effect the STATE
        mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },
        //Actions are functions that you call throughout your application that call mutation
        actions: {
        setUser({commit}, user ){
            commit('SET_USER', user);
        }
    }   
}