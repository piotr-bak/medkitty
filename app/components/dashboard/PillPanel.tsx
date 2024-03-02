export default function PillPanel() {
    return (
        <div className="flex flex-col justify-center pb-[130px]">
            <div className="border border-black rounded-lg p-5 w-[323px] h-[92px]">
                <time className="text-xl font-bold">10:00 am</time>
                <div className="flex flex-row justify-between">
                    <p className="capitalize">bethanechol</p>
                    <p>1/4 pill</p>
                </div>
            </div>
            <button className="self-center flex-end w-24 py-5 -mt-[18px] bg-greenPrimary hover:bg-greenAccent capitalize text-white text-xl font-bold rounded-full text-center w-[130px]">take</button>
        </div>
    );
  }
