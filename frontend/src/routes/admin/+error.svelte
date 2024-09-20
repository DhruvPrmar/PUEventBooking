<script>
    import "../../scss/error.css";
    import "../../scss/home.css";
    import roboImg from "$lib/img/error-robo.png";
    // @ts-ignore
    export function load ({error}) {
        return {
            props: {message: error.message}
        };
    }
    
    export let message
</script>

<div class="error-container">
    <div class="error-content">
        <!-- <h1 class="error-title">Wow! this is unexpected</h1> -->
    <h1 class="error-title">Error <b>{message}</b></h1>
    <div class="image"><img src={roboImg} alt="errorImage"></div>
    <h2 class="error-msg2">You're lost in the <b>campus!</b></h2>
    <a href="/" class="link">Back to Home</a>
    </div>
</div>