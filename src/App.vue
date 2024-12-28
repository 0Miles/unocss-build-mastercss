<template>
    <div class="fg:green
                ~color|.25s|ease,background|.25s|ease
                bg:lime-30:hover
                fg:lime-80:active
                fg:pink-40!:hover">
        can be correctly parsed
    </div>

    <div class="content:'hello-world'::after">
        unable to be parsed correctly, likely due to the presence of the ' symbol
    </div>

    <div class="fg:red!">
        unable to be parsed correctly, likely due to ending with the ! symbol
    </div>

    <div class="{fg:red;b:1|solid|red}:hover">
        unable to be parsed correctly, likely due to containing the symbols {, }, or ;
    </div>
</template>