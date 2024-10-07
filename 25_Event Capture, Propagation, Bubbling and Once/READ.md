# EventListener

## 語法
```
addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);

Event.target.addEventListener(type, function, {
    capture: ture/flase, 
    once:true/false,
    passive:true/false
});
```
<div style='padding:0 2rem;'>
    <ol>
        <li>
            type: 監聽事件的參數
        </li>
        <li>
            listener: 事件回調
        </li>
        <li>
            options: 參數
            <ul>
                <li>
                    capture: 觸發時機由冒泡階段改為捕獲階段。(預設為冒泡)
                </li>
                <li>
                    once: 使否只監聽一次，觸發後移除。
                </li>
                <li>
                    passive: 若為<code>true</code>，監聽器中不會調用<code>preventDefault()</code>，瀏覽器可針對某些事件進行優化，例如滾動。
                </li>
                <li>
                    signal: 運許使用<code>AbortController</code>來控制事件監聽的取消。
                </li>
            </ul>
        </li>
        <li>
            useCapture: <code>Boolean</code>，預設false。觸發時機由冒泡階段改為捕獲階段。
        </li>
    </ol>
</div>

### `Event.stopPropagation()`
&emsp;&emsp;阻止捕獲和冒泡階段中當前事件的進一步傳遞，但不能防止預設事件發生。
<br>

### `Event.preventDefault()`
&emsp;&emsp;阻止預設事件發生
<br>

### `Event. stopImmediatePropagation()`
&emsp;&emsp;阻止監聽同一事件的其他監聽器被調用，若多個事件監聽器被附加到相同元素的相同事件類型上，當事件觸發，會按照添加的順序被調用，若其中一監聽器執行stopImmediatePropagation，則剩下的監聽器回調都不會被調用。
<br>

### `Event.composedPath()`
&emsp;&emsp;返回一個數組，該數組包含了從事件目標（即觸發事件的元素）到根元素的事件傳播路徑。可用在處理影子 DOM（Shadow DOM）或跨越不同 DOM 層次結構的事件時。

