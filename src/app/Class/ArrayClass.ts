
export class ArrayClass {

     
    //Merge the array of values as string by adding a space in between them.
    setMultivalues(arrObj){
     //     return arrObj.map(i => i.id).join(" ");
      return arrObj.join(" ");
      }
    
    

      //Merge array of values as string by adding a comma in between them.
      createArrayofIds(arrObj){
      //  return arrObj.map(i => i.id).join(",");
        return arrObj.join(",");
      }
    

      removeArrayValue(arr, value){
            var index = arr.indexOf(value);
            if(index > -1)
              arr.splice(index,1);
      return arr;
      }


}