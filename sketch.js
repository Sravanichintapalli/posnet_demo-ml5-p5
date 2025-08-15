let capture;
let poseNet;
let noseX,noseY;
let singlePose,skeleton;
let reyeX,reyeY;
let leyeX,leyeY;
let actor_img;

function setup() {
    createCanvas(640,480);
    capture = createCapture(VIDEO);
    capture.hide();
    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose',receivedPoses);
    actor_img=loadImage('images/sharukh.png');
}
function receivedPoses(poses){
    console.log('poses');
    if(poses.length > 0){
        singlePose=poses[0].pose;
        keypoints=poses[0].pose;
        skeleton=poses[0].skeleton;
        noseX=singlePose.nose.x;
        noseY=singlePose.nose.y;
        reyeX=singlePose.rightEye.x;
        reyeY=singlePose.rightEye.y;
        leyeX=singlePose.leftEye.x;
        leyeY=singlePose.leftEye.y;
    }
    console.log(noseX+" "+noseY);
}

function modelLoaded() {
   console.log("model is loaded");
}


function draw() {
    image(capture, 0, 0,640,480);
    fill(255,0,0);

    if(singlePose){
    for(let i=0;i<singlePose.keypoints.length;i++){
        ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20);
    }
    stroke(255,255,255);
    strokeWeight(5);
    for(let j=0;j<skeleton.length;j++){
        line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
    }
}
  image(actor_img,singlePose.nose.x-45,singlePose.nose.y-60,100,100);
    
}
