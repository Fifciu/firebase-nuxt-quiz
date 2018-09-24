<template>
    <div class="answer" @click="$emit('choose', answerNumber)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 193">
            <path d="M1175 131.2c0 0-81-89.4-224.3-103.4S713 72 665 97c-86 46-148 63-271 7C221.7 25.5 56 104.5-4 197.4 -4 58.7-3.3 0.3-3.3 0.3L1175 0V131.2z"></path>
        </svg>
        <span>{{answerText}}</span>
    </div>
</template>

<script>
  export default {
    name: 'Answer',
    props:{
      answerText:{
        type: String,
        required: true
      },
      answerNumber:{
        type: Number,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
    .answer{
        color:#eee;
        font-size: 1.6em;
        padding: 15px 15px;
        border: 2px solid rgba(255,255,255,.6);
        border-radius: 20px;
        margin-bottom: 10px;
        position: relative;
        overflow:hidden;
        cursor:pointer;

        svg{
            position:absolute;
            top:0px;
            left:0px;
            width:100%;
            z-index:1;
            transform:translateY(-100%);
            opacity:0;
            transition: transform .35s, opacity 1s, width 2s;
            fill: #fff;
        }

        span{
            position:relative;
            z-index:2;
            transition:.4s;
        }

        &:hover{
            span{
                color:#111;
            }
            svg{
                transform:translateY(0%);
                width:400%;
                opacity:.8;
            }
        }
    }
</style>