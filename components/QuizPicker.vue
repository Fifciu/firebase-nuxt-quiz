<template>
    <div class="cmp-quiz-picker" :class="{'doneYet': properAnswears}"
         @click="clickOnQuiz">
        <div>
            <img :src="icon" :alt="name"/>
            <div>
                <h2>{{name}}</h2>
                <h5 v-if="!properAnswears">Questions: {{questions_amount}}</h5>
            </div>
        </div>
        <template v-if="properAnswears">
            <h5 class="resultCenter">Answears: {{properAnswears}}/{{questions_amount}}</h5>
            <h5 class="resultLeftBottom">{{Math.round(properAnswears/questions_amount*10000)/100}}%</h5>

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

        &.doneYet{
            background: #008e00;
            .pixel-spinner{
                position:absolute;
                opacity:0;
                transform:scale(.7);
            }
        }

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

        img{
            max-width:30%;

        }
    }
    section.container.quiz-picker.finished{
        .cmp-quiz-picker{
            animation: background-anim 1s forwards;

            &.doneYet{
                overflow:hidden;
                position:relative;
                transition:1s;
               >div, div+h5, div+h5+h5{
                   transition:.5s;
               }
                &:before{
                    content:'Would you like to try again?';
                    width:100%;
                    height:100%;
                    background: #0F2027;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                    color:#eee;
                    position:absolute;
                    top:0;
                    left:0;
                    transform:translateX(100%);
                    transition:.7s;
                    display:flex;
                    align-items:center;
                    justify-content:center;

                    font-size:1.7em;
                }
                &:after{
                    content:'Yes!';
                    padding: 7px 30px;
                    background: #fff;
                    color:#111;
                    position:absolute;

                    bottom:25%;
                    border-radius:7px;
                    opacity:0;


                    transform:translateY(300%) scale(.7);
                    transition:.7s;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                &:hover{
                    >div{
                        transform:translateX(-100%);
                    }
                    div+h5, div+h5+h5{
                        transform:translateX(-1000%);
                    }
                    &:before{
                        transform: translateX(0%);
                        z-index:1;
                    }
                    &:after{
                        transform: translateY(0%) scale(1);
                        opacity:1;
                        z-index:2;
                    }
                    .pixel-spinner{
                        position:absolute;
                        transform:scale(1) translateY(-20%);
                        z-index:3;
                        opacity:.5;
                    }
                }
            }
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