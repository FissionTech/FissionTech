<script lang="ts">
    import ProfessionalHeadshot from "./ProfessionalHeadshot_GreenBG.png";
    import Button from "$lib/Button.svelte";
</script>

<section>
    <img id="headshot" src={ProfessionalHeadshot} alt="Professional Headshot"/>

    <div id="bio-blurb">
        <h1>Hello! My name is Michael Lindsay.</h1>
        <p>I'm a back-end Software Engineer, although I have been known
            to dabble in the front-end from time to time (this site is an example).
        </p>
        <p>I work primarily on developing APIs, planning cloud and serverless applications,
            and automating business processes. Feel free to contact me
            about your next project, or scroll down to see my recent blog posts.
        </p>
    </div>

    <Button
        Url="#"
        Text="Learn More"
        Primary={false}/>

    <Button
        Url="#"
        Text="Contact"
        Primary={true}/>

    <!-- <a class="button" href="#">Contact</a> -->

</section>


<style>

    section {
        margin-top: .5em;
        margin-bottom:2.5em;

        display: grid;
        column-gap: 3em;
        grid-template-areas:
            'img text text'
            'img cta  cta';
        align-items: center;
    }

    img#headshot {
        max-width: 300px;
        max-height: 300px;
        border-radius: 50%;
        grid-area: img;
    }

    div#bio-blurb {
        grid-area: text;
    }

    div#bio-blurb h1, p {
        text-align: left;
    }

    div#bio-blurb h1 {
        font-weight: 800;
    }

    div#bio-blurb p {
        font-weight: 500;
        font-size: larger;
    }

    @media (max-width: 700px) {
        section {
            grid-template-areas:
                'img'
                'text';
            justify-items: center;
        }
    }

</style>