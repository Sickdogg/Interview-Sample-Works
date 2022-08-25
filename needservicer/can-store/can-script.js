//網站運作模式
//1.一開始默認執行顯示資料方法updateDisplay()
//顯示資料方法updateDisplay()會依照finalGroup數組中的資料顯示目錄
//此時篩選完成變量finalGroup為所有資料

//2.當按下搜尋按鈕時依執行兩個篩選方法
//項目選像篩選方法:selectCategory()
//此時變量categoryGroup保存第一次篩選後的數組
//關鍵字篩選方法:selectProducts()
//此時finalGroup保存最後的篩選結果
//最後對篩選後的finalGroup執行updateDisplay()方法


//一開始開啟網站會自動執行一次的顯示商品方法
//使用fetch()得到全部的json資料
fetch('products.json')
    .then(response => {
        //當發生錯誤時丟出一則錯誤訊息
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        } else {
            //正確轉成json回傳
            return response.json();
        }
    })
    .then(json => {
        initialize(json);
    })
    .catch(err => console.error(`Fetch problem: ${err.message}`));

// products是一個長度為12的數組包含商品的資訊
function initialize(products) {

    //找到現有的元素
    //category是項目選單
    //searchTerm是關鍵字搜尋欄
    //searchBtn是搜尋按鈕
    //main是顯示目錄區域
    //main預想的規格為:每一個<section>每一個商品</section>
    //<main>
    //  <section>
    //    <h2></h2>
    //    <p></p>
    //    <img></img>
    //  </section>
    //</main>
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');

    // 得到項目選單的最新的值
    let lastCategory = category.value;
    //一開始不會有搜尋內容所以為空
    let lastSearch = '';

    //categoryGroup為尚未篩選的資料變量
    //finalGroup為篩選後的資料變量
    let categoryGroup;
    let finalGroup;

    //在一開始開啟網頁時篩選後的資料默認為所有資料，所以會展示所有資料
    finalGroup = products;
    console.log("開啟網頁當下:", finalGroup);
    //展示資料的方法
    updateDisplay();

    //當網頁展示完所有資料後，清空篩選前跟篩選後的變量，以便之後的操錯
    categoryGroup = [];
    finalGroup = [];

    //為搜尋按鈕增加點擊事件，執行篩選目錄的方法
    searchBtn.addEventListener('click', selectCategory);

    //篩選分兩步驟
    // 第一步驟: selectCategory() 對項目選像做篩選
    function selectCategory(e) {
        // 清除默認的泡沫監聽
        e.preventDefault();

        // 為了避免意外再一次的清空篩選前跟篩選後的變量
        categoryGroup = [];
        finalGroup = [];

        //lastCategory跟lastSearch變量保存上一次的篩選條件的值
        //一開始開啟網頁時lastCategory = all
        //一開始開啟網頁時lastSearch = ""
        //當按下按鈕時判斷值是否有改變，沒改變直接return不做動作
        if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {

            //當有改變時更新最新的值
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();
            //當值改變後，並且項目選項為"All"時
            if (category.value === 'All') {
                categoryGroup = products;
                selectProducts();

            } else {
                //當項目選項是All之外的值
                //把值變成小寫並保存
                const lowerCaseType = category.value.toLowerCase();
                //使用數組的filter方法，回傳符合的數組
                categoryGroup = products.filter(product => product.type === lowerCaseType);
                console.log("第一次篩選:", categoryGroup);
                // Run selectProducts() after the filtering has been done
                selectProducts();
            }
        }
    }

    //第二步驟:selectProducts()方法對關鍵字做篩選
    function selectProducts() {
        //如果沒有搜尋關鍵字，篩選完成成立
        if (searchTerm.value.trim() === '') {
            finalGroup = categoryGroup;
        } else {
            //如果有關鍵字
            //將關鍵字頭尾的空白刪除後變成小寫保存起來
            const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            //使用數組的filter方法回傳符合的數組，並且篩選完成成立
            finalGroup = categoryGroup.filter(product => product.name.includes(lowerCaseSearchTerm));
            console.log("第二次篩選:", finalGroup);
        }
        // Once we have the final group, update the display
        updateDisplay();
    }

    //當篩選完成成立後，執行顯示目錄方法
    function updateDisplay() {
        //清除顯示目錄區所有資料
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        //如篩選完成內沒有資料的話，顯示默認內容:"沒有資料"
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
            // for each product we want to display, pass its product object to fetchBlob()
        } else {
            //如果有資料使用 for of方法對每一筆資料執行fetchBlob()方法
            for (const product of finalGroup) {
                fetchBlob(product);
            }
        }
    }

    //對圖片做處理
    function fetchBlob(product) {
        //建立圖片的路徑
        const url = `images/${product.image}`;
        //獲取指定路徑的圖片:
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                //使用blob()方法來解析圖片檔案
                return response.blob();
            })
            //當解析完成後執行最後的顯示資料方法
            .then(blob => showProduct(blob, product))
            .catch(err => console.error(`Fetch problem: ${err.message}`));
    }

    // 最後步驟:顯示資料
    function showProduct(blob, product) {
        //建立網頁用的圖片路徑，使用URL.createObjectURL(blob)
        const objectURL = URL.createObjectURL(blob);
        // 建立每一商品的元素 <section>, <h2>, <p>, and <img> elements
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const para = document.createElement('p');
        const image = document.createElement('img');

        // 對每一不同的商品添加各自屬性
        section.setAttribute('class', product.type);

        //每一個商品的標題開頭為大寫，其餘小寫
        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

        //添加商品價格
        para.textContent = `$${product.price.toFixed(2)}`;

        //對圖片添加src屬性的值
        image.src = objectURL;
        image.alt = product.name;

        //建立元素
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }
}