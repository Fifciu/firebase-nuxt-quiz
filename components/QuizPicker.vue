<template>
    <div class="cmp-quiz-picker" :class="{'doneYet': properAnswears !== null, 'badResult': percent < 30.0}"
         @click="clickOnQuiz">
        <div>
            <img :src="icon" :alt="name"/>
            <div>
                <h2>{{name}}</h2>
                <h5 v-if="!properAnswears">Questions: {{questions_amount}}</h5>
            </div>
        </div>
        <template v-if="properAnswears !== null">
            <h5 class="resultCenter">Answears: {{properAnswears}}/{{questions_amount}}</h5>
            <h5 class="resultLeftBottom">{{percent}}%</h5>
        </template>
    </div>
</template>

<script>

  export default {
    props:{
      name:{
        type: String,
        required: true
      },
      questions_amount:{
        type: Number,
        required: true
      },
      icon:{
        type: String,
        required: true
      },
      properAnswears: Number
    },
    methods:{
      clickOnQuiz(){
        if(this.properAnswears){
            alert("Currently disabled");
        }else{
          this.$emit('pick', this.name);
            // this.$store.commit('quizes/setCurrentQuiz', this.name);
            // localStorage.setItem('fuxt-current-quiz', this.name);
        }
      }
    },
    computed:{
      percent(){
        return Math.round(this.properAnswears/this.questions_amount*10000)/100;
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import '~/assets/global.scss';

    .cmp-quiz-picker{
        width:80%;

        margin:0px auto 30px;
        position: relative;
        display: flex;
        align-items: flex-start;
        padding: 20px 0;
        justify-content:center;
        z-index:10;
        flex-wrap:wrap;
        opacity:0;


        -webkit-box-shadow: 0px 0px 35px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 35px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 35px -5px rgba(0,0,0,0.75);

        transition: .8s;

        &:first-of-type{
            margin-top: 15px;
        }

        .resultLeftBottom{
            letter-spacing:1px;
            font-size:1.05em;
            position:absolute;
            left:10px;
            bottom:10px;
            margin:0;
            opacity:.6;
        }

        .resultCenter{
            margin:0;
        }

        @include for-size(small-tablets){
            width:70%;
            margin: 10px auto 40px;
            &:first-of-type{
                margin-top: 35px;
            }
        }

        @include for-size(tablets){
            &:first-of-type{
                margin-top: 20px;
            }
            width:42.5%;
            margin: 20px auto 40px;
            padding: 40px 0;
        }

        @include for-size(laptops){
            width:28%;
        }

        @include for-size(large-desktop){
            width:22%;
            &:first-of-type{
                margin-top: 20px;
            }
            margin:0;
            margin-right:20px;
            margin-top:20px;
        }

        > div{
            width:100%;
            text-align:center;
            > div{
                h2,h5{
                    width:100%;
                    margin:0;
                    text-align:center;
                    color: #fff;
                }
                h2{
                    font-size: 1.8em;
                }
                h5{
                    margin-top:2px;
                    opacity:.75;
                    letter-spacing: 5px;
                }
            }
        }


        img{
            max-width:30%;

        }

        &:hover{
            background:#fff;
            cursor: pointer;
            >div{
                >div{
                    h2, h5{
                        color: #111;
                    }
                }
            }
        }
        animation: background-anim 1s forwards;

        &.doneYet{
            background: #008e00;
            color:#fff;
            overflow:hidden;
            position:relative;
            cursor: not-allowed;
            transition:.7s;
            &:hover{
                border-bottom-right-radius:20%;
                opacity:.5;
            }
        }
        &.badResult{
            background: #ac0000;
        }
    }

    @keyframes background-anim{
        0%{
            opacity:0;
            border-radius:50%;
            transform:scale(0) translateX(-200%);
        }
        25%{
            border-radius:30%;
            transform: scale(.3) rotateX(30deg) translateX(-0%);
            opacity: .5;
        }
        65%{
            border-radius:10%;
            transform: scale(.1) rotateX(360deg);
            background:transparent;
            opacity:.2;
        }
        100%{
            border-radius:0%;
            transform: scale(1) rotateX(360deg);
            opacity:1;
        }
    }
</style>