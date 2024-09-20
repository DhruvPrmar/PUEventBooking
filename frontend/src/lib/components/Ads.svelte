<script>
    import "../../scss/ads.css";
    import bnr3 from "../img/bnr3.jpg";

    import { onMount } from "svelte";
    let slideIndex = 1;

    // @ts-ignore
    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    // @ts-ignore
    function currentSlide(n) {
        showSlides((slideIndex = n));
    }

    // @ts-ignore
    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
            // @ts-ignore
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        // @ts-ignore
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
    function increment() {
        let i = 0;
        i++;
        return i;
    }

    // Initialize slides
    // @ts-ignore
    onMount(() => {
        showSlides(slideIndex);
    });
    // showSlides(slideIndex);
</script>

<div class="slideshow-container">
    <!-- {#each banners as banner (banner.id)} -->
    <div class="mySlides fade">
        <a href="#">
            <div class="numbertext">1 / 3</div>
            <img src={bnr3} alt="Slide 1" style="width:100%" />
            <div class="text">Caption Text</div>
        </a>
    </div>
    <!-- {/each} -->

    <a class="prev" on:click={() => plusSlides(-1)}>&#10094;</a>
    <a class="next" on:click={() => plusSlides(1)}>&#10095;</a>

    <div style="text-align:center">
        <!-- {#each banners as banner (banner.id)} -->
        
        <span class="dot" on:click={() => currentSlide(increment())}></span>
        <!-- {/each} -->
    </div>
</div>

<!-- let banners =[
         {
             id: 1,

         }
     ] -->
<!-- <div class="ads-container">
    <div class="banners-slider">
         {#each banners as banner (banner.id)} 
        <a href="/">
            <div class="banner-container"></div>
        </a>
         {/each}
    </div>
</div> -->
