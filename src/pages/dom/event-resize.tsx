import { useEffect, useRef, useState } from "react";

const doc = `
  # body onresize
  仅body 有效：
    <body onresize="myFunction()">
    window.addEventListener("resize", myFunction);

  # element resize
          1. setInterval: monitor element.offsetWidth; 
            refer: https://dirask.com/posts/JavaScript-onResize-event-for-div-element-DnKaXp

          2. ResizeObserver
`;
export default () => {
  const [isShow, setShow] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const changeShow = () => {
    setShow(!isShow);
  };

  useEffect(() => {
    var observer = new ResizeObserver((entries) => {
      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];
        var sizes = entry.borderBoxSize;  // or:  entry.contentBoxSize;
        if (sizes) {
          console.log('new:', entry.target.id);
          for (var j = 0; j < sizes.length; ++j) {
            var size = sizes[j];
            console.log('currentWidth=' + size.inlineSize + ' currentHeight=' + size.blockSize);
          }
        }
      }
    });
    const main1 = document.querySelector('#main1')!
    observer.observe(mainRef.current!);
    observer.observe(main1);
    return ()=>{
        observer.unobserve(mainRef.current!);
        observer.unobserve(main1);
    }
  }, []);

  return (
    <>
      <div id="main1" className="bg-orange-100 w-80 h-16 border border-solid resize overflow-auto">resize css</div>

      <div className="h-96 flex">
        <div id="main2" ref={mainRef} className="main bg-blue-200 flex-1">
          <button onClick={changeShow} className="text-lg">
            toggle-size
          </button>

          <h2>implement onsize ways:</h2>
          <pre className="whitespace-pre-wrap">
            {doc}
          </pre>
        </div>

        {isShow && (
          <div className="sidebar flex bg-green-400 w-1/2">
            <h3>sidebar</h3>
          </div>
        )}
      </div>
    </>
  );
};
