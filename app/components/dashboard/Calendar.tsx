export default function Calendar() {
    return (
        <>
            <div className="font-bold">
                <h1 className="text-4xl">Today</h1>
                <h2 className="text-lg">Sunday, March 3</h2>
            </div>
            <ul className="text-base font-bold flex flex-row gap-x-4 mt-6 mb-9">
                <li className="">
                    <p className="mb-1">Thu</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>29</span></div>
                </li>
                <li>
                    <p className="mb-1">Fri</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>1</span></div>
                </li>
                <li>
                <p className="mb-1">Sat</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>2</span></div>
                </li>
                <li>
                <p className="mb-1">Sun</p>
                    <div className="w-8 h-8 rounded-full bg-yellowAccent flex items-center justify-center border-2 border-orange"><span>3</span></div>
                </li>
                <li>
                <p className="mb-1">Mon</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>4</span></div>
                </li>
                <li>
                <p className="mb-1">Tue</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>5</span></div>
                </li>
                <li>
                <p className="mb-1">Wed</p>
                    <div className="w-8 h-8 rounded-full bg-yellowPrimary flex items-center justify-center"><span>6</span></div>
                </li>
            </ul>
        </>
    );
  }
