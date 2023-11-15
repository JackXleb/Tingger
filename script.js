
let deviceType = getDeviceType();  
let currBgIndex = 0;
const logBlock = document.querySelector('.photo-block');
let x1 = null;
let y1 = null;
let x2 = null;

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
   
    if (isMobile) {
      return "mobile";
    } else {
      return "desktop";
    }
}
 
function setBackgroundPic(sideSwipe){
    let arr = ["1.jpg","2.jpg","3.jpg","4.jpg"];
    let bg = document.querySelector('.photo-block');
    if (sideSwipe == 'right') {
        currBgIndex = currBgIndex === arr.length-1 ? 0: currBgIndex+1;
    }
    else currBgIndex = currBgIndex === 0 ? 3: currBgIndex-1;
    
    bg.style.backgroundImage = `url(vendor/${arr[currBgIndex]})` 
}

function moveBackgroundPic(xDiff){
    if (Math.abs(xDiff) >= 250) xDiff = 250 * (xDiff / Math.abs(xDiff));
    logBlock.style.transform =  `translate(${xDiff}px)`;
}
   
if (deviceType == "desktop"){
    document.addEventListener('mousedown', handleTouchStart, false);
    document.addEventListener('mouseup', handleTouchEnd, false);
}
else{
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}


function handleTouchMove(event){
    if (deviceType == "desktop"){
        x2 = event.clientX;
    }
    else  x2 = event.changedTouches[0].clientX;
    console.log(deviceType)
    
    console.log(x2);
    let xDiff = x2-x1;
    moveBackgroundPic(xDiff);
}

function handleTouchStart(event){  
    
    
    if (deviceType == "desktop"){
        x1 = event.clientX;
        document.addEventListener('mousemove', handleTouchMove, false);
    }
    else{
        const firstTouch = event.touches[0];
        x1 = firstTouch.clientX;
    }
}

function handleTouchEnd(event){

    let sideSwipe = null;
    if (deviceType == "desktop"){
        x2 = event.clientX;
        document.removeEventListener('mousemove', handleTouchMove, false);
    }
    else x2 = event.changedTouches[0].clientX;
        
    // console.log(x2,y2);

    let xDiff = x2-x1;
    let yDiff = 0;
    logBlock.style.transform =  `translate(0px)`;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) sideSwipe = 'right';

        else sideSwipe = 'right'
    }
    if (Math.abs(xDiff) > 250){
        setBackgroundPic(sideSwipe);
    }

    x1 = null;
    y1 = null;
}
