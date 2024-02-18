import {useEffect, useRef, useState} from "react";
import { useReactToPrint } from "react-to-print";

interface FormData {
  amount: number,
  code_name: string,
}
function App() {
  const [formData, setFormData] = useState<FormData>({
    amount: 0,
    code_name: "",
  });
  const [isPrinting, setIsPrinting] = useState(false);
  const formRef = useRef(null);

  const promiseResolveRef = useRef(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // @ts-ignore
      promiseResolveRef.current();
    }
  }, [isPrinting]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const targetRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Flyer-Marriott (${formData.code_name})`,
    pageStyle: `@media print {
      @page {
        size: 29.74cm 20.32cm;
        margin: 0 0 0 0;
      }
    }`,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        // @ts-ignore
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // @ts-ignore
      formRef && formRef.current.reset()
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
    removeAfterPrint: true,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePrint(null, () => targetRef.current);
  };

  return (
    <div className='img-wr'>
      <div id={"print"} ref={targetRef} className={"relative"}>
        <img className='main-img z-[1]' src='/assets/img/flyer-main.png' />
        <div className={"text grid items-center bg-transparent absolute bottom-[44px] left-[36px] z-[200] px-[10px]"}>
          <div className={"grid text-left"}>
            <div className={"border-r-[1px] pr-2"}>
              <div className={"flex items-start gap-1"}>
                <div className={"text-bold text-[#F7941D] text-[48.37pt] leading-[0.75]"}>{formData.amount}</div>
                <div className={"flex flex-col gap-1 text-left h-full"}>
                  <p className={"text-regular text-white text-[18pt] leading-[1]"}>%</p>
                  <p className={"text-regular text-white text-[16pt] leading-[1]"}>OFF</p>
                </div>
              </div>
              <p className={"text-regular mt-2 text-white text-[12pt] leading-[1]"}>CODE: {formData.code_name}</p>
            </div>
          </div>
          <div className={"flex flex-col px-2 text-center gap-2 border-r-[1px]"}>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Hands-on Activities</p>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Polynesian Feast</p>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Exhilarating PerhtmlFormance</p>
          </div>
            <div className={"flex flex-col px-2 gap-1.5 justify-content-center"}>
              <p className={"text-bold text-white text-[15.8pt] leading-[1] uppercase w-max"}>Learn more </p>
              <p className={"text-bold text-white text-[15.8pt] leading-[1] uppercase w-max mx-auto"}>&</p>
              <p className={"text-bold text-[15.8pt] leading-[1] uppercase w-max text-[#F7941D]"}>Buy Tickets</p>
            </div>
          <img className={"qr h-full max-h-[75px]"} src={"/assets/img/qr.png"}/>
        </div>
        <div className={"text grid items-center bg-transparent absolute bottom-[44px] right-[36px] z-[200] px-[10px]"}>
          <div className={"grid text-left"}>
            <div className={"border-r-[1px] pr-2"}>
              <div className={"flex items-start gap-1"}>
                <div className={"text-bold text-[#F7941D] text-[48.37pt] leading-[0.75]"}>{formData.amount}</div>
                <div className={"flex flex-col gap-1 text-left h-full"}>
                  <p className={"text-regular text-white text-[18pt] leading-[1]"}>%</p>
                  <p className={"text-regular text-white text-[16pt] leading-[1]"}>OFF</p>
                </div>
              </div>
              <p className={"text-regular mt-2 text-white text-[12pt] leading-[1]"}>CODE: {formData.code_name}</p>
            </div>
          </div>
          <div className={"flex flex-col px-2 text-center gap-2 border-r-[1px]"}>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Hands-on Activities</p>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Polynesian Feast</p>
            <p className={"text-bold text-white text-[14pt] leading-[1] uppercase"}>Exhilarating PerhtmlFormance</p>
          </div>
            <div className={"flex flex-col px-2 gap-1.5 justify-content-center"}>
              <p className={"text-bold text-white text-[15.8pt] leading-[1] uppercase w-max"}>Learn more </p>
              <p className={"text-bold text-white text-[15.8pt] leading-[1] uppercase w-max mx-auto"}>&</p>
              <p className={"text-bold text-[15.8pt] leading-[1] uppercase w-max text-[#F7941D]"}>Buy Tickets</p>
            </div>
          <img className={"qr h-full max-h-[75px]"} src={"/assets/img/qr.png"}/>
        </div>
      </div>
      <form method={"POST"} className="flex flex-col gap-4 pr-[60px]" ref={formRef} onSubmit={handleSubmit}>
        <h1 className={"text-2xl my-6"}>Flyer Generator</h1>
        <div className="">
          <label htmlFor="amount" className="text-sm">% off amount (%)</label>
          <input
              id="amount"
              name={"amount"}
              type="number"
              placeholder="E.g: 20"
              className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              onChange={(event) => handleChange(event)}
              max={99}
              min={0}
              required
          />

        </div>
        <div className="">
          <label htmlFor="code_name" className="text-sm">Code name</label>
          <input
              id="code_name"
              name={"code_name"}
              type="text"
              placeholder="E.g: Aloha20"
              className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              onChange={(event) => handleChange(event)}
              required
          />

        </div>
        <div className="flex items-center space-x-2">
          <button
              type="submit"
              className="px-4 mt-6 py-3 border bg-[#F7941D] font-bold rounded-md dark:border-gray-100"
              disabled={isPrinting}
          >
            {isPrinting ? "Generating..." : "Generate and Download"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
