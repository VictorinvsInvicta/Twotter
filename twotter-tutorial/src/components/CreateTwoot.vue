<template>
    <form class="user-profile-create-twoot" @submit.prevent="createNewTwoot()" :class="{'char-exceeded':newTwootCharCount >180}">
        <label for="newTwoot"><strong>New Twoot</strong>  {{newTwootCharCount}}/180</label>
        <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"/>

        <div class="user-profile-create-twoot-type">
            <label for="newTwootType"><strong>Type: </strong></label>
            <select id="NewTwootType" v-model="state.selectedTwootType">
                <option :value="option.value" v-for="(option, index) in state.TwootTypes" :key="index">
                    {{option.name}}
                </option>    
            </select>
        </div>
        <button>
            Twoot!
        </button>
    </form>
</template>

<script>
import { reactive, computed } from 'vue';
export default {
    name: 'CreateTwoot',
    setup(props, ctx){
        const state = reactive ({
            newTwootContent: '',
            selectedTwootType:'instant',
            TwootTypes:[
                {value: 'draft', name: 'Draft'},
                {value:'instant', name: 'Instant Twoot'}
            ],
        })

        const newTwootCharCount = computed (() => state.newTwootContent.length)

        function createNewTwoot(){
            if(state.newTwootContent && state.selectedTwootType !=='draft')
                ctx.emit('addtwoot', state.newTwootContent);
                state.newTwootContent = '';
        }

        return {
            state,
            newTwootCharCount,
            createNewTwoot
        }
    }
};
</script>

<style lang="scss" scoped>
.user-profile-create-twoot {
    border-top: 1px solid #dfe3e8;
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    &.char-exceeded{
        color: red;
       border-color: red;

       button {
           background-color: red;
           border: none;
       } 
    }
}
</style>