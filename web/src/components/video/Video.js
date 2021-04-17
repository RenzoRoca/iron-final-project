import introVideo from '../../video/Homepage_BG_video_8.webm';

function Video() {
    return (
        <video autoPlay muted loop id="introVideo" >
            <source src={introVideo} type="video/webm" />
        </video>
    )    
    
}

export default Video;