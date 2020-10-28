import React, {useState, useEffect, useRef} from 'react';
import './Pagination.scss'

interface Props {
  output: Function,
  count: number, // сколько карточек показывать
  length: number // динна карточек
}

const Pagination: React.FC<Props> = (props: Props) => {
  const pagination: Array<number> = []; // массив с кнопками пагинации
  const paginationLength = 8; // сколько кнопок показывать
  const count = Math.ceil(props.length/props.count); // сколько всего кнопок
  const [current, setCurrent] = useState<number>(0); // индекс активной кнопки
  const [start, setStart] = useState<number>(0); // индекс начала интервала
  const [end, setEnd] = useState<number>(paginationLength); // индекс конца интервала
  //const _current = useRef<HTMLSpanElement>(null);

  for(let index = start; index < end; index++) {
    pagination[index] = index;
  }

  const clickItem = (index: number) => {
    setCurrent(index)
  }

  const clickBtn = (param: string) => {
    if (param == 'next') {
      setCurrent(prev => prev + 1);

      if (current + paginationLength < count) {
        setEnd(current + paginationLength)
        setStart(current)
      } else {
        setEnd(count)
        setStart(count - paginationLength)
      }

    }
    if (param == 'prev') {
      setCurrent(prev => prev - 1);

      if (current - paginationLength > 0) {
        setEnd(current)
        setStart(current - paginationLength)
      } else {
        setEnd(paginationLength)
        setStart(0)
      }
    }
  }

  useEffect(() => {
    const to = (current + 1) * props.count;
    const from = to - props.count
    props.output(from, to)
  }, [current])

  return(
    <div className="pagination">
      <div className="pagination-wrapp">
        <span
          //className="pagination-current"
          //ref={_current}
          >
          { //current + 1
          }
        </span>
        {
        (start > 0) ?
          <button
            className="pagination-next"
            onClick={() => clickBtn('prev')}>
            <svg
              className="pagination-prev__icon"
              viewBox="0 0 258 452">
              <path d="M0.141052 225.923C0.141052 217.825 3.23305 209.728 9.40405 203.554L203.69
              9.27C216.049 -3.089 236.087 -3.089 248.441 9.27C260.795 21.624 260.795 41.658 248.441
              54.018L76.526 225.923L248.435 397.829C260.789 410.188 260.789 430.22 248.435
              442.573C236.081 454.938 216.043 454.938 203.684 442.573L9.39804 248.292C3.22604
              242.115 0.141052 234.018 0.141052 225.923Z"/>
            </svg>
            <span>...</span>
          </button> :
          null
      }
      {
        pagination.map((item: number) =>
          <button
            //ref={`current-${item}`}
            className={
              (item == current) ?
              'pagination-item pagination-item_current' :
              'pagination-item'}
            key={item}
            onClick={() => clickItem(item)}>
            {item + 1}
          </button>
        )
      }
      {
        (end < count) ?
          <button
            className="pagination-next"
            onClick={() => clickBtn('next')}>
            <svg
              className="pagination-next__icon"
              viewBox="0 0 258 452">
              <path d="M257.706 225.924C257.706 234.022 254.614 242.119
              248.443 248.293L54.1571 442.577C41.7981 454.936 21.7601 454.936
              9.40613 442.577C-2.94788 430.223 -2.94788 410.189 9.40613
              397.829L181.321 225.924L9.41213 54.018C-2.94187 41.659 -2.94187
              21.627 9.41213 9.274C21.7661 -3.091 41.8041 -3.091 54.1631 9.274L248.449
              203.555C254.621 209.732 257.706 217.829 257.706 225.924Z"/>
            </svg>
            <span>...</span>
          </button> :
          null
      }
      </div>
    </div>
  )
}

export default Pagination;