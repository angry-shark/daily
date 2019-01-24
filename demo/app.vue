<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                :class="{on: type === 'recommend'}">每日推荐</div>
            <div class="daily-menu-item"
                :class="{on: type === 'daily'}"
                @click="showThemes =!showThemes">主题日报</div>
            <ul v-show="showThemes">
                <li v-for="(item, index) in themes" :key="index">
                    <a :class="{on: item.id === themeId && type === 'daily'}"
                        @click="handleToTheme(item.id)">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list">
            <Item></Item>
        </div>
        <daily-arcticle></daily-arcticle>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';
    import $ from './libs/utils.js';

    export default {
        data(){
            return{
                themes:[],
                showThemes:false,
                type:'recommend',
                list:[],
                themeId:0
            }
        },
        methods: {
            getThemes(){
                //axios send the request
                $.ajax.get('themes').then(res =>{
                    this.themes = res.others;
                })
            },
            handleToTheme(id){
                //change the class of menu
                this.type = 'daily';
                //set current click subclass theme's id
                this.themeId = id;
                //clear the data of the middle column
                this.list = [];
                $.ajax.get('theme/' + id).then(res => {
                    //filter the text whose class is one
                    this.list = res.stories.filter(item => item.class != 1);
                })
            }
        },
        mounted() {
            //when init use
            this.getThemes();
        },
    }
</script>