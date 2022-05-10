

import AceComponent from '../components/ace/aceComponent';
import './index.less'
import SqlQuery from '@/components/sql-query';

export default function IndexPage() {
  const dataList = ['vancedManager', 'electronBot', 'newPipe', 'hubfs', 'flipperzero', 'smartknob', 
  'bhai', 'oneList', 'dummy', 'csvideo', 'musicwebsite', 'cleancode', 'ace', 'yargs']
  const list = dataList.map(item => <li key={item}>{item}</li>)
  return (
    <div className='page-index'>
      <ul className='left-panel'>
        {list}
      </ul>
      {/* <AceComponent columns={dataList}/> */}
      <SqlQuery />
    </div>
  );
}