<template>
    <div class="frame__finish" v-bind="$attrs">
        <div>
            <img class="finish__icon" :src="icon" :alt="name"/>
            <h1 class="finish__header">{{name}}</h1>
            <h3 class="finish__subheader">{{subheader}}</h3>
            <div class="finish__table">
                <div class="table__question" v-for="i in results" :key="i.question"
                     :class="{'answer--proper': i.isProper, 'answer--bad': !i.isProper}">
                        <span class="question" key="1">
                            <b>Q:</b> {{i.question}}
                        </span>
                    <span class="answer" key="2">
                            <b>A: </b>{{i.answer}}
                        </span>
                </div>
                <div class="table__points">{{percent}}% of good answers</div>
            </div>
            <button class="table__btn" @click="backToQuizes">Back to quizes</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Finisher',
    props: {
      name: String,
      icon: String,
      subheader:{
        type: String,
         default: "Gratulations! You have finished quiz. Check your results in table below..."
      },
      results: Array,
      percent: Number
    },
    methods:{
      backToQuizes(){
        this.$router.push({path:'/pick-quiz'});
      }
    }
  };
</script>

<style lang="scss">

    @import "~assets/global.scss";

    .frame__finish {
        margin-top: 20px;
        text-align: center;
        transition: opacity .55s, transform 1s;
        display:flex;
        align-items:center;justify-content:center;
        flex-wrap:wrap;
        width:100%;

        >div{
            padding: 30px 0;
        }

        @include for-size(tablets){
            margin-top:0;
            min-height:100vh;
        }

        &.out {
            transform: scale(0.2) translateY(-45%);
            opacity: 0;
        }

        .finish__icon{
            max-width:200px;
        }
        .finish__header, .finish__subheader {
            margin: 0;
        }
        .finish__header {
            font-size: 2em;
        }
        .finish__subheader {
            font-size: .89em;
            padding: 5px 20px 0px;
        }
        .finish__table {
            margin-top: 15px;
            .table__question {
                -webkit-box-shadow: -1px 10px 50px -10px rgba(0, 0, 0, 0.43);
                -moz-box-shadow: -1px 10px 50px -10px rgba(0, 0, 0, 0.43);
                box-shadow: -1px 10px 50px -10px rgba(0, 0, 0, 0.43);
                margin-bottom: 10px;
                padding: 6px 2px;
                background: rgb(255, 255, 255);
                background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15309873949579833) 50%, rgba(255, 255, 255, 0) 100%);

                &.answer--proper {
                    background: rgb(0, 255, 0);
                    background: linear-gradient(90deg, rgba(0, 255, 0, .3) 0%, rgba(0, 255, 0, 0.45309873949579833) 50%, rgba(0, 255, 0, .3) 100%);
                }

                &.answer--bad {
                    background: rgb(255, 0, 0);
                    background: linear-gradient(90deg, rgba(255, 0, 0, .3) 0%, rgba(255, 0, 0, 0.45309873949579833) 50%, rgba(255, 0, 0, .3) 100%);
                }

                span {
                    display: block;
                    &.question {
                        font-size: .92em;
                    }
                    &.answer {
                        font-weight: bold;
                    }
                }
            }

            .table__points {
                color: #fff;
                font-size: 1.35em;
                padding: 15px 0;
                margin-bottom: 5px;
                font-weight: bold;
            }
        }
        .table__btn{
            -webkit-box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            -moz-box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            background: transparent;
            color:#fff;
            border:0;
            padding: 10px 30px;
            font-size:1.24em;
            margin-top:13px;
            cursor: pointer;
            position:relative;
            overflow:hidden;
            transition: background 2s, border-radius .7s;

            &:before{
                content:'';
                position:absolute;
                height:100%;
                width:100%;
                z-index:0;
                background: rgba(255,255,255,.7);
                bottom:0;
                left:0;
                transform: skew(40deg) translateX(-120%);
                transition:.6s;
            }
            &:hover{
                background: rgba(0,0,0,.5);
                border-radius:20px;
                &:before{
                    transform: skew(60deg) translateX(150%);
                }
            }
        }
        .table__btn{
            margin-top: -5px;
            margin-bottom: 20px;
        }
    }
</style>