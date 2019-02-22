// [1,3] 
export default function mapRadioToOptions(radioValueList,currentTopic) {
    // return val * 1 < 10 ? `0${val}` : val;
    for (let subKey in currentTopic.subTopics) {
      for (let radioKey in radioValueList) {
        if(subKey === radioKey ){
          for (let kkkk in currentTopic.subTopics[subKey].options) {
            // if (paperDetail[k].subTopics.options[kkkk].tp)
            console.log(kkkk,'kkkk');
            // debugger
            (currentTopic.subTopics[subKey].options[kkkk].isCorrect) && (currentTopic.subTopics[subKey].options[kkkk].isCorrect = 0)

            if(radioValueList[radioKey] === Number(kkkk)+1) {
              // debugger
                  currentTopic.subTopics[subKey].options[kkkk].isCorrect =1;
                } 

            }


        }
      }

    }
    return currentTopic;

  }
  