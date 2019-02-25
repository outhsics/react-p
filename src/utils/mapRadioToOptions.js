// [1,3] 
export default function mapRadioToOptions(radioValueList,currentTopic,arg3) {
    // return val * 1 < 10 ? `0${val}` : val;
    if(arg3 === true) {
      currentTopic = currentTopic.subTopics;
      // debugger
    }
    for (let subKey in currentTopic) {
      for (let radioKey in radioValueList) {
        if(subKey === radioKey ){
          for (let kkkk in currentTopic[subKey].options) {
            // if (paperDetail[k].options[kkkk].tp)
            // console.log(kkkk,'kkkk');

            (currentTopic[subKey].options[kkkk].isCorrect) && (currentTopic[subKey].options[kkkk].isCorrect = 0)

            if(radioValueList[radioKey] === Number(kkkk)+1) {
              // debugger
                  currentTopic[subKey].options[kkkk].isCorrect =1;
                } 

            }


        }
      }

    }
    return currentTopic;

  }

  // const currentItem = mapRadioToOptions(copyData,examTmp,true);
  