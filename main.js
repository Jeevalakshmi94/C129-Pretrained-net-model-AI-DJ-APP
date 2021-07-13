song=" ";
function preload(){
    song=loadSound("music.mp3");
}
scoreRightWrist=0;
scoreLeftWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center()
    video=createCapture(VIDEO)
video.hide()
posenet=ml5.poseNet(video,modelLoaded)
posenet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("posenet is initialized")
}

function gotPoses(gotResults){
    if(results.length>0)
    {
       scoreRightWrist=results[0].pose.keypoints[10].score;
       scoreLeftWrist=results[0].pose.keypoints[9].score;   
       console.log("scoreRight="+scoreRightWrist,"scoreLeftWrist"+scoreLeftWrist ) 
       rightWristX=results[0].pose.rightWrist.x
       rightWristY=results[0].pose.rightWrist.y
       console.log("rightwristX="+rightWristX,"rightwristY="+rightWristY)
       leftWristX=results[0].pose.leftWrist.x
       leftWristY=results[0].pose.leftWrist.y
       console.log("leftwristX="+leftWristX,"leftwristY="+leftWristY)
    }
}
function draw(){
    image(video,0,0,600,500);
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0&&rightWristY<100){
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        if(rightWristY>100&&rightWristY<200){
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }
        if(rightWristY>200&&rightWristY<300){
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        if(rightWristY>300&&rightWristY<400){
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }
        if(rightWristY>400&&rightWristY<500){
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }

    } 
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftwristY=Number(leftWristY);
        new_leftwristy=floor(InNumberleftwristY*2);
        leftWristY_divide_1000=new_leftwristy/1000;
    document.getElementById("volume").innerHTML="volume="+leftWristY_divide_1000;
    song.setVolume(leftWristY_divide_1000)
    }
    
}
function play(){
    song.play();
    song.setVolume(1);
song.rate(1)    
}