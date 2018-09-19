<template>
    <div class="cmp-starting-modal">
        <div class="box">

        </div>
    </div>
</template>

<script>
  export default {
    name: 'starting-modal',
  };
</script>

<style lang="scss" scoped>
    div.cmp-starting-modal{
        position:fixed;
        left:0;
        top:0;
        right:0;
        width:100vw;
        height:100vh;
        z-index:1000;
        background: rgba(0,0,0,.35);
        display:flex;
        align-items:center;
        justify-content:center;

        div.box{
            width: 300px;
            background:#eee;
            height: calc(100% - 20px);
        }
    }
</style>