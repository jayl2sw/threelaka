import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
const TagSelectModal = () => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<Array<number>>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagId = Number(e.target.value);
    if (selectedItem.includes(tagId)) {
      const tmp = selectedItem.filter((el) => el !== tagId);
      setSelectedItem(tmp);
    } else {
      selectedItem.push(tagId);
      setSelectedItem([...selectedItem]);
    }
  };

  // useEffect(() => {
  //   checkLimit();
  // }, [tag]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(dashboardActions.updateTag(selectedItem));
  };
  const tags: string[] = ['인간', '자연', '생물', '지식', '산업', '문명'];
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {tags.map((item, idx) => (
          <label>
            <input
              type="checkbox"
              className="check"
              value={idx + 1}
              onChange={(e) => onChange(e)}
              disabled={
                selectedItem.length === 3
                  ? selectedItem.includes(idx + 1)
                    ? false
                    : true
                  : false
              }
            />
            {item}
          </label>
        ))}
        {selectedItem.length === 3 ? <button type="submit">제출</button> : null}
      </form>
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
