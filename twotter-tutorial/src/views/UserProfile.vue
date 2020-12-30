<template>
    <div class="user-profile">
        <div class="user-profile-user-panel">
            <h1 class="user-profile-username">@{{state.user.username}}</h1>
            <div class="user-profile-admin-badge" v-if="state.user.isAdmin">Admin</div>
            <h2>{{ userId }}</h2>
            <div class="user-profile-follower-count">
                <strong>Followers:</strong>{{state.followers}}
            </div>
            <CreateTwoot @addtwoot="newTwoot" />
        </div>
        <div class="user-profile-twoots-wrapper">
            <TwootItem 
            v-for="twoot in state.user.twoots" 
            :key="twoot.id" 
            :username="state.user.username" 
            :twoot="twoot"/>
        </div>
    </div>
</template>

<script>
import {reactive, computed} from 'vue';
import { useRoute } from 'vue-router';
import { users } from "../assets/users"; 
import TwootItem from "../components/TwootItem";
import CreateTwoot from "../components/CreateTwoot";

export default {
    name: "UserProfile",
    components: { TwootItem, CreateTwoot },
    setup() {
        const route = useRoute();
        const userId = computed(() => route.params.userId)

        const state = reactive ({
        followers: 0, 
        user: users[userId.value - 1] || users[2]
    })
    
    function newTwoot(newTwootContent)
    {
        state.user.twoots.unshift( {
            id: state.user.twoots.length + 1,
            content: newTwootContent
        });
    }

    return {
        state,
        newTwoot,
        userId
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;

        .user-profile-user-panel {
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #dfe3e8;

        h1 {
        margin: 0;
        }

            .user-profile-admin-badge {
            background: purple;
            color:white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            font-weight: bold;
        }

            .user-profile-twoot-wrapper {
            display: grid;
            grid-gap: 10px;
        }
    }
}
</style>