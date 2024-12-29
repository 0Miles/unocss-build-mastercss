<template>
    <div class="fg:green
                ~color|.25s|ease,background|.25s|ease
                bg:lime-30:hover
                fg:lime-80:active
                fg:pink-40!:hover
                {fg:red;b:1|solid|red;f:24}:hover">
        can be correctly parsed
    </div>

    <div class="content:'hello-world'::after">
        ::after
    </div>

    <div class="f:64!">
        unable to be parsed correctly, likely due to ending with the ! symbol
    </div>
</template>