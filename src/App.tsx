import { useState } from 'react';
import './App.css';

export default () => {
  const [shareholders, setShareholders] = useState<any>([]);
  const [valuation, setValuation] = useState(0);
  const [name, setName] = useState<string>("");
  const [investment, setInvestment] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [holderInfo, setHolderInfo] = useState<any>({});

  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const addInvestor = () => {
    const investor: any = {};
    shareholders.push(investor);
    const calc: any = [];
    investor.money = investment;
    const roi = investor.money / (investor.money + valuation);
    investor.name = name;
    investor.perc = roi * 100;
    for (let i = 0; i < shareholders.length - 1; i++) {
      calc.push(shareholders[i].perc / investor.perc);
    }

    let prevPerc = 0;
    for (let i = 0; i < calc.length; i++) {
      prevPerc += calc[i];
    }

    for (let i = 0; i < shareholders.length - 1; i++) {
      shareholders[i].perc = shareholders[i].perc - (shareholders[i].perc / prevPerc);
    }

    setValuation(valuation + investment);
    investor.firstMoney = investor.money;
    investor.firstPerc = investor.perc;
    setShareholders([...shareholders])
  }

  const addCash = () => {
    setValuation(valuation + cash)
    for (let i = 0; i < shareholders.length; i++) {
      shareholders[i].money = (valuation * shareholders[i].perc / 100)
    }

    setShareholders([...shareholders]);
  }

  const clearInvestors = () => {
    setShareholders([]);
    setValuation(0)
    setShowClearDialog(false);
  }

  const showHolderInfo = (shareholder:any) => {
    setHolderInfo(shareholder)
    setShowInfoDialog(true)
  }

  return (
    <div 
      className="App bg-[#0e0f12] lg:flex">
      <div 
        className='border-zinc-900 w-full h-full pt-5 lg:px-10 lg:border-r-2 lg:w-3/5 lg:h-screen'>
        <div 
          className='border-zinc-800 border-b-2 mb-10 py-2 mx-4 lg:mb-16'>
          <input
            type="text"
            placeholder='Investor name'
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent w-full border-none text-zinc-300 focus:outline-none py-3 pl-3 placeholder-zinc-600 text-sm lg:text-xl md:text-lg"
          />
        </div>
        <div 
          className='border-b-2 border-zinc-800 mb-12 lg:mb-28 py-2 mx-4'>
          <input
            type="number"
            placeholder='Investment ($)'
            onChange={(e) => setInvestment(parseInt(e.target.value))}
            className="bg-transparent w-full border-none text-green-400 focus:outline-none py-3 pl-3 placeholder-zinc-600 text-sm lg:text-xl md:text-lg"
          />
        </div>
        <div 
          className='flex flex-row space-x-4 lg:space-x-14 px-5 lg:px-12 mb-12 lg:mb-16'>
          <button 
            onClick={addInvestor} 
            className="bg-[#0e0f12] text-green-400 basis-8/12 h-14 xl:h-20 rounded-full ring-1 ring-green-400 hover:bg-green-400 hover:bg-opacity-5 lg:text-xl">
            Add
          </button>
          <button 
            onClick={() => setShowClearDialog(true)}
            className="bg-[#0e0f12] text-red-400 basis-4/12 h-14 xl:h-20 rounded-full ring-1 ring-red-400 lg:text-xl hover:bg-red-400 hover:bg-opacity-5 ">
            Clear
          </button>
        </div>
        <div 
          className='flex flex-row mx-3'>
          <label
            className='flex text-center items-center basis-8/12 text-xl text-zinc-300 bgg-yellow-300 lg:text-3xl'>
            ${valuation}
          </label>
          <div 
            className='border-b-2 border-zinc-800 w-16 xl:w-52 mx-2 flex basis-4/12 md:basis-3/12'>
            <input
              type="number"
              placeholder='10000'
              onChange={(e) => setCash(parseInt(e.target.value))}
              className="bg-transparent w-full border-none text-green-400 focus:outline-none py-3 pl-3 placeholder-zinc-700 placeholder-sm"
            />
          </div>
          <div>
            <button 
              onClick={addCash}
              className="mt-1 pb-1 h-9 w-9 lg:h-11 lg:w-11 ring-1 ring-green-400 text-2xl lg:text-3xl hover:bg-green-400 hover:bg-opacity-5 text-green-400 rounded-full">
              +
            </button>
          </div>
        </div>
      </div>
      <div 
        className=' lg:w-2/5'>
        {
          shareholders.map((shareholder: any) => {
            return <div 
                    onClick={() => showHolderInfo(shareholder)} 
                    className='py-3 flex flex-row hover:bg-zinc-900 w-screen lg:w-full cursor-pointer'>
              <div 
                className='basis-3/12 flex pl-3 lg:pl-7'>
                <label>{ shareholder.name }</label>
              </div>
              <div 
                className='basis-4/12 text-green-400 flex'>
                <label className=''>${Math.round(shareholder.money)}</label>
              </div>
              <div 
                className='basis-5/12 flex justify-end pr-3 lg:pr-7'>
                <label>{shareholder.perc.toFixed(2)}%</label>
              </div>
            </div>
          })
        }
      </div>
      {showClearDialog &&
        <div 
          className='Dialog rounded-2xl w-80 lg:w-96 p-8'>
          <p 
            className='text-xl mb-16'>
            Clear all shareholders?
          </p>
          <div 
            className='flex justify-end items-end'>
            <button 
              onClick={clearInvestors} 
              className="hover:bg-zinc-800 h-11 w-20 text-lg rounded-md">
              Yes
            </button>
            <button 
              onClick={() => setShowClearDialog(false)} 
              className="hover:bg-zinc-800 h-11 w-20 text-lg rounded-md">
              No
            </button>
          </div>
        </div>
      }
      {showInfoDialog &&
        <div 
          className='Dialog rounded-2xl w-80 lg:w-96 p-8 text-center'>
          <p>{ holderInfo.name }</p>
          <div 
            className='flex'>
            <p>first</p>
            <p 
              className='w-full flex justify-end'>
              now
            </p>
          </div>
          <div 
            className='flex'>
            <p>${ holderInfo.firstMoney.toFixed(4) }</p>
            <p 
              className='w-full flex justify-end'>
              ${ holderInfo.money.toFixed(4) }
            </p>
          </div>
          <div 
            className='flex'>
            <p>{ holderInfo.firstPerc.toFixed(4) }%</p>
            <p 
              className='w-full flex justify-end'>
              { holderInfo.perc.toFixed(4) }%
            </p>
          </div>
          <br />
          <div 
            className='flex'>
            <p 
              style={{ color: (holderInfo.money - holderInfo.firstMoney > 0) ? "#4ade80" : "#f87171" }}>
              ${ (holderInfo.money - holderInfo.firstMoney).toFixed(4) }
            </p>
            <p 
              style={{ color: (holderInfo.money - holderInfo.firstMoney > 0) ? "#4ade80" : "#f87171" }} 
              className='w-full flex justify-end'>
              { (((holderInfo.money - holderInfo.firstMoney) / holderInfo.firstMoney) * 100).toFixed(4) }%
            </p>
          </div>
          <button 
            onClick={() => setShowInfoDialog(false)} 
            className="hover:bg-zinc-800 h-11 w-20 text-lg rounded-md">
            Ok
          </button>
        </div>
      }
    </div>
  );
}