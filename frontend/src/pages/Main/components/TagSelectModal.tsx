import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

const TagSelectModal = () => {
  const [block, setBlock] = useState<boolean>(false);
  const [tag, setTag] = useState<Array<number>>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);

  // const checkLimit = () => {
  //   let checkboxes = document.querySelectorAll(
  //     '.checkboxdiv input[type="checkbox"]'
  //   ); //select all checkboxes
  //   console.log(checkboxes);

  //   const checker = (elem: any) => {
  //     if (elem.checked) {
  //       setLimit(limit + 1);
  //     } else {
  //       setLimit(limit - 1);
  //     }
  //     checkboxes.forEach((item, idx) => {
  //       if (limit === 3) {
  //         if (!(item as HTMLInputElement).checked) {
  //           (item as HTMLInputElement).disabled = true;
  //         } else {
  //           if (!(item as HTMLInputElement).checked) {
  //             (item as HTMLInputElement).disabled = false;
  //           }
  //         }
  //       }
  //     });

  //     checkboxes.forEach((item, idx) => {
  //       (item as HTMLInputElement).onclick = function () {
  //         checker(this);
  //       };
  //     });
  //   };
  // };
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagId = e.target.value;
    // const newSelectedItem = [...selectedItem, tagId];
    // setSelectedItem(newSelectedItem);
    if (selectedItem.includes(tagId)) {
      const tmp = selectedItem.filter((el) => el !== tagId);
      setSelectedItem(tmp);
    } else {
      selectedItem.push(tagId);
      setSelectedItem([...selectedItem]);
    }
    // console.log(tag);
  };
  // useEffect(() => {
  //   checkLimit();
  // }, [tag]);

  const testArr: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
  return (
    <div>
      {testArr.map((item, idx) => (
        <label>
          <input
            type="checkbox"
            className="check"
            value={item}
            onChange={(e) => onChange(e)}
            disabled={
              selectedItem.length === 3
                ? selectedItem.includes(item)
                  ? false
                  : true
                : false
            }
          />
          {item}
        </label>
      ))}
      <p>{selectedItem}</p>
    </div>
  );
  //  {testArr.map((item:string, idx:number) => {
  //   return(
  //     <>
  //     <div>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="1"
  //         onChange={(e) => onChange(e)}
  //         disabled={selectedItem.length === 3 ? selectedItem.includes(item) ? false: true : false}
  //       />
  //       ㅎㅇㅎㅇ
  //     </div>
  //     </>
  //   )
  //  }

  // <div className="checkboxdiv">
  //   <form>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="1"
  //         onChange={(e) => onChange(e)}
  //       />{' '}
  //       인간
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="2"
  //         onChange={(e) => onChange(e)}
  //       />{' '}
  //       자연
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="3"
  //         onChange={(e) => onChange(e)}
  //       />{' '}
  //       생물
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="4"
  //         onChange={(e) => onChange(e)}
  //       />{' '}
  //       지식
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="5"
  //         onChange={(e) => onChange(e)}
  //       />{' '}
  //       산업
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="6"
  //         onChange={(e) => onChange(e)}
  //       />
  //       문명
  //     </label>
  //     <label>
  //       <input
  //         type="checkbox"
  //         className="check"
  //         value="7"
  //         onChange={(e) => onChange(e)}
  //       />
  //       문화예술
  //     </label>
  //     {block ? <button type="submit">제출</button> : null}
  //   </form>
  // </div>
};

export default TagSelectModal;
